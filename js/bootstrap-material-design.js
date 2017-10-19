(function () {
'use strict';

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'

    // shoutout AngusCroll (https://goo.gl/pxwQGp)
  };function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');
      if (!selector || selector === '#') {
        selector = element.getAttribute('href') || '';
      }

      try {
        var $selector = $(selector);
        return $selector.length > 0 ? selector : null;
      } catch (error) {
        return null;
      }
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
}(jQuery);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Alert = function () {
    function Alert(element) {
      classCallCheck(this, Alert);

      this._element = element;
    }

    // getters

    createClass(Alert, [{
      key: 'close',


      // public

      value: function close(element) {
        element = element || this._element;

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
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      }

      // private

    }, {
      key: '_getRootElement',
      value: function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = $(selector)[0];
        }

        if (!parent) {
          parent = $(element).closest('.' + ClassName.ALERT)[0];
        }

        return parent;
      }
    }, {
      key: '_triggerCloseEvent',
      value: function _triggerCloseEvent(element) {
        var closeEvent = $.Event(Event.CLOSE);

        $(element).trigger(closeEvent);
        return closeEvent;
      }
    }, {
      key: '_removeElement',
      value: function _removeElement(element) {
        var _this = this;

        $(element).removeClass(ClassName.SHOW);

        if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);
          return;
        }

        $(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      }
    }, {
      key: '_destroyElement',
      value: function _destroyElement(element) {
        $(element).detach().trigger(Event.CLOSED).remove();
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      }
    }, {
      key: '_handleDismiss',
      value: function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      }
    }, {
      key: 'VERSION',
      get: function get$$1() {
        return VERSION;
      }
    }]);
    return Alert;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Button = function () {
    function Button(element) {
      classCallCheck(this, Button);

      this._element = element;
    }

    // getters

    createClass(Button, [{
      key: 'toggle',


      // public

      value: function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = $(this._element).find(Selector.INPUT)[0];

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

                if (activeElement) {
                  $(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }
              input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
              $(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName.ACTIVE);
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get$$1() {
        return VERSION;
      }
    }]);
    return Button;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'carousel';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key
  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };

  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };

  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };

  var Event = {
    SLIDE: 'slide' + EVENT_KEY,
    SLID: 'slid' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
    TOUCHEND: 'touchend' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item'
  };

  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Carousel = function () {
    function Carousel(element, config) {
      classCallCheck(this, Carousel);

      this._items = null;
      this._interval = null;
      this._activeElement = null;

      this._isPaused = false;
      this._isSliding = false;

      this.touchTimeout = null;

      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    }

    // getters

    createClass(Carousel, [{
      key: 'next',


      // public

      value: function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      }
    }, {
      key: 'nextWhenVisible',
      value: function nextWhenVisible() {
        // Don't call next when the page isn't visible
        if (!document.hidden) {
          this.next();
        }
      }
    }, {
      key: 'prev',
      value: function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      }
    }, {
      key: 'pause',
      value: function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      }
    }, {
      key: 'cycle',
      value: function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      }
    }, {
      key: 'to',
      value: function to(index) {
        var _this = this;

        this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $(this._element).one(Event.SLID, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $(this._element).off(EVENT_KEY);
        $.removeData(this._element, DATA_KEY);

        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_addEventListeners',
      value: function _addEventListeners() {
        var _this2 = this;

        if (this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          $(this._element).on(Event.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });
          if ('ontouchstart' in document.documentElement) {
            // if it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $(this._element).on(Event.TOUCHEND, function () {
              _this2.pause();
              if (_this2.touchTimeout) {
                clearTimeout(_this2.touchTimeout);
              }
              _this2.touchTimeout = setTimeout(function (event) {
                return _this2.cycle(event);
              }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
            });
          }
        }
      }
    }, {
      key: '_keydown',
      value: function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;
          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;
          default:
            return;
        }
      }
    }, {
      key: '_getItemIndex',
      value: function _getItemIndex(element) {
        this._items = $.makeArray($(element).parent().find(Selector.ITEM));
        return this._items.indexOf(element);
      }
    }, {
      key: '_getItemByDirection',
      value: function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;
        var activeIndex = this._getItemIndex(activeElement);
        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;

        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      }
    }, {
      key: '_triggerSlideEvent',
      value: function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);
        var fromIndex = this._getItemIndex($(this._element).find(Selector.ACTIVE_ITEM)[0]);
        var slideEvent = $.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });

        $(this._element).trigger(slideEvent);

        return slideEvent;
      }
    }, {
      key: '_setActiveIndicatorElement',
      value: function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      }
    }, {
      key: '_slide',
      value: function _slide(direction, element) {
        var _this3 = this;

        var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
        var activeElementIndex = this._getItemIndex(activeElement);
        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);
        var nextElementIndex = this._getItemIndex(nextElement);
        var isCycling = Boolean(this._interval);

        var directionalClassName = void 0;
        var orderClassName = void 0;
        var eventDirectionName = void 0;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

          $(nextElement).addClass(orderClassName);

          Util.reflow(nextElement);

          $(activeElement).addClass(directionalClassName);
          $(nextElement).addClass(directionalClassName);

          $(activeElement).one(Util.TRANSITION_END, function () {
            $(nextElement).removeClass(directionalClassName + ' ' + orderClassName).addClass(ClassName.ACTIVE);

            $(activeElement).removeClass(ClassName.ACTIVE + ' ' + orderClassName + ' ' + directionalClassName);

            _this3._isSliding = false;

            setTimeout(function () {
              return $(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          $(activeElement).removeClass(ClassName.ACTIVE);
          $(nextElement).addClass(ClassName.ACTIVE);

          this._isSliding = false;
          $(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Default, $(this).data());

          if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
            $.extend(_config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (data[action] === undefined) {
              throw new Error('No method named "' + action + '"');
            }
            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      }
    }, {
      key: '_dataApiClickHandler',
      value: function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $(selector)[0];

        if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = $.extend({}, $(target).data(), $(this).data());
        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($(target), config);

        if (slideIndex) {
          $(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      }
    }, {
      key: 'VERSION',
      get: function get$$1() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get$$1() {
        return Default;
      }
    }]);
    return Carousel;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Collapse = function () {
    function Collapse(element, config) {
      classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));
      var tabToggles = $(Selector.DATA_TOGGLE);
      for (var i = 0; i < tabToggles.length; i++) {
        var elem = tabToggles[i];
        var selector = Util.getSelectorFromElement(elem);
        if (selector !== null && $(selector).filter(element).length > 0) {
          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // getters

    createClass(Collapse, [{
      key: 'toggle',


      // public

      value: function toggle() {
        if ($(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      }
    }, {
      key: 'show',
      value: function show() {
        var _this = this;

        if (this._isTransitioning || $(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var actives = void 0;
        var activesData = void 0;

        if (this._parent) {
          actives = $.makeArray($(this._parent).children().children(Selector.ACTIVES));
          if (!actives.length) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $(actives).data(DATA_KEY);
          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $.Event(Event.SHOW);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($(actives), 'hide');
          if (!activesData) {
            $(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);

          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          $(_this._element).trigger(Event.SHOWN);
        };

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = 'scroll' + capitalizedDimension;

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

        this._element.style[dimension] = this._element[scrollSize] + 'px';
      }
    }, {
      key: 'hide',
      value: function hide() {
        var _this2 = this;

        if (this._isTransitioning || !$(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var startEvent = $.Event(Event.HIDE);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + 'px';

        Util.reflow(this._element);

        $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

        if (this._triggerArray.length) {
          for (var i = 0; i < this._triggerArray.length; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);
            if (selector !== null) {
              var $elem = $(selector);
              if (!$elem.hasClass(ClassName.SHOW)) {
                $(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);
          $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      }
    }, {
      key: 'setTransitioning',
      value: function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);

        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);
        config.toggle = Boolean(config.toggle); // coerce string values
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_getDimension',
      value: function _getDimension() {
        var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      }
    }, {
      key: '_getParent',
      value: function _getParent() {
        var _this3 = this;

        var parent = $(this._config.parent)[0];
        var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

        $(parent).find(selector).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });

        return parent;
      }
    }, {
      key: '_addAriaAndCollapsedClass',
      value: function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $(element).hasClass(ClassName.SHOW);

          if (triggerArray.length) {
            $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }

      // static

    }], [{
      key: '_getTargetFromElement',
      value: function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? $(selector)[0] : null;
      }
    }, {
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);
          var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get$$1() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get$$1() {
        return Default;
      }
    }]);
    return Collapse;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    if (!/input|textarea/i.test(event.target.tagName)) {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    $(selector).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY);
      var config = data ? 'toggle' : $trigger.data();
      Collapse._jQueryInterface.call($target, config);
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'modal';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    NAVBAR_TOGGLER: '.navbar-toggler'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Modal = function () {
    function Modal(element, config) {
      classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    // getters

    createClass(Modal, [{
      key: 'toggle',


      // public

      value: function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      }
    }, {
      key: 'show',
      value: function show(relatedTarget) {
        var _this = this;

        if (this._isTransitioning) {
          return;
        }

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
        }

        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });

        $(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();
        this._setScrollbar();

        $(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();
        this._setResizeEvent();

        $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });

        $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      }
    }, {
      key: 'hide',
      value: function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        if (this._isTransitioning || !this._isShown) {
          return;
        }

        var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        var hideEvent = $.Event(Event.HIDE);

        $(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;

        this._setEscapeEvent();
        this._setResizeEvent();

        $(document).off(Event.FOCUSIN);

        $(this._element).removeClass(ClassName.SHOW);

        $(this._element).off(Event.CLICK_DISMISS);
        $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) {

          $(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          this._hideModal();
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);

        $(window, document, this._element, this._backdrop).off(EVENT_KEY);

        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._scrollbarWidth = null;
      }
    }, {
      key: 'handleUpdate',
      value: function handleUpdate() {
        this._adjustDialog();
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_showElement',
      value: function _showElement(relatedTarget) {
        var _this3 = this;

        var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // don't move modals dom position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';
        this._element.removeAttribute('aria-hidden');
        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }
          _this3._isTransitioning = false;
          $(_this3._element).trigger(shownEvent);
        };

        if (transition) {
          $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          transitionComplete();
        }
      }
    }, {
      key: '_enforceFocus',
      value: function _enforceFocus() {
        var _this4 = this;

        $(document).off(Event.FOCUSIN) // guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this4._element !== event.target && !$(_this4._element).has(event.target).length) {
            _this4._element.focus();
          }
        });
      }
    }, {
      key: '_setEscapeEvent',
      value: function _setEscapeEvent() {
        var _this5 = this;

        if (this._isShown && this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              event.preventDefault();
              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          $(this._element).off(Event.KEYDOWN_DISMISS);
        }
      }
    }, {
      key: '_setResizeEvent',
      value: function _setResizeEvent() {
        var _this6 = this;

        if (this._isShown) {
          $(window).on(Event.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          $(window).off(Event.RESIZE);
        }
      }
    }, {
      key: '_hideModal',
      value: function _hideModal() {
        var _this7 = this;

        this._element.style.display = 'none';
        this._element.setAttribute('aria-hidden', true);
        this._isTransitioning = false;
        this._showBackdrop(function () {
          $(document.body).removeClass(ClassName.OPEN);
          _this7._resetAdjustments();
          _this7._resetScrollbar();
          $(_this7._element).trigger(Event.HIDDEN);
        });
      }
    }, {
      key: '_removeBackdrop',
      value: function _removeBackdrop() {
        if (this._backdrop) {
          $(this._backdrop).remove();
          this._backdrop = null;
        }
      }
    }, {
      key: '_showBackdrop',
      value: function _showBackdrop(callback) {
        var _this8 = this;

        var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          var doAnimate = Util.supportsTransitionEnd() && animate;

          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            $(this._backdrop).addClass(animate);
          }

          $(this._backdrop).appendTo(document.body);

          $(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }
            if (event.target !== event.currentTarget) {
              return;
            }
            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (doAnimate) {
            Util.reflow(this._backdrop);
          }

          $(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) {
            return;
          }

          if (!doAnimate) {
            callback();
            return;
          }

          $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else if (!this._isShown && this._backdrop) {
          $(this._backdrop).removeClass(ClassName.SHOW);

          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();
            if (callback) {
              callback();
            }
          };

          if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
            $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }

      // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------

    }, {
      key: '_adjustDialog',
      value: function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + 'px';
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + 'px';
        }
      }
    }, {
      key: '_resetAdjustments',
      value: function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      }
    }, {
      key: '_checkScrollbar',
      value: function _checkScrollbar() {
        this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      }
    }, {
      key: '_setScrollbar',
      value: function _setScrollbar() {
        var _this9 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set

          // Adjust fixed content padding
          $(Selector.FIXED_CONTENT).each(function (index, element) {
            var actualPadding = $(element)[0].style.paddingRight;
            var calculatedPadding = $(element).css('padding-right');
            $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + 'px');
          });

          // Adjust navbar-toggler margin
          $(Selector.NAVBAR_TOGGLER).each(function (index, element) {
            var actualMargin = $(element)[0].style.marginRight;
            var calculatedMargin = $(element).css('margin-right');
            $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) + _this9._scrollbarWidth + 'px');
          });

          // Adjust body padding
          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = $('body').css('padding-right');
          $('body').data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + 'px');
        }
      }
    }, {
      key: '_resetScrollbar',
      value: function _resetScrollbar() {
        // Restore fixed content padding
        $(Selector.FIXED_CONTENT).each(function (index, element) {
          var padding = $(element).data('padding-right');
          if (typeof padding !== 'undefined') {
            $(element).css('padding-right', padding).removeData('padding-right');
          }
        });

        // Restore navbar-toggler margin
        $(Selector.NAVBAR_TOGGLER).each(function (index, element) {
          var margin = $(element).data('margin-right');
          if (typeof margin !== 'undefined') {
            $(element).css('margin-right', margin).removeData('margin-right');
          }
        });

        // Restore body padding
        var padding = $('body').data('padding-right');
        if (typeof padding !== 'undefined') {
          $('body').css('padding-right', padding).removeData('padding-right');
        }
      }
    }, {
      key: '_getScrollbarWidth',
      value: function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

          if (!data) {
            data = new Modal(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get$$1() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get$$1() {
        return Default;
      }
    }]);
    return Modal;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this10 = this;

    var target = void 0;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this10).is(':visible')) {
          _this10.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
}(jQuery);

