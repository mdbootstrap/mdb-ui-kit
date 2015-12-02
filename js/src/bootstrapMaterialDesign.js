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
   * Default configuration for each component.
   *  - selector: may be a string or an array.  Any array will be joined with a comma to generate the selector
   *  - filter: selector to individually filter elements sent to components e.g. ripple defaults `:not(.ripple-none)`
   *  - disable any component by defining it as false with an override. e.g. $.bootstrapMaterialDesign({ input: false })
   */
  const Default = {
    ripples: {
      selector: [
        '.btn:not(.btn-link)',
        '.card-image',
        '.navbar a',
        '.dropdown-menu a',
        '.nav-tabs a',
        '.pagination li:not(.active):not(.disabled) a',
        '.ripple' // generic marker class to add ripple to elements
      ],
      filter: ':not(.ripple-none)'
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
    autofill: true,
    arrive: true
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

      // create an ordered component list for instantiation
    }

    dispose() {
      $.removeData(this.element, DATA_KEY)
      this.element = null
      this.config = null
    }

    // ------------------------------------------------------------------------
    // private

    _bar(element) {
      let x = 1
      return x
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
