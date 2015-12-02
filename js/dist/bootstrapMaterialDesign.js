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
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
      var _this = this;

      _classCallCheck(this, BootstrapMaterialDesign);

      this.element = element;
      this.config = $.extend({}, Default, config);
      var $document = $(document);

      var _loop = function (component) {

        // the component's config fragment is passed in directly, allowing users to override
        var componentConfig = _this.config[component];

        // check to make sure component config is enabled (not `false`)
        if (componentConfig) {

          // assemble the selector as it may be an array
          var selector = _this._resolveSelector(componentConfig);

          // instantiate component on selector elements with config
          $(selector)[component](componentConfig);

          // add to arrive if present and enabled
          if (document.arrive && _this.config.arrive) {
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
//# sourceMappingURL=bootstrapMaterialDesign.js.map
