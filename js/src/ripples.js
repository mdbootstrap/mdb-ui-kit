import Util from './util'

const Ripples = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'ripples'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

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
      template: `${ClassName.DECORATOR}'></div>`
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

    constructor(element, config) {
      this.element = $(element)
      this.config = $.extend({}, Default, config)

      // attach initial listener
      this.element.on(this.config.triggerStart, this._onStartRipple)
    }

    dispose() {
      $.removeData(this.element, DATA_KEY)
      this.element = null
      this.containerElement = null
      this.decoratorElement = null
      this.config = null
    }

    // ------------------------------------------------------------------------
    // private

    _onStartRipple(event) {

      // Verify if the user is just touching on a device and return if so
      if (this.isTouch() && event.type === 'mousedown') {
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
      this.decoratorElement.css({
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

      // Detect when the user leaves the element (attach only when necessary for performance)
      this.element.on(this.config.triggerEnd, () => {
        this.decoratorElement.data('mousedown', 'off')

        if (this.decoratorElement.data('animating') === 'off') {
          this.rippleOut()
        }
      })
    }

    _findOrCreateContainer() {
      if (!this.containerElement || !this.containerElement.length > 0) {
        this.element.append(this.config.container.template)
        this.containerElement = this.element.find(Selector.CONTAINER)
      }

      // always add the rippleElement, it is always removed
      this.containerElement.append(this.config.element.template)
      this.decoratorElement = this.containerElement.find(Selector.DECORATOR)
    }

    // Make sure the ripple has the styles applied (ugly hack but it works)
    _forceStyleApplication() {
      return window.getComputedStyle(this.decoratorElement[0]).opacity
    }

    /**
     * Get the relX
     */
    _getRelX(event) {
      let wrapperOffset = this.containerElement.offset()

      let result = null
      if (!this.isTouch()) {
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
      let containerOffset = this.containerElement.offset()
      let result = null

      if (!this.isTouch()) {
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
      let color = this.element.data('ripple-color') ? this.element.data('ripple-color') : window.getComputedStyle(this.element[0]).color
      return color
    }

    /**
     * Verify if the client is using a mobile device
     */
    isTouch() {
      return this.config.touchUserAgentRegex.test(navigator.userAgent)
    }

    /**
     * End the animation of the ripple
     */
    rippleEnd() {
      this.decoratorElement.data('animating', 'off')

      if (this.decoratorElement.data('mousedown') === 'off') {
        this.rippleOut(this.decoratorElement)
      }
    }

    /**
     * Turn off the ripple effect
     */
    rippleOut() {
      this.decoratorElement.off()

      if (Util.transitionEndSupported()) {
        this.decoratorElement.addClass('ripple-out')
      } else {
        this.decoratorElement.animate({opacity: 0}, 100, () => {
          this.decoratorElement.triggerStart('transitionend')
        })
      }

      this.decoratorElement.on(Util.transitionEndSelector(), () => {
        this.decoratorElement.remove()
        this.decoratorElement = null
      })
    }

    /**
     * Turn on the ripple effect
     */
    rippleOn() {
      let size = this._getNewSize()

      if (Util.transitionEndSupported()) {
        this.decoratorElement
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
        this.decoratorElement.animate({
          width: Math.max(this.element.outerWidth(), this.element.outerHeight()) * 2,
          height: Math.max(this.element.outerWidth(), this.element.outerHeight()) * 2,
          'margin-left': Math.max(this.element.outerWidth(), this.element.outerHeight()) * (-1),
          'margin-top': Math.max(this.element.outerWidth(), this.element.outerHeight()) * (-1),
          opacity: 0.2
        }, this.config.duration, () => {
          this.decoratorElement.triggerStart('transitionend')
        })
      }
    }

    /**
     * Get the new size based on the element height/width and the ripple width
     */
    _getNewSize() {
      return (Math.max(this.element.outerWidth(), this.element.outerHeight()) / this.decoratorElement.outerWidth()) * 2.5
    }

    // ------------------------------------------------------------------------
    // static

    static _jQueryInterface(config) {
      return this.each(() => {
        let element = $(this)
        let data = element.data(DATA_KEY)

        if (!data) {
          data = new Ripples(this, config)
          element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[NAME] = Ripples._jQueryInterface
  $.fn[NAME].Constructor = Ripples
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Ripples._jQueryInterface
  }

  return Ripples

})(jQuery)

export default Ripples
