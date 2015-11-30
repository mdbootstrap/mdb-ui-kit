const Ripples = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'ripples'
  const DATA_KEY = `bmd.${NAME}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]
  const DEFAULT_OPTIONS = {}

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Ripples {

    constructor(element, options) {
      this._element = $(element)
      this._options = $.extend({}, DEFAULT_OPTIONS, options)
      this._element.on("mousedown touchstart", this._onStartRipple)
    }

    dispose() {
      $.removeData(this._element, DATA_KEY)
      this._element = null
      this._containerElement = null
      this._rippleElement = null
      this._options = null
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
      this._rippleElement.addClass("ripple").css({
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
      }, 500)

      // Detect when the user leaves the element (attach only when necessary for performance)
      this._element.on("mouseup mouseleave touchend", () => {
        this._rippleElement.data("mousedown", "off")

        if (this._rippleElement.data("animating") === "off") {
          this.rippleOut()
        }
      })
    }

    _findOrCreateContainer() {
      if (!this._containerElement || !this._containerElement.length > 0) {
        this._element.append("<div class='ripple-container'><div class='ripple'></div></div>")
        this._containerElement = this._element.find(".ripple-container")
        this._rippleElement = this._containerElement.find("div.ripple")
      }

      return this._containerElement
    }

    // Make sure the ripple has the styles applied (ugly hack but it works)
    _forceStyleApplication() {
      return window.getComputedStyle(this._rippleElement[0]).opacity
    }

    /**
     * Get the relX
     */
    _getRelX(event) {
      let wrapperOffset = this._containerElement.offset()

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
      let containerOffset = this._containerElement.offset()
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
      let color = this._element.data("ripple-color") ? this._element.data("ripple-color") : window.getComputedStyle(this._element[0]).color
      return color
    }

    /**
     * Verify if the client browser has transistion support
     */
    _hasTransitionSupport() {
      let thisBody = document.body || document.documentElement
      let thisStyle = thisBody.style

      let support = (
        thisStyle.transition !== undefined ||
        thisStyle.WebkitTransition !== undefined ||
        thisStyle.MozTransition !== undefined ||
        thisStyle.MsTransition !== undefined ||
        thisStyle.OTransition !== undefined
      )

      return support
    }

    /**
     * Verify if the client is using a mobile device
     */
    isTouch() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }

    /**
     * End the animation of the ripple
     */
    rippleEnd() {
      this._rippleElement.data("animating", "off")

      if (this._rippleElement.data("mousedown") === "off") {
        this.rippleOut(this._rippleElement)
      }
    }

    /**
     * Turn off the ripple effect
     */
    rippleOut() {
      this._rippleElement.off()

      if (this._hasTransitionSupport()) {
        this._rippleElement.addClass("ripple-out")
      } else {
        this._rippleElement.animate({ "opacity": 0 }, 100, () => {
          this._rippleElement.trigger("transitionend")
        })
      }

      this._rippleElement.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", () => {
        this._rippleElement.remove()
      })
    }

    /**
     * Turn on the ripple effect
     */
    rippleOn() {
      let size = this._getNewSize()

      if (this._hasTransitionSupport()) {
        this._rippleElement
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
        this._rippleElement.animate({
          "width": Math.max(this._element.outerWidth(), this._element.outerHeight()) * 2,
          "height": Math.max(this._element.outerWidth(), this._element.outerHeight()) * 2,
          "margin-left": Math.max(this._element.outerWidth(), this._element.outerHeight()) * (-1),
          "margin-top": Math.max(this._element.outerWidth(), this._element.outerHeight()) * (-1),
          "opacity": 0.2
        }, 500, () => {
          this._rippleElement.trigger("transitionend")
        })
      }
    }

    /**
     * Get the new size based on the element height/width and the ripple width
     */
    _getNewSize() {
      return (Math.max(this._element.outerWidth(), this._element.outerHeight()) / this._rippleElement.outerWidth()) * 2.5
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
