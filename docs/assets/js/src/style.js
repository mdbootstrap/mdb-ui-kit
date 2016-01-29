/**
 * Dynamically display style properties i.e. font
 */
const Style = class {

  constructor() {

  }

  static rgbToHex(rgba) {
    rgba = rgba.match(/\d+/g)
    let hex = `#${String(`0${Number(rgba[0]).toString(16)}`).slice(-2)}${String(`0${Number(rgba[1]).toString(16)}`).slice(-2)}${String(`0${Number(rgba[2]).toString(16)}`).slice(-2)}`
    return hex
  }

  // Function to display font properties dynamically discovered
  static displayFontSizeWeightColor($elements, writeFn, bg = false, wrapWithCode = false) {
    return $elements.each((index, element) => {
      let $element = $(element)

      let rgbaBgColor = $element.css('background-color')
      // let hexBgColor = Style.rgbToHex(rgbaBgColor)

      let rgbaColor = $element.css('color')
      // let hexColor = Style.rgbToHex(rgbaColor)

      let text = ''

      if (wrapWithCode) {
        text += `<code style='font-size: 10px; font-weight: 500; letter-spacing: normal'>`
      }

      // text += `${$element.css('font-size')} ${$element.css('font-weight')} ${hexColor}`
      text += `<span>${$element.css('font-size')} ${$element.css('font-weight')} <span style='white-space: nowrap'>${rgbaColor}</span></span>`
      if (bg) {
        // text += ` bg: ${hexBgColor} `
        text += ` bg: ${rgbaBgColor} `
      }

      if (wrapWithCode) {
        text += `</code>`
      }

      writeFn($element, $(text))
    })
  }
}

export default Style
