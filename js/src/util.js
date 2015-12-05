const Util = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  let transitionEnd = false
  let transitionEndSelector = ''

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
        return TransitionEndEvent[name] // { end: TransitionEndEvent[name] }
      }
    }

    return false
  }

  function setTransitionEndSupport() {
    transitionEnd = transitionEndTest()

    // generate a concatenated transition end event selector
    for (let name in TransitionEndEvent) {
      transitionEndSelector += ` ${TransitionEndEvent[name]}`
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  let Util = {

    transitionEndSupported() {
      return transitionEnd
    },

    transitionEndSelector()  {
      return transitionEndSelector
    },

    isChar(event) {
      if (typeof event.which === 'undefined') {
        return true
      } else if (typeof event.which === 'number' && event.which > 0) {
        return !event.ctrlKey && !event.metaKey && !event.altKey && event.which !== 8 && event.which !== 9
      }
      return false
    },

    assert(test, message) {
      if (test) {
        $.error(message)
      }
    }
  }

  setTransitionEndSupport()
  return Util

})(jQuery)

export default Util
