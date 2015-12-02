//import Util from './util'

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
        var _this = this;

        // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
        setTimeout(function () {
          clearInterval(_this._onLoading);
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
        var _this2 = this;

        return this.each(function () {
          var $element = $(_this2);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Autofill(_this2, config);
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
//# sourceMappingURL=autofill.js.map
