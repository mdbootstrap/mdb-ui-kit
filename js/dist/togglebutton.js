//import Util from './util'

// Togglebutton decorator, to be called after Input
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
//# sourceMappingURL=togglebutton.js.map
