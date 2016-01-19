function clearDrawerClasses($container) {
  var classes = ["mdb-drawer-pos-f-l", "mdb-drawer-pos-f-r", "mdb-drawer-pos-f-t", "mdb-drawer-pos-f-b"];

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
  var buttons = ["drawer-pos-f-l", "drawer-pos-f-r", "drawer-pos-f-t", "drawer-pos-f-b"]

  $.each(buttons, function (index, position) {
    $('#' + position).click(function() {
      setDrawerPosition('mdb-' + position)
    })
  })

  // add a toggle for drawer visibility that shows anytime
  $('#drawer-visibility').click(function () {
    var $container = $('.mdb-layout-container')

    // once clicked, just do away with responsive marker
    //$container.removeClass('mdb-drawer-in-md')

    var $icon = $(this).find('.material-icons')
    if ($icon.text() == 'visibility_off') {
      $container.addClass('mdb-drawer-out')
      $container.removeClass('mdb-drawer-in') // demo only, regardless of the responsive class, we want to force it close
      $icon.text('visibility')
    }
    else {
      $container.removeClass('mdb-drawer-out')
      $container.addClass('mdb-drawer-in') // demo only, regardless of the responsive class, we want to force it open
      $icon.text('visibility_off')
    }
  })
})

