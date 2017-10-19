/* globals Popper */
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false

/**
 * $.bootstrapMaterialDesign(config) is a macro class to configure the components generally
 *  used in Material Design for Bootstrap.  You may pass overrides to the configurations
 *  which will be passed into each component, or you may omit use of this class and
 *  configure each component separately.
 */
const BootstrapMaterialDesign = ($ => {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = "bootstrapMaterialDesign";
  const DATA_KEY = `bmd.${NAME}`;
  const JQUERY_NAME = NAME; // retain this full name since it is long enough not to conflict
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  /**
   * Global configuration:
   *  The global configuration hash will be mixed in to each components' config.
   *    e.g. calling $.bootstrapMaterialDesign({global: { validate: true } }) would pass `validate:true` to every component
   *
   *
   * Component configuration:
   *  - selector: may be a string or an array.  Any array will be joined with a comma to generate the selector
   *  - disable any component by defining it as false with an override. e.g. $.bootstrapMaterialDesign({ autofill: false })
   *
   *  @see each individual component for more configuration settings.
   */
  const Default = {
    global: {
      validate: false,
      label: {
        className: "bmd-label-static" // default style of label to be used if not specified in the html markup
      }
    },
    autofill: {
      selector: "body"
    },
    checkbox: {
      selector: ".checkbox > label > input[type=checkbox]"
    },
    checkboxInline: {
      selector: "label.checkbox-inline > input[type=checkbox]"
    },
    collapseInline: {
      selector: '.bmd-collapse-inline [data-toggle="collapse"]'
    },
    drawer: {
      selector: ".bmd-layout-drawer"
    },
    file: {
      selector: "input[type=file]"
    },
    radio: {
      selector: ".radio > label > input[type=radio]"
    },
    radioInline: {
      selector: "label.radio-inline > input[type=radio]"
    },
    ripples: {
      //selector: ['.btn:not(.btn-link):not(.ripple-none)'] // testing only
      selector: [
        ".btn:not(.btn-link):not(.ripple-none)",
        ".card-image:not(.ripple-none)",
        ".navbar a:not(.ripple-none)",
        ".dropdown-menu a:not(.ripple-none)",
        ".nav-tabs a:not(.ripple-none)",
        ".pagination li:not(.active):not(.disabled) a:not(.ripple-none)",
        ".ripple" // generic marker class to add ripple to elements
      ]
    },
    select: {
      selector: ["select"]
    },
    switch: {
      selector: ".switch > label > input[type=checkbox]"
    },
    text: {
      // omit inputs we have specialized components to handle - we need to match text, email, etc.  The easiest way to do this appears to be just omit the ones we don't want to match and let the rest fall through to this.
      selector: [
        `input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=button]):not([type=submit]):not([type=reset])`
      ]
    },
    textarea: {
      selector: ["textarea"]
    },
    arrive: true,
    // create an ordered component list for instantiation
    instantiation: [
      "ripples",
      "checkbox",
      "checkboxInline",
      "collapseInline",
      "drawer",
      //'file',
      "radio",
      "radioInline",
      "switch",
      "text",
      "textarea",
      "select",
      "autofill"
    ]
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BootstrapMaterialDesign {
    constructor($element, config) {
      this.$element = $element;
      this.config = $.extend(true, {}, Default, config);
      let $document = $(document);

      for (let component of this.config.instantiation) {
        // the component's config fragment is passed in directly, allowing users to override
        let componentConfig = this.config[component];

        // check to make sure component config is enabled (not `false`)
        if (componentConfig) {
          // assemble the selector as it may be an array
          let selector = this._resolveSelector(componentConfig);

          // mix in global options
          componentConfig = $.extend(
            true,
            {},
            this.config.global,
            componentConfig
          );

          // create the jquery fn name e.g. 'bmdText' for 'text'
          let componentName = `${component.charAt(0).toUpperCase() +
            component.slice(1)}`;
          let jqueryFn = `bmd${componentName}`;

          try {
            // safely instantiate component on selector elements with config, report errors and move on.
            // console.debug(`instantiating: $('${selector}')[${jqueryFn}](${componentConfig})`) // eslint-disable-line no-console
            $(selector)[jqueryFn](componentConfig);

            // add to arrive if present and enabled
            if (document.arrive && this.config.arrive) {
              $document.arrive(selector, function() {
                // eslint-disable-line no-loop-func
                $(this)[jqueryFn](componentConfig);
              });
            }
          } catch (e) {
            let message = `Failed to instantiate component: $('${selector}')[${jqueryFn}](${componentConfig})`;
            console.error(message, e, `\nSelected elements: `, $(selector)); // eslint-disable-line no-console
            throw e;
          }
        }
      }
    }

    dispose() {
      this.$element.data(DATA_KEY, null);
      this.$element = null;
      this.config = null;
    }

    // ------------------------------------------------------------------------
    // private

    _resolveSelector(componentConfig) {
      let selector = componentConfig.selector;
      if (Array.isArray(selector)) {
        selector = selector.join(", ");
      }

      return selector;
    }

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function() {
        let $element = $(this);
        let data = $element.data(DATA_KEY);

        if (!data) {
          data = new BootstrapMaterialDesign($element, config);
          $element.data(DATA_KEY, data);
        }
      });
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = BootstrapMaterialDesign._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = BootstrapMaterialDesign;
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return BootstrapMaterialDesign._jQueryInterface;
  };

  return BootstrapMaterialDesign;
})(jQuery);

export default BootstrapMaterialDesign;