/* global Popper */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = function ($) {

  /**
   * Check for Popper dependency
   * Popper - https://popper.js.org
   */
  if (typeof Popper === 'undefined') {
    throw new Error('Bootstrap tooltips require Popper.js (https://popper.js.org)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp('(^|\\s)' + CLASS_PREFIX + '\\S+', 'g');

  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)'
  };

  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };

  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip'
  };

  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };

  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Tooltip = function () {
    function Tooltip(element, config) {
      classCallCheck(this, Tooltip);


      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null;

      // protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    // getters

    createClass(Tooltip, [{
      key: 'enable',


      // public

      value: function enable() {
        this._isEnabled = true;
      }
    }, {
      key: 'disable',
      value: function disable() {
        this._isEnabled = false;
      }
    }, {
      key: 'toggleEnabled',
      value: function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      }
    }, {
      key: 'toggle',
      value: function toggle(event) {
        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {

          if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
            this._leave(null, this);
            return;
          }

          this._enter(null, this);
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        clearTimeout(this._timeout);

        $.removeData(this.element, this.constructor.DATA_KEY);

        $(this.element).off(this.constructor.EVENT_KEY);
        $(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;
        if (this._popper !== null) {
          this._popper.destroy();
        }
        this._popper = null;

        this.element = null;
        this.config = null;
        this.tip = null;
      }
    }, {
      key: 'show',
      value: function show() {
        var _this = this;

        if ($(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = $.Event(this.constructor.Event.SHOW);
        if (this.isWithContent() && this._isEnabled) {
          $(this.element).trigger(showEvent);

          var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);

          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);

          this.setContent();

          if (this.config.animation) {
            $(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);
          this.addAttachmentClass(attachment);

          var container = this.config.container === false ? document.body : $(this.config.container);

          $(tip).data(this.constructor.DATA_KEY, this);

          if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
            $(tip).appendTo(container);
          }

          $(this.element).trigger(this.constructor.Event.INSERTED);

          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: {
                offset: this.config.offset
              },
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: Selector.ARROW
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              _this._handlePopperPlacementChange(data);
            }
          });

          $(tip).addClass(ClassName.SHOW);

          // if this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
          if ('ontouchstart' in document.documentElement) {
            $('body').children().on('mouseover', null, $.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }
            var prevHoverState = _this._hoverState;
            _this._hoverState = null;

            $(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };

          if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
            $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
          } else {
            complete();
          }
        }
      }
    }, {
      key: 'hide',
      value: function hide(callback) {
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = $.Event(this.constructor.Event.HIDE);
        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this2._cleanTipClass();
          _this2.element.removeAttribute('aria-describedby');
          $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);
          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        $(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $(tip).removeClass(ClassName.SHOW);

        // if this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support
        if ('ontouchstart' in document.documentElement) {
          $('body').children().off('mouseover', null, $.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {

          $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        this._hoverState = '';
      }
    }, {
      key: 'update',
      value: function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }

      // protected

    }, {
      key: 'isWithContent',
      value: function isWithContent() {
        return Boolean(this.getTitle());
      }
    }, {
      key: 'addAttachmentClass',
      value: function addAttachmentClass(attachment) {
        $(this.getTipElement()).addClass(CLASS_PREFIX + '-' + attachment);
      }
    }, {
      key: 'getTipElement',
      value: function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      }
    }, {
      key: 'setContent',
      value: function setContent() {
        var $tip = $(this.getTipElement());
        this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());
        $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);
      }
    }, {
      key: 'setElementContent',
      value: function setElementContent($element, content) {
        var html = this.config.html;
        if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
          // content is a DOM node or a jQuery
          if (html) {
            if (!$(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      }
    }, {
      key: 'getTitle',
      value: function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }

      // private

    }, {
      key: '_getAttachment',
      value: function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      }
    }, {
      key: '_setListeners',
      value: function _setListeners() {
        var _this3 = this;

        var triggers = this.config.trigger.split(' ');

        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
              return _this3.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;

            $(_this3.element).on(eventIn, _this3.config.selector, function (event) {
              return _this3._enter(event);
            }).on(eventOut, _this3.config.selector, function (event) {
              return _this3._leave(event);
            });
          }

          $(_this3.element).closest('.modal').on('hide.bs.modal', function () {
            return _this3.hide();
          });
        });

        if (this.config.selector) {
          this.config = $.extend({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      }
    }, {
      key: '_fixTitle',
      value: function _fixTitle() {
        var titleType = _typeof(this.element.getAttribute('data-original-title'));
        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      }
    }, {
      key: '_enter',
      value: function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      }
    }, {
      key: '_leave',
      value: function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      }
    }, {
      key: '_isWithActiveTrigger',
      value: function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      }
    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

        if (config.delay && typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (config.title && typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (config.content && typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

        return config;
      }
    }, {
      key: '_getDelegateConfig',
      value: function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      }
    }, {
      key: '_cleanTipClass',
      value: function _cleanTipClass() {
        var $tip = $(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      }
    }, {
      key: '_handlePopperPlacementChange',
      value: function _handlePopperPlacementChange(data) {
        this._cleanTipClass();
        this.addAttachmentClass(this._getAttachment(data.placement));
      }
    }, {
      key: '_fixTransition',
      value: function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;
        if (tip.getAttribute('x-placement') !== null) {
          return;
        }
        $(tip).removeClass(ClassName.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get$$1() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get$$1() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get$$1() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get$$1() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get$$1() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get$$1() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get$$1() {
        return DefaultType;
      }
    }]);
    return Tooltip;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var CLASS_PREFIX = 'bs-popover';
  var BSCLS_PREFIX_REGEX = new RegExp('(^|\\s)' + CLASS_PREFIX + '\\S+', 'g');

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Popover = function (_Tooltip) {
    inherits(Popover, _Tooltip);

    function Popover() {
      classCallCheck(this, Popover);
      return possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).apply(this, arguments));
    }

    createClass(Popover, [{
      key: 'isWithContent',


      // overrides

      value: function isWithContent() {
        return this.getTitle() || this._getContent();
      }
    }, {
      key: 'addAttachmentClass',
      value: function addAttachmentClass(attachment) {
        $(this.getTipElement()).addClass(CLASS_PREFIX + '-' + attachment);
      }
    }, {
      key: 'getTipElement',
      value: function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      }
    }, {
      key: 'setContent',
      value: function setContent() {
        var $tip = $(this.getTipElement());

        // we use append for html objects to maintain js events
        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
        this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

        $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);
      }

      // private

    }, {
      key: '_getContent',
      value: function _getContent() {
        return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
      }
    }, {
      key: '_cleanTipClass',
      value: function _cleanTipClass() {
        var $tip = $(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',


      // getters

      get: function get$$1() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get$$1() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get$$1() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get$$1() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get$$1() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get$$1() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get$$1() {
        return DefaultType;
      }
    }]);
    return Popover;
  }(Tooltip);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };

  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  var Event = {
    ACTIVATE: 'activate' + EVENT_KEY,
    SCROLL: 'scroll' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  };

  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };

  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var ScrollSpy = function () {
    function ScrollSpy(element, config) {
      var _this = this;

      classCallCheck(this, ScrollSpy);

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.LIST_ITEMS + ',') + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;

      $(this._scrollElement).on(Event.SCROLL, function (event) {
        return _this._process(event);
      });

      this.refresh();
      this._process();
    }

    // getters

    createClass(ScrollSpy, [{
      key: 'refresh',


      // public

      value: function refresh() {
        var _this2 = this;

        var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

        this._offsets = [];
        this._targets = [];

        this._scrollHeight = this._getScrollHeight();

        var targets = $.makeArray($(this._selector));

        targets.map(function (element) {
          var target = void 0;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = $(targetSelector)[0];
          }

          if (target) {
            var targetBCR = target.getBoundingClientRect();
            if (targetBCR.width || targetBCR.height) {
              // todo (fat): remove sketch reliance on jQuery position/offset
              return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }
          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);
          _this2._targets.push(item[1]);
        });
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._scrollElement).off(EVENT_KEY);

        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);

        if (typeof config.target !== 'string') {
          var id = $(config.target).attr('id');
          if (!id) {
            id = Util.getUID(NAME);
            $(config.target).attr('id', id);
          }
          config.target = '#' + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);

        return config;
      }
    }, {
      key: '_getScrollTop',
      value: function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      }
    }, {
      key: '_getScrollHeight',
      value: function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      }
    }, {
      key: '_getOffsetHeight',
      value: function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      }
    }, {
      key: '_process',
      value: function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;
        var scrollHeight = this._getScrollHeight();
        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }
          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;
          this._clear();
          return;
        }

        for (var i = this._offsets.length; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      }
    }, {
      key: '_activate',
      value: function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(',');
        queries = queries.map(function (selector) {
          return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
        });

        var $link = $(queries.join(','));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // Set triggered link as active
          $link.addClass(ClassName.ACTIVE);
          // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ', ' + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE);
        }

        $(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      }
    }, {
      key: '_clear',
      value: function _clear() {
        $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get$$1() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get$$1() {
        return Default;
      }
    }]);
    return ScrollSpy;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $(scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = ScrollSpy._jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Tab = function () {
    function Tab(element) {
      classCallCheck(this, Tab);

      this._element = element;
    }

    // getters

    createClass(Tab, [{
      key: 'show',


      // public

      value: function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var target = void 0;
        var previous = void 0;
        var listElement = $(this._element).closest(Selector.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          previous = $.makeArray($(listElement).find(Selector.ACTIVE));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $.Event(Event.HIDE, {
          relatedTarget: this._element
        });

        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $(previous).trigger(hideEvent);
        }

        $(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = $(selector)[0];
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = $.Event(Event.HIDDEN, {
            relatedTarget: _this._element
          });

          var shownEvent = $.Event(Event.SHOWN, {
            relatedTarget: previous
          });

          $(previous).trigger(hiddenEvent);
          $(_this._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      }

      // private

    }, {
      key: '_activate',
      value: function _activate(element, container, callback) {
        var _this2 = this;

        var active = $(container).find(Selector.ACTIVE)[0];
        var isTransitioning = callback && Util.supportsTransitionEnd() && active && $(active).hasClass(ClassName.FADE);

        var complete = function complete() {
          return _this2._transitionComplete(element, active, isTransitioning, callback);
        };

        if (active && isTransitioning) {
          $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        if (active) {
          $(active).removeClass(ClassName.SHOW);
        }
      }
    }, {
      key: '_transitionComplete',
      value: function _transitionComplete(element, active, isTransitioning, callback) {
        if (active) {
          $(active).removeClass(ClassName.ACTIVE);

          var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          active.setAttribute('aria-expanded', false);
        }

        $(element).addClass(ClassName.ACTIVE);
        element.setAttribute('aria-expanded', true);

        if (isTransitioning) {
          Util.reflow(element);
          $(element).addClass(ClassName.SHOW);
        } else {
          $(element).removeClass(ClassName.FADE);
        }

        if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

          var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
          if (dropdownElement) {
            $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get$$1() {
        return VERSION;
      }
    }]);
    return Tab;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($(this), 'show');
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
}(jQuery);

var Util$2 = function () {
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transitionEnd = false;
  var _transitionEndSelector = "";

  var TransitionEndEvent = {
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd otransitionend",
    transition: "transitionend"
  };

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement("bmd");

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return TransitionEndEvent[name]; // { end: TransitionEndEvent[name] }
      }
    }

    return false;
  }

  function setTransitionEndSupport() {
    transitionEnd = transitionEndTest();

    // generate a concatenated transition end event selector
    for (var name in TransitionEndEvent) {
      _transitionEndSelector += " " + TransitionEndEvent[name];
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {
    transitionEndSupported: function transitionEndSupported() {
      return transitionEnd;
    },
    transitionEndSelector: function transitionEndSelector() {
      return _transitionEndSelector;
    },
    isChar: function isChar(event) {
      if (typeof event.which === "undefined") {
        return true;
      } else if (typeof event.which === "number" && event.which > 0) {
        return !event.ctrlKey && !event.metaKey && !event.altKey && event.which !== 8 && // backspace
        event.which !== 9 && // tab
        event.which !== 13 && // enter
        event.which !== 16 && // shift
        event.which !== 17 && // ctrl
        event.which !== 20 && // caps lock
        event.which !== 27 // escape
        ;
      }
      return false;
    },
    assert: function assert($element, invalidTest, message) {
      if (invalidTest) {
        if (!$element === undefined) {
          $element.css("border", "1px solid red");
        }
        console.error(message, $element); // eslint-disable-line no-console
        throw message;
      }
    },
    describe: function describe($element) {
      if ($element === undefined) {
        return "undefined";
      } else if ($element.length === 0) {
        return "(no matching elements)";
      }
      return $element[0].outerHTML.split(">")[0] + ">";
    }
  };

  setTransitionEndSupport();
  return Util;
}(jQuery);

var Base = function ($) {
  var ClassName = {
    BMD_FORM_GROUP: "bmd-form-group",
    IS_FILLED: "is-filled",
    IS_FOCUSED: "is-focused"
  };

  var Selector = {
    BMD_FORM_GROUP: "." + ClassName.BMD_FORM_GROUP
  };

  var Default = {};

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Base = function () {
    /**
     *
     * @param element
     * @param config
     * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
     */
    function Base($element, config) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Base);

      this.$element = $element;
      this.config = $.extend(true, {}, Default, config);

      // set properties for use in the constructor initialization
      for (var key in properties) {
        this[key] = properties[key];
      }
    }

    createClass(Base, [{
      key: "dispose",
      value: function dispose(dataKey) {
        this.$element.data(dataKey, null);
        this.$element = null;
        this.config = null;
      }

      // ------------------------------------------------------------------------
      // protected

    }, {
      key: "addFormGroupFocus",
      value: function addFormGroupFocus() {
        if (!this.$element.prop("disabled")) {
          this.$bmdFormGroup.addClass(ClassName.IS_FOCUSED);
        }
      }
    }, {
      key: "removeFormGroupFocus",
      value: function removeFormGroupFocus() {
        this.$bmdFormGroup.removeClass(ClassName.IS_FOCUSED);
      }
    }, {
      key: "removeIsFilled",
      value: function removeIsFilled() {
        this.$bmdFormGroup.removeClass(ClassName.IS_FILLED);
      }
    }, {
      key: "addIsFilled",
      value: function addIsFilled() {
        this.$bmdFormGroup.addClass(ClassName.IS_FILLED);
      }

      // Find bmd-form-group

    }, {
      key: "findMdbFormGroup",
      value: function findMdbFormGroup() {
        var raiseError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var mfg = this.$element.closest(Selector.BMD_FORM_GROUP);
        if (mfg.length === 0 && raiseError) {
          $.error("Failed to find " + Selector.BMD_FORM_GROUP + " for " + Util$2.describe(this.$element));
        }
        return mfg;
      }

      // ------------------------------------------------------------------------
      // private

      // ------------------------------------------------------------------------
      // static

    }]);
    return Base;
  }();

  return Base;
}(jQuery);

var BaseInput = function ($) {
  var ClassName = {
    FORM_GROUP: "form-group",
    BMD_FORM_GROUP: "bmd-form-group",
    BMD_LABEL: "bmd-label",
    BMD_LABEL_STATIC: "bmd-label-static",
    BMD_LABEL_PLACEHOLDER: "bmd-label-placeholder",
    BMD_LABEL_FLOATING: "bmd-label-floating",
    HAS_DANGER: "has-danger",
    IS_FILLED: "is-filled",
    IS_FOCUSED: "is-focused",
    INPUT_GROUP: "input-group"
  };

  var Selector = {
    FORM_GROUP: "." + ClassName.FORM_GROUP,
    BMD_FORM_GROUP: "." + ClassName.BMD_FORM_GROUP,
    BMD_LABEL_WILDCARD: "label[class^='" + ClassName.BMD_LABEL + "'], label[class*=' " + ClassName.BMD_LABEL + "']" // match any label variant if specified
  };

  var Default = {
    validate: false,
    formGroup: {
      required: false
    },
    bmdFormGroup: {
      template: "<span class='" + ClassName.BMD_FORM_GROUP + "'></span>",
      create: true, // create a wrapper if form-group not found
      required: true // not recommended to turn this off, only used for inline components
    },
    label: {
      required: false,

      // Prioritized find order for resolving the label to be used as an bmd-label if not specified in the markup
      //  - a function(thisComponent); or
      //  - a string selector used like $bmdFormGroup.find(selector)
      //
      // Note this only runs if $bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD) fails to find a label (as authored in the markup)
      //
      selectors: [".form-control-label", // in the case of horizontal or inline forms, this will be marked
      "> label" // usual case for text inputs, first child.  Deeper would find toggle labels so don't do that.
      ],
      className: ClassName.BMD_LABEL_STATIC
    },
    requiredClasses: [],
    invalidComponentMatches: [],
    convertInputSizeVariations: true
  };

  var FormControlSizeMarkers = {
    "form-control-lg": "bmd-form-group-lg",
    "form-control-sm": "bmd-form-group-sm"
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var BaseInput = function (_Base) {
    inherits(BaseInput, _Base);

    /**
     *
     * @param element
     * @param config
     * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
     */
    function BaseInput($element, config) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, BaseInput);

      // Enforce no overlap between components to prevent side effects
      var _this = possibleConstructorReturn(this, (BaseInput.__proto__ || Object.getPrototypeOf(BaseInput)).call(this, $element, $.extend(true, {}, Default, config), properties));

      _this._rejectInvalidComponentMatches();

      // Enforce expected structure (if any)
      _this.rejectWithoutRequiredStructure();

      // Enforce required classes for a consistent rendering
      _this._rejectWithoutRequiredClasses();

      // Resolve the form-group first, it will be used for bmd-form-group if possible
      //   note: different components have different rules
      _this.$formGroup = _this.findFormGroup(_this.config.formGroup.required);

      // Will add bmd-form-group to form-group or create an bmd-form-group
      //  Performance Note: for those forms that are really performance driven, create the markup with the .bmd-form-group to avoid
      //    rendering changes once added.
      _this.$bmdFormGroup = _this.resolveMdbFormGroup();

      // Resolve and mark the bmdLabel if necessary as defined by the config
      _this.$bmdLabel = _this.resolveMdbLabel();

      // Signal to the bmd-form-group that a form-control-* variation is being used
      _this.resolveMdbFormGroupSizing();

      _this.addFocusListener();
      _this.addChangeListener();

      if (_this.$element.val() != "") {
        _this.addIsFilled();
      }
      return _this;
    }

    createClass(BaseInput, [{
      key: "dispose",
      value: function dispose(dataKey) {
        get(BaseInput.prototype.__proto__ || Object.getPrototypeOf(BaseInput.prototype), "dispose", this).call(this, dataKey);
        this.$bmdFormGroup = null;
        this.$formGroup = null;
      }

      // ------------------------------------------------------------------------
      // protected

    }, {
      key: "rejectWithoutRequiredStructure",
      value: function rejectWithoutRequiredStructure() {
        // implement
      }
    }, {
      key: "addFocusListener",
      value: function addFocusListener() {
        var _this2 = this;

        this.$element.on("focus", function () {
          _this2.addFormGroupFocus();
        }).on("blur", function () {
          _this2.removeFormGroupFocus();
        });
      }
    }, {
      key: "addChangeListener",
      value: function addChangeListener() {
        var _this3 = this;

        this.$element.on("keydown paste", function (event) {
          if (Util$2.isChar(event)) {
            _this3.addIsFilled();
          }
        }).on("keyup change", function () {
          // make sure empty is added back when there is a programmatic value change.
          //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
          if (_this3.isEmpty()) {
            _this3.removeIsFilled();
          } else {
            _this3.addIsFilled();
          }

          if (_this3.config.validate) {
            // Validation events do not bubble, so they must be attached directly to the text: http://jsfiddle.net/PEpRM/1/
            //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
            //  the form-group on change.
            //
            // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
            //        BUT, I've left it here for backwards compatibility.
            var isValid = typeof _this3.$element[0].checkValidity === "undefined" || _this3.$element[0].checkValidity();
            if (isValid) {
              _this3.removeHasDanger();
            } else {
              _this3.addHasDanger();
            }
          }
        });
      }
    }, {
      key: "addHasDanger",
      value: function addHasDanger() {
        this.$bmdFormGroup.addClass(ClassName.HAS_DANGER);
      }
    }, {
      key: "removeHasDanger",
      value: function removeHasDanger() {
        this.$bmdFormGroup.removeClass(ClassName.HAS_DANGER);
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return this.$element.val() === null || this.$element.val() === undefined || this.$element.val() === "";
      }

      // Will add bmd-form-group to form-group or create a bmd-form-group if necessary

    }, {
      key: "resolveMdbFormGroup",
      value: function resolveMdbFormGroup() {
        var mfg = this.findMdbFormGroup(false);
        if (mfg === undefined || mfg.length === 0) {
          if (this.config.bmdFormGroup.create && (this.$formGroup === undefined || this.$formGroup.length === 0)) {
            // If a form-group doesn't exist (not recommended), take a guess and wrap the element (assuming no label).
            //  note: it's possible to make this smarter, but I need to see valid cases before adding any complexity.

            // this may be an input-group, wrap that instead
            if (this.outerElement().parent().hasClass(ClassName.INPUT_GROUP)) {
              this.outerElement().parent().wrap(this.config.bmdFormGroup.template);
            } else {
              this.outerElement().wrap(this.config.bmdFormGroup.template);
            }
          } else {
            // a form-group does exist, add our marker class to it
            this.$formGroup.addClass(ClassName.BMD_FORM_GROUP);

            // OLD: may want to implement this after all, see how the styling turns out, but using an existing form-group is less manipulation of the dom and therefore preferable
            // A form-group does exist, so add an bmd-form-group wrapping it's internal contents
            //fg.wrapInner(this.config.bmdFormGroup.template)
          }

          mfg = this.findMdbFormGroup(this.config.bmdFormGroup.required);
        }

        return mfg;
      }

      // Demarcation element (e.g. first child of a form-group)
      //  Subclasses such as file inputs may have different structures

    }, {
      key: "outerElement",
      value: function outerElement() {
        return this.$element;
      }

      // Will add bmd-label to bmd-form-group if not already specified

    }, {
      key: "resolveMdbLabel",
      value: function resolveMdbLabel() {
        var label = this.$bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD);
        if (label === undefined || label.length === 0) {
          // we need to find it based on the configured selectors
          label = this.findMdbLabel(this.config.label.required);

          if (label === undefined || label.length === 0) {
            // no label found, and finder did not require one
          } else {
            // a candidate label was found, add the configured default class name
            label.addClass(this.config.label.className);
          }
        }

        return label;
      }

      // Find bmd-label variant based on the config selectors

    }, {
      key: "findMdbLabel",
      value: function findMdbLabel() {
        var raiseError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var label = null;

        // use the specified selector order
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.config.label.selectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var selector = _step.value;

            if ($.isFunction(selector)) {
              label = selector(this);
            } else {
              label = this.$bmdFormGroup.find(selector);
            }

            if (label !== undefined && label.length > 0) {
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (label.length === 0 && raiseError) {
          $.error("Failed to find " + Selector.BMD_LABEL_WILDCARD + " within form-group for " + Util$2.describe(this.$element));
        }
        return label;
      }

      // Find bmd-form-group

    }, {
      key: "findFormGroup",
      value: function findFormGroup() {
        var raiseError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var fg = this.$element.closest(Selector.FORM_GROUP);
        if (fg.length === 0 && raiseError) {
          $.error("Failed to find " + Selector.FORM_GROUP + " for " + Util$2.describe(this.$element));
        }
        return fg;
      }

      // Due to the interconnected nature of labels/inputs/help-blocks, signal the bmd-form-group-* size variation based on
      //  a found form-control-* size

    }, {
      key: "resolveMdbFormGroupSizing",
      value: function resolveMdbFormGroupSizing() {
        if (!this.config.convertInputSizeVariations) {
          return;
        }

        // Modification - Change text-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
        for (var inputSize in FormControlSizeMarkers) {
          if (this.$element.hasClass(inputSize)) {
            //this.$element.removeClass(inputSize)
            this.$bmdFormGroup.addClass(FormControlSizeMarkers[inputSize]);
          }
        }
      }

      // ------------------------------------------------------------------------
      // private

    }, {
      key: "_rejectInvalidComponentMatches",
      value: function _rejectInvalidComponentMatches() {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.config.invalidComponentMatches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var otherComponent = _step2.value;

            otherComponent.rejectMatch(this.constructor.name, this.$element);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }, {
      key: "_rejectWithoutRequiredClasses",
      value: function _rejectWithoutRequiredClasses() {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.config.requiredClasses[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var requiredClass = _step3.value;

            var found = false;
            // allow one of several classes to be passed in x||y
            if (requiredClass.indexOf("||") !== -1) {
              var oneOf = requiredClass.split("||");
              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                for (var _iterator4 = oneOf[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  var _requiredClass = _step4.value;

                  if (this.$element.hasClass(_requiredClass)) {
                    found = true;
                    break;
                  }
                }
              } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                  }
                } finally {
                  if (_didIteratorError4) {
                    throw _iteratorError4;
                  }
                }
              }
            } else if (this.$element.hasClass(requiredClass)) {
              found = true;
            }

            // error if not found
            if (!found) {
              $.error(this.constructor.name + " element: " + Util$2.describe(this.$element) + " requires class: " + requiredClass);
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      // ------------------------------------------------------------------------
      // static

    }]);
    return BaseInput;
  }(Base);

  return BaseInput;
}(jQuery);

var BaseSelection = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var Default = {
    label: {
      required: false

      // Prioritized find order for resolving the label to be used as an bmd-label if not specified in the markup
      //  - a function(thisComponent); or
      //  - a string selector used like $bmdFormGroup.find(selector)
      //
      // Note this only runs if $bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD) fails to find a label (as authored in the markup)
      //
      //selectors: [
      //  `.form-control-label`, // in the case of horizontal or inline forms, this will be marked
      //  `> label` // usual case for text inputs
      //]
    }
  };

  var Selector = {
    LABEL: "label"
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var BaseSelection = function (_BaseInput) {
    inherits(BaseSelection, _BaseInput);

    function BaseSelection($element, config, properties) {
      classCallCheck(this, BaseSelection);

      var _this = possibleConstructorReturn(this, (BaseSelection.__proto__ || Object.getPrototypeOf(BaseSelection)).call(this, $element, $.extend(true, {}, Default, config), properties));
      // properties = {inputType: checkbox, outerClass: checkbox-inline}
      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
      // '.${this.outerClass} > label > input[type=${this.inputType}]'

      _this.decorateMarkup();
      return _this;
    }

    // ------------------------------------------------------------------------
    // protected

    createClass(BaseSelection, [{
      key: "decorateMarkup",
      value: function decorateMarkup() {
        var $decorator = $(this.config.template);
        this.$element.after($decorator);

        // initialize ripples after decorator has been inserted into DOM
        if (this.config.ripples !== false) {
          $decorator.bmdRipples();
        }
      }

      // Demarcation element (e.g. first child of a form-group)

    }, {
      key: "outerElement",
      value: function outerElement() {
        // .checkbox|switch|radio > label > input[type=checkbox|radio]
        // label.checkbox-inline > input[type=checkbox|radio]
        // .${this.outerClass} > label > input[type=${this.inputType}]
        return this.$element.parent().closest("." + this.outerClass);
      }
    }, {
      key: "rejectWithoutRequiredStructure",
      value: function rejectWithoutRequiredStructure() {
        // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
        // '.${this.outerClass} > label > input[type=${this.inputType}]'
        Util$2.assert(this.$element, !this.$element.parent().prop("tagName") === "label", this.constructor.name + "'s " + Util$2.describe(this.$element) + " parent element should be <label>.");
        Util$2.assert(this.$element, !this.outerElement().hasClass(this.outerClass), this.constructor.name + "'s " + Util$2.describe(this.$element) + " outer element should have class " + this.outerClass + ".");
      }
    }, {
      key: "addFocusListener",
      value: function addFocusListener() {
        var _this2 = this;

        // checkboxes didn't appear to bubble to the document, so we'll bind these directly
        this.$element.closest(Selector.LABEL).hover(function () {
          _this2.addFormGroupFocus();
        }, function () {
          _this2.removeFormGroupFocus();
        });
      }
    }, {
      key: "addChangeListener",
      value: function addChangeListener() {
        var _this3 = this;

        this.$element.change(function () {
          _this3.$element.blur();
        });
      }

      // ------------------------------------------------------------------------
      // private

    }]);
    return BaseSelection;
  }(BaseInput);

  return BaseSelection;
}(jQuery);

//import Text from './text'
//import File from './file'
//import Radio from './radio'
//import Textarea from './textarea'
//import Select from './select'
var Checkbox = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "checkbox";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {
    template: "<span class='checkbox-decorator'><span class='check'></span></span>"
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Checkbox = function (_BaseSelection) {
    inherits(Checkbox, _BaseSelection);

    function Checkbox($element, config) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { inputType: NAME, outerClass: NAME };
      classCallCheck(this, Checkbox);
      return possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, $element, $.extend(true,
      //{invalidComponentMatches: [File, Radio, Text, Textarea, Select]},
      Default, config), properties));
    }

    createClass(Checkbox, [{
      key: "dispose",
      value: function dispose() {
        var dataKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DATA_KEY;

        get(Checkbox.prototype.__proto__ || Object.getPrototypeOf(Checkbox.prototype), "dispose", this).call(this, dataKey);
      }
    }], [{
      key: "matches",
      value: function matches($element) {
        // '.checkbox > label > input[type=checkbox]'
        if ($element.attr("type") === "checkbox") {
          return true;
        }
        return false;
      }
    }, {
      key: "rejectMatch",
      value: function rejectMatch(component, $element) {
        Util$2.assert(this.$element, this.matches($element), component + " component element " + Util$2.describe($element) + " is invalid for type='checkbox'.");
      }

      // ------------------------------------------------------------------------
      // protected

      // ------------------------------------------------------------------------
      // protected

      // ------------------------------------------------------------------------
      // private

      // ------------------------------------------------------------------------
      // static

    }, {
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Checkbox($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);
    return Checkbox;
  }(BaseSelection);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = Checkbox._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Checkbox;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Checkbox._jQueryInterface;
  };

  return Checkbox;
}(jQuery);

var CheckboxInline = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "checkboxInline";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {
    bmdFormGroup: {
      create: false, // no bmd-form-group creation if form-group not present. It messes with the layout.
      required: false
    }
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var CheckboxInline = function (_Checkbox) {
    inherits(CheckboxInline, _Checkbox);

    function CheckboxInline($element, config) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { inputType: "checkbox", outerClass: "checkbox-inline" };
      classCallCheck(this, CheckboxInline);
      return possibleConstructorReturn(this, (CheckboxInline.__proto__ || Object.getPrototypeOf(CheckboxInline)).call(this, $element, $.extend(true, {}, Default, config), properties));
    }

    createClass(CheckboxInline, [{
      key: "dispose",
      value: function dispose() {
        get(CheckboxInline.prototype.__proto__ || Object.getPrototypeOf(CheckboxInline.prototype), "dispose", this).call(this, DATA_KEY);
      }

      //static matches($element) {
      //  // '.checkbox-inline > input[type=checkbox]'
      //  if ($element.attr('type') === 'checkbox') {
      //    return true
      //  }
      //  return false
      //}
      //
      //static rejectMatch(component, $element) {
      //  Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for type='checkbox'.`)
      //}

      // ------------------------------------------------------------------------
      // protected

      // ------------------------------------------------------------------------
      // protected

      // ------------------------------------------------------------------------
      // private

      // ------------------------------------------------------------------------
      // static

    }], [{
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new CheckboxInline($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);
    return CheckboxInline;
  }(Checkbox);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = CheckboxInline._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = CheckboxInline;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return CheckboxInline._jQueryInterface;
  };

  return CheckboxInline;
}(jQuery);

var CollapseInline = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "collapseInline";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Selector = {
    ANY_INPUT: "input, select, textarea"
  };

  var ClassName = {
    IN: "in",
    COLLAPSE: "collapse",
    COLLAPSING: "collapsing",
    COLLAPSED: "collapsed",
    WIDTH: "width"
  };
  var Default = {};

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var CollapseInline = function (_Base) {
    inherits(CollapseInline, _Base);

    // $element is expected to be the trigger
    //  i.e. <button class="btn bmd-btn-icon" for="search" data-toggle="collapse" data-target="#search-field" aria-expanded="false" aria-controls="search-field">
    function CollapseInline($element, config) {
      classCallCheck(this, CollapseInline);

      var _this = possibleConstructorReturn(this, (CollapseInline.__proto__ || Object.getPrototypeOf(CollapseInline)).call(this, $element, $.extend(true, {}, Default, config)));

      _this.$bmdFormGroup = _this.findMdbFormGroup(true);

      var collapseSelector = $element.data("target");
      _this.$collapse = $(collapseSelector);

      Util$2.assert($element, _this.$collapse.length === 0, "Cannot find collapse target for " + Util$2.describe($element));
      Util$2.assert(_this.$collapse, !_this.$collapse.hasClass(ClassName.COLLAPSE), Util$2.describe(_this.$collapse) + " is expected to have the '" + ClassName.COLLAPSE + "' class.  It is being targeted by " + Util$2.describe($element));

      // find the first input for focusing
      var $inputs = _this.$bmdFormGroup.find(Selector.ANY_INPUT);
      if ($inputs.length > 0) {
        _this.$input = $inputs.first();
      }

      // automatically add the marker class to collapse width instead of height - nice convenience because it is easily forgotten
      if (!_this.$collapse.hasClass(ClassName.WIDTH)) {
        _this.$collapse.addClass(ClassName.WIDTH);
      }

      if (_this.$input) {
        // add a listener to set focus
        _this.$collapse.on("shown.bs.collapse", function () {
          _this.$input.focus();
        });

        // add a listener to collapse field
        _this.$input.blur(function () {
          _this.$collapse.collapse("hide");
        });
      }
      return _this;
    }

    createClass(CollapseInline, [{
      key: "dispose",
      value: function dispose() {
        get(CollapseInline.prototype.__proto__ || Object.getPrototypeOf(CollapseInline.prototype), "dispose", this).call(this, DATA_KEY);
        this.$bmdFormGroup = null;
        this.$collapse = null;
        this.$input = null;
      }

      // ------------------------------------------------------------------------
      // private

      // ------------------------------------------------------------------------
      // static

    }], [{
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new CollapseInline($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);
    return CollapseInline;
  }(Base);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = CollapseInline._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = CollapseInline;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return CollapseInline._jQueryInterface;
  };

  return CollapseInline;
}(jQuery);

//import Checkbox from './checkbox'
//import Radio from './radio'
//import Switch from './switch'
//import Text from './text'
//import Textarea from './textarea'
//import Select from './select'
var File = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "file";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {};

  var ClassName = {
    FILE: NAME,
    IS_FILE: "is-file"
  };

  var Selector = {
    FILENAMES: "input.form-control[readonly]"
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var File = function (_BaseInput) {
    inherits(File, _BaseInput);

    function File($element, config) {
      classCallCheck(this, File);

      var _this = possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).call(this, $element, $.extend(true,
      //{invalidComponentMatches: [Checkbox, Radio, Text, Textarea, Select, Switch]},
      Default, config)));

      _this.$bmdFormGroup.addClass(ClassName.IS_FILE);
      return _this;
    }

    createClass(File, [{
      key: "dispose",
      value: function dispose() {
        get(File.prototype.__proto__ || Object.getPrototypeOf(File.prototype), "dispose", this).call(this, DATA_KEY);
      }
    }, {
      key: "outerElement",


      // ------------------------------------------------------------------------
      // protected

      // Demarcation element (e.g. first child of a form-group)
      value: function outerElement() {
        // label.file > input[type=file]
        return this.$element.parent().closest("." + ClassName.FILE);
      }
    }, {
      key: "rejectWithoutRequiredStructure",
      value: function rejectWithoutRequiredStructure() {
        // label.file > input[type=file]
        Util$2.assert(this.$element, !this.outerElement().prop("tagName") === "label", this.constructor.name + "'s " + Util$2.describe(this.$element) + " parent element " + Util$2.describe(this.outerElement()) + " should be <label>.");
        Util$2.assert(this.$element, !this.outerElement().hasClass(ClassName.FILE), this.constructor.name + "'s " + Util$2.describe(this.$element) + " parent element " + Util$2.describe(this.outerElement()) + " should have class ." + ClassName.FILE + ".");
      }
    }, {
      key: "addFocusListener",
      value: function addFocusListener() {
        var _this2 = this;

        this.$bmdFormGroup.on("focus", function () {
          _this2.addFormGroupFocus();
        }).on("blur", function () {
          _this2.removeFormGroupFocus();
        });
      }
    }, {
      key: "addChangeListener",
      value: function addChangeListener() {
        var _this3 = this;

        // set the fileinput readonly field with the name of the file
        this.$element.on("change", function () {
          var value = "";
          $.each(_this3.$element.files, function (i, file) {
            value += file.name + "  , ";
          });
          value = value.substring(0, value.length - 2);
          if (value) {
            _this3.addIsFilled();
          } else {
            _this3.removeIsFilled();
          }
          _this3.$bmdFormGroup.find(Selector.FILENAMES).val(value);
        });
      }

      // ------------------------------------------------------------------------
      // private

      // ------------------------------------------------------------------------
      // static

    }], [{
      key: "matches",
      value: function matches($element) {
        if ($element.attr("type") === "file") {
          return true;
        }
        return false;
      }
    }, {
      key: "rejectMatch",
      value: function rejectMatch(component, $element) {
        Util$2.assert(this.$element, this.matches($element), component + " component element " + Util$2.describe($element) + " is invalid for type='file'.");
      }
    }, {
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new File($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);
    return File;
  }(BaseInput);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = File._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = File;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return File._jQueryInterface;
  };

  return File;
}(jQuery);

//import Text from './text'
//import File from './file'
//import Checkbox from './checkbox'
//import Switch from './switch'
var Radio = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "radio";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {
    template: "<span class='bmd-radio'></span>"
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Radio = function (_BaseSelection) {
    inherits(Radio, _BaseSelection);

    function Radio($element, config) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { inputType: NAME, outerClass: NAME };
      classCallCheck(this, Radio);
      return possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, $element, $.extend(true,
      //{invalidComponentMatches: [Checkbox, File, Switch, Text]},
      Default, config), properties));
    }

    createClass(Radio, [{
      key: "dispose",
      value: function dispose() {
        var dataKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DATA_KEY;

        get(Radio.prototype.__proto__ || Object.getPrototypeOf(Radio.prototype), "dispose", this).call(this, dataKey);
      }
    }], [{
      key: "matches",
      value: function matches($element) {
        // '.radio > label > input[type=radio]'
        if ($element.attr("type") === "radio") {
          return true;
        }
        return false;
      }
    }, {
      key: "rejectMatch",
      value: function rejectMatch(component, $element) {
        Util$2.assert(this.$element, this.matches($element), component + " component element " + Util$2.describe($element) + " is invalid for type='radio'.");
      }

      // ------------------------------------------------------------------------
      // protected

      //decorateMarkup() {
      //  this.$element.after(this.config.template)
      //}

      // ------------------------------------------------------------------------
      // private

      // ------------------------------------------------------------------------
      // static

    }, {
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Radio($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);
    return Radio;
  }(BaseSelection);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = Radio._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Radio;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Radio._jQueryInterface;
  };

  return Radio;
}(jQuery);

var RadioInline = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "radioInline";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {
    bmdFormGroup: {
      create: false, // no bmd-form-group creation if form-group not present. It messes with the layout.
      required: false
    }
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var RadioInline = function (_Radio) {
    inherits(RadioInline, _Radio);

    function RadioInline($element, config) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { inputType: "radio", outerClass: "radio-inline" };
      classCallCheck(this, RadioInline);
      return possibleConstructorReturn(this, (RadioInline.__proto__ || Object.getPrototypeOf(RadioInline)).call(this, $element, $.extend(true, {}, Default, config), properties));
    }

    createClass(RadioInline, [{
      key: "dispose",
      value: function dispose() {
        get(RadioInline.prototype.__proto__ || Object.getPrototypeOf(RadioInline.prototype), "dispose", this).call(this, DATA_KEY);
      }

      // ------------------------------------------------------------------------
      // protected

      // ------------------------------------------------------------------------
      // protected

      // ------------------------------------------------------------------------
      // private

      // ------------------------------------------------------------------------
      // static

    }], [{
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new RadioInline($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);
    return RadioInline;
  }(Radio);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = RadioInline._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = RadioInline;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return RadioInline._jQueryInterface;
  };

  return RadioInline;
}(jQuery);

var BaseFormControl = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var Default = {
    requiredClasses: ["form-control"]
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var BaseFormControl = function (_BaseInput) {
    inherits(BaseFormControl, _BaseInput);

    function BaseFormControl($element, config) {
      classCallCheck(this, BaseFormControl);

      // Initially mark as empty
      var _this = possibleConstructorReturn(this, (BaseFormControl.__proto__ || Object.getPrototypeOf(BaseFormControl)).call(this, $element, $.extend(true, Default, config)));

      if (_this.isEmpty()) {
        _this.removeIsFilled();
      }
      return _this;
    }

    return BaseFormControl;
  }(BaseInput);

  return BaseFormControl;
}(jQuery);

//import Checkbox from './checkbox'
//import File from './file'
//import Radio from './radio'
//import Switch from './switch'
//import Text from './text'
//import Textarea from './textarea'
var Select = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "select";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {
    requiredClasses: ["form-control||custom-select"]
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Select = function (_BaseFormControl) {
    inherits(Select, _BaseFormControl);

    function Select($element, config) {
      classCallCheck(this, Select);

      // floating labels will cover the options, so trigger them to be above (if used)
      var _this = possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, $element, $.extend(true,
      //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Text, Textarea]},
      Default, config)));

      _this.addIsFilled();
      return _this;
    }

    createClass(Select, [{
      key: "dispose",
      value: function dispose() {
        get(Select.prototype.__proto__ || Object.getPrototypeOf(Select.prototype), "dispose", this).call(this, DATA_KEY);
      }
    }], [{
      key: "matches",
      value: function matches($element) {
        if ($element.prop("tagName") === "select") {
          return true;
        }
        return false;
      }
    }, {
      key: "rejectMatch",
      value: function rejectMatch(component, $element) {
        Util$2.assert(this.$element, this.matches($element), component + " component element " + Util$2.describe($element) + " is invalid for <select>.");
      }

      // ------------------------------------------------------------------------
      // protected

      // ------------------------------------------------------------------------
      // private

      // ------------------------------------------------------------------------
      // static

    }, {
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Select($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);
    return Select;
  }(BaseFormControl);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = Select._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Select;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Select._jQueryInterface;
  };

  return Select;
}(jQuery);

var Switch = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "switch";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {
    template: "<span class='bmd-switch-track'></span>"
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Switch = function (_Checkbox) {
    inherits(Switch, _Checkbox);

    function Switch($element, config) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { inputType: "checkbox", outerClass: "switch" };
      classCallCheck(this, Switch);
      return possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, $element, $.extend(true, {}, Default, config), properties));
      // selector: '.switch > label > input[type=checkbox]'
    }

    createClass(Switch, [{
      key: "dispose",
      value: function dispose() {
        get(Switch.prototype.__proto__ || Object.getPrototypeOf(Switch.prototype), "dispose", this).call(this, DATA_KEY);
      }

      // ------------------------------------------------------------------------
      // protected

      // ------------------------------------------------------------------------
      // private

      // ------------------------------------------------------------------------
      // static

    }], [{
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Switch($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);
    return Switch;
  }(Checkbox);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = Switch._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Switch;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Switch._jQueryInterface;
  };

  return Switch;
}(jQuery);

//import Checkbox from './checkbox'
//import File from './file'
//import Radio from './radio'
//import Switch from './switch'
//import Textarea from './textarea'
//import Select from './select'
var Text = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "text";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {};

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Text = function (_BaseFormControl) {
    inherits(Text, _BaseFormControl);

    function Text($element, config) {
      classCallCheck(this, Text);
      return possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, $element, $.extend(true,
      //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Select, Textarea]},
      Default, config)));
    }

    createClass(Text, [{
      key: "dispose",
      value: function dispose() {
        var dataKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DATA_KEY;

        get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), "dispose", this).call(this, dataKey);
      }
    }], [{
      key: "matches",
      value: function matches($element) {
        if ($element.attr("type") === "text") {
          return true;
        }
        return false;
      }
    }, {
      key: "rejectMatch",
      value: function rejectMatch(component, $element) {
        Util$2.assert(this.$element, this.matches($element), component + " component element " + Util$2.describe($element) + " is invalid for type='text'.");
      }

      // ------------------------------------------------------------------------
      // protected

      // ------------------------------------------------------------------------
      // private

      // ------------------------------------------------------------------------
      // static

    }, {
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Text($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);
    return Text;
  }(BaseFormControl);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = Text._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Text;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Text._jQueryInterface;
  };

  return Text;
}(jQuery);

