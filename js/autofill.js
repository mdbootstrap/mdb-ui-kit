import Base from "./base";

const Autofill = ($ => {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = "autofill";
  const DATA_KEY = `bmd.${NAME}`;
  const JQUERY_NAME = `bmd${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`;
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];
  const LAST_VALUE_DATA_KEY = "bmd.last_value";

  const Default = {};

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Autofill extends Base {
    constructor($element, config) {
      super($element, $.extend(true, {}, Default, config));

      this._watchLoading();
      this._attachEventHandlers();
    }

    dispose() {
      super.dispose(DATA_KEY);
    }

    // ------------------------------------------------------------------------
    // private

    _watchLoading() {
      // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
      setTimeout(() => {
        clearInterval(this._onLoading);
      }, 10000);
    }

    // This part of code will detect autofill when the page is loading (username and password inputs for example)
    _onLoading() {
      setInterval(() => {
        $("input[type!=checkbox]").each((index, element) => {
          let $element = $(element);

          let previousValue = $element.data(LAST_VALUE_DATA_KEY);
          if (previousValue === undefined) {
            previousValue = $element.attr("value");
          }
          if (previousValue === undefined) {
            previousValue = "";
          }

          let currentValue = $element.val();
          if (currentValue !== previousValue) {
            $element.trigger("change");
          }

          $element.data(LAST_VALUE_DATA_KEY, currentValue);
        });
      }, 100);
    }

    _attachEventHandlers() {
      // Listen on inputs of the focused form
      //  (because user can select from the autofill dropdown only when the input has focus)
      let focused = null;
      $(document)
        .on("focus", "input", event => {
          let $inputs = $(event.currentTarget)
            .closest("form")
            .find("input")
            .not("[type=file], [type=date]");
          focused = setInterval(() => {
            $inputs.each((index, element) => {
              let $element = $(element);

              let previousValue = $element.data(LAST_VALUE_DATA_KEY);
              if (previousValue === undefined) {
                previousValue = $element.attr("value");
              }
              if (previousValue === undefined) {
                previousValue = "";
              }

              let currentValue = $element.val();
              if (currentValue !== previousValue) {
                $element.trigger("change");
              }

              $element.data(LAST_VALUE_DATA_KEY, currentValue);
            });
          }, 100);
        })
        .on("blur", ".form-group input", () => {
          clearInterval(focused);
        });
    }

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function() {
        let $element = $(this);
        let data = $element.data(DATA_KEY);

        if (!data) {
          data = new Autofill($element, config);
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
  $.fn[JQUERY_NAME] = Autofill._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Autofill;
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Autofill._jQueryInterface;
  };

  return Autofill;
})(jQuery);

export default Autofill;
