import Util from './util'

const Ripples = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'ripples'
  const DATA_KEY = `bmd.${NAME}`
  const JQUERY_NAME = `bmd${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const ClassName = {
    CONTAINER: 'ripple-container',
    DECORATOR: 'ripple-decorator'
  }

  const Selector = {
    CONTAINER: `.${ClassName.CONTAINER}`,
    DECORATOR: `.${ClassName.DECORATOR}` //,
  }


  const Default = {
    container: {
      template: `<div class='${ClassName.CONTAINER}'></div>`
    },
    decorator: {
      template: `<div class='${ClassName.DECORATOR}'></div>`
    },
    trigger: {
      start: 'mousedown touchstart',
      end: 'mouseup mouseleave touchend'
    },
    touchUserAgentRegex: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
    duration: 500
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Ripples {

    constructor($element, config) {
      this.$element = $element

      //console.log(`Adding ripples to ${Util.describe(this.$element)}`)  // eslint-disable-line no-console
      this.config = $.extend(true, {}, Default, config)

      // attach initial listener
      this.$element.on(this.config.trigger.start, (event) => {
        this._onStartRipple(event)
      })
    }


    dispose() {
      this.$element.data(DATA_KEY, null)
      this.$element = null
      this.$container = null
      this.$decorator = null
      this.config = null
    }

    // ------------------------------------------------------------------------
    // private

    _onStartRipple(event) {

      // Verify if the user is just touching on a device and return if so
      if (this._isTouch() && event.type === 'mousedown') {
        return
      }

      // Find or create the ripple container element
      this._findOrCreateContainer()

      // Get relY and relX positions of the container element
      let relY = this._getRelY(event)
      let relX = this._getRelX(event)

      // If relY and/or relX are false, return the event
      if (!relY && !relX) {
        return
      }

      // set the location and color each time (even if element is cached)
      this.$decorator.css({
        left: relX,
        top: relY,
        'background-color': this._getRipplesColor()
      })

      // Make sure the ripple has the styles applied (ugly hack but it works)
      this._forceStyleApplication()

      // Turn on the ripple animation
      this.rippleOn()

      // Call the rippleEnd function when the transition 'on' ends
      setTimeout(() => {
        this.rippleEnd()
      }, this.config.duration)

      // Detect when the user leaves the element to cleanup if not already done?
      this.$element.on(this.config.trigger.end, () => {
        if (this.$decorator) { // guard against race condition/mouse attack
          this.$decorator.data('mousedown', 'off')

          if (this.$decorator.data('animating') === 'off') {
            this.rippleOut()
          }
        }
      })
    }

    _findOrCreateContainer() {
      if (!this.$container || !this.$container.length > 0) {
        this.$element.append(this.config.container.template)
        this.$container = this.$element.find(Selector.CONTAINER)
      }

      // always add the rippleElement, it is always removed
      this.$container.append(this.config.decorator.template)
      this.$decorator = this.$container.find(Selector.DECORATOR)
    }

    // Make sure the ripple has the styles applied (ugly hack but it works)
    _forceStyleApplication() {
      return window.getComputedStyle(this.$decorator[0]).opacity
    }


    /**
     * Get the relX
     */
    _getRelX(event) {
      let wrapperOffset = this.$container.offset()

      let result = null
      if (!this._isTouch()) {
        // Get the mouse position relative to the ripple wrapper
        result = event.pageX - wrapperOffset.left
      } else {
        // Make sure the user is using only one finger and then get the touch
        //  position relative to the ripple wrapper
        event = event.originalEvent

        if (event.touches.length === 1) {
          result = event.touches[0].pageX - wrapperOffset.left
        } else {
          result = false
        }
      }

      return result
    }

    /**
     * Get the relY
     */
    _getRelY(event) {
      let containerOffset = this.$container.offset()
      let result = null

      if (!this._isTouch()) {
        /**
         * Get the mouse position relative to the ripple wrapper
         */
        result = event.pageY - containerOffset.top
      } else {
        /**
         * Make sure the user is using only one finger and then get the touch
         * position relative to the ripple wrapper
         */
        event = event.originalEvent

        if (event.touches.length === 1) {
          result = event.touches[0].pageY - containerOffset.top
        } else {
          result = false
        }
      }

      return result
    }

    /**
     * Get the ripple color
     */
    _getRipplesColor() {
      let color = this.$element.data('ripple-color') ? this.$element.data('ripple-color') : window.getComputedStyle(this.$element[0]).color
      return color
    }

    /**
     * Verify if the client is using a mobile device
     */
    _isTouch() {
      return this.config.touchUserAgentRegex.test(navigator.userAgent)
    }

    /**
     * End the animation of the ripple
     */
    rippleEnd() {
      if (this.$decorator) { // guard against race condition/mouse attack
        this.$decorator.data('animating', 'off')

        if (this.$decorator.data('mousedown') === 'off') {
          this.rippleOut(this.$decorator)
        }
      }
    }

    /**
     * Turn off the ripple effect
     */
    rippleOut() {
      this.$decorator.off()

      if (Util.transitionEndSupported()) {
        this.$decorator.addClass('ripple-out')
      } else {
        this.$decorator.animate({opacity: 0}, 100, () => {
          this.$decorator.trigger('transitionend')
        })
      }

      this.$decorator.on(Util.transitionEndSelector(), () => {
        if (this.$decorator) {
          this.$decorator.remove()
          this.$decorator = null
        }
      })
    }

    /**
     * Turn on the ripple effect
     */
    rippleOn() {
      let size = this._getNewSize()

      if (Util.transitionEndSupported()) {
        this.$decorator
          .css({
            '-ms-transform': `scale(${size})`,
            '-moz-transform': `scale(${size})`,
            '-webkit-transform': `scale(${size})`,
            transform: `scale(${size})`
          })
          .addClass('ripple-on')
          .data('animating', 'on')
          .data('mousedown', 'on')
      } else {
        this.$decorator.animate({
          width: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
          height: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
          'margin-left': Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * (-1),
          'margin-top': Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * (-1),
          opacity: 0.2
        }, this.config.duration, () => {
          this.$decorator.trigger('transitionend')
        })
      }
    }

    /**
     * Get the new size based on the element height/width and the ripple width
     */
    _getNewSize() {
      return (Math.max(this.$element.outerWidth(), this.$element.outerHeight()) / this.$decorator.outerWidth()) * 2.5
    }

    // ------------------------------------------------------------------------
    // static

    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Ripples($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = Ripples._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Ripples
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Ripples._jQueryInterface
  }

  return Ripples

})(jQuery)

export default Ripples
