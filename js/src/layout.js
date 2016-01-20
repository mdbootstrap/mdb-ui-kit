//import BaseLayout from './baseLayout'
//
//const Layout = (($) => {
//
//  /**
//   * ------------------------------------------------------------------------
//   * Constants
//   * ------------------------------------------------------------------------
//   */
//  const NAME = 'layout'
//  const DATA_KEY = `mdb.${NAME}`
//  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
//  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]
//
//  //const ClassName = {
//  //  CANVAS: 'mdb-layout-canvas',
//  //  HEADER: 'mdb-layout-header',
//  //  DRAWER: 'mdb-layout-drawer',
//  //  CONTENT: 'mdb-layout-content',
//  //  BACKDROP: 'mdb-layout-backdrop',
//  //}
//
//  //const Selector = {
//  //  DRAWER: `.${ClassName.DRAWER}`,
//  //  HEADER: `.${ClassName.HEADER}`,
//  //  CONTENT: `.${ClassName.CONTENT}`
//  //}
//
//  const Default = {}
//
//  /**
//   * ------------------------------------------------------------------------
//   * Class Definition
//   * ------------------------------------------------------------------------
//   */
//  class Layout extends BaseLayout {
//
//    constructor($element, config) {
//      super($element, $.extend(true, {}, Default, config))
//
//      // FIXME: I'm not sure we want to auto-resolve a canvas....think about it and refactor this or delete it.
//      // FIXME: with a goal of supporting two drawers, or even more, I'm not sure we want to auto-add the canvas because I think it's really only necessary if we have a fixed header...not sure.
//
//      // FIXME: if this part is not needed, it seems this component could be deleted because the drawer component does the rest.
//
//      //var canvas = document.createElement('div')
//      //canvas.addClass(ClassName.CANVAS)
//      //this.$element.parentElement.insertBefore(canvas, this.$element)
//      //this.$element.parentElement.removeChild(this.$element)
//      //canvas.appendChild(this.$element)
//
//      //this.$header = $element.find(`> ${Selector.HEADER}`)
//      //this.$drawer = $element.find(`> ${Selector.DRAWER}`)
//      //this.$content = $element.find(`> ${Selector.CONTENT}`)
//    }
//
//    dispose() {
//      super.dispose(DATA_KEY)
//    }
//
//    // ------------------------------------------------------------------------
//    // static
//    static _jQueryInterface(config) {
//      return this.each(function () {
//        let $element = $(this)
//        let data = $element.data(DATA_KEY)
//
//        if (!data) {
//          data = new Layout($element, config)
//          $element.data(DATA_KEY, data)
//        }
//      })
//    }
//  }
//
//  /**
//   * ------------------------------------------------------------------------
//   * jQuery
//   * ------------------------------------------------------------------------
//   */
//  $.fn[JQUERY_NAME] = Layout._jQueryInterface
//  $.fn[JQUERY_NAME].Constructor = Layout
//  $.fn[JQUERY_NAME].noConflict = () => {
//    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
//    return Layout._jQueryInterface
//  }
//
//  return Layout
//
//})(jQuery)
//
//export default Layout
