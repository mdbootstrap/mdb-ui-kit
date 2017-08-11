import BaseInput from "./baseInput";
//import Checkbox from './checkbox'
//import Radio from './radio'
//import Switch from './switch'
//import Text from './text'
//import Textarea from './textarea'
//import Select from './select'
import Util from "./util";

const File = ($ => {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = "file";
  const DATA_KEY = `bmd.${NAME}`;
  const JQUERY_NAME = `bmd${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`;
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  const Default = {};

  const ClassName = {
    FILE: NAME,
    IS_FILE: "is-file"
  };

  const Selector = {
    FILENAMES: "input.form-control[readonly]"
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class File extends BaseInput {
    constructor($element, config) {
      super(
        $element,
        $.extend(
          true,
          //{invalidComponentMatches: [Checkbox, Radio, Text, Textarea, Select, Switch]},
          Default,
          config
        )
      );

      this.$bmdFormGroup.addClass(ClassName.IS_FILE);
    }

    dispose() {
      super.dispose(DATA_KEY);
    }

    static matches($element) {
      if ($element.attr("type") === "file") {
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
        )} is invalid for type='file'.`
      );
    }

    // ------------------------------------------------------------------------
    // protected

    // Demarcation element (e.g. first child of a form-group)
    outerElement() {
      // label.file > input[type=file]
      return this.$element.parent().closest(`.${ClassName.FILE}`);
    }

    rejectWithoutRequiredStructure() {
      // label.file > input[type=file]
      Util.assert(
        this.$element,
        !this.outerElement().prop("tagName") === "label",
        `${this.constructor.name}'s ${Util.describe(
          this.$element
        )} parent element ${Util.describe(
          this.outerElement()
        )} should be <label>.`
      );
      Util.assert(
        this.$element,
        !this.outerElement().hasClass(ClassName.FILE),
        `${this.constructor.name}'s ${Util.describe(
          this.$element
        )} parent element ${Util.describe(
          this.outerElement()
        )} should have class .${ClassName.FILE}.`
      );
    }

    addFocusListener() {
      this.$bmdFormGroup
        .on("focus", () => {
          this.addFormGroupFocus();
        })
        .on("blur", () => {
          this.removeFormGroupFocus();
        });
    }

    addChangeListener() {
      // set the fileinput readonly field with the name of the file
      this.$element.on("change", () => {
        let value = "";
        $.each(this.$element.files, (i, file) => {
          value += `${file.name}  , `;
        });
        value = value.substring(0, value.length - 2);
        if (value) {
          this.addIsFilled();
        } else {
          this.removeIsFilled();
        }
        this.$bmdFormGroup.find(Selector.FILENAMES).val(value);
      });
    }

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function() {
        let $element = $(this);
        let data = $element.data(DATA_KEY);

        if (!data) {
          data = new File($element, config);
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
  $.fn[JQUERY_NAME] = File._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = File;
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return File._jQueryInterface;
  };

  return File;
})(jQuery);

export default File;
