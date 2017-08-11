import BaseInput from "./baseInput";

const BaseFormControl = ($ => {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const Default = {
    requiredClasses: ["form-control"]
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseFormControl extends BaseInput {
    constructor($element, config) {
      super($element, $.extend(true, Default, config));

      // Initially mark as empty
      if (this.isEmpty()) {
        this.removeIsFilled();
      }
    }
  }

  return BaseFormControl;
})(jQuery);

export default BaseFormControl;
