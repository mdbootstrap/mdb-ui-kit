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

  const ClassName = {
    IS_FOCUSED: 'is-focused',
    FORM_GROUP: 'form-group'
  }

  const Selector = {
    FORM_GROUP: `.${ClassName.FORM_GROUP}` //,
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

    addFormGroupFocus(formGroup) {
      formGroup.addClass(ClassName.IS_FOCUSED)
    },

    removeFormGroupFocus(formGroup) {
      formGroup.removeClass(ClassName.IS_FOCUSED)
    },

    /**
     Find expected form-group
     */
    findFormGroup($element, raiseError = true) {
      let fg = $element.closest(Selector.FORM_GROUP) // note that form-group may be grandparent in the case of an input-group
      if (fg.length === 0 && raiseError) {
        $.error(`Failed to find form-group for ${$element}`)
      }
      return fg
    }
  }

  setTransitionEndSupport()
  return Util

})(jQuery)

export default Util
