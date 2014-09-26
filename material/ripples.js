/* Copyright 2014+, Federico Zivolo, LICENSE at https://github.com/FezVrasta/bootstrap-material-design/blob/master/LICENSE.md */
/* globals CustomEvent, navigator */
var ripples = {
    init : function(withRipple) {
        "use strict";

        // Cross browser matches function
        function matchesSelector(dom_element, selector) {
            var matches = dom_element.matches || dom_element.matchesSelector || dom_element.webkitMatchesSelector || dom_element.mozMatchesSelector || dom_element.msMatchesSelector || dom_element.oMatchesSelector;
            return matches.call(dom_element, selector);
        }

        // animations time
        var rippleOutTime = 100,
            rippleStartTime = 500;

        // Helper to bind events on dynamically created elements
        var bind = function(event, selector, callback) {
            document.addEventListener(event, function(e) {
                var target = (typeof e.detail !== "number") ? e.detail : e.target;

                if (matchesSelector(target, selector)) {
                    callback(e, target);
                }
            });
        };

        var rippleStart = function(e, target) {

            // Init variables
            var $rippleWrapper  = (matchesSelector(target, ".ripple-wrapper")) ? target : target.parentNode,
                $el             = $rippleWrapper.parentNode,
                $ripple         = document.createElement("div"),
                elPos           = $el.getBoundingClientRect(),
                mousePos        = {x: e.clientX - elPos.left, y: e.clientY - elPos.top},
                scale           = "transform:scale(" + Math.round($rippleWrapper.offsetWidth / 5) + ")",
                rippleEnd       = new CustomEvent("rippleEnd", {detail: $ripple}),
                refreshElementStyle;

            // Set ripple class
            $ripple.className = "ripple";

            // Move ripple to the mouse position
            $ripple.setAttribute("style", "left:" + mousePos.x + "px; top:" + mousePos.y + "px;");

            // Insert new ripple into ripple wrapper
            $rippleWrapper.appendChild($ripple);

            // Make sure the ripple has the class applied (ugly hack but it works)
            refreshElementStyle = window.getComputedStyle($ripple).opacity;

            // Let other funtions know that this element is animating
            $ripple.dataset.animating = 1;

            // Set scale value to ripple and animate it
            $ripple.className = "ripple ripple-on";
            $ripple.setAttribute("style", $ripple.getAttribute("style") + ["-ms-" + scale,"-moz-" + scale,"-webkit-" + scale,scale].join(";"));

            // Dirty fix for Firefox... seems like absolute elements inside <A> tags do not trigger the "click" event
            if (/firefox|crios|(^(?!.*chrome).*safari)|ip(ad|hone|od)/i.test(navigator.userAgent)) {
                $el.click();
            }

            // This function is called when the animation is finished
            setTimeout(function() {

                // Let know to other functions that this element has finished the animation
                $ripple.dataset.animating = 0;
                document.dispatchEvent(rippleEnd);

            }, rippleStartTime);

        };

        var rippleOut = function($ripple) {
            // Clear previous animation
            $ripple.className = "ripple ripple-on ripple-out";

            // Let ripple fade out (with CSS)
            setTimeout(function() {
                $ripple.remove();
            }, rippleOutTime);
        };

        // Helper, need to know if mouse is up or down
        var mouseDown = false;
        document.body.onmousedown = function() {
            mouseDown = true;
        };
        document.body.onmouseup = function() {
            mouseDown = false;
        };

        // Append ripple wrapper if not exists already
        var rippleInit = function(e, target) {

            if (target.getElementsByClassName("ripple-wrapper").length === 0) {
                target.className += " withripple";
                var $rippleWrapper = document.createElement("div");
                $rippleWrapper.className = "ripple-wrapper";
                target.appendChild($rippleWrapper);
                rippleStart(e, $rippleWrapper);
            }

        };

        // Events handler
        // init RippleJS and start ripple effect on mousedown
        bind("mousedown", withRipple, rippleInit);

        // start ripple effect on mousedown
        bind("mousedown", ".ripple-wrapper, .ripple-wrapper .ripple", rippleStart);
        // if animation ends and user is not holding mouse then destroy the ripple
        bind("rippleEnd", ".ripple-wrapper, .ripple-wrapper .ripple", function(e, $ripple) {
            if (!mouseDown) {
                rippleOut($ripple);
            }
        });
        // Destroy ripple when mouse is not holded anymore if the ripple still exists
        bind("mouseup", ".ripple-wrapper, .ripple-wrapper .ripple", function(e, $ripple) {
            if ($ripple.dataset.animating != 1) {
                rippleOut($ripple);
            }
        });

    }
};