//import Checkbox from './checkbox'
//import File from './file'
//import Radio from './radio'
//import Switch from './switch'
//import Text from './text'
//import Select from './select'
var Textarea = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "textarea";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {};

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Textarea = function (_BaseFormControl) {
    inherits(Textarea, _BaseFormControl);

    function Textarea($element, config) {
      classCallCheck(this, Textarea);
      return possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).call(this, $element, $.extend(true,
      //{invalidComponentMatches: [Checkbox, File, Radio, Text, Select, Switch]},
      Default, config)));
    }

    createClass(Textarea, [{
      key: "dispose",
      value: function dispose() {
        get(Textarea.prototype.__proto__ || Object.getPrototypeOf(Textarea.prototype), "dispose", this).call(this, DATA_KEY);
      }
    }], [{
      key: "matches",
      value: function matches($element) {
        if ($element.prop("tagName") === "textarea") {
          return true;
        }
        return false;
      }
    }, {
      key: "rejectMatch",
      value: function rejectMatch(component, $element) {
        Util$2.assert(this.$element, this.matches($element), component + " component element " + Util$2.describe($element) + " is invalid for <textarea>.");
      }

      // ------------------------------------------------------------------------
      // protected

      // ------------------------------------------------------------------------
      // private

      // ------------------------------------------------------------------------
      // static

    }, {
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Textarea($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);
    return Textarea;
  }(BaseFormControl);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = Textarea._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Textarea;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Textarea._jQueryInterface;
  };

  return Textarea;
}(jQuery);

