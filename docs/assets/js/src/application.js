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
    Style.displayFontSizeWeightColor('.bd-example-type td > *:not(.type-info)', ($element) => {
      return $element.closest('tr').find('td.type-info')
    })
  }

  clipboard() {
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
  app.clipboard()
  // $.bootstrapMaterialDesign()

})
