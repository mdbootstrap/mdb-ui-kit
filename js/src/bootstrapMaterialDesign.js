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
const BootstrapMaterialDesign = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'bootstrapMaterialDesign'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  /**
   *
   * Default macro configuration for each component (primarily selectors).
   *  - selector: may be a string or an array.  Any array will be joined with a comma to generate the selector
   *  - disable any component by defining it as false with an override. e.g. $.bootstrapMaterialDesign({ autofill: false })
   *
   *  @see each individual component for more configuration settings.
   */
  const Default = {
    ripples: {
      selector: [
        '.btn:not(.btn-link):not(.ripple-none)',
        '.card-image:not(.ripple-none)',
        '.navbar a:not(.ripple-none)',
        '.dropdown-menu a:not(.ripple-none)',
        '.nav-tabs a:not(.ripple-none)',
        '.pagination li:not(.active):not(.disabled) a:not(.ripple-none)',
        '.ripple' // generic marker class to add ripple to elements
      ]
    },
    input: {
      selector: [
        'input.form-control',
        'textarea.form-control',
        'select.form-control'
      ]
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
    instantiation: [
      'ripples',
      'input',
      'checkbox',
      'togglebutton',
      'radio',
      'fileInput',
      'autofill'
    ]
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BootstrapMaterialDesign {

    constructor(element, config) {
      this.element = element
      this.config = $.extend({}, Default, config)
      let $document = $(document)

      for (let component in this.config.instantiation) {

        // the component's config fragment is passed in directly, allowing users to override
        let componentConfig = this.config[component]

        // check to make sure component config is enabled (not `false`)
        if (componentConfig) {

          // assemble the selector as it may be an array
          let selector = this._resolveSelector(componentConfig)

          // instantiate component on selector elements with config
          $(selector)[component](componentConfig)

          // add to arrive if present and enabled
          if (document.arrive && this.config.arrive) {
            $document.arrive(selector, (element) => {  // eslint-disable-line no-loop-func
              $(element)[component](componentConfig)
            })
          }
        }
      }
    }

    dispose() {
      $.removeData(this.element, DATA_KEY)
      this.element = null
      this.config = null
    }

    // ------------------------------------------------------------------------
    // private

    _resolveSelector(componentConfig) {
      let selector = componentConfig['selector']
      if (Array.isArray(selector)) {
        selector = selector.join(', ')
      }

      return selector
    }

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new BootstrapMaterialDesign(this, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[NAME] = BootstrapMaterialDesign._jQueryInterface
  $.fn[NAME].Constructor = BootstrapMaterialDesign
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return BootstrapMaterialDesign._jQueryInterface
  }

  return BootstrapMaterialDesign

})(jQuery)

export default BootstrapMaterialDesign
