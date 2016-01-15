function clearDrawerClasses($container) {
  var classes = [ "mdb-drawer-fixed-left", "mdb-drawer-fixed-right", "mdb-drawer-fixed-top", "mdb-drawer-fixed-bottom" ];

  $.each(classes, function(index, value) {
    $container.removeClass(value)
  })
}

function setDrawerPosition(position){
  var $container = $('.mdb-layout-container')

  clearDrawerClasses($container)
  $container.addClass(position)
}

(function() { // document ready is a little convoluted because this executes before jquery.
  setTimeout(function() {

    var buttons = ["drawer-fixed-left", "drawer-fixed-right", "drawer-fixed-top", "drawer-fixed-bottom"]

    $.each(buttons, function(index, position) {
      $('#'+position).click(function(){
        setDrawerPosition('mdb-' + position)
      })
    })

    // add a toggle for drawer visibility that shows anytime
    $('#drawer-visibility').click(function(){
      var $container = $('.mdb-layout-container')

      // once clicked, just do away with responsive marker
      $container.removeClass('mdb-drawer-open-md')

      var $icon = $(this).find('.material-icons')
      if($icon.text() == 'visibility_off'){
        $container.removeClass('mdb-drawer-open')
        $icon.text('visibility')
      }
      else {
        $container.addClass('mdb-drawer-open')
        $icon.text('visibility_off')
      }
    })

  }, 100)
})();
