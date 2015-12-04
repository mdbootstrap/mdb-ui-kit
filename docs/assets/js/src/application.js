import Style from './style'

class Application {

  constructor() {
  }

  displayTypographyProperties() {
    Style.displayFontSizeWeightColor('.bd-example-type td > *:not(.type-info)', ($element) => {
      return $element.closest('tr').find('td.type-info')
    })
  }
}

$(() => {
  let app = new Application()
  app.displayTypographyProperties()

  // $.bootstrapMaterialDesign()

})
