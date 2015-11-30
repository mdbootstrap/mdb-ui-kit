// FIXME: convert to member variable use instead of passing around/finding?
const Ripples = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'ripples'
  const DATA_KEY = `bmd.${NAME}`
  // const EVENT_KEY = `.${DATA_KEY}`
  // const DATA_API_KEY = '.data-api'
  const JQUERY_NO_CONFLICT = $.fn[NAME]
  const DEFAULT_OPTIONS = {}

  // const Selector = {
  //  DATA_DISMISS: '[data-dismiss="ripples"]'
  // }
  //
  // const Event = {
  //  CLOSE: `close${EVENT_KEY}`,
  //  CLOSED: `closed${EVENT_KEY}`,
  //  CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  // }


  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Ripples {

    constructor(element, options) {
      this._element = $(element)
      this._options = $.extend({}, DEFAULT_OPTIONS, options)
      this._element.on("mousedown touchstart", this._createRipple)
    }

    // getters
    static get NAME() {
      return NAME
    }

    // public
    close(element) {
      element = element || this._element

      let rootElement = this._getRootElement(element)
      let customEvent = this._triggerCloseEvent(rootElement)

      if (customEvent.isDefaultPrevented()) {
        return
      }

      this._removeElement(rootElement)
    }

    dispose() {
      $.removeData(this._element, DATA_KEY)
      this._element = null
    }


    // ------------------------------------------------------------------------
    // private

    _createRipple(event) {

      // Verify if the user is just touching on a device and return if so
      if (this.isTouch() && event.type === "mousedown") {
        return
      }

      // Verify if the current element already has a ripple wrapper element and creates if it doesn't
      if (!(this._element.find(".ripple-container").length)) {
        this._element.append("<div class='ripple-container'></div>")
      }

      // Find the ripple wrapper
      let containerElement = this._element.children(".ripple-container")

      // Get relY and relX positions
      let relY = this._getRelY(containerElement, event)
      let relX = this._getRelX(containerElement, event)

      // If relY and/or relX are false, return the event
      if (!relY && !relX) {
        return
      }

      // Get the ripple color
      let rippleColor = this._getRipplesColor(this._element)

      // Create the ripple element
      let rippleElement = $("<div></div>")

      rippleElement.addClass("ripple").css(`left: ${relX}; top: ${relY};  background-color: ${rippleColor}`)
      /* https://github.com/eslint/eslint/issues/4579
       rippleElement.addClass("ripple").css({
       "left": relX,
       "top": relY,
       "background-color": rippleColor
       })
       */

      // Append the ripple to the wrapper
      containerElement.append(rippleElement)

      // Make sure the ripple has the styles applied (ugly hack but it works)
      (() => { return window.getComputedStyle(rippleElement[0]).opacity })()

      // Turn on the ripple animation
      this.rippleOn(this._element, rippleElement)

      // Call the rippleEnd function when the transition "on" ends
      setTimeout(() => {
        this.rippleEnd(rippleElement)
      }, 500)

      // Detect when the user leaves the element
      this._element.on("mouseup mouseleave touchend", () => {
        rippleElement.data("mousedown", "off")

        if (rippleElement.data("animating") === "off") {
          this.rippleOut(rippleElement)
        }
      })
    }


    /**
     * Get the relX
     */
    _getRelX(containerElement, event) {
      let wrapperOffset = containerElement.offset()

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
    _getRelY(containerElement, event) {
      let wrapperOffset = containerElement.offset()
      let result = null

      if (!this.isTouch()) {
        /**
         * Get the mouse position relative to the ripple wrapper
         */
        result = event.pageY - wrapperOffset.top
      } else {
        /**
         * Make sure the user is using only one finger and then get the touch
         * position relative to the ripple wrapper
         */
        event = event.originalEvent

        if (event.touches.length === 1) {
          result =  event.touches[0].pageY - wrapperOffset.top
        } else {
          result = false
        }
      }

      return result
    }


    /**
     * Get the ripple color
     */
    _getRipplesColor(element) {
      let color = element.data("ripple-color") ? element.data("ripple-color") : window.getComputedStyle(element[0]).color
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
    rippleEnd(rippleElement) {
      rippleElement.data("animating", "off")

      if (rippleElement.data("mousedown") === "off") {
        this.rippleOut(rippleElement)
      }
    }


    /**
     * Turn off the ripple effect
     */
    rippleOut(rippleElement) {
      rippleElement.off()

      if (this._hasTransitionSupport()) {
        rippleElement.addClass("ripple-out")
      } else {
        rippleElement.animate({ "opacity": 0 }, 100, () => {
          rippleElement.trigger("transitionend")
        })
      }

      rippleElement.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", () => {
        rippleElement.remove()
      })
    }


    /**
     * Turn on the ripple effect
     */
    rippleOn(element, rippleElement) {
      let size = this._getNewSize(element, rippleElement)

      if (this._hasTransitionSupport()) {
        rippleElement
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
        rippleElement.animate({
          "width": Math.max(element.outerWidth(), element.outerHeight()) * 2,
          "height": Math.max(element.outerWidth(), element.outerHeight()) * 2,
          "margin-left": Math.max(element.outerWidth(), element.outerHeight()) * (-1),
          "margin-top": Math.max(element.outerWidth(), element.outerHeight()) * (-1),
          "opacity": 0.2
        }, 500, () => {
          rippleElement.trigger("transitionend")
        })
      }
    }


    // ------------------------------------------------------------------------
    // static
    /**
     * Get the new size based on the element height/width and the ripple width
     */
    static _getNewSize(element, rippleElement) {
      return (Math.max(element.outerWidth(), element.outerHeight()) / rippleElement.outerWidth()) * 2.5
    }


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

    // static _handleClose(fooInstance) {
    //  return function(event) {
    //    if (event) {
    //      event.preventDefault()
    //    }
    //
    //    fooInstance.close(this)
    //  }
    // }
  }


  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  // $(document).on(
  //  Event.CLICK_DATA_API,
  //  Selector.DATA_DISMISS,
  //  Ripples._handleClose(new Ripples())
  // )


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
