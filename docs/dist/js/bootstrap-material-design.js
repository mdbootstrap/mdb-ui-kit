/*!
 * Bootstrap Material Design v4.0.0-alpha (https://github.com/FezVrasta/bootstrap-material-design)
 * Copyright 2014-2015 Federico Zivolo
 * Licensed under MIT (https://github.com/FezVrasta/bootstrap-material-design/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap Material Design\'s JavaScript requires jQuery')
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 3)) {
    throw new Error('Bootstrap Material Design\'s JavaScript requires at least jQuery v1.9.1 but less than v3.0.0')
  }
}(jQuery);


+function ($) {

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

var Ripples = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'ripples';
  var DATA_KEY = 'mdb.' + NAME;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    CONTAINER: 'ripple-container',
    DECORATOR: 'ripple-decorator'
  };

  var Selector = {
    CONTAINER: '.' + ClassName.CONTAINER,
    DECORATOR: '.' + ClassName.DECORATOR //,
  };

  var Default = {
    container: {
      template: '<div class=\'' + ClassName.CONTAINER + '\'></div>'
    },
    decorator: {
      template: ClassName.DECORATOR + '\'></div>'
    },
    trigger: {
      start: 'mousedown touchstart',
      end: 'mouseup mouseleave touchend'
    },
    touchUserAgentRegex: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
    duration: 500
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Ripples = (function () {
    function Ripples(element, config) {
      _classCallCheck(this, Ripples);

      this.element = $(element);
      this.config = $.extend({}, Default, config);

      // attach initial listener
      this.element.on(this.config.triggerStart, this._onStartRipple);
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(Ripples, [{
      key: 'dispose',
      value: function dispose() {
        $.removeData(this.element, DATA_KEY);
        this.element = null;
        this.containerElement = null;
        this.decoratorElement = null;
        this.config = null;
      }

      // ------------------------------------------------------------------------
      // private

    }, {
      key: '_onStartRipple',
      value: function _onStartRipple(event) {
        var _this = this;

        // Verify if the user is just touching on a device and return if so
        if (this.isTouch() && event.type === 'mousedown') {
          return;
        }

        // Find or create the ripple container element
        this._findOrCreateContainer();

        // Get relY and relX positions of the container element
        var relY = this._getRelY(event);
        var relX = this._getRelX(event);

        // If relY and/or relX are false, return the event
        if (!relY && !relX) {
          return;
        }

        // set the location and color each time (even if element is cached)
        this.decoratorElement.css({
          'left': relX,
          'top': relY,
          'background-color': this._getRipplesColor()
        });

        // Make sure the ripple has the styles applied (ugly hack but it works)
        this._forceStyleApplication();

        // Turn on the ripple animation
        this.rippleOn();

        // Call the rippleEnd function when the transition 'on' ends
        setTimeout(function () {
          _this.rippleEnd();
        }, this.config.duration);

        // Detect when the user leaves the element (attach only when necessary for performance)
        this.element.on(this.config.triggerEnd, function () {
          _this.decoratorElement.data('mousedown', 'off');

          if (_this.decoratorElement.data('animating') === 'off') {
            _this.rippleOut();
          }
        });
      }
    }, {
      key: '_findOrCreateContainer',
      value: function _findOrCreateContainer() {
        if (!this.containerElement || !this.containerElement.length > 0) {
          this.element.append(this.config.container.template);
          this.containerElement = this.element.find(Selector.CONTAINER);
        }

        // always add the rippleElement, it is always removed
        this.containerElement.append(this.config.element.template);
        this.decoratorElement = this.containerElement.find(Selector.DECORATOR);
      }

      // Make sure the ripple has the styles applied (ugly hack but it works)
    }, {
      key: '_forceStyleApplication',
      value: function _forceStyleApplication() {
        return window.getComputedStyle(this.decoratorElement[0]).opacity;
      }

      /**
       * Get the relX
       */
    }, {
      key: '_getRelX',
      value: function _getRelX(event) {
        var wrapperOffset = this.containerElement.offset();

        var result = null;
        if (!this.isTouch()) {
          // Get the mouse position relative to the ripple wrapper
          result = event.pageX - wrapperOffset.left;
        } else {
          // Make sure the user is using only one finger and then get the touch
          //  position relative to the ripple wrapper
          event = event.originalEvent;

          if (event.touches.length === 1) {
            result = event.touches[0].pageX - wrapperOffset.left;
          } else {
            result = false;
          }
        }

        return result;
      }

      /**
       * Get the relY
       */
    }, {
      key: '_getRelY',
      value: function _getRelY(event) {
        var containerOffset = this.containerElement.offset();
        var result = null;

        if (!this.isTouch()) {
          /**
           * Get the mouse position relative to the ripple wrapper
           */
          result = event.pageY - containerOffset.top;
        } else {
          /**
           * Make sure the user is using only one finger and then get the touch
           * position relative to the ripple wrapper
           */
          event = event.originalEvent;

          if (event.touches.length === 1) {
            result = event.touches[0].pageY - containerOffset.top;
          } else {
            result = false;
          }
        }

        return result;
      }

      /**
       * Get the ripple color
       */
    }, {
      key: '_getRipplesColor',
      value: function _getRipplesColor() {
        var color = this.element.data('ripple-color') ? this.element.data('ripple-color') : window.getComputedStyle(this.element[0]).color;
        return color;
      }

      /**
       * Verify if the client is using a mobile device
       */
    }, {
      key: 'isTouch',
      value: function isTouch() {
        return this.config.touchUserAgentRegex.test(navigator.userAgent);
      }

      /**
       * End the animation of the ripple
       */
    }, {
      key: 'rippleEnd',
      value: function rippleEnd() {
        this.decoratorElement.data('animating', 'off');

        if (this.decoratorElement.data('mousedown') === 'off') {
          this.rippleOut(this.decoratorElement);
        }
      }

      /**
       * Turn off the ripple effect
       */
    }, {
      key: 'rippleOut',
      value: function rippleOut() {
        var _this2 = this;

        this.decoratorElement.off();

        if (Util.transitionEndSupported()) {
          this.decoratorElement.addClass('ripple-out');
        } else {
          this.decoratorElement.animate({ 'opacity': 0 }, 100, function () {
            _this2.decoratorElement.triggerStart('transitionend');
          });
        }

        this.decoratorElement.on(Util.transitionEndSelector(), function () {
          _this2.decoratorElement.remove();
          _this2.decoratorElement = null;
        });
      }

      /**
       * Turn on the ripple effect
       */
    }, {
      key: 'rippleOn',
      value: function rippleOn() {
        var _this3 = this;

        var size = this._getNewSize();

        if (Util.transitionEndSupported()) {
          this.decoratorElement.css({
            '-ms-transform': 'scale(' + size + ')',
            '-moz-transform': 'scale(' + size + ')',
            '-webkit-transform': 'scale(' + size + ')',
            'transform': 'scale(' + size + ')'
          }).addClass('ripple-on').data('animating', 'on').data('mousedown', 'on');
        } else {
          this.decoratorElement.animate({
            'width': Math.max(this.element.outerWidth(), this.element.outerHeight()) * 2,
            'height': Math.max(this.element.outerWidth(), this.element.outerHeight()) * 2,
            'margin-left': Math.max(this.element.outerWidth(), this.element.outerHeight()) * -1,
            'margin-top': Math.max(this.element.outerWidth(), this.element.outerHeight()) * -1,
            'opacity': 0.2
          }, this.config.duration, function () {
            _this3.decoratorElement.triggerStart('transitionend');
          });
        }
      }

      /**
       * Get the new size based on the element height/width and the ripple width
       */
    }, {
      key: '_getNewSize',
      value: function _getNewSize() {
        return Math.max(this.element.outerWidth(), this.element.outerHeight()) / this.decoratorElement.outerWidth() * 2.5;
      }

      // ------------------------------------------------------------------------
      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        var _this4 = this;

        return this.each(function () {
          var element = $(_this4);
          var data = element.data(DATA_KEY);

          if (!data) {
            data = new Ripples(_this4, config);
            element.data(DATA_KEY, data);
          }
        });
      }
    }]);

    return Ripples;
  })();

  $.fn[NAME] = Ripples._jQueryInterface;
  $.fn[NAME].Constructor = Ripples;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Ripples._jQueryInterface;
  };

  return Ripples;
})(jQuery);

