'use strict';

var Util = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transitionEnd = false;
  var _transitionEndSelector = '';

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  var ClassName = {
    IS_FOCUSED: 'is-focused',
    FORM_GROUP: 'form-group'
  };

  var Selector = {
    FORM_GROUP: '.' + ClassName.FORM_GROUP //,
  };

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('mdb');

    for (var _name in TransitionEndEvent) {
      if (el.style[_name] !== undefined) {
        return TransitionEndEvent[_name]; // { end: TransitionEndEvent[name] }
      }
    }

    return false;
  }

  function setTransitionEndSupport() {
    transitionEnd = transitionEndTest();

    // generate a concatenated transition end event selector
    for (var _name2 in TransitionEndEvent) {
      _transitionEndSelector += ' ' + TransitionEndEvent[_name2];
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    transitionEndSupported: function transitionEndSupported() {
      return transitionEnd;
    },

    transitionEndSelector: function transitionEndSelector() {
      return _transitionEndSelector;
    },

    isChar: function isChar(event) {
      if (typeof event.which === 'undefined') {
        return true;
      } else if (typeof event.which === 'number' && event.which > 0) {
        return !event.ctrlKey && !event.metaKey && !event.altKey && event.which !== 8 && event.which !== 9;
      }
      return false;
    },

    addFormGroupFocus: function addFormGroupFocus(formGroup) {
      formGroup.addClass(ClassName.IS_FOCUSED);
    },

    removeFormGroupFocus: function removeFormGroupFocus(formGroup) {
      formGroup.removeClass(ClassName.IS_FOCUSED);
    },

    /**
     Find expected form-group
     */
    findFormGroup: function findFormGroup(element) {
      var fg = element.closest(Selector.FORM_GROUP); // note that form-group may be grandparent in the case of an input-group
      if (fg.length === 0) {
        $.error('Failed to find form-group for ' + element);
      }
      return fg;
    }
  };

  setTransitionEndSupport();
  return Util;
})(jQuery);
//# sourceMappingURL=util.js.map