/* global Popper */

/**
 * This is a copy of the Bootstrap's original dropdown.js, with the only addition
 * of two new classes: 'showing' and 'hiding', used to handle animaitons.
 */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($) {

  /**
   * Check for Popper dependency
   * Popper - https://popper.js.org
   */
  if (typeof Popper === 'undefined') {
    throw new Error('Bootstrap dropdown require Popper.js (https://popper.js.org)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + '|' + ARROW_DOWN_KEYCODE + '|' + ESCAPE_KEYCODE);

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY,
    KEYUP_DATA_API: 'keyup' + EVENT_KEY + DATA_API_KEY,
    TRANSITION_END: 'transitionend webkitTransitionEnd oTransitionEnd animationend webkitAnimationEnd oAnimationEnd'
  };

  var ClassName = {
    DISABLED: 'disabled',
    SHOW: 'show',
    SHOWING: 'showing',
    HIDING: 'hiding',
    DROPUP: 'dropup',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left'
  };

  var Selector = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled)'
  };

  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end'
  };

  var Default = {
    placement: AttachmentMap.BOTTOM,
    offset: 0,
    flip: true
  };

  var DefaultType = {
    placement: 'string',
    offset: '(number|string)',
    flip: 'boolean'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Dropdown = function () {
    function Dropdown(element, config) {
      classCallCheck(this, Dropdown);

      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    }

    // getters

    createClass(Dropdown, [{
      key: 'toggle',


      // public

      value: function toggle() {
        var _this = this;

        if (this._element.disabled || $(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);
        var isActive = $(this._menu).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $.Event(Event.SHOW, relatedTarget);

        $(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        }

        var element = this._element;
        // for dropup with alignment we use the parent as popper container
        if ($(parent).hasClass(ClassName.DROPUP)) {
          if ($(this._menu).hasClass(ClassName.MENULEFT) || $(this._menu).hasClass(ClassName.MENURIGHT)) {
            element = parent;
          }
        }
        this._popper = new Popper(element, this._menu, this._getPopperConfig());

        // if this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {
          $('body').children().on('mouseover', null, $.noop);
        }

        this._element.focus();
        this._element.setAttribute('aria-expanded', true);

        $(this._menu).one(Event.TRANSITION_END, function () {
          $(parent).trigger($.Event(Event.SHOWN, relatedTarget));
          $(_this._menu).removeClass(ClassName.SHOWING);
        });

        $(this._menu).addClass(ClassName.SHOW + ' ' + ClassName.SHOWING);
        $(parent).addClass(ClassName.SHOW);
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._element).off(EVENT_KEY);
        this._element = null;
        this._menu = null;
        if (this._popper !== null) {
          this._popper.destroy();
        }
        this._popper = null;
      }
    }, {
      key: 'update',
      value: function update() {
        this._inNavbar = this._detectNavbar();
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }

      // private

    }, {
      key: '_addEventListeners',
      value: function _addEventListeners() {
        var _this2 = this;

        $(this._element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();
          _this2.toggle();
        });
      }
    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        var elementData = $(this._element).data();
        if (elementData.placement !== undefined) {
          elementData.placement = AttachmentMap[elementData.placement.toUpperCase()];
        }

        config = $.extend({}, this.constructor.Default, $(this._element).data(), config);

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

        return config;
      }
    }, {
      key: '_getMenuElement',
      value: function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);
          this._menu = $(parent).find(Selector.MENU)[0];
        }
        return this._menu;
      }
    }, {
      key: '_getPlacement',
      value: function _getPlacement() {
        var $parentDropdown = $(this._element).parent();
        var placement = this._config.placement;

        // Handle dropup
        if ($parentDropdown.hasClass(ClassName.DROPUP) || this._config.placement === AttachmentMap.TOP) {
          placement = AttachmentMap.TOP;
          if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }
        return placement;
      }
    }, {
      key: '_detectNavbar',
      value: function _detectNavbar() {
        return $(this._element).closest('.navbar').length > 0;
      }
    }, {
      key: '_getPopperConfig',
      value: function _getPopperConfig() {
        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: {
              offset: this._config.offset
            },
            flip: {
              enabled: this._config.flip
            }
          }

          // Disable Popper.js for Dropdown in Navbar
        };if (this._inNavbar) {
          popperConfig.modifiers.applyStyle = {
            enabled: !this._inNavbar
          };
        }
        return popperConfig;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: '_clearMenus',
      value: function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }

        var toggles = $.makeArray($(Selector.DATA_TOGGLE));

        var _loop = function _loop(i) {
          var parent = Dropdown._getParentFromElement(toggles[i]);
          var context = $(toggles[i]).data(DATA_KEY);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (!context) {
            return 'continue';
          }

          var dropdownMenu = context._menu;
          if (!$(parent).hasClass(ClassName.SHOW)) {
            return 'continue';
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
            return 'continue';
          }

          var hideEvent = $.Event(Event.HIDE, relatedTarget);
          $(parent).trigger(hideEvent);
          if (hideEvent.isDefaultPrevented()) {
            return 'continue';
          }

          // if this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support
          if ('ontouchstart' in document.documentElement) {
            $('body').children().off('mouseover', null, $.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');

          $(dropdownMenu).addClass(ClassName.HIDING).removeClass(ClassName.SHOW);
          $(parent).removeClass(ClassName.SHOW);

          $(dropdownMenu).one(Event.TRANSITION_END, function () {
            $(parent).trigger($.Event(Event.HIDDEN, relatedTarget));
            $(dropdownMenu).removeClass(ClassName.HIDING);
          });
        };

        for (var i = 0; i < toggles.length; i++) {
          var _ret = _loop(i);

          if (_ret === 'continue') continue;
        }
      }
    }, {
      key: '_getParentFromElement',
      value: function _getParentFromElement(element) {
        var parent = void 0;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = $(selector)[0];
        }

        return parent || element.parentNode;
      }
    }, {
      key: '_dataApiKeydownHandler',
      value: function _dataApiKeydownHandler(event) {
        if (!REGEXP_KEYDOWN.test(event.which) || /button/i.test(event.target.tagName) && event.which === SPACE_KEYCODE || /input|textarea/i.test(event.target.tagName)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {

          if (event.which === ESCAPE_KEYCODE) {
            var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
            $(toggle).trigger('focus');
          }

          $(this).trigger('click');
          return;
        }

        var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

        if (!items.length) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      }
    }, {
      key: 'VERSION',
      get: function get$$1() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get$$1() {
        return Default;
      }
    }, {
      key: 'DefaultType',
      get: function get$$1() {
        return DefaultType;
      }
    }]);
    return Dropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + ' ' + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();
    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}(jQuery);

