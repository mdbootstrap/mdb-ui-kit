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
  var DATA_KEY = 'mdb.' + NAME;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    CONTAINER: 'ripple-container',
    DECORATOR: 'ripple-decorator'
  };

  var Selector = {
    CONTAINER: '.' + ClassName.CONTAINER,
    DECORATOR: '.' + ClassName.DECORATOR //,
  };

  var Default = {
    container: {
      template: '<div class=\'' + ClassName.CONTAINER + '\'></div>'
    },
    decorator: {
      template: ClassName.DECORATOR + '\'></div>'
    },
    trigger: {
      start: 'mousedown touchstart',
      end: 'mouseup mouseleave touchend'
    },
    touchUserAgentRegex: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
    duration: 500
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Ripples = (function () {
    function Ripples(element, config) {
      _classCallCheck(this, Ripples);

      this.element = $(element);
      this.config = $.extend({}, Default, config);

      // attach initial listener
      this.element.on(this.config.triggerStart, this._onStartRipple);
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(Ripples, [{
      key: 'dispose',
      value: function dispose() {
        $.removeData(this.element, DATA_KEY);
        this.element = null;
        this.containerElement = null;
        this.decoratorElement = null;
        this.config = null;
      }

      // ------------------------------------------------------------------------
      // private

    }, {
      key: '_onStartRipple',
      value: function _onStartRipple(event) {
        var _this = this;

        // Verify if the user is just touching on a device and return if so
        if (this.isTouch() && event.type === 'mousedown') {
          return;
        }

        // Find or create the ripple container element
        this._findOrCreateContainer();

        // Get relY and relX positions of the container element
        var relY = this._getRelY(event);
        var relX = this._getRelX(event);

        // If relY and/or relX are false, return the event
        if (!relY && !relX) {
          return;
        }

        // set the location and color each time (even if element is cached)
        this.decoratorElement.css({
          'left': relX,
          'top': relY,
          'background-color': this._getRipplesColor()
        });

        // Make sure the ripple has the styles applied (ugly hack but it works)
        this._forceStyleApplication();

        // Turn on the ripple animation
        this.rippleOn();

        // Call the rippleEnd function when the transition 'on' ends
        setTimeout(function () {
          _this.rippleEnd();
        }, this.config.duration);

        // Detect when the user leaves the element (attach only when necessary for performance)
        this.element.on(this.config.triggerEnd, function () {
          _this.decoratorElement.data('mousedown', 'off');

          if (_this.decoratorElement.data('animating') === 'off') {
            _this.rippleOut();
          }
        });
      }
    }, {
      key: '_findOrCreateContainer',
      value: function _findOrCreateContainer() {
        if (!this.containerElement || !this.containerElement.length > 0) {
          this.element.append(this.config.container.template);
          this.containerElement = this.element.find(Selector.CONTAINER);
        }

        // always add the rippleElement, it is always removed
        this.containerElement.append(this.config.element.template);
        this.decoratorElement = this.containerElement.find(Selector.DECORATOR);
      }

      // Make sure the ripple has the styles applied (ugly hack but it works)
    }, {
      key: '_forceStyleApplication',
      value: function _forceStyleApplication() {
        return window.getComputedStyle(this.decoratorElement[0]).opacity;
      }

      /**
       * Get the relX
       */
    }, {
      key: '_getRelX',
      value: function _getRelX(event) {
        var wrapperOffset = this.containerElement.offset();

        var result = null;
        if (!this.isTouch()) {
          // Get the mouse position relative to the ripple wrapper
          result = event.pageX - wrapperOffset.left;
        } else {
          // Make sure the user is using only one finger and then get the touch
          //  position relative to the ripple wrapper
          event = event.originalEvent;

          if (event.touches.length === 1) {
            result = event.touches[0].pageX - wrapperOffset.left;
          } else {
            result = false;
          }
        }

        return result;
      }

      /**
       * Get the relY
       */
    }, {
      key: '_getRelY',
      value: function _getRelY(event) {
        var containerOffset = this.containerElement.offset();
        var result = null;

        if (!this.isTouch()) {
          /**
           * Get the mouse position relative to the ripple wrapper
           */
          result = event.pageY - containerOffset.top;
        } else {
          /**
           * Make sure the user is using only one finger and then get the touch
           * position relative to the ripple wrapper
           */
          event = event.originalEvent;

          if (event.touches.length === 1) {
            result = event.touches[0].pageY - containerOffset.top;
          } else {
            result = false;
          }
        }

        return result;
      }

      /**
       * Get the ripple color
       */
    }, {
      key: '_getRipplesColor',
      value: function _getRipplesColor() {
        var color = this.element.data('ripple-color') ? this.element.data('ripple-color') : window.getComputedStyle(this.element[0]).color;
        return color;
      }

      /**
       * Verify if the client is using a mobile device
       */
    }, {
      key: 'isTouch',
      value: function isTouch() {
        return this.config.touchUserAgentRegex.test(navigator.userAgent);
      }

      /**
       * End the animation of the ripple
       */
    }, {
      key: 'rippleEnd',
      value: function rippleEnd() {
        this.decoratorElement.data('animating', 'off');

        if (this.decoratorElement.data('mousedown') === 'off') {
          this.rippleOut(this.decoratorElement);
        }
      }

      /**
       * Turn off the ripple effect
       */
    }, {
      key: 'rippleOut',
      value: function rippleOut() {
        var _this2 = this;

        this.decoratorElement.off();

        if (Util.transitionEndSupported()) {
          this.decoratorElement.addClass('ripple-out');
        } else {
          this.decoratorElement.animate({ 'opacity': 0 }, 100, function () {
            _this2.decoratorElement.triggerStart('transitionend');
          });
        }

        this.decoratorElement.on(Util.transitionEndSelector(), function () {
          _this2.decoratorElement.remove();
          _this2.decoratorElement = null;
        });
      }

      /**
       * Turn on the ripple effect
       */
    }, {
      key: 'rippleOn',
      value: function rippleOn() {
        var _this3 = this;

        var size = this._getNewSize();

        if (Util.transitionEndSupported()) {
          this.decoratorElement.css({
            '-ms-transform': 'scale(' + size + ')',
            '-moz-transform': 'scale(' + size + ')',
            '-webkit-transform': 'scale(' + size + ')',
            'transform': 'scale(' + size + ')'
          }).addClass('ripple-on').data('animating', 'on').data('mousedown', 'on');
        } else {
          this.decoratorElement.animate({
            'width': Math.max(this.element.outerWidth(), this.element.outerHeight()) * 2,
            'height': Math.max(this.element.outerWidth(), this.element.outerHeight()) * 2,
            'margin-left': Math.max(this.element.outerWidth(), this.element.outerHeight()) * -1,
            'margin-top': Math.max(this.element.outerWidth(), this.element.outerHeight()) * -1,
            'opacity': 0.2
          }, this.config.duration, function () {
            _this3.decoratorElement.triggerStart('transitionend');
          });
        }
      }

      /**
       * Get the new size based on the element height/width and the ripple width
       */
    }, {
      key: '_getNewSize',
      value: function _getNewSize() {
        return Math.max(this.element.outerWidth(), this.element.outerHeight()) / this.decoratorElement.outerWidth() * 2.5;
      }

      // ------------------------------------------------------------------------
      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        var _this4 = this;

        return this.each(function () {
          var element = $(_this4);
          var data = element.data(DATA_KEY);

          if (!data) {
            data = new Ripples(_this4, config);
            element.data(DATA_KEY, data);
          }
        });
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
//# sourceMappingURL=ripples.js.map
