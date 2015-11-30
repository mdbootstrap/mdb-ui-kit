const Util = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  let transitionEnd = false
  let transitionEndSelector = ""

  const TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false
    }

    let el = document.createElement('mdb')

    for (let name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return TransitionEndEvent[name] //{ end: TransitionEndEvent[name] }
      }
    }

    return false
  }

  function setTransitionEndSupport() {
    transitionEnd = transitionEndTest()
    $.fn.transitionEndSupported = () => {
      return transitionEnd
    }

    // generate a selector
    for (let name in TransitionEndEvent) {
      transitionEndSelector += ` ${TransitionEndEvent[name]}`
    }
    $.fn.transitionEndSelector = () => {
      return transitionEndSelector
    }          // FIXME: make this a Util.* method instead?
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  let Util = {

    isChar(evt) {
      if (typeof evt.which == "undefined") {
        return true
      } else if (typeof evt.which == "number" && evt.which > 0) {
        return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8 && evt.which != 9
      }
      else {
        return false
      }
    },

    /*    /!**
     * Verify if the client browser has transistion support
     *!/
     hasTransitionSupport() {
     return transition
     }*/
  }

  setTransitionEndSupport()
  return Util

})(jQuery)

export default Util
