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
  }, 10)
})();
