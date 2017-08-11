import BaseSelection from "./baseSelection";
//import Text from './text'
//import File from './file'
//import Checkbox from './checkbox'
//import Switch from './switch'
import Util from "./util";

const Radio = ($ => {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = "radio";
  const DATA_KEY = `bmd.${NAME}`;
  const JQUERY_NAME = `bmd${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`;
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  const Default = {
    template: `<span class='bmd-radio'></span>`
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Radio extends BaseSelection {
    constructor(
      $element,
      config,
      properties = { inputType: NAME, outerClass: NAME }
    ) {
      super(
        $element,
        $.extend(
          true,
          //{invalidComponentMatches: [Checkbox, File, Switch, Text]},
          Default,
          config
        ),
        properties
      );
    }

    dispose(dataKey = DATA_KEY) {
      super.dispose(dataKey);
    }

    static matches($element) {
      // '.radio > label > input[type=radio]'
      if ($element.attr("type") === "radio") {
        return true;
      }
      return false;
    }

    static rejectMatch(component, $element) {
      Util.assert(
        this.$element,
        this.matches($element),
        `${component} component element ${Util.describe(
          $element
        )} is invalid for type='radio'.`
      );
    }

    // ------------------------------------------------------------------------
    // protected

    //decorateMarkup() {
    //  this.$element.after(this.config.template)
    //}

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function() {
        let $element = $(this);
        let data = $element.data(DATA_KEY);

        if (!data) {
          data = new Radio($element, config);
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
  $.fn[JQUERY_NAME] = Radio._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Radio;
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Radio._jQueryInterface;
  };

  return Radio;
})(jQuery);

export default Radio;
