/* Copyright 2014+, Federico Zivolo, LICENSE at https://github.com/FezVrasta/bootstrap-material-design/blob/master/LICENSE.md */

$(function (){
    // Add ripple elements to material buttons
    $(".btn:not('.btn-link'), .navbar a").each( function(){
        $(this).append("<svg class=ripple-wrapper><defs></defs><g><ellipse rx=20 ry=20 class=ripple></ellipse></g></svg>");
    });

    // Add fake-checkbox to material checkboxes
    $(".checkbox label input").each( function() {
        $(this).after("<span class=\"bubble\"></span><span class=\"check\"></span><span class=\"box\"></span>");
    });

    // Add fake-radio to material radios
    $(".radio label input").each( function() {
        $(this).after("<span class=\"bubble\"></span><span class=\"circle\"></span><span class=\"check\"></span>");
    });

    // Add elements for material inputs
    $("input.form-control, textarea.form-control").each( function() {
        $(this).wrap("<div class=\"form-control-wrapper\"></div>");
        $(this).after("<span class=\"form-control-highlight\"></span><span class=\"form-control-bar\"></span>");
        if ($(this).hasClass("floating-label")) {
            $(this)
            .removeClass("floating-label")
            .after("<span class=\"floating-label\">" + $(this).attr("placeholder") + "</span>").attr("placeholder", null);
        }
        if ($(this).val() === "") {
            $(this).addClass("empty");
        }
    });


    var mouseDown = false;
    $(document).mousedown(function() {
        mouseDown = true;
    }).mouseup(function() {
        mouseDown = false;
    });

    // Material buttons engine
    $(document).on("mousedown", ".btn:not('.btn-link'), .navbar a", function(e){
        // Cache elements
        var $self           = $(this),
            $rippleWrapper  = $self.find(".ripple-wrapper"),
            $ripple         = $self.find(".ripple");

        // Remove previous animation
        $ripple.attr("class", "ripple");
        $rippleWrapper.stop(true, true);

        // Get mouse position
        var parentOffset = $self.offset();
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;

        // Move ripple to the click position
        $ripple.attr({"cy":relY, "cx": relX});

        // Start the animation
        $rippleWrapper.attr("class", "ripple-wrapper").data("animating", true);
        $ripple.attr("class", "ripple ripple-on").css("transform", "scale(" + $rippleWrapper.width() / 20 + ")");
        setTimeout(function() {
            $rippleWrapper.attr("class", "ripple-wrapper").data("animating", false).trigger("rippleEnd");
        }, 500);
    })
    .on("rippleEnd", ".btn:not('.btn-link'), .navbar a",  function() {
        if (!mouseDown) {
            var $self           = $(this),
                $rippleWrapper  = $self.find(".ripple-wrapper"),
                $ripple         = $self.find(".ripple");

            rippleOut($ripple, $rippleWrapper);
        }
    })
    .on("mouseup", ".btn:not('.btn-link'), .navbar a",  function() {
        var $self           = $(this),
            $rippleWrapper  = $self.find(".ripple-wrapper"),
            $ripple         = $self.find(".ripple");

        if (!$rippleWrapper.data("animating")) {
            rippleOut($ripple, $rippleWrapper);
        }

    });

    var rippleOut = function($ripple, $rippleWrapper) {
        $ripple.attr("class", "ripple ripple-on ripple-out");
        $rippleWrapper.fadeOut(200, function() {
            $rippleWrapper.attr("class", "ripple-wrapper").attr("style", "");
            $ripple.attr("class", "ripple").attr("style", "");
        });
    };

    // Material inputs engine (bubble effect)
    $(document).on("click", ".checkbox label, .radio label", function() {
        var $bubble     = $(this).find(".bubble"),
            timestamp   = "t" + new Date().getTime();
        $bubble.attr("class", "bubble");
        $bubble.addClass("animate").addClass(timestamp);
        setTimeout(function() {
            if ($bubble.hasClass(timestamp)) {
                $bubble.removeClass("animate").removeClass(timestamp);
            }
        }, 200);
    });

    $(document).on("change", ".form-control", function() {
        if ($(this).val() !== "") {
            $(this).removeClass("empty");
        } else {
            $(this).addClass("empty");
        }
    });
});

