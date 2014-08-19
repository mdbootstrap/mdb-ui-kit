$(function (){
    // with ripple elements
    var withRipple = ".btn:not('.btn-link'), .navbar a, .nav-tabs a";

    // Add ripple elements to material buttons
    $(withRipple).append("<div class=ripple-wrapper><div class=ripple></div></div>");

    // Add fake-checkbox to material checkboxes
    $(".checkbox label input").after("<span class=\"bubble\"></span><span class=\"check\"></span><span class=\"box\"></span>");

    // Add fake-radio to material radios
    $(".radio label input").after("<span class=\"bubble\"></span><span class=\"circle\"></span><span class=\"check\"></span>");

    // Add elements for material inputs
    $("input.form-control, textarea.form-control, select.form-control").each( function() {
        $(this).wrap("<div class=form-control-wrapper></div>");
        $(this).after("<span class=material-input></span>");
        if ($(this).hasClass("floating-label")) {
            var placeholder = $(this).attr("placeholder");
            $(this).attr("placeholder", null).removeClass("floating-label");
            $(this).after("<div class=floating-label>" + placeholder + "</div>");
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
    $(document).on("mousedown", withRipple, function(e){
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
        $ripple.attr({"style": "top: " + relY + "px; left:" + relX + "px"});

        // Start the animation
        $rippleWrapper.attr("class", "ripple-wrapper").data("animating", true);
        var scaleVal = "scale(" + Math.round($rippleWrapper.width() / 10) + ")";
        $ripple.attr("class", "ripple ripple-on").css({
            "-ms-transform": scaleVal,
            "-moz-transform": scaleVal,
            "-webkit-transform": scaleVal,
            "transform": scaleVal
        });
        setTimeout(function() {
            $rippleWrapper.attr("class", "ripple-wrapper").data("animating", false).trigger("rippleEnd");
        }, 500);
    })
    .on("rippleEnd", withRipple,  function() {
        if (!mouseDown) {
            var $self           = $(this),
                $rippleWrapper  = $self.find(".ripple-wrapper"),
                $ripple         = $self.find(".ripple");

            rippleOut($ripple, $rippleWrapper);
        }
    })
    .on("mouseup", withRipple,  function() {
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

