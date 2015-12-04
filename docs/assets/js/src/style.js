const Style = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  // const Default = {
  //  template: ``
  // }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Style {

    constructor() {

    }

    static rgbToHex(rgba) {
      rgba = rgba.match(/\d+/g)
      let hex = `#${String(`0${Number(rgba[0]).toString(16)}`).slice(-2)}${String(`0${Number(rgba[1]).toString(16)}`).slice(-2)}${String(`0${Number(rgba[2]).toString(16)}`).slice(-2)}`
      return hex
    }

    static displayFontSizeWeightColor(selector, targetFn, after = false, bg = false, wrapWithMark = false) {
      return $(selector).each((index, element) => {
        let $element = $(element)
        let $target = targetFn($element)

        let rgbaBgColor = $element.css('background-color')
        // let hexBgColor = Style.rgbToHex(rgbaBgColor)

        let rgbaColor = $element.css('color')
        // let hexColor = Style.rgbToHex(rgbaColor)

        let text = ''

        if (wrapWithMark) {
          text += `<mark style='font-size: 10px; font-weight: normal; letter-spacing: normal'>`
        }
        // text += `${$element.css('font-size')} ${$element.css('font-weight')} ${hexColor}`
        text += `<span>${$element.css('font-size')} ${$element.css('font-weight')} <small style='white-space: nowrap'>${rgbaColor}</small></span>`
        if (bg) {
          // text += ` bg: ${hexBgColor} `
          text += ` bg: ${rgbaBgColor} `
        }

        if (wrapWithMark) {
          text += `</mark>`
        }

        $target.text('')
        $target.append($(text))
      })
    }


    // ------------------------------------------------------------------------
    // private


    // ------------------------------------------------------------------------
    // static
  }


  return Style

})(jQuery)

export default Style
