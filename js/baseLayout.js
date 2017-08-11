import Base from "./base";
import Util from "./util";

const BaseLayout = ($ => {
  const ClassName = {
    CANVAS: "bmd-layout-canvas",
    CONTAINER: "bmd-layout-container",
    BACKDROP: `bmd-layout-backdrop`
  };

  const Selector = {
    CANVAS: `.${ClassName.CANVAS}`,
    CONTAINER: `.${ClassName.CONTAINER}`,
    BACKDROP: `.${ClassName.BACKDROP}`
  };

  const Default = {
    canvas: {
      create: true,
      required: true,
      template: `<div class="${ClassName.CANVAS}"></div>`
    },
    backdrop: {
      create: true,
      required: true,
      template: `<div class="${ClassName.BACKDROP}"></div>`
    }
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseLayout extends Base {
    constructor($element, config, properties = {}) {
      super($element, $.extend(true, {}, Default, config), properties);

      this.$container = this.findContainer(true);
      this.$backdrop = this.resolveBackdrop();
      this.resolveCanvas();
    }

    dispose(dataKey) {
      super.dispose(dataKey);
      this.$container = null;
      this.$backdrop = null;
    }

    // ------------------------------------------------------------------------
    // protected

    // Will wrap container in bmd-layout-canvas if necessary
    resolveCanvas() {
      let bd = this.findCanvas(false);
      if (bd === undefined || bd.length === 0) {
        if (this.config.canvas.create) {
          this.$container.wrap(this.config.canvas.template);
        }

        bd = this.findCanvas(this.config.canvas.required);
      }

      return bd;
    }

    // Find closest bmd-layout-container based on the given context
    findCanvas(raiseError = true, context = this.$container) {
      let canvas = context.closest(Selector.CANVAS);
      if (canvas.length === 0 && raiseError) {
        $.error(
          `Failed to find ${Selector.CANVAS} for ${Util.describe(context)}`
        );
      }
      return canvas;
    }

    // Will add bmd-layout-backdrop to bmd-layout-container if necessary
    resolveBackdrop() {
      let bd = this.findBackdrop(false);
      if (bd === undefined || bd.length === 0) {
        if (this.config.backdrop.create) {
          this.$container.append(this.config.backdrop.template);
        }

        bd = this.findBackdrop(this.config.backdrop.required);
      }

      return bd;
    }

    // Find closest bmd-layout-container based on the given context
    findBackdrop(raiseError = true, context = this.$container) {
      let backdrop = context.find(`> ${Selector.BACKDROP}`);
      if (backdrop.length === 0 && raiseError) {
        $.error(
          `Failed to find ${Selector.BACKDROP} for ${Util.describe(context)}`
        );
      }
      return backdrop;
    }

    // Find closest bmd-layout-container based on the given context
    findContainer(raiseError = true, context = this.$element) {
      let container = context.closest(Selector.CONTAINER);
      if (container.length === 0 && raiseError) {
        $.error(
          `Failed to find ${Selector.CONTAINER} for ${Util.describe(context)}`
        );
      }
      return container;
    }

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
  }

  return BaseLayout;
})(jQuery);

export default BaseLayout;
