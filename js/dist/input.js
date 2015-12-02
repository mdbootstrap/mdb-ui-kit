'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
        var _this = this;

        this.element.on('keydown paste', function (event) {
          if (Util.isChar(event)) {
            _this._removeIsEmpty();
          }
        }).on('keyup change', function (event) {
          var isValid = typeof _this.element[0].checkValidity === 'undefined' || _this.element[0].checkValidity();

          if (_this.element.val() === '' && isValid) {
            _this._addIsEmpty();
          } else {
            _this._removeIsEmpty();
          }

          // Validation events do not bubble, so they must be attached directly to the input: http://jsfiddle.net/PEpRM/1/
          //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
          //  the form-group on change.
          //
          // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
          //        BUT, I've left it here for backwards compatibility.
          if (isValid) {
            _this._removeHasError();
          } else {
            _this._addHasError();
          }
        }).on('focus', function () {
          Util.addFormGroupFocus(_this.formGroup);
        }).on('blur', function () {
          Util.removeFormGroupFocus(_this.formGroup);
        })
        // make sure empty is added back when there is a programmatic value change.
        //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
        .on('change', function () {
          if (_this.element.attr('type') === 'file') {
            return;
          }

          var value = _this.element.val();
          if (value) {
            _this._removeIsEmpty();
          } else {
            _this._addIsEmpty();
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
//# sourceMappingURL=input.js.map
