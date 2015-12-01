/*!
 * Bootstrap Material Design v4.0.0-alpha (https://github.com/FezVrasta/bootstrap-material-design)
 * Copyright 2014-2015 Federico Zivolo
 * Licensed under MIT (https://github.com/FezVrasta/bootstrap-material-design/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap Material Design\'s JavaScript requires jQuery')
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 3)) {
    throw new Error('Bootstrap Material Design\'s JavaScript requires at least jQuery v1.9.1 but less than v3.0.0')
  }
}(jQuery);


+function ($) {

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Ripples = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'ripples';
  var DATA_KEY = 'bmd.' + NAME;
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var DEFAULT_OPTIONS = {};

  var Selector = {
    DATA_DISMISS: '[data-dismiss="ripples"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Ripples = (function () {
    function Ripples(element, options) {
      _classCallCheck(this, Ripples);

      this.element = $(element);
      this.config = $.extend({}, DEFAULT_OPTIONS, options);

      this.element.on("mousedown touchstart", this._createRipple);
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    //$(document).on(
    //  Event.CLICK_DATA_API,
    //  Selector.DATA_DISMISS,
    //  Ripples._handleClose(new Ripples())
    //)

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Ripples, [{
      key: 'close',

      // public
      value: function close(element) {
        element = element || this.element;

        var rootElement = this._getRootElement(element);
        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this.element, DATA_KEY);
        this.element = null;
      }

      // ------------------------------------------------------------------------
      // private

    }, {
      key: '_createRipple',
      value: function _createRipple(event) {

        /**
         * Verify if the user is just touching on a device and return if so
         */
        if (this.isTouch() && event.type === "mousedown") {
          return;
        }

        /**
         * Verify if the current element already has a ripple wrapper element and
         * creates if it doesn't
         */
        if (!this.element.find(".ripple-container").length) {
          this.element.append("<div class=\"ripple-container\"></div>");
        }

        /**
         * Find the ripple wrapper
         */
        var $container = this.element.children(".ripple-container");

        /**
         * Get relY and relX positions
         */
        var relY = this._getRelY($container, event);
        var relX = this._getRelX($container, event);

        /**
         * If relY and/or relX are false, return the event
         */
        if (!relY && !relX) {
          return;
        }

        /**
         * Get the ripple color
         */
        var rippleColor = this._getRipplesColor(this.element);

        /**
         * Create the ripple element
         */
        var $ripple = $("<div></div>");

        $ripple.addClass("ripple").css({
          "left": relX,
          "top": relY,
          "background-color": rippleColor
        });

        /**
         * Append the ripple to the wrapper
         */
        $container.append($ripple);

        /**
         * Make sure the ripple has the styles applied (ugly hack but it works)
         */
        (function () {
          return window.getComputedStyle($ripple[0]).opacity;
        })();

        /**
         * Turn on the ripple animation
         */
        this.rippleOn(this.element, $ripple);

        /**
         * Call the rippleEnd function when the transition "on" ends
         */
        setTimeout(function () {
          this.rippleEnd($ripple);
        }, 500);

        /**
         * Detect when the user leaves the element
         */
        this.element.on("mouseup mouseleave touchend", function () {
          $ripple.data("mousedown", "off");

          if ($ripple.data("animating") === "off") {
            this.rippleOut($ripple);
          }
        });
      }

      /**
       * Get the relX
       */
    }, {
      key: '_getRelX',
      value: function _getRelX($container, event) {
        var wrapperOffset = $container.offset();

        if (!this.isTouch()) {
          /**
           * Get the mouse position relative to the ripple wrapper
           */
          return event.pageX - wrapperOffset.left;
        } else {
          /**
           * Make sure the user is using only one finger and then get the touch
           * position relative to the ripple wrapper
           */
          event = event.originalEvent;

          if (event.touches.length === 1) {
            return event.touches[0].pageX - wrapperOffset.left;
          }

          return false;
        }
      }

      /**
       * Get the relY
       */
    }, {
      key: '_getRelY',
      value: function _getRelY($container, event) {
        var wrapperOffset = $container.offset();

        if (!this.isTouch()) {
          /**
           * Get the mouse position relative to the ripple wrapper
           */
          return event.pageY - wrapperOffset.top;
        } else {
          /**
           * Make sure the user is using only one finger and then get the touch
           * position relative to the ripple wrapper
           */
          event = event.originalEvent;

          if (event.touches.length === 1) {
            return event.touches[0].pageY - wrapperOffset.top;
          }

          return false;
        }
      }

      /**
       * Get the ripple color
       */
    }, {
      key: '_getRipplesColor',
      value: function _getRipplesColor($element) {

        var color = $element.data("ripple-color") ? $element.data("ripple-color") : window.getComputedStyle($element[0]).color;

        return color;
      }

      /**
       * Verify if the client browser has transistion support
       */
    }, {
      key: '_hasTransitionSupport',
      value: function _hasTransitionSupport() {
        var thisBody = document.body || document.documentElement;
        var thisStyle = thisBody.style;

        var support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;

        return support;
      }

      /**
       * Verify if the client is using a mobile device
       */
    }, {
      key: 'isTouch',
      value: function isTouch() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        );
      }

      /**
       * End the animation of the ripple
       */
    }, {
      key: 'rippleEnd',
      value: function rippleEnd($ripple) {
        $ripple.data("animating", "off");

        if ($ripple.data("mousedown") === "off") {
          this.rippleOut($ripple);
        }
      }

      /**
       * Turn off the ripple effect
       */
    }, {
      key: 'rippleOut',
      value: function rippleOut($ripple) {
        $ripple.off();

        if (this._hasTransitionSupport()) {
          $ripple.addClass("ripple-out");
        } else {
          $ripple.animate({ "opacity": 0 }, 100, function () {
            $ripple.triggerStart("transitionend");
          });
        }

        $ripple.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
          $ripple.remove();
        });
      }

      /**
       * Turn on the ripple effect
       */
    }, {
      key: 'rippleOn',
      value: function rippleOn($element, $ripple) {
        var size = this._getNewSize($element, $ripple);

        if (this._hasTransitionSupport()) {
          $ripple.css({
            "-ms-transform": "scale(" + size + ")",
            "-moz-transform": "scale(" + size + ")",
            "-webkit-transform": "scale(" + size + ")",
            "transform": "scale(" + size + ")"
          }).addClass("ripple-on").data("animating", "on").data("mousedown", "on");
        } else {
          $ripple.animate({
            "width": Math.max($element.outerWidth(), $element.outerHeight()) * 2,
            "height": Math.max($element.outerWidth(), $element.outerHeight()) * 2,
            "margin-left": Math.max($element.outerWidth(), $element.outerHeight()) * -1,
            "margin-top": Math.max($element.outerWidth(), $element.outerHeight()) * -1,
            "opacity": 0.2
          }, 500, function () {
            $ripple.triggerStart("transitionend");
          });
        }
      }

      // ------------------------------------------------------------------------
      // static
      /**
       * Get the new size based on the element height/width and the ripple width
       */
    }], [{
      key: '_getNewSize',
      value: function _getNewSize($element, $ripple) {
        return Math.max($element.outerWidth(), $element.outerHeight()) / $ripple.outerWidth() * 2.5;
      }
    }, {
      key: '_jQueryInterface',
      value: function _jQueryInterface(options) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Ripples(this, options);
            $element.data(DATA_KEY, data);
          }
        });
      }

      //static _handleClose(fooInstance) {
      //  return function (event) {
      //    if (event) {
      //      event.preventDefault()
      //    }
      //
      //    fooInstance.close(this)
      //  }
      //}
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }]);

    return Ripples;
  })();

  $.fn[NAME] = Ripples._jQueryInterface;
  $.fn[NAME].Constructor = Ripples;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Ripples._jQueryInterface;
  };

  return Ripples;
})(jQuery);

}(jQuery);
