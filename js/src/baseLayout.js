import Base from './base'
import Util from './util'

const BaseLayout = (($) => {

  const ClassName = {
    CONTAINER: 'mdb-layout-container',
    BACKDROP: `mdb-layout-backdrop`
  }

  const Selector = {
    CONTAINER: `.${ClassName.CONTAINER}`,
    BACKDROP: `.${ClassName.BACKDROP}`
  }

  const Default = {
    backdrop: {
      create: true,
      required: true,
      template: `<div class="${ClassName.BACKDROP}"></div>`
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseLayout extends Base {

    constructor($element, config, properties = {}) {
      super($element, $.extend(true, {}, Default, config), properties)

      this.$container = this.findContainer(true)
      this.$backdrop = this.resolveBackdrop()
    }

    dispose(dataKey) {
      super.dispose(dataKey)
      this.$container = null
      this.$backdrop = null
    }

    // ------------------------------------------------------------------------
    // protected

    // Will add mdb-layout-backdrop to mdb-layout-container if necessary
    resolveBackdrop() {
      let bd = this.findBackdrop(false)
      if (bd === undefined || bd.length === 0) {
        if (this.config.backdrop.create) {
          this.$container.append(this.config.backdrop.template)
        }

        bd = this.findBackdrop(this.config.backdrop.required)
      }

      return bd
    }

    // Find closest mdb-layout-container based on the given context
    findBackdrop(raiseError = true, context = this.$container) {
      let backdrop = context.find(`> ${Selector.BACKDROP}`)
      if (backdrop.length === 0 && raiseError) {
        $.error(`Failed to find ${Selector.BACKDROP} for ${Util.describe(context)}`)
      }
      return backdrop
    }

    // Find closest mdb-layout-container based on the given context
    findContainer(raiseError = true, context = this.$element) {
      let container = context.closest(Selector.CONTAINER)
      if (container.length === 0 && raiseError) {
        $.error(`Failed to find ${Selector.CONTAINER} for ${Util.describe(context)}`)
      }
      return container
    }

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static

  }

  return BaseLayout

})(jQuery)

export default BaseLayout