var BaseLayout = function ($) {
  var ClassName = {
    CANVAS: "bmd-layout-canvas",
    CONTAINER: "bmd-layout-container",
    BACKDROP: "bmd-layout-backdrop"
  };

  var Selector = {
    CANVAS: "." + ClassName.CANVAS,
    CONTAINER: "." + ClassName.CONTAINER,
    BACKDROP: "." + ClassName.BACKDROP
  };

  var Default = {
    canvas: {
      create: true,
      required: true,
      template: "<div class=\"" + ClassName.CANVAS + "\"></div>"
    },
    backdrop: {
      create: true,
      required: true,
      template: "<div class=\"" + ClassName.BACKDROP + "\"></div>"
    }
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var BaseLayout = function (_Base) {
    inherits(BaseLayout, _Base);

    function BaseLayout($element, config) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, BaseLayout);

      var _this = possibleConstructorReturn(this, (BaseLayout.__proto__ || Object.getPrototypeOf(BaseLayout)).call(this, $element, $.extend(true, {}, Default, config), properties));

      _this.$container = _this.findContainer(true);
      _this.$backdrop = _this.resolveBackdrop();
      _this.resolveCanvas();
      return _this;
    }

    createClass(BaseLayout, [{
      key: "dispose",
      value: function dispose(dataKey) {
        get(BaseLayout.prototype.__proto__ || Object.getPrototypeOf(BaseLayout.prototype), "dispose", this).call(this, dataKey);
        this.$container = null;
        this.$backdrop = null;
      }

      // ------------------------------------------------------------------------
      // protected

      // Will wrap container in bmd-layout-canvas if necessary

    }, {
      key: "resolveCanvas",
      value: function resolveCanvas() {
        var bd = this.findCanvas(false);
        if (bd === undefined || bd.length === 0) {
          if (this.config.canvas.create) {
            this.$container.wrap(this.config.canvas.template);
          }

          bd = this.findCanvas(this.config.canvas.required);
        }

        return bd;
      }

      // Find closest bmd-layout-container based on the given context

    }, {
      key: "findCanvas",
      value: function findCanvas() {
        var raiseError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$container;

        var canvas = context.closest(Selector.CANVAS);
        if (canvas.length === 0 && raiseError) {
          $.error("Failed to find " + Selector.CANVAS + " for " + Util$2.describe(context));
        }
        return canvas;
      }

      // Will add bmd-layout-backdrop to bmd-layout-container if necessary

    }, {
      key: "resolveBackdrop",
      value: function resolveBackdrop() {
        var bd = this.findBackdrop(false);
        if (bd === undefined || bd.length === 0) {
          if (this.config.backdrop.create) {
            this.$container.append(this.config.backdrop.template);
          }

          bd = this.findBackdrop(this.config.backdrop.required);
        }

        return bd;
      }

      // Find closest bmd-layout-container based on the given context

    }, {
      key: "findBackdrop",
      value: function findBackdrop() {
        var raiseError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$container;

        var backdrop = context.find("> " + Selector.BACKDROP);
        if (backdrop.length === 0 && raiseError) {
          $.error("Failed to find " + Selector.BACKDROP + " for " + Util$2.describe(context));
        }
        return backdrop;
      }

      // Find closest bmd-layout-container based on the given context

    }, {
      key: "findContainer",
      value: function findContainer() {
        var raiseError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$element;

        var container = context.closest(Selector.CONTAINER);
        if (container.length === 0 && raiseError) {
          $.error("Failed to find " + Selector.CONTAINER + " for " + Util$2.describe(context));
        }
        return container;
      }

      // ------------------------------------------------------------------------
      // private

      // ------------------------------------------------------------------------
      // static

    }]);
    return BaseLayout;
  }(Base);

  return BaseLayout;
}(jQuery);

