import Style from './style'
import Clipboard from 'clipboard'

class Application {

  constructor() {

    // Tooltip and popover demos
    $('.tooltip-demo').tooltip({
      selector: '[data-toggle="tooltip"]',
      container: 'body'
    })

    $('[data-toggle="popover"]').popover()

    // Demos within modals
    $('.tooltip-test').tooltip()
    $('.popover-test').popover()

    // Indeterminate checkbox example
    $('.bd-example-indeterminate [type="checkbox"]').prop('indeterminate', true)

    // Disable empty links in docs examples
    $('.bd-example [href=#]').click((e) => {
      e.preventDefault()
    })
  }

  displayTypographyProperties() {
    // headers
    Style.displayFontSizeWeightColor($('.bd-example-type td > *:not(.type-info)'), ($element, $text) => {
      let $target = $element.closest('tr').find('td.type-info')
      $target.text('')
      $target.append($text)
    }, false, true)


    // display headings
    Style.displayFontSizeWeightColor($('h2#display-headings').next().next().find('h1'), ($element, $text) => {
      let $tr = $element.closest('tr')
      let $td = $(`<td class="type-info">`)
      $tr.append($td)
      $td.append($text)

    }, false, true)

    // lead headings
    Style.displayFontSizeWeightColor($('h2#lead').next().next().find('p'), ($element, $text) => {
      $element.append($text)

    }, false, true)

    // inline text elements
    Style.displayFontSizeWeightColor($(`p:contains(Styling for common inline HTML5 elements.)`).next().find('p > *'), ($element, $text) => {

      let $p = $element.parent()
      let $parent = $p.parent()
      $p.detach()

      // create a row with two columns to display the text properties
      let $row = $(`<div class='row'></div>`)
      $parent.append($row)

      let $col = $(`<div class='col-sm-9'></div>`)
      $col.append($p)
      $row.append($col)

      $col = $(`<div class='col-sm-3'></div>`)
      $col.append($text)
      $row.append($col)
    }, false, true)
  }

  initializeClipboard() {
    // Insert copy to clipboard button before .highlight
    $('.highlight').each(function () {
      let btnHtml = '<div class="bd-clipboard"><span class="btn-clipboard" title="Copy to clipboard">Copy</span></div>'
      $(this).before(btnHtml)
      $('.btn-clipboard').tooltip()
    })

    let clipboard = new Clipboard('.btn-clipboard', {
      target: (trigger) => {
        return trigger.parentNode.nextElementSibling
      }
    })

    clipboard.on('success', (e) => {
      $(e.triggerStart)
        .attr('title', 'Copied!')
        .tooltip('_fixTitle')
        .tooltip('show')
        .attr('title', 'Copy to clipboard')
        .tooltip('_fixTitle')

      e.clearSelection()
    })

    clipboard.on('error', (e) => {
      let fallbackMsg = /Mac/i.test(navigator.userAgent) ? 'Press \u2318 to copy' : 'Press Ctrl-C to copy'

      $(e.triggerStart)
        .attr('title', fallbackMsg)
        .tooltip('_fixTitle')
        .tooltip('show')
        .attr('title', 'Copy to clipboard')
        .tooltip('_fixTitle')
    })
  }
}

$(() => {
  let app = new Application()
  app.displayTypographyProperties()
  app.initializeClipboard()
  // $.bootstrapMaterialDesign()
  $('body').bootstrapMaterialDesign()
})
