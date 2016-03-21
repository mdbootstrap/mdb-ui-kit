function clearDrawerClasses($container) {
  var classes = ["bmd-drawer-f-l", "bmd-drawer-f-r", "bmd-drawer-f-t", "bmd-drawer-f-b"];

  $.each(classes, function (index, value) {
    $container.removeClass(value)
  })
}

function setDrawerPosition(position) {
  var $container = $('.bmd-layout-container')

  clearDrawerClasses($container)
  $container.addClass(position)
}

$(document).ready(function() {
  var buttons = ["drawer-f-l", "drawer-f-r", "drawer-f-t", "drawer-f-b"]

  $.each(buttons, function (index, position) {
    $('#' + position).click(function() {
      setDrawerPosition('bmd-' + position)
    })
  })

  // add a toggle for drawer visibility that shows anytime
  $('#drawer-visibility').click(function () {
    var $container = $('.bmd-layout-container')

    // once clicked, just do away with responsive marker
    //$container.removeClass('bmd-drawer-in-md')

    var $btn = $(this)
    var $icon = $btn.find('.material-icons')
    if ($icon.text() == 'visibility') {
      $container.addClass('bmd-drawer-out') // demo only, regardless of the responsive class, we want to force it close
      $icon.text('visibility_off')
      $btn.attr('title', 'Drawer allow responsive opening')
    }
    else {
      $container.removeClass('bmd-drawer-out') // demo only, regardless of the responsive class, we want to force it open
      $icon.text('visibility')
      $btn.attr('title', 'Drawer force closed')
    }
  })
})

