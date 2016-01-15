function clearDrawerClasses($container) {
  var classes = ["mdb-drawer-fixed-left", "mdb-drawer-fixed-right", "mdb-drawer-fixed-top", "mdb-drawer-fixed-bottom"];

  $.each(classes, function (index, value) {
    $container.removeClass(value)
  })
}

function setDrawerPosition(position) {
  var $container = $('.mdb-layout-container')

  clearDrawerClasses($container)
  $container.addClass(position)
}

$(document).ready(function() { // document ready is a little convoluted because this executes before jquery.
  var buttons = ["drawer-fixed-left", "drawer-fixed-right", "drawer-fixed-top", "drawer-fixed-bottom"]

  $.each(buttons, function (index, position) {
    $('#' + position).click(function() {
      setDrawerPosition('mdb-' + position)
    })
  })

  // add a toggle for drawer visibility that shows anytime
  $('#drawer-visibility').click(function () {
    var $container = $('.mdb-layout-container')

    // once clicked, just do away with responsive marker
    //$container.removeClass('mdb-drawer-open-md')

    var $icon = $(this).find('.material-icons')
    if ($icon.text() == 'visibility_off') {
      $container.addClass('mdb-drawer-closed')
      $container.removeClass('mdb-drawer-open') // demo only, regardless of the responsive class, we want to force it close
      $icon.text('visibility')
    }
    else {
      $container.removeClass('mdb-drawer-closed')
      $container.addClass('mdb-drawer-open') // demo only, regardless of the responsive class, we want to force it open
      $icon.text('visibility_off')
    }
  })
})

