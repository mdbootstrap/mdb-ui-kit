//import Util from './util'

// Radio decorator, to be called after Input
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
//# sourceMappingURL=radio.js.map