var Drawer = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "drawer";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Keycodes = {
    ESCAPE: 27
    //ENTER: 13,
    //SPACE: 32
  };

  var ClassName = {
    IN: "in",
    DRAWER_IN: "bmd-drawer-in",
    DRAWER_OUT: "bmd-drawer-out",
    DRAWER: "bmd-layout-drawer",
    CONTAINER: "bmd-layout-container"
  };

  var Default = {
    focusSelector: "a, button, input"
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Drawer = function (_BaseLayout) {
    inherits(Drawer, _BaseLayout);

    // $element is expected to be the trigger
    //  i.e. <button class="btn bmd-btn-icon" for="search" data-toggle="drawer" data-target="#my-side-nav-drawer" aria-expanded="false" aria-controls="my-side-nav-drawer">
    function Drawer($element, config) {
      classCallCheck(this, Drawer);

      var _this = possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this, $element, $.extend(true, {}, Default, config)));

      _this.$toggles = $("[data-toggle=\"drawer\"][href=\"#" + _this.$element[0].id + "\"], [data-toggle=\"drawer\"][data-target=\"#" + _this.$element[0].id + "\"]");

      _this._addAria();

      // click or escape on the backdrop closes the drawer
      _this.$backdrop.keydown(function (ev) {
        if (ev.which === Keycodes.ESCAPE) {
          _this.hide();
        }
      }).click(function () {
        _this.hide();
      });

      // escape on the drawer closes it
      _this.$element.keydown(function (ev) {
        if (ev.which === Keycodes.ESCAPE) {
          _this.hide();
        }
      });

      // any toggle button clicks
      _this.$toggles.click(function () {
        _this.toggle();
      });
      return _this;
    }

    createClass(Drawer, [{
      key: "dispose",
      value: function dispose() {
        get(Drawer.prototype.__proto__ || Object.getPrototypeOf(Drawer.prototype), "dispose", this).call(this, DATA_KEY);
        this.$toggles = null;
      }
    }, {
      key: "toggle",
      value: function toggle() {
        if (this._isOpen()) {
          this.hide();
        } else {
          this.show();
        }
      }
    }, {
      key: "show",
      value: function show() {
        if (this._isForcedClosed() || this._isOpen()) {
          return;
        }

        this.$toggles.attr("aria-expanded", true);
        this.$element.attr("aria-expanded", true);
        this.$element.attr("aria-hidden", false);

        // focus on the first focusable item
        var $focusOn = this.$element.find(this.config.focusSelector);
        if ($focusOn.length > 0) {
          $focusOn.first().focus();
        }

        this.$container.addClass(ClassName.DRAWER_IN);
        // backdrop is responsively styled based on bmd-drawer-overlay, therefore style is none of our concern, simply add the marker class and let the scss determine if it should be displayed or not.
        this.$backdrop.addClass(ClassName.IN);
      }
    }, {
      key: "hide",
      value: function hide() {
        if (!this._isOpen()) {
          return;
        }

        this.$toggles.attr("aria-expanded", false);
        this.$element.attr("aria-expanded", false);
        this.$element.attr("aria-hidden", true);

        this.$container.removeClass(ClassName.DRAWER_IN);
        this.$backdrop.removeClass(ClassName.IN);
      }

      // ------------------------------------------------------------------------
      // private

    }, {
      key: "_isOpen",
      value: function _isOpen() {
        return this.$container.hasClass(ClassName.DRAWER_IN);
      }
    }, {
      key: "_isForcedClosed",
      value: function _isForcedClosed() {
        return this.$container.hasClass(ClassName.DRAWER_OUT);
      }
    }, {
      key: "_addAria",
      value: function _addAria() {
        var isOpen = this._isOpen();
        this.$element.attr("aria-expanded", isOpen);
        this.$element.attr("aria-hidden", isOpen);

        if (this.$toggles.length) {
          this.$toggles.attr("aria-expanded", isOpen);
        }
      }

      // ------------------------------------------------------------------------
      // static

    }], [{
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Drawer($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);
    return Drawer;
  }(BaseLayout);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = Drawer._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Drawer;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Drawer._jQueryInterface;
  };

  return Drawer;
}(jQuery);

