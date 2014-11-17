/* Copyright 2014+, Federico Zivolo, LICENSE at https://github.com/FezVrasta/bootstrap-material-design/blob/master/LICENSE.md */
/* globals CustomEvent */
window.ripples = {
    done: false,
    init : function(withRipple) {
        "use strict";

        if (this.done) {
            return console.log("Ripples.js was already initialzied.");
        }

        this.done = true;


        // Cross browser matches function
        function matchesSelector(domElement, selector) {
            var matches = domElement.matches ||
                domElement.matchesSelector ||
                domElement.webkitMatchesSelector ||
                domElement.mozMatchesSelector ||
                domElement.msMatchesSelector ||
                domElement.oMatchesSelector;
            return matches.call(domElement, selector);
        }

        // animations time
        var rippleOutTime = 100,
            rippleStartTime = 500;

        // Helper to bind events on dynamically created elements
        var bind = function(events, selector, callback) {
            if (typeof events === "string") {
                events = [events];
            }
            events.forEach(function(event) {
                document.addEventListener(event, function(e) {
                    var target = (typeof e.detail !== "number") ? e.detail : e.target;

                    if (matchesSelector(target, selector)) {
                        callback(e, target);
                    }
                });
            });
        };

        var rippleStart = function(e, target, callback) {

            // Init variables
            var $rippleWrapper      = target,
                $el                 = $rippleWrapper.parentNode,
                $ripple             = document.createElement("div"),
                elPos               = $el.getBoundingClientRect(),
                // Mouse pos in most cases
                mousePos            = {x: e.clientX - elPos.left, y: ((window.ontouchstart) ? e.clientY - window.scrollY: e.clientY) - elPos.top},
                scale               = "scale(" + Math.round($rippleWrapper.offsetWidth / 5) + ")",
                rippleEnd           = new CustomEvent("rippleEnd", {detail: $ripple}),
                _rippleOpacity      = 0.3,
                refreshElementStyle;


            // If multitouch is detected or some other black magic suff is happening...
            if (e.touches) {
                mousePos  = {x: e.touches[0].clientX - elPos.left, y:  e.touches[0].clientY - elPos.top};
            }

            $ripplecache = $ripple;

            // Set ripple class
            $ripple.className = "ripple";

            // Move ripple to the mouse position
            $ripple.setAttribute("style", "left:" + mousePos.x + "px; top:" + mousePos.y + "px;");

            // Get the clicked target's text color, this will be applied to the ripple as background-color.
            var targetColor = window.getComputedStyle($el).color;

            // Convert the rgb color to an rgba color with opacity set to __rippleOpacity__
            if ( targetColor.indexOf("rgba") >= 0 ) {
                var alphaPosition = targetColor.lastIndexOf(",") + 1;
                targetColor = targetColor.substring(0, alphaPosition) + _rippleOpacity + ")";
            } else {
                targetColor = targetColor.replace("rgb", "rgba").replace(")", ", " + _rippleOpacity + ")");
            }

            // Insert new ripple into ripple wrapper
            $rippleWrapper.appendChild($ripple);

            // Make sure the ripple has the class applied (ugly hack but it works)
            refreshElementStyle = window.getComputedStyle($ripple).opacity;

            // Let other funtions know that this element is animating
            $ripple.dataset.animating = 1;

            // Set scale value, background-color and opacity to ripple and animate it
            $ripple.className = "ripple ripple-on";

            // Prepare the style of the ripple
            var rippleStyle = [
                $ripple.getAttribute("style"),
                "background-color: " + targetColor,
                "-ms-transform: " + scale,
                "-moz-transform" + scale,
                "-webkit-transform" + scale,
                "transform: " + scale
            ];

            // Apply the style
            $ripple.setAttribute("style", rippleStyle.join(";"));

            // This function is called when the animation is finished
            setTimeout(function() {

                // Let know to other functions that this element has finished the animation
                $ripple.dataset.animating = 0;
                document.dispatchEvent(rippleEnd);
                if (callback) {
                    callback();
                }

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
        bind(["mousedown", "touchstart"], "*", function() {
            mouseDown = true;
        });
        bind(["mouseup", "touchend", "mouseout"], "*", function() {
            mouseDown = false;
        });

        // Append ripple wrapper if not exists already
        var rippleInit = function(e, target) {
            if (target.getElementsByClassName("ripple-wrapper").length === 0) {
                target.className += " withripple";
                var $rippleWrapper = document.createElement("div");
                $rippleWrapper.className = "ripple-wrapper";
                target.appendChild($rippleWrapper);
            }
        };

        var $ripplecache;

        // Events handler
        // init RippleJS and start ripple effect on mousedown
        bind(["mouseover"], withRipple, rippleInit);

        // Init if the device is touch screen
        bind(["touchstart"], withRipple, rippleInit);

        // start ripple effect on mousedown
        bind(["mousedown", "touchstart"], ".ripple-wrapper", function(e, $ripple) {
            // Start ripple only on left or middle mouse click and touch click
            if (e.which === 0 || e.which === 1 || e.which === 2) {
                rippleStart(e, $ripple);
            }
        });

        // if animation ends and user is not holding mouse then destroy the ripple
        bind("rippleEnd", ".ripple-wrapper .ripple", function(e, $ripple) {

            var $ripples = $ripple.parentNode.getElementsByClassName("ripple");

            if (!mouseDown || ( $ripples[0] == $ripple && $ripples.length > 1)) {
                rippleOut($ripple);
            }
        });

        // Destroy ripple when mouse is not holded anymore if the ripple still exists
        bind(["mouseup", "touchend", "mouseout"], ".ripple-wrapper", function() {
            var $ripple = $ripplecache;
            if ($ripple && $ripple.dataset.animating != 1) {
                rippleOut($ripple);
            }
        });

    }
};
