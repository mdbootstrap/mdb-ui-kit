(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './util'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Util);
    global.fileInput = mod.exports;
  }
})(this, function (exports, module, _util) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _Util = _interopRequireDefault(_util);

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
        this.formGroup = _Util['default'].findFormGroup(this.element);

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
          var _this = this;

          this.formGroup.on('focus', function () {
            _Util['default'].addFormGroupFocus(_this.formGroup);
          }).on('blur', function () {
            _Util['default'].removeFormGroupFocus(_this.formGroup);
          });

          // set the fileinput readonly field with the name of the file
          this.element.on('change', function () {
            var value = '';
            $.each(_this.element.files, function (i, file) {
              value += file.name + '  , ';
            });
            value = value.substring(0, value.length - 2);
            if (value) {
              _this._removeIsEmpty();
            } else {
              _this._addIsEmpty();
            }
            _this.formGroup.find('input.form-control[readonly]').val(value);
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

  module.exports = FileInput;
});
