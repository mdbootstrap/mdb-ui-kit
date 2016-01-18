import Base from './base'
import Util from './util'

const BaseLayout = (($) => {

  const ClassName = {
    CONTAINER: 'mdb-form-group'
  }

  const Selector = {
    CONTAINER: `.${ClassName.CONTAINER}`
  }

  const Default = {}

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseLayout extends Base {

    constructor($element, config, properties = {}) {
      super($element, $.extend(true, {}, Default, config), properties)
    }

    dispose(dataKey) {
      super.dispose(dataKey)
    }

    // ------------------------------------------------------------------------
    // protected

    // Find closest mdb-layout-container based on the given context
    findLayoutContainer(raiseError = true, context = this.$element) {
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
