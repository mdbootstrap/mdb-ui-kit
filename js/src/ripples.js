// FIXME: look at bootstrap/Util.js for transition support functions

const Ripples = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'ripples'
  const DATA_KEY = `bmd.${NAME}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Default = {
    containerSelector: '.ripple-container',
    rippleSelector: 'div.ripple',
    containerTemplate: `<div class='ripple-container'></div>`,
    rippleTemplate: `<div class='ripple'></div>`,
    touchUserAgentRegex: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
    triggerStart: 'mousedown touchstart',
    triggerEnd: 'mouseup mouseleave touchend',
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
      this.rippleElement = null
      this.config = null
    }

    // ------------------------------------------------------------------------
    // private

    _onStartRipple(event) {

      // Verify if the user is just touching on a device and return if so
      if (this.isTouch() && event.type === "mousedown") {
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
      this.rippleElement.css({
       "left": relX,
       "top": relY,
       "background-color": this._getRipplesColor()
       })

      // Make sure the ripple has the styles applied (ugly hack but it works)
      this._forceStyleApplication()

      // Turn on the ripple animation
      this.rippleOn()

      // Call the rippleEnd function when the transition "on" ends
      setTimeout(() => {
        this.rippleEnd()
      }, this.config.duration)

      // Detect when the user leaves the element (attach only when necessary for performance)
      this.element.on(this.config.triggerEnd, () => {
        this.rippleElement.data("mousedown", "off")

        if (this.rippleElement.data("animating") === "off") {
          this.rippleOut()
        }
      })
    }

    _findOrCreateContainer() {
      if (!this.containerElement || !this.containerElement.length > 0) {
        this.element.append(this.config.containerTemplate)
        this.containerElement = this.element.find(this.config.containerSelector)
      }

      // always add the rippleElement, it is always removed
      this.containerElement.append(this.config.rippleTemplate)
      this.rippleElement = this.containerElement.find(this.config.rippleSelector)
    }

    // Make sure the ripple has the styles applied (ugly hack but it works)
    _forceStyleApplication() {
      return window.getComputedStyle(this.rippleElement[0]).opacity
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
          result =  event.touches[0].pageY - containerOffset.top
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
      let color = this.element.data("ripple-color") ? this.element.data("ripple-color") : window.getComputedStyle(this.element[0]).color
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
      this.rippleElement.data("animating", "off")

      if (this.rippleElement.data("mousedown") === "off") {
        this.rippleOut(this.rippleElement)
      }
    }

    /**
     * Turn off the ripple effect
     */
    rippleOut() {
      this.rippleElement.off()

      if ($.transitionEndSupported()) {
        this.rippleElement.addClass("ripple-out")
      } else {
        this.rippleElement.animate({ "opacity": 0 }, 100, () => {
          this.rippleElement.triggerStart("transitionend")
        })
      }

      this.rippleElement.on($.transitionEndSelector(), () => {
        this.rippleElement.remove()
        this.rippleElement = null
      })
    }

    /**
     * Turn on the ripple effect
     */
    rippleOn() {
      let size = this._getNewSize()

      if ($.transitionEndSupported()) {
        this.rippleElement
          .css({
            "-ms-transform": `scale(${size})`,
            "-moz-transform": `scale(${size})`,
            "-webkit-transform": `scale(${size})`,
            "transform": `scale(${size})`
          })
          .addClass("ripple-on")
          .data("animating", "on")
          .data("mousedown", "on")
      } else {
        this.rippleElement.animate({
          "width": Math.max(this.element.outerWidth(), this.element.outerHeight()) * 2,
          "height": Math.max(this.element.outerWidth(), this.element.outerHeight()) * 2,
          "margin-left": Math.max(this.element.outerWidth(), this.element.outerHeight()) * (-1),
          "margin-top": Math.max(this.element.outerWidth(), this.element.outerHeight()) * (-1),
          "opacity": 0.2
        }, this.config.duration, () => {
          this.rippleElement.triggerStart("transitionend")
        })
      }
    }

    /**
     * Get the new size based on the element height/width and the ripple width
     */
    _getNewSize() {
      return (Math.max(this.element.outerWidth(), this.element.outerHeight()) / this.rippleElement.outerWidth()) * 2.5
    }

    // ------------------------------------------------------------------------
    // static

    static _jQueryInterface(options) {
      return this.each(() => {
        let element = $(this)
        let data = element.data(DATA_KEY)

        if (!data) {
          data = new Ripples(this, options)
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