//import Util from './util'

var Autofill = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'autofill';
  var DATA_KEY = 'mdb.' + NAME;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {};

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Autofill = (function () {
    function Autofill(element, config) {
      _classCallCheck(this, Autofill);

      this.element = element;
      this.config = $.extend({}, Default, config);

      this._watchLoading();
      this._attachEventHandlers();
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(Autofill, [{
      key: 'dispose',
      value: function dispose() {
        $.removeData(this.element, DATA_KEY);
        this.element = null;
        this.config = null;
      }

      // ------------------------------------------------------------------------
      // private

    }, {
      key: '_watchLoading',
      value: function _watchLoading() {
        var _this5 = this;

        // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
        setTimeout(function () {
          clearInterval(_this5._onLoading);
        }, 10000);
      }

      // This part of code will detect autofill when the page is loading (username and password inputs for example)
    }, {
      key: '_onLoading',
      value: function _onLoading() {
        setInterval(function () {
          $('input[type!=checkbox]').each(function (index, element) {
            var $element = $(element);
            if ($element.val() && $element.val() !== $element.attr('value')) {
              $element.triggerStart('change');
            }
          });
        }, 100);
      }
    }, {
      key: '_attachEventHandlers',
      value: function _attachEventHandlers() {
        // Listen on inputs of the focused form
        //  (because user can select from the autofill dropdown only when the input has focus)
        var focused = null;
        $(document).on('focus', 'input', function (event) {
          var $inputs = $(event.currentTarget).closest('form').find('input').not('[type=file]');
          focused = setInterval(function () {
            $inputs.each(function (index, element) {
              var $element = $(element);
              if ($element.val() !== $element.attr('value')) {
                $element.triggerStart('change');
              }
            });
          }, 100);
        }).on('blur', '.form-group input', function () {
          clearInterval(focused);
        });
      }

      // ------------------------------------------------------------------------
      // static
    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        var _this6 = this;

        return this.each(function () {
          var $element = $(_this6);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Autofill(_this6, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);

    return Autofill;
  })();

  $.fn[NAME] = Autofill._jQueryInterface;
  $.fn[NAME].Constructor = Autofill;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Autofill._jQueryInterface;
  };

  return Autofill;
})(jQuery);

var Input = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'input';
  var DATA_KEY = 'mdb.' + NAME;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    convertInputSizeVariations: true,
    template: '<span class=\'material-input\'></span>',
    formGroup: {
      template: '<div class=\'form-group\'></div>'
    }
  };

  var InputSizeConversions = {
    'input-lg': 'form-group-lg',
    'input-sm': 'form-group-sm'
  };

  var ClassName = {
    IS_EMPTY: 'is-empty',
    FORM_GROUP: 'form-group',
    HAS_ERROR: 'has-error'
  };

  var Selector = {
    FORM_GROUP: '.' + ClassName.FORM_GROUP //,
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Input = (function () {
    function Input(element, config) {
      _classCallCheck(this, Input);

      this.element = element;
      this.config = $.extend({}, Default, config);

      // Requires form-group standard markup (will add it if necessary)
      this.formGroup = this._findOrCreateFormGroup();

      this._convertInputSizeVariations();

      // Initially mark as empty
      if (this._isEmpty()) {
        this.formGroup.addClass(ClassName.IS_EMPTY);
      }

      // Add marker div the end of the form-group
      this.formGroup.append(this.config.template);

      this._bindEventListeners();
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(Input, [{
      key: 'dispose',
      value: function dispose() {
        $.removeData(this.element, DATA_KEY);
        this.element = null;
        this.formGroup = null;
        this.config = null;
      }

      // ------------------------------------------------------------------------
      // private

    }, {
      key: '_bindEventListeners',
      value: function _bindEventListeners() {
        var _this7 = this;

        this.element.on('keydown paste', function (event) {
          if (Util.isChar(event)) {
            _this7._removeIsEmpty();
          }
        }).on('keyup change', function (event) {
          var isValid = typeof _this7.element[0].checkValidity === 'undefined' || _this7.element[0].checkValidity();

          if (_this7.element.val() === '' && isValid) {
            _this7._addIsEmpty();
          } else {
            _this7._removeIsEmpty();
          }

          // Validation events do not bubble, so they must be attached directly to the input: http://jsfiddle.net/PEpRM/1/
          //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
          //  the form-group on change.
          //
          // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
          //        BUT, I've left it here for backwards compatibility.
          if (isValid) {
            _this7._removeHasError();
          } else {
            _this7._addHasError();
          }
        }).on('focus', function () {
          Util.addFormGroupFocus(_this7.formGroup);
        }).on('blur', function () {
          Util.removeFormGroupFocus(_this7.formGroup);
        })
        // make sure empty is added back when there is a programmatic value change.
        //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
        .on('change', function () {
          if (_this7.element.attr('type') === 'file') {
            return;
          }

          var value = _this7.element.val();
          if (value) {
            _this7._removeIsEmpty();
          } else {
            _this7._addIsEmpty();
          }
        });
      }
    }, {
      key: '_addHasError',
      value: function _addHasError() {
        this.formGroup.addClass(ClassName.HAS_ERROR);
      }
    }, {
      key: '_removeHasError',
      value: function _removeHasError() {
        this.formGroup.removeClass(ClassName.HAS_ERROR);
      }
    }, {
      key: '_addIsEmpty',
      value: function _addIsEmpty() {
        this.formGroup.addClass(ClassName.IS_EMPTY);
      }
    }, {
      key: '_removeIsEmpty',
      value: function _removeIsEmpty() {
        this.formGroup.removeClass(ClassName.IS_EMPTY);
      }
    }, {
      key: '_isEmpty',
      value: function _isEmpty() {
        return this.element.val() === null || this.element.val() === undefined || this.element.val() === '';
      }
    }, {
      key: '_convertInputSizeVariations',
      value: function _convertInputSizeVariations() {
        if (!this.config.convertInputSizeVariations) {
          return;
        }

        // Modification - Change input-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
        for (var inputSize in InputSizeConversions) {
          if (this.element.hasClass(inputSize)) {
            this.element.removeClass(inputSize);
            this.formGroup.addClass(InputSizeConversions[inputSize]);
          }
        }
      }
    }, {
      key: '_findOrCreateFormGroup',
      value: function _findOrCreateFormGroup() {
        var fg = this.element.closest(Selector.FORM_GROUP); // note that form-group may be grandparent in the case of an input-group
        if (fg.length === 0) {
          this.element.wrap(this.config.formGroup.template);
          fg = this.element.closest(Selector.FORM_GROUP); // find node after attached (otherwise additional attachments don't work)
        }
        return fg;
      }

      // ------------------------------------------------------------------------
      // static
    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Input(this, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);

    return Input;
  })();

  $.fn[NAME] = Input._jQueryInterface;
  $.fn[NAME].Constructor = Input;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Input._jQueryInterface;
  };

  return Input;
})(jQuery);

// Checkbox decorator, to be called after Input
var Checkbox = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'checkbox';
  var DATA_KEY = 'mdb.' + NAME;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    template: '<span class=\'checkbox-material\'><span class=\'check\'></span></span>'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Checkbox = (function () {
    function Checkbox(element, config) {
      _classCallCheck(this, Checkbox);

      this.element = element;
      this.config = $.extend({}, Default, config);

      this.element.after(this.config.template);
      this.formGroup = Util.findFormGroup(this.element);

      this._bindEventListeners();
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(Checkbox, [{
      key: 'dispose',
      value: function dispose() {
        $.removeData(this.element, DATA_KEY);
        this.element = null;
        this.formGroup = null;
        this.config = null;
      }

      // ------------------------------------------------------------------------
      // private
    }, {
      key: '_bindEventListeners',
      value: function _bindEventListeners() {
        var _this8 = this;

        // checkboxes didn't appear to bubble to the document, so we'll bind these directly
        this.formGroup.find('.checkbox label').hover(function () {
          Util.addFormGroupFocus(_this8.formGroup);
        }, function () {
          Util.removeFormGroupFocus(_this8.formGroup);
        });

        this.element.change(function () {
          _this8.element.blur();
        });
      }

      // ------------------------------------------------------------------------
      // static
    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Checkbox(this, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);

    return Checkbox;
  })();

  $.fn[NAME] = Checkbox._jQueryInterface;
  $.fn[NAME].Constructor = Checkbox;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Checkbox._jQueryInterface;
  };

  return Checkbox;
})(jQuery);

//import Util from './util'

// Togglebutton decorator, to be called after Input
var Togglebutton = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'togglebutton';
  var DATA_KEY = 'mdb.' + NAME;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    template: '<span class=\'toggle\'></span>'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Togglebutton = (function () {
    function Togglebutton(element, config) {
      _classCallCheck(this, Togglebutton);

      this.element = element;
      this.config = $.extend({}, Default, config);

      this.element.after(this.config.template);
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(Togglebutton, [{
      key: 'dispose',
      value: function dispose() {
        $.removeData(this.element, DATA_KEY);
        this.element = null;
        this.config = null;
      }

      // ------------------------------------------------------------------------
      // private

      // ------------------------------------------------------------------------
      // static
    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Togglebutton(this, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);

    return Togglebutton;
  })();

  $.fn[NAME] = Togglebutton._jQueryInterface;
  $.fn[NAME].Constructor = Togglebutton;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Togglebutton._jQueryInterface;
  };

  return Togglebutton;
})(jQuery);

//import Util from './util'

// Radio decorator, to be called after Input
var Radio = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'radio';
  var DATA_KEY = 'mdb.' + NAME;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    template: '<span class=\'circle\'></span><span class=\'check\'></span>'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Radio = (function () {
    function Radio(element, config) {
      _classCallCheck(this, Radio);

      this.element = element;
      this.config = $.extend({}, Default, config);

      this.element.after(this.config.template);
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(Radio, [{
      key: 'dispose',
      value: function dispose() {
        $.removeData(this.element, DATA_KEY);
        this.element = null;
        this.config = null;
      }

      // ------------------------------------------------------------------------
      // private

      // ------------------------------------------------------------------------
      // static
    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Radio(this, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);

    return Radio;
  })();

  $.fn[NAME] = Radio._jQueryInterface;
  $.fn[NAME].Constructor = Radio;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Radio._jQueryInterface;
  };

  return Radio;
})(jQuery);

// FileInput decorator, to be called after Input
var FileInput = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'fileInput';
  var DATA_KEY = 'mdb.' + NAME;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {};

  var ClassName = {
    IS_FILEINPUT: 'is-fileinput',
    IS_EMPTY: 'is-empty'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var FileInput = (function () {
    function FileInput(element, config) {
      _classCallCheck(this, FileInput);

      this.element = element;
      this.config = $.extend({}, Default, config);
      this.formGroup = Util.findFormGroup(this.element);

      this.formGroup.addClass(ClassName.IS_FILEINPUT);

      this._bindEventListeners();
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(FileInput, [{
      key: 'dispose',
      value: function dispose() {
        $.removeData(this.element, DATA_KEY);
        this.element = null;
        this.formGroup = null;
        this.config = null;
      }

      // ------------------------------------------------------------------------
      // private
    }, {
      key: '_bindEventListeners',
      value: function _bindEventListeners() {
        var _this9 = this;

        this.formGroup.on('focus', function () {
          Util.addFormGroupFocus(_this9.formGroup);
        }).on('blur', function () {
          Util.removeFormGroupFocus(_this9.formGroup);
        });

        // set the fileinput readonly field with the name of the file
        this.element.on('change', function () {
          var value = '';
          $.each(_this9.element.files, function (i, file) {
            value += file.name + '  , ';
          });
          value = value.substring(0, value.length - 2);
          if (value) {
            _this9._removeIsEmpty();
          } else {
            _this9._addIsEmpty();
          }
          _this9.formGroup.find('input.form-control[readonly]').val(value);
        });
      }
    }, {
      key: '_addIsEmpty',
      value: function _addIsEmpty() {
        this.formGroup.addClass(ClassName.IS_EMPTY);
      }
    }, {
      key: '_removeIsEmpty',
      value: function _removeIsEmpty() {
        this.formGroup.removeClass(ClassName.IS_EMPTY);
      }

      // ------------------------------------------------------------------------
      // static
    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new FileInput(this, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);

    return FileInput;
  })();

  $.fn[NAME] = FileInput._jQueryInterface;
  $.fn[NAME].Constructor = FileInput;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return FileInput._jQueryInterface;
  };

  return FileInput;
})(jQuery);

//import Util from './util'

/**
 * $.bootstrapMaterialDesign(config) is a macro class to configure the components generally
 *  used in Material Design for Bootstrap.  You may pass overrides to the configurations
 *  which will be passed into each component, or you may omit use of this class and
 *  configure each component separately.
 *
 *  NOTE: If omitting use of this class, please note that the Input component must be
 *        initialized prior to other decorating components such as radio, checkbox,
 *        togglebutton, fileInput.
 *
 */
var BootstrapMaterialDesign = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'bootstrapMaterialDesign';
  var DATA_KEY = 'mdb.' + NAME;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  /**
   *
   * Default macro configuration for each component (primarily selectors).
   *  - selector: may be a string or an array.  Any array will be joined with a comma to generate the selector
   *  - disable any component by defining it as false with an override. e.g. $.bootstrapMaterialDesign({ autofill: false })
   *
   *  @see each individual component for more configuration settings.
   */
  var Default = {
    ripples: {
      selector: ['.btn:not(.btn-link):not(.ripple-none)', '.card-image:not(.ripple-none)', '.navbar a:not(.ripple-none)', '.dropdown-menu a:not(.ripple-none)', '.nav-tabs a:not(.ripple-none)', '.pagination li:not(.active):not(.disabled) a:not(.ripple-none)', '.ripple' // generic marker class to add ripple to elements
      ]
    },
    input: {
      selector: ['input.form-control', 'textarea.form-control', 'select.form-control']
    },
    checkbox: {
      selector: '.checkbox > label > input[type=checkbox]'
    },
    togglebutton: {
      selector: '.togglebutton > label > input[type=checkbox]'
    },
    radio: {
      selector: '.radio > label > input[type=radio]'
    },
    fileInput: {
      selector: 'input[type=file]'
    },
    autofill: {
      selector: 'body'
    },
    arrive: true,
    // create an ordered component list for instantiation
    instantiation: ['ripples', 'input', 'checkbox', 'togglebutton', 'radio', 'fileInput', 'autofill']
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var BootstrapMaterialDesign = (function () {
    function BootstrapMaterialDesign(element, config) {
      var _this10 = this;

      _classCallCheck(this, BootstrapMaterialDesign);

      this.element = element;
      this.config = $.extend({}, Default, config);
      var $document = $(document);

      var _loop = function (component) {

        // the component's config fragment is passed in directly, allowing users to override
        var componentConfig = _this10.config[component];

        // check to make sure component config is enabled (not `false`)
        if (componentConfig) {

          // assemble the selector as it may be an array
          var selector = _this10._resolveSelector(componentConfig);

          // instantiate component on selector elements with config
          $(selector)[component](componentConfig);

          // add to arrive if present and enabled
          if (document.arrive && _this10.config.arrive) {
            $document.arrive(selector, function (element) {
              // eslint-disable-line no-loop-func
              $(element)[component](componentConfig);
            });
          }
        }
      };

      for (var component in this.config.instantiation) {
        _loop(component);
      }
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(BootstrapMaterialDesign, [{
      key: 'dispose',
      value: function dispose() {
        $.removeData(this.element, DATA_KEY);
        this.element = null;
        this.config = null;
      }

      // ------------------------------------------------------------------------
      // private

    }, {
      key: '_resolveSelector',
      value: function _resolveSelector(componentConfig) {
        var selector = componentConfig['selector'];
        if (Array.isArray(selector)) {
          selector = selector.join(', ');
        }

        return selector;
      }

      // ------------------------------------------------------------------------
      // static
    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new BootstrapMaterialDesign(this, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);

    return BootstrapMaterialDesign;
  })();

  $.fn[NAME] = BootstrapMaterialDesign._jQueryInterface;
  $.fn[NAME].Constructor = BootstrapMaterialDesign;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return BootstrapMaterialDesign._jQueryInterface;
  };

  return BootstrapMaterialDesign;
})(jQuery);

}(jQuery);
