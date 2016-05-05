import Style from './style'
import Clipboard from 'clipboard'
import anchors from 'anchor-js'

// import all the bmd code
import '../../../../js/index-iife' // eslint-disable-line no-unused-vars

class Application {

  constructor() {
  }

  initializeDemos() {
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
    $('.bd-example [href="#"]').click((e) => {
      e.preventDefault()
    })

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
      $(e.trigger)
        .attr('title', 'Copied!')
        .tooltip('_fixTitle')
        .tooltip('show')
        .attr('title', 'Copy to clipboard')
        .tooltip('_fixTitle')

      e.clearSelection()
    })

    clipboard.on('error', (e) => {
      let fallbackMsg = /Mac/i.test(navigator.userAgent) ? 'Press \u2318 to copy' : 'Press Ctrl-C to copy'

      $(e.trigger)
        .attr('title', fallbackMsg)
        .tooltip('_fixTitle')
        .tooltip('show')
        .attr('title', 'Copy to clipboard')
        .tooltip('_fixTitle')
    })

    anchors.options.placement = 'left' // eslint-disable-line no-console
    anchors.add('.bd-content > h1, .bd-content > h2, .bd-content > h3, .bd-content > h4, .bd-content > h5')
  }

  // Add dynamic display of font properties to the existing documentation
  displayTypographyProperties() {
    // headings
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

      let $col = $(`<div class='col-sm-8'></div>`)
      $col.append($p)
      $row.append($col)

      $col = $(`<div class='col-sm-4'></div>`)
      $col.append($text)
      $row.append($col)
    }, false, true)
  }

}

$(() => {
  let app = new Application()
  app.displayTypographyProperties()
  $('.btn-clipboard').bmdRipples()

  // FIXME: file inputs seems to be in flux, delete the offending one for now.
  $('#exampleInputFile').closest('.form-group').detach()

  $('body').bootstrapMaterialDesign()

  app.initializeDemos()
})
