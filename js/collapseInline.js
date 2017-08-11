import Base from "./base";
import Util from "./util";

const CollapseInline = ($ => {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = "collapseInline";
  const DATA_KEY = `bmd.${NAME}`;
  const JQUERY_NAME = `bmd${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`;
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  const Selector = {
    ANY_INPUT: "input, select, textarea"
  };

  const ClassName = {
    IN: "in",
    COLLAPSE: "collapse",
    COLLAPSING: "collapsing",
    COLLAPSED: "collapsed",
    WIDTH: "width"
  };
  const Default = {};

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class CollapseInline extends Base {
    // $element is expected to be the trigger
    //  i.e. <button class="btn bmd-btn-icon" for="search" data-toggle="collapse" data-target="#search-field" aria-expanded="false" aria-controls="search-field">
    constructor($element, config) {
      super($element, $.extend(true, {}, Default, config));
      this.$bmdFormGroup = this.findMdbFormGroup(true);

      let collapseSelector = $element.data("target");
      this.$collapse = $(collapseSelector);

      Util.assert(
        $element,
        this.$collapse.length === 0,
        `Cannot find collapse target for ${Util.describe($element)}`
      );
      Util.assert(
        this.$collapse,
        !this.$collapse.hasClass(ClassName.COLLAPSE),
        `${Util.describe(
          this.$collapse
        )} is expected to have the '${ClassName.COLLAPSE}' class.  It is being targeted by ${Util.describe(
          $element
        )}`
      );

      // find the first input for focusing
      let $inputs = this.$bmdFormGroup.find(Selector.ANY_INPUT);
      if ($inputs.length > 0) {
        this.$input = $inputs.first();
      }

      // automatically add the marker class to collapse width instead of height - nice convenience because it is easily forgotten
      if (!this.$collapse.hasClass(ClassName.WIDTH)) {
        this.$collapse.addClass(ClassName.WIDTH);
      }

      if (this.$input) {
        // add a listener to set focus
        this.$collapse.on("shown.bs.collapse", () => {
          this.$input.focus();
        });

        // add a listener to collapse field
        this.$input.blur(() => {
          this.$collapse.collapse("hide");
        });
      }
    }

    dispose() {
      super.dispose(DATA_KEY);
      this.$bmdFormGroup = null;
      this.$collapse = null;
      this.$input = null;
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
          data = new CollapseInline($element, config);
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
  $.fn[JQUERY_NAME] = CollapseInline._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = CollapseInline;
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return CollapseInline._jQueryInterface;
  };

  return CollapseInline;
})(jQuery);

export default CollapseInline;
