import BaseLayout from './baseLayout'
import Util from './util'

const DrawerToggle = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'drawerToggle'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const ClassName = {
    //IN: 'in',
    DRAWER: 'mdb-layout-drawer',
    CONTAINER: 'mdb-layout-container'

    //COLLAPSING: 'collapsing',
    //COLLAPSED: 'collapsed',
    //WIDTH: 'width'
  }

  //const Selector = {
  //  CONTAINER: `.${ClassName.CONTAINER}`
  //}


  const Default = {}

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class DrawerToggle extends BaseLayout {

    // $element is expected to be the trigger
    //  i.e. <button class="btn mdb-btn-icon" for="search" data-toggle="drawer" data-target="#my-side-nav-drawer" aria-expanded="false" aria-controls="my-side-nav-drawer">
    constructor($element, config) {
      super($element, $.extend(true, {}, Default, config))

      let selector = $element.data('target')
      this.$drawer = $(selector)

      Util.assert($element, this.$drawer.length === 0, `Cannot find drawer target for ${Util.describe($element)}`)
      Util.assert(this.$drawer, !this.$drawer.hasClass(ClassName.DRAWER), `${Util.describe(this.$drawer)} is expected to have the '${ClassName.DRAWER}' class.  It is being targeted by ${Util.describe($element)}`)


      // find the drawer's container - remember, this button may be outside the container, we only need the target's container.
      this.$layoutContainer = this.findLayoutContainer(true, this.$drawer)

      // get a handle to the Layout object and interact with it? i.e. show/hide?
    }

    dispose() {
      super.dispose(DATA_KEY)
      this.$drawer = null
      this.$layoutContainer = null
    }



    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new DrawerToggle($element, config)
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
  $.fn[JQUERY_NAME] = DrawerToggle._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = DrawerToggle
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return DrawerToggle._jQueryInterface
  }

  return DrawerToggle

})(jQuery)

export default DrawerToggle