var Ripples = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "ripples";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var ClassName = {
    CONTAINER: "ripple-container",
    DECORATOR: "ripple-decorator"
  };

  var Selector = {
    CONTAINER: "." + ClassName.CONTAINER,
    DECORATOR: "." + ClassName.DECORATOR //,
  };

  var Default = {
    container: {
      template: "<div class='" + ClassName.CONTAINER + "'></div>"
    },
    decorator: {
      template: "<div class='" + ClassName.DECORATOR + "'></div>"
    },
    trigger: {
      start: "mousedown touchstart",
      end: "mouseup mouseleave touchend"
    },
    touchUserAgentRegex: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
    duration: 500
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Ripples = function () {
    function Ripples($element, config) {
      var _this = this;

      classCallCheck(this, Ripples);

      this.$element = $element;

      // console.log(`Adding ripples to ${Util.describe(this.$element)}`)  // eslint-disable-line no-console
      this.config = $.extend(true, {}, Default, config);

      // attach initial listener
      this.$element.on(this.config.trigger.start, function (event) {
        _this._onStartRipple(event);
      });
    }

    createClass(Ripples, [{
      key: "dispose",
      value: function dispose() {
        this.$element.data(DATA_KEY, null);
        this.$element = null;
        this.$container = null;
        this.$decorator = null;
        this.config = null;
      }

      // ------------------------------------------------------------------------
      // private

    }, {
      key: "_onStartRipple",
      value: function _onStartRipple(event) {
        var _this2 = this;

        // Verify if the user is just touching on a device and return if so
        if (this._isTouch() && event.type === "mousedown") {
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
        this.$decorator.css({
          left: relX,
          top: relY,
          "background-color": this._getRipplesColor()
        });

        // Make sure the ripple has the styles applied (ugly hack but it works)
        this._forceStyleApplication();

        // Turn on the ripple animation
        this.rippleOn();

        // Call the rippleEnd function when the transition 'on' ends
        setTimeout(function () {
          _this2.rippleEnd();
        }, this.config.duration);

        // Detect when the user leaves the element to cleanup if not already done?
        this.$element.on(this.config.trigger.end, function () {
          if (_this2.$decorator) {
            // guard against race condition/mouse attack
            _this2.$decorator.data("mousedown", "off");

            if (_this2.$decorator.data("animating") === "off") {
              _this2.rippleOut();
            }
          }
        });
      }
    }, {
      key: "_findOrCreateContainer",
      value: function _findOrCreateContainer() {
        if (!this.$container || !this.$container.length > 0) {
          this.$element.append(this.config.container.template);
          this.$container = this.$element.find(Selector.CONTAINER);
        }

        // always add the rippleElement, it is always removed
        this.$container.append(this.config.decorator.template);
        this.$decorator = this.$container.find(Selector.DECORATOR);
      }

      // Make sure the ripple has the styles applied (ugly hack but it works)

    }, {
      key: "_forceStyleApplication",
      value: function _forceStyleApplication() {
        return window.getComputedStyle(this.$decorator[0]).opacity;
      }

      /**
       * Get the relX
       */

    }, {
      key: "_getRelX",
      value: function _getRelX(event) {
        var wrapperOffset = this.$container.offset();

        var result = null;
        if (!this._isTouch()) {
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
      key: "_getRelY",
      value: function _getRelY(event) {
        var containerOffset = this.$container.offset();
        var result = null;

        if (!this._isTouch()) {
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
      key: "_getRipplesColor",
      value: function _getRipplesColor() {
        var color = this.$element.data("ripple-color") ? this.$element.data("ripple-color") : window.getComputedStyle(this.$element[0]).color;
        return color;
      }

      /**
       * Verify if the client is using a mobile device
       */

    }, {
      key: "_isTouch",
      value: function _isTouch() {
        return this.config.touchUserAgentRegex.test(navigator.userAgent);
      }

      /**
       * End the animation of the ripple
       */

    }, {
      key: "rippleEnd",
      value: function rippleEnd() {
        if (this.$decorator) {
          // guard against race condition/mouse attack
          this.$decorator.data("animating", "off");

          if (this.$decorator.data("mousedown") === "off") {
            this.rippleOut(this.$decorator);
          }
        }
      }

      /**
       * Turn off the ripple effect
       */

    }, {
      key: "rippleOut",
      value: function rippleOut() {
        var _this3 = this;

        this.$decorator.off();

        if (Util$2.transitionEndSupported()) {
          this.$decorator.addClass("ripple-out");
        } else {
          this.$decorator.animate({ opacity: 0 }, 100, function () {
            _this3.$decorator.trigger("transitionend");
          });
        }

        this.$decorator.on(Util$2.transitionEndSelector(), function () {
          if (_this3.$decorator) {
            _this3.$decorator.remove();
            _this3.$decorator = null;
          }
        });
      }

      /**
       * Turn on the ripple effect
       */

    }, {
      key: "rippleOn",
      value: function rippleOn() {
        var _this4 = this;

        var size = this._getNewSize();

        if (Util$2.transitionEndSupported()) {
          this.$decorator.css({
            "-ms-transform": "scale(" + size + ")",
            "-moz-transform": "scale(" + size + ")",
            "-webkit-transform": "scale(" + size + ")",
            transform: "scale(" + size + ")"
          }).addClass("ripple-on").data("animating", "on").data("mousedown", "on");
        } else {
          this.$decorator.animate({
            width: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
            height: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
            "margin-left": Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
            "margin-top": Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
            opacity: 0.2
          }, this.config.duration, function () {
            _this4.$decorator.trigger("transitionend");
          });
        }
      }

      /**
       * Get the new size based on the element height/width and the ripple width
       */

    }, {
      key: "_getNewSize",
      value: function _getNewSize() {
        return Math.max(this.$element.outerWidth(), this.$element.outerHeight()) / this.$decorator.outerWidth() * 2.5;
      }

      // ------------------------------------------------------------------------
      // static

    }], [{
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Ripples($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);
    return Ripples;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = Ripples._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Ripples;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Ripples._jQueryInterface;
  };

  return Ripples;
}(jQuery);

var Autofill = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "autofill";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {};

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Autofill = function (_Base) {
    inherits(Autofill, _Base);

    function Autofill($element, config) {
      classCallCheck(this, Autofill);

      var _this = possibleConstructorReturn(this, (Autofill.__proto__ || Object.getPrototypeOf(Autofill)).call(this, $element, $.extend(true, {}, Default, config)));

      _this._watchLoading();
      _this._attachEventHandlers();
      return _this;
    }

    createClass(Autofill, [{
      key: "dispose",
      value: function dispose() {
        get(Autofill.prototype.__proto__ || Object.getPrototypeOf(Autofill.prototype), "dispose", this).call(this, DATA_KEY);
      }

      // ------------------------------------------------------------------------
      // private

    }, {
      key: "_watchLoading",
      value: function _watchLoading() {
        var _this2 = this;

        // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
        setTimeout(function () {
          clearInterval(_this2._onLoading);
        }, 10000);
      }

      // This part of code will detect autofill when the page is loading (username and password inputs for example)

    }, {
      key: "_onLoading",
      value: function _onLoading() {
        setInterval(function () {
          $("input[type!=checkbox]").each(function (index, element) {
            var $element = $(element);
            if ($element.val() && $element.val() !== $element.attr("value")) {
              $element.trigger("change");
            }
          });
        }, 100);
      }
    }, {
      key: "_attachEventHandlers",
      value: function _attachEventHandlers() {
        // Listen on inputs of the focused form
        //  (because user can select from the autofill dropdown only when the input has focus)
        var focused = null;
        $(document).on("focus", "input", function (event) {
          var $inputs = $(event.currentTarget).closest("form").find("input").not("[type=file]");
          focused = setInterval(function () {
            $inputs.each(function (index, element) {
              var $element = $(element);
              if ($element.val() !== $element.attr("value")) {
                $element.trigger("change");
              }
            });
          }, 100);
        }).on("blur", ".form-group input", function () {
          clearInterval(focused);
        });
      }

      // ------------------------------------------------------------------------
      // static

    }], [{
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Autofill($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);
    return Autofill;
  }(Base);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = Autofill._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Autofill;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Autofill._jQueryInterface;
  };

  return Autofill;
}(jQuery);

/* globals Popper */
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;

/**
 * $.bootstrapMaterialDesign(config) is a macro class to configure the components generally
 *  used in Material Design for Bootstrap.  You may pass overrides to the configurations
 *  which will be passed into each component, or you may omit use of this class and
 *  configure each component separately.
 */
var BootstrapMaterialDesign = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "bootstrapMaterialDesign";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = NAME; // retain this full name since it is long enough not to conflict
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  /**
   * Global configuration:
   *  The global configuration hash will be mixed in to each components' config.
   *    e.g. calling $.bootstrapMaterialDesign({global: { validate: true } }) would pass `validate:true` to every component
   *
   *
   * Component configuration:
   *  - selector: may be a string or an array.  Any array will be joined with a comma to generate the selector
   *  - disable any component by defining it as false with an override. e.g. $.bootstrapMaterialDesign({ autofill: false })
   *
   *  @see each individual component for more configuration settings.
   */
  var Default = {
    global: {
      validate: false,
      label: {
        className: "bmd-label-static" // default style of label to be used if not specified in the html markup
      }
    },
    autofill: {
      selector: "body"
    },
    checkbox: {
      selector: ".checkbox > label > input[type=checkbox]"
    },
    checkboxInline: {
      selector: "label.checkbox-inline > input[type=checkbox]"
    },
    collapseInline: {
      selector: '.bmd-collapse-inline [data-toggle="collapse"]'
    },
    drawer: {
      selector: ".bmd-layout-drawer"
    },
    file: {
      selector: "input[type=file]"
    },
    radio: {
      selector: ".radio > label > input[type=radio]"
    },
    radioInline: {
      selector: "label.radio-inline > input[type=radio]"
    },
    ripples: {
      //selector: ['.btn:not(.btn-link):not(.ripple-none)'] // testing only
      selector: [".btn:not(.btn-link):not(.ripple-none)", ".card-image:not(.ripple-none)", ".navbar a:not(.ripple-none)", ".dropdown-menu a:not(.ripple-none)", ".nav-tabs a:not(.ripple-none)", ".pagination li:not(.active):not(.disabled) a:not(.ripple-none)", ".ripple" // generic marker class to add ripple to elements
      ]
    },
    select: {
      selector: ["select"]
    },
    switch: {
      selector: ".switch > label > input[type=checkbox]"
    },
    text: {
      // omit inputs we have specialized components to handle - we need to match text, email, etc.  The easiest way to do this appears to be just omit the ones we don't want to match and let the rest fall through to this.
      selector: ["input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=button]):not([type=submit]):not([type=reset])"]
    },
    textarea: {
      selector: ["textarea"]
    },
    arrive: true,
    // create an ordered component list for instantiation
    instantiation: ["ripples", "checkbox", "checkboxInline", "collapseInline", "drawer",
    //'file',
    "radio", "radioInline", "switch", "text", "textarea", "select", "autofill"]
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var BootstrapMaterialDesign = function () {
    function BootstrapMaterialDesign($element, config) {
      var _this = this;

      classCallCheck(this, BootstrapMaterialDesign);

      this.$element = $element;
      this.config = $.extend(true, {}, Default, config);
      var $document = $(document);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var component = _step.value;

          // the component's config fragment is passed in directly, allowing users to override
          var componentConfig = _this.config[component];

          // check to make sure component config is enabled (not `false`)
          if (componentConfig) {
            // assemble the selector as it may be an array
            var selector = _this._resolveSelector(componentConfig);

            // mix in global options
            componentConfig = $.extend(true, {}, _this.config.global, componentConfig);

            // create the jquery fn name e.g. 'bmdText' for 'text'
            var componentName = "" + (component.charAt(0).toUpperCase() + component.slice(1));
            var jqueryFn = "bmd" + componentName;

            try {
              // safely instantiate component on selector elements with config, report errors and move on.
              // console.debug(`instantiating: $('${selector}')[${jqueryFn}](${componentConfig})`) // eslint-disable-line no-console
              $(selector)[jqueryFn](componentConfig);

              // add to arrive if present and enabled
              if (document.arrive && _this.config.arrive) {
                $document.arrive(selector, function () {
                  // eslint-disable-line no-loop-func
                  $(this)[jqueryFn](componentConfig);
                });
              }
            } catch (e) {
              var message = "Failed to instantiate component: $('" + selector + "')[" + jqueryFn + "](" + componentConfig + ")";
              console.error(message, e, "\nSelected elements: ", $(selector)); // eslint-disable-line no-console
              throw e;
            }
          }
        };

        for (var _iterator = this.config.instantiation[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    createClass(BootstrapMaterialDesign, [{
      key: "dispose",
      value: function dispose() {
        this.$element.data(DATA_KEY, null);
        this.$element = null;
        this.config = null;
      }

      // ------------------------------------------------------------------------
      // private

    }, {
      key: "_resolveSelector",
      value: function _resolveSelector(componentConfig) {
        var selector = componentConfig.selector;
        if (Array.isArray(selector)) {
          selector = selector.join(", ");
        }

        return selector;
      }

      // ------------------------------------------------------------------------
      // static

    }], [{
      key: "_jQueryInterface",
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new BootstrapMaterialDesign($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      }
    }]);
    return BootstrapMaterialDesign;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = BootstrapMaterialDesign._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = BootstrapMaterialDesign;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return BootstrapMaterialDesign._jQueryInterface;
  };

  return BootstrapMaterialDesign;
}(jQuery);

/*
 * This is the main entry point.
 *
 * You can import other modules here, including external packages. When bundling using rollup you can mark those modules as external and have them excluded or, if they have a jsnext:main entry in their package.json (like this package does), let rollup bundle them into your dist file.
 *
 * at your application entry point.  This is necessary for browsers that do not yet support some ES2015 runtime necessities such as Symbol.  We do this in `index-iife.js` for our iife rollup bundle.
 */

// Bootstrap components
// invalidComponentMatches is currently disabled due to https://github.com/rollup/rollup/issues/428#issuecomment-170066452

}());
//# sourceMappingURL=bootstrap-material-design.js.map
