import Checkbox from "./checkbox";

const CheckboxInline = ($ => {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = "checkboxInline";
  const DATA_KEY = `bmd.${NAME}`;
  const JQUERY_NAME = `bmd${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`;
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  const Default = {
    bmdFormGroup: {
      create: false, // no bmd-form-group creation if form-group not present. It messes with the layout.
      required: false
    }
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class CheckboxInline extends Checkbox {
    constructor(
      $element,
      config,
      properties = { inputType: "checkbox", outerClass: "checkbox-inline" }
    ) {
      super($element, $.extend(true, {}, Default, config), properties);
    }

    dispose() {
      super.dispose(DATA_KEY);
    }

    //static matches($element) {
    //  // '.checkbox-inline > input[type=checkbox]'
    //  if ($element.attr('type') === 'checkbox') {
    //    return true
    //  }
    //  return false
    //}
    //
    //static rejectMatch(component, $element) {
    //  Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for type='checkbox'.`)
    //}

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function() {
        let $element = $(this);
        let data = $element.data(DATA_KEY);

        if (!data) {
          data = new CheckboxInline($element, config);
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
  $.fn[JQUERY_NAME] = CheckboxInline._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = CheckboxInline;
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return CheckboxInline._jQueryInterface;
  };

  return CheckboxInline;
})(jQuery);

export default CheckboxInline;
