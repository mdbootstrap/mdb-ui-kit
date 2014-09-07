/* globals ripples */

$(function (){

    ripples.init(".btn:not(.btn-link), .navbar a, .nav-tabs a, .withripple");

    // Add fake-checkbox to material checkboxes
    $(".checkbox label input").after("<span class=ripple></span><span class=check></span><span class=box></span>");

    // Add fake-radio to material radios
    $(".radio label input").after("<span class=ripple></span><span class=circle></span><span class=check></span>");

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

    // Material inputs engine (ripple effect)
    /*$(document).on("mouseup", ".checkbox label, .radio label", function() {
        console.log("click");
        var $ripple = $(this).find(".ripple");

        $ripple.addClass("animate");
        var timer = setTimeout(function() {
            console.log("out");
            clearTimeout(timer);
            $ripple.removeClass("animate");
        }, 800);
    });*/

    $(document).on("change", ".form-control", function() {
        if ($(this).val() !== "") {
            $(this).removeClass("empty");
        } else {
            $(this).addClass("empty");
        }
    });
});

