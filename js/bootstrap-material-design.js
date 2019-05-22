(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', 'popper.js'], factory) :
  (global = global || self, factory(global.jQuery, global.Popper));
}(this, function ($, Popper$1) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper$1 = Popper$1 && Popper$1.hasOwnProperty('default') ? Popper$1['default'] : Popper$1;

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  const TRANSITION_END = 'transitionend';
  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;

  // Shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase()
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments) // eslint-disable-line prefer-rest-params
        }
        return undefined // eslint-disable-line no-undefined
      }
    }
  }

  function transitionEndEmulator(duration) {
    let called = false;

    $(this).one(Util.TRANSITION_END, () => {
      called = true;
    });

    setTimeout(() => {
      if (!called) {
        Util.triggerTransitionEnd(this);
      }
    }, duration);

    return this
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  const Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix))
      return prefix
    },

    getSelectorFromElement(element) {
      let selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        const hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null
      } catch (err) {
        return null
      }
    },

    getTransitionDurationFromElement(element) {
      if (!element) {
        return 0
      }

      // Get transition-duration of the element
      let transitionDuration = $(element).css('transition-duration');
      let transitionDelay = $(element).css('transition-delay');

      const floatTransitionDuration = parseFloat(transitionDuration);
      const floatTransitionDelay = parseFloat(transitionDelay);

      // Return 0 if element or transition duration is not found
      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0
      }

      // If multiple durations are defined, take the first
      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];

      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER
    },

    reflow(element) {
      return element.offsetHeight
    },

    triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },

    // TODO: Remove in v5
    supportsTransitionEnd() {
      return Boolean(TRANSITION_END)
    },

    isElement(obj) {
      return (obj[0] || obj).nodeType
    },

    typeCheckConfig(componentName, config, configTypes) {
      for (const property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          const expectedTypes = configTypes[property];
          const value         = config[property];
          const valueType     = value && Util.isElement(value)
            ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(
              `${componentName.toUpperCase()}: ` +
              `Option "${property}" provided type "${valueType}" ` +
              `but expected type "${expectedTypes}".`)
          }
        }
      }
    },

    findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null
      }

      // Can find the shadow root otherwise it'll return the document
      if (typeof element.getRootNode === 'function') {
        const root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null
      }

      if (element instanceof ShadowRoot) {
        return element
      }

      // when we don't find a shadow root
      if (!element.parentNode) {
        return null
      }

      return Util.findShadowRoot(element.parentNode)
    }
  };

  setTransitionEndSupport();

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME                = 'alert';
  const VERSION             = '4.3.1';
  const DATA_KEY            = 'bs.alert';
  const EVENT_KEY           = `.${DATA_KEY}`;
  const DATA_API_KEY        = '.data-api';
  const JQUERY_NO_CONFLICT  = $.fn[NAME];

  const Selector = {
    DISMISS : '[data-dismiss="alert"]'
  };

  const Event = {
    CLOSE          : `close${EVENT_KEY}`,
    CLOSED         : `closed${EVENT_KEY}`,
    CLICK_DATA_API : `click${EVENT_KEY}${DATA_API_KEY}`
  };

  const ClassName = {
    ALERT : 'alert',
    FADE  : 'fade',
    SHOW  : 'show'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Alert {
    constructor(element) {
      this._element = element;
    }

    // Getters

    static get VERSION() {
      return VERSION
    }

    // Public

    close(element) {
      let rootElement = this._element;
      if (element) {
        rootElement = this._getRootElement(element);
      }

      const customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return
      }

      this._removeElement(rootElement);
    }

    dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    }

    // Private

    _getRootElement(element) {
      const selector = Util.getSelectorFromElement(element);
      let parent     = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $(element).closest(`.${ClassName.ALERT}`)[0];
      }

      return parent
    }

    _triggerCloseEvent(element) {
      const closeEvent = $.Event(Event.CLOSE);

      $(element).trigger(closeEvent);
      return closeEvent
    }

    _removeElement(element) {
      $(element).removeClass(ClassName.SHOW);

      if (!$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);
        return
      }

      const transitionDuration = Util.getTransitionDurationFromElement(element);

      $(element)
        .one(Util.TRANSITION_END, (event) => this._destroyElement(element, event))
        .emulateTransitionEnd(transitionDuration);
    }

    _destroyElement(element) {
      $(element)
        .detach()
        .trigger(Event.CLOSED)
        .remove();
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        const $element = $(this);
        let data       = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      })
    }

    static _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      }
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(
    Event.CLICK_DATA_API,
    Selector.DISMISS,
    Alert._handleDismiss(new Alert())
  );

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME]             = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict  = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$1                = 'button';
  const VERSION$1             = '4.3.1';
  const DATA_KEY$1            = 'bs.button';
  const EVENT_KEY$1           = `.${DATA_KEY$1}`;
  const DATA_API_KEY$1        = '.data-api';
  const JQUERY_NO_CONFLICT$1  = $.fn[NAME$1];

  const ClassName$1 = {
    ACTIVE : 'active',
    BUTTON : 'btn',
    FOCUS  : 'focus'
  };

  const Selector$1 = {
    DATA_TOGGLE_CARROT : '[data-toggle^="button"]',
    DATA_TOGGLE        : '[data-toggle="buttons"]',
    INPUT              : 'input:not([type="hidden"])',
    ACTIVE             : '.active',
    BUTTON             : '.btn'
  };

  const Event$1 = {
    CLICK_DATA_API      : `click${EVENT_KEY$1}${DATA_API_KEY$1}`,
    FOCUS_BLUR_DATA_API : `focus${EVENT_KEY$1}${DATA_API_KEY$1} ` +
                            `blur${EVENT_KEY$1}${DATA_API_KEY$1}`
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Button {
    constructor(element) {
      this._element = element;
    }

    // Getters

    static get VERSION() {
      return VERSION$1
    }

    // Public

    toggle() {
      let triggerChangeEvent = true;
      let addAriaPressed = true;
      const rootElement = $(this._element).closest(
        Selector$1.DATA_TOGGLE
      )[0];

      if (rootElement) {
        const input = this._element.querySelector(Selector$1.INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked &&
              this._element.classList.contains(ClassName$1.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              const activeElement = rootElement.querySelector(Selector$1.ACTIVE);

              if (activeElement) {
                $(activeElement).removeClass(ClassName$1.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') ||
              rootElement.hasAttribute('disabled') ||
              input.classList.contains('disabled') ||
              rootElement.classList.contains('disabled')) {
              return
            }
            input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed',
          !this._element.classList.contains(ClassName$1.ACTIVE));
      }

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName$1.ACTIVE);
      }
    }

    dispose() {
      $.removeData(this._element, DATA_KEY$1);
      this._element = null;
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY$1, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document)
    .on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, (event) => {
      event.preventDefault();

      let button = event.target;

      if (!$(button).hasClass(ClassName$1.BUTTON)) {
        button = $(button).closest(Selector$1.BUTTON);
      }

      Button._jQueryInterface.call($(button), 'toggle');
    })
    .on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, (event) => {
      const button = $(event.target).closest(Selector$1.BUTTON)[0];
      $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
    });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$1] = Button._jQueryInterface;
  $.fn[NAME$1].Constructor = Button;
  $.fn[NAME$1].noConflict = () => {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$2                   = 'carousel';
  const VERSION$2                = '4.3.1';
  const DATA_KEY$2               = 'bs.carousel';
  const EVENT_KEY$2              = `.${DATA_KEY$2}`;
  const DATA_API_KEY$2           = '.data-api';
  const JQUERY_NO_CONFLICT$2     = $.fn[NAME$2];
  const ARROW_LEFT_KEYCODE     = 37; // KeyboardEvent.which value for left arrow key
  const ARROW_RIGHT_KEYCODE    = 39; // KeyboardEvent.which value for right arrow key
  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch
  const SWIPE_THRESHOLD        = 40;

  const Default = {
    interval : 5000,
    keyboard : true,
    slide    : false,
    pause    : 'hover',
    wrap     : true,
    touch    : true
  };

  const DefaultType = {
    interval : '(number|boolean)',
    keyboard : 'boolean',
    slide    : '(boolean|string)',
    pause    : '(string|boolean)',
    wrap     : 'boolean',
    touch    : 'boolean'
  };

  const Direction = {
    NEXT     : 'next',
    PREV     : 'prev',
    LEFT     : 'left',
    RIGHT    : 'right'
  };

  const Event$2 = {
    SLIDE          : `slide${EVENT_KEY$2}`,
    SLID           : `slid${EVENT_KEY$2}`,
    KEYDOWN        : `keydown${EVENT_KEY$2}`,
    MOUSEENTER     : `mouseenter${EVENT_KEY$2}`,
    MOUSELEAVE     : `mouseleave${EVENT_KEY$2}`,
    TOUCHSTART     : `touchstart${EVENT_KEY$2}`,
    TOUCHMOVE      : `touchmove${EVENT_KEY$2}`,
    TOUCHEND       : `touchend${EVENT_KEY$2}`,
    POINTERDOWN    : `pointerdown${EVENT_KEY$2}`,
    POINTERUP      : `pointerup${EVENT_KEY$2}`,
    DRAG_START     : `dragstart${EVENT_KEY$2}`,
    LOAD_DATA_API  : `load${EVENT_KEY$2}${DATA_API_KEY$2}`,
    CLICK_DATA_API : `click${EVENT_KEY$2}${DATA_API_KEY$2}`
  };

  const ClassName$2 = {
    CAROUSEL      : 'carousel',
    ACTIVE        : 'active',
    SLIDE         : 'slide',
    RIGHT         : 'carousel-item-right',
    LEFT          : 'carousel-item-left',
    NEXT          : 'carousel-item-next',
    PREV          : 'carousel-item-prev',
    ITEM          : 'carousel-item',
    POINTER_EVENT : 'pointer-event'
  };

  const Selector$2 = {
    ACTIVE      : '.active',
    ACTIVE_ITEM : '.active.carousel-item',
    ITEM        : '.carousel-item',
    ITEM_IMG    : '.carousel-item img',
    NEXT_PREV   : '.carousel-item-next, .carousel-item-prev',
    INDICATORS  : '.carousel-indicators',
    DATA_SLIDE  : '[data-slide], [data-slide-to]',
    DATA_RIDE   : '[data-ride="carousel"]'
  };

  const PointerType = {
    TOUCH : 'touch',
    PEN   : 'pen'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Carousel {
    constructor(element, config) {
      this._items         = null;
      this._interval      = null;
      this._activeElement = null;
      this._isPaused      = false;
      this._isSliding     = false;
      this.touchTimeout   = null;
      this.touchStartX    = 0;
      this.touchDeltaX    = 0;

      this._config            = this._getConfig(config);
      this._element           = element;
      this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
      this._touchSupported    = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent      = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    }

    // Getters

    static get VERSION() {
      return VERSION$2
    }

    static get Default() {
      return Default
    }

    // Public

    next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    }

    nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden &&
        ($(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden')) {
        this.next();
      }
    }

    prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    }

    pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(Selector$2.NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    }

    cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval(
          (document.visibilityState ? this.nextWhenVisible : this.next).bind(this),
          this._config.interval
        );
      }
    }

    to(index) {
      this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      const activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return
      }

      if (this._isSliding) {
        $(this._element).one(Event$2.SLID, () => this.to(index));
        return
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return
      }

      const direction = index > activeIndex
        ? Direction.NEXT
        : Direction.PREV;

      this._slide(direction, this._items[index]);
    }

    dispose() {
      $(this._element).off(EVENT_KEY$2);
      $.removeData(this._element, DATA_KEY$2);

      this._items             = null;
      this._config            = null;
      this._element           = null;
      this._interval          = null;
      this._isPaused          = null;
      this._isSliding         = null;
      this._activeElement     = null;
      this._indicatorsElement = null;
    }

    // Private

    _getConfig(config) {
      config = {
        ...Default,
        ...config
      };
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config
    }

    _handleSwipe() {
      const absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return
      }

      const direction = absDeltax / this.touchDeltaX;

      // swipe left
      if (direction > 0) {
        this.prev();
      }

      // swipe right
      if (direction < 0) {
        this.next();
      }
    }

    _addEventListeners() {
      if (this._config.keyboard) {
        $(this._element)
          .on(Event$2.KEYDOWN, (event) => this._keydown(event));
      }

      if (this._config.pause === 'hover') {
        $(this._element)
          .on(Event$2.MOUSEENTER, (event) => this.pause(event))
          .on(Event$2.MOUSELEAVE, (event) => this.cycle(event));
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    }

    _addTouchEventListeners() {
      if (!this._touchSupported) {
        return
      }

      const start = (event) => {
        if (this._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          this.touchStartX = event.originalEvent.clientX;
        } else if (!this._pointerEvent) {
          this.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      const move = (event) => {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          this.touchDeltaX = 0;
        } else {
          this.touchDeltaX = event.originalEvent.touches[0].clientX - this.touchStartX;
        }
      };

      const end = (event) => {
        if (this._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          this.touchDeltaX = event.originalEvent.clientX - this.touchStartX;
        }

        this._handleSwipe();
        if (this._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling

          this.pause();
          if (this.touchTimeout) {
            clearTimeout(this.touchTimeout);
          }
          this.touchTimeout = setTimeout((event) => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
        }
      };

      $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, (e) => e.preventDefault());
      if (this._pointerEvent) {
        $(this._element).on(Event$2.POINTERDOWN, (event) => start(event));
        $(this._element).on(Event$2.POINTERUP, (event) => end(event));

        this._element.classList.add(ClassName$2.POINTER_EVENT);
      } else {
        $(this._element).on(Event$2.TOUCHSTART, (event) => start(event));
        $(this._element).on(Event$2.TOUCHMOVE, (event) => move(event));
        $(this._element).on(Event$2.TOUCHEND, (event) => end(event));
      }
    }

    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break
        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break
        default:
      }
    }

    _getItemIndex(element) {
      this._items = element && element.parentNode
        ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM))
        : [];
      return this._items.indexOf(element)
    }

    _getItemByDirection(direction, activeElement) {
      const isNextDirection = direction === Direction.NEXT;
      const isPrevDirection = direction === Direction.PREV;
      const activeIndex     = this._getItemIndex(activeElement);
      const lastItemIndex   = this._items.length - 1;
      const isGoingToWrap   = isPrevDirection && activeIndex === 0 ||
                              isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement
      }

      const delta     = direction === Direction.PREV ? -1 : 1;
      const itemIndex = (activeIndex + delta) % this._items.length;

      return itemIndex === -1
        ? this._items[this._items.length - 1] : this._items[itemIndex]
    }

    _triggerSlideEvent(relatedTarget, eventDirectionName) {
      const targetIndex = this._getItemIndex(relatedTarget);
      const fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));
      const slideEvent = $.Event(Event$2.SLIDE, {
        relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });

      $(this._element).trigger(slideEvent);

      return slideEvent
    }

    _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        const indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
        $(indicators)
          .removeClass(ClassName$2.ACTIVE);

        const nextIndicator = this._indicatorsElement.children[
          this._getItemIndex(element)
        ];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName$2.ACTIVE);
        }
      }
    }

    _slide(direction, element) {
      const activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);
      const activeElementIndex = this._getItemIndex(activeElement);
      const nextElement   = element || activeElement &&
        this._getItemByDirection(direction, activeElement);
      const nextElementIndex = this._getItemIndex(nextElement);
      const isCycling = Boolean(this._interval);

      let directionalClassName;
      let orderClassName;
      let eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName$2.LEFT;
        orderClassName = ClassName$2.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName$2.RIGHT;
        orderClassName = ClassName$2.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
        this._isSliding = false;
        return
      }

      const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
      if (slideEvent.isDefaultPrevented()) {
        return
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      const slidEvent = $.Event(Event$2.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($(this._element).hasClass(ClassName$2.SLIDE)) {
        $(nextElement).addClass(orderClassName);

        Util.reflow(nextElement);

        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);

        const nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);
        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        const transitionDuration = Util.getTransitionDurationFromElement(activeElement);

        $(activeElement)
          .one(Util.TRANSITION_END, () => {
            $(nextElement)
              .removeClass(`${directionalClassName} ${orderClassName}`)
              .addClass(ClassName$2.ACTIVE);

            $(activeElement).removeClass(`${ClassName$2.ACTIVE} ${orderClassName} ${directionalClassName}`);

            this._isSliding = false;

            setTimeout(() => $(this._element).trigger(slidEvent), 0);
          })
          .emulateTransitionEnd(transitionDuration);
      } else {
        $(activeElement).removeClass(ClassName$2.ACTIVE);
        $(nextElement).addClass(ClassName$2.ACTIVE);

        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY$2);
        let _config = {
          ...Default,
          ...$(this).data()
        };

        if (typeof config === 'object') {
          _config = {
            ..._config,
            ...config
          };
        }

        const action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError(`No method named "${action}"`)
          }
          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      })
    }

    static _dataApiClickHandler(event) {
      const selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return
      }

      const target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
        return
      }

      const config = {
        ...$(target).data(),
        ...$(this).data()
      };
      const slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document)
    .on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event$2.LOAD_DATA_API, () => {
    const carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));
    for (let i = 0, len = carousels.length; i < len; i++) {
      const $carousel = $(carousels[i]);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$2] = Carousel._jQueryInterface;
  $.fn[NAME$2].Constructor = Carousel;
  $.fn[NAME$2].noConflict = () => {
    $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$3                = 'collapse';
  const VERSION$3             = '4.3.1';
  const DATA_KEY$3            = 'bs.collapse';
  const EVENT_KEY$3           = `.${DATA_KEY$3}`;
  const DATA_API_KEY$3        = '.data-api';
  const JQUERY_NO_CONFLICT$3  = $.fn[NAME$3];

  const Default$1 = {
    toggle : true,
    parent : ''
  };

  const DefaultType$1 = {
    toggle : 'boolean',
    parent : '(string|element)'
  };

  const Event$3 = {
    SHOW           : `show${EVENT_KEY$3}`,
    SHOWN          : `shown${EVENT_KEY$3}`,
    HIDE           : `hide${EVENT_KEY$3}`,
    HIDDEN         : `hidden${EVENT_KEY$3}`,
    CLICK_DATA_API : `click${EVENT_KEY$3}${DATA_API_KEY$3}`
  };

  const ClassName$3 = {
    SHOW       : 'show',
    COLLAPSE   : 'collapse',
    COLLAPSING : 'collapsing',
    COLLAPSED  : 'collapsed'
  };

  const Dimension = {
    WIDTH  : 'width',
    HEIGHT : 'height'
  };

  const Selector$3 = {
    ACTIVES     : '.show, .collapsing',
    DATA_TOGGLE : '[data-toggle="collapse"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Collapse {
    constructor(element, config) {
      this._isTransitioning = false;
      this._element         = element;
      this._config          = this._getConfig(config);
      this._triggerArray    = [].slice.call(document.querySelectorAll(
        `[data-toggle="collapse"][href="#${element.id}"],` +
        `[data-toggle="collapse"][data-target="#${element.id}"]`
      ));

      const toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));
      for (let i = 0, len = toggleList.length; i < len; i++) {
        const elem = toggleList[i];
        const selector = Util.getSelectorFromElement(elem);
        const filterElement = [].slice.call(document.querySelectorAll(selector))
          .filter((foundElem) => foundElem === element);

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;
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

    // Getters

    static get VERSION() {
      return VERSION$3
    }

    static get Default() {
      return Default$1
    }

    // Public

    toggle() {
      if ($(this._element).hasClass(ClassName$3.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    }

    show() {
      if (this._isTransitioning ||
        $(this._element).hasClass(ClassName$3.SHOW)) {
        return
      }

      let actives;
      let activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES))
          .filter((elem) => {
            if (typeof this._config.parent === 'string') {
              return elem.getAttribute('data-parent') === this._config.parent
            }

            return elem.classList.contains(ClassName$3.COLLAPSE)
          });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).not(this._selector).data(DATA_KEY$3);
        if (activesData && activesData._isTransitioning) {
          return
        }
      }

      const startEvent = $.Event(Event$3.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');
        if (!activesData) {
          $(actives).data(DATA_KEY$3, null);
        }
      }

      const dimension = this._getDimension();

      $(this._element)
        .removeClass(ClassName$3.COLLAPSE)
        .addClass(ClassName$3.COLLAPSING);

      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray)
          .removeClass(ClassName$3.COLLAPSED)
          .attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      const complete = () => {
        $(this._element)
          .removeClass(ClassName$3.COLLAPSING)
          .addClass(ClassName$3.COLLAPSE)
          .addClass(ClassName$3.SHOW);

        this._element.style[dimension] = '';

        this.setTransitioning(false);

        $(this._element).trigger(Event$3.SHOWN);
      };

      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;
      const transitionDuration = Util.getTransitionDurationFromElement(this._element);

      $(this._element)
        .one(Util.TRANSITION_END, complete)
        .emulateTransitionEnd(transitionDuration);

      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }

    hide() {
      if (this._isTransitioning ||
        !$(this._element).hasClass(ClassName$3.SHOW)) {
        return
      }

      const startEvent = $.Event(Event$3.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return
      }

      const dimension = this._getDimension();

      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;

      Util.reflow(this._element);

      $(this._element)
        .addClass(ClassName$3.COLLAPSING)
        .removeClass(ClassName$3.COLLAPSE)
        .removeClass(ClassName$3.SHOW);

      const triggerArrayLength = this._triggerArray.length;
      if (triggerArrayLength > 0) {
        for (let i = 0; i < triggerArrayLength; i++) {
          const trigger = this._triggerArray[i];
          const selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            const $elem = $([].slice.call(document.querySelectorAll(selector)));
            if (!$elem.hasClass(ClassName$3.SHOW)) {
              $(trigger).addClass(ClassName$3.COLLAPSED)
                .attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      const complete = () => {
        this.setTransitioning(false);
        $(this._element)
          .removeClass(ClassName$3.COLLAPSING)
          .addClass(ClassName$3.COLLAPSE)
          .trigger(Event$3.HIDDEN);
      };

      this._element.style[dimension] = '';
      const transitionDuration = Util.getTransitionDurationFromElement(this._element);

      $(this._element)
        .one(Util.TRANSITION_END, complete)
        .emulateTransitionEnd(transitionDuration);
    }

    setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    }

    dispose() {
      $.removeData(this._element, DATA_KEY$3);

      this._config          = null;
      this._parent          = null;
      this._element         = null;
      this._triggerArray    = null;
      this._isTransitioning = null;
    }

    // Private

    _getConfig(config) {
      config = {
        ...Default$1,
        ...config
      };
      config.toggle = Boolean(config.toggle); // Coerce string values
      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config
    }

    _getDimension() {
      const hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT
    }

    _getParent() {
      let parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent;

        // It's a jQuery object
        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      const selector =
        `[data-toggle="collapse"][data-parent="${this._config.parent}"]`;

      const children = [].slice.call(parent.querySelectorAll(selector));
      $(children).each((i, element) => {
        this._addAriaAndCollapsedClass(
          Collapse._getTargetFromElement(element),
          [element]
        );
      });

      return parent
    }

    _addAriaAndCollapsedClass(element, triggerArray) {
      const isOpen = $(element).hasClass(ClassName$3.SHOW);

      if (triggerArray.length) {
        $(triggerArray)
          .toggleClass(ClassName$3.COLLAPSED, !isOpen)
          .attr('aria-expanded', isOpen);
      }
    }

    // Static

    static _getTargetFromElement(element) {
      const selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null
    }

    static _jQueryInterface(config) {
      return this.each(function () {
        const $this   = $(this);
        let data      = $this.data(DATA_KEY$3);
        const _config = {
          ...Default$1,
          ...$this.data(),
          ...typeof config === 'object' && config ? config : {}
        };

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }
          data[config]();
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    const $trigger = $(this);
    const selector = Util.getSelectorFromElement(this);
    const selectors = [].slice.call(document.querySelectorAll(selector));

    $(selectors).each(function () {
      const $target = $(this);
      const data    = $target.data(DATA_KEY$3);
      const config  = data ? 'toggle' : $trigger.data();
      Collapse._jQueryInterface.call($target, config);
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$3] = Collapse._jQueryInterface;
  $.fn[NAME$3].Constructor = Collapse;
  $.fn[NAME$3].noConflict = () => {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$4               = 'modal';
  const VERSION$4            = '4.3.1';
  const DATA_KEY$4           = 'bs.modal';
  const EVENT_KEY$4          = `.${DATA_KEY$4}`;
  const DATA_API_KEY$4       = '.data-api';
  const JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
  const ESCAPE_KEYCODE     = 27; // KeyboardEvent.which value for Escape (Esc) key

  const Default$2 = {
    backdrop : true,
    keyboard : true,
    focus    : true,
    show     : true
  };

  const DefaultType$2 = {
    backdrop : '(boolean|string)',
    keyboard : 'boolean',
    focus    : 'boolean',
    show     : 'boolean'
  };

  const Event$4 = {
    HIDE              : `hide${EVENT_KEY$4}`,
    HIDDEN            : `hidden${EVENT_KEY$4}`,
    SHOW              : `show${EVENT_KEY$4}`,
    SHOWN             : `shown${EVENT_KEY$4}`,
    FOCUSIN           : `focusin${EVENT_KEY$4}`,
    RESIZE            : `resize${EVENT_KEY$4}`,
    CLICK_DISMISS     : `click.dismiss${EVENT_KEY$4}`,
    KEYDOWN_DISMISS   : `keydown.dismiss${EVENT_KEY$4}`,
    MOUSEUP_DISMISS   : `mouseup.dismiss${EVENT_KEY$4}`,
    MOUSEDOWN_DISMISS : `mousedown.dismiss${EVENT_KEY$4}`,
    CLICK_DATA_API    : `click${EVENT_KEY$4}${DATA_API_KEY$4}`
  };

  const ClassName$4 = {
    SCROLLABLE         : 'modal-dialog-scrollable',
    SCROLLBAR_MEASURER : 'modal-scrollbar-measure',
    BACKDROP           : 'modal-backdrop',
    OPEN               : 'modal-open',
    FADE               : 'fade',
    SHOW               : 'show'
  };

  const Selector$4 = {
    DIALOG         : '.modal-dialog',
    MODAL_BODY     : '.modal-body',
    DATA_TOGGLE    : '[data-toggle="modal"]',
    DATA_DISMISS   : '[data-dismiss="modal"]',
    FIXED_CONTENT  : '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT : '.sticky-top'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Modal {
    constructor(element, config) {
      this._config              = this._getConfig(config);
      this._element             = element;
      this._dialog              = element.querySelector(Selector$4.DIALOG);
      this._backdrop            = null;
      this._isShown             = false;
      this._isBodyOverflowing   = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning     = false;
      this._scrollbarWidth      = 0;
    }

    // Getters

    static get VERSION() {
      return VERSION$4
    }

    static get Default() {
      return Default$2
    }

    // Public

    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget)
    }

    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return
      }

      if ($(this._element).hasClass(ClassName$4.FADE)) {
        this._isTransitioning = true;
      }

      const showEvent = $.Event(Event$4.SHOW, {
        relatedTarget
      });

      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return
      }

      this._isShown = true;

      this._checkScrollbar();
      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();
      this._setResizeEvent();

      $(this._element).on(
        Event$4.CLICK_DISMISS,
        Selector$4.DATA_DISMISS,
        (event) => this.hide(event)
      );

      $(this._dialog).on(Event$4.MOUSEDOWN_DISMISS, () => {
        $(this._element).one(Event$4.MOUSEUP_DISMISS, (event) => {
          if ($(event.target).is(this._element)) {
            this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(() => this._showElement(relatedTarget));
    }

    hide(event) {
      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return
      }

      const hideEvent = $.Event(Event$4.HIDE);

      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return
      }

      this._isShown = false;
      const transition = $(this._element).hasClass(ClassName$4.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();
      this._setResizeEvent();

      $(document).off(Event$4.FOCUSIN);

      $(this._element).removeClass(ClassName$4.SHOW);

      $(this._element).off(Event$4.CLICK_DISMISS);
      $(this._dialog).off(Event$4.MOUSEDOWN_DISMISS);


      if (transition) {
        const transitionDuration  = Util.getTransitionDurationFromElement(this._element);

        $(this._element)
          .one(Util.TRANSITION_END, (event) => this._hideModal(event))
          .emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    }

    dispose() {
      [window, this._element, this._dialog]
        .forEach((htmlElement) => $(htmlElement).off(EVENT_KEY$4));

      /**
       * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `Event.CLICK_DATA_API` event that should remain
       */
      $(document).off(Event$4.FOCUSIN);

      $.removeData(this._element, DATA_KEY$4);

      this._config              = null;
      this._element             = null;
      this._dialog              = null;
      this._backdrop            = null;
      this._isShown             = null;
      this._isBodyOverflowing   = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning     = null;
      this._scrollbarWidth      = null;
    }

    handleUpdate() {
      this._adjustDialog();
    }

    // Private

    _getConfig(config) {
      config = {
        ...Default$2,
        ...config
      };
      Util.typeCheckConfig(NAME$4, config, DefaultType$2);
      return config
    }

    _showElement(relatedTarget) {
      const transition = $(this._element).hasClass(ClassName$4.FADE);

      if (!this._element.parentNode ||
          this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.setAttribute('aria-modal', true);

      if ($(this._dialog).hasClass(ClassName$4.SCROLLABLE)) {
        this._dialog.querySelector(Selector$4.MODAL_BODY).scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName$4.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      const shownEvent = $.Event(Event$4.SHOWN, {
        relatedTarget
      });

      const transitionComplete = () => {
        if (this._config.focus) {
          this._element.focus();
        }
        this._isTransitioning = false;
        $(this._element).trigger(shownEvent);
      };

      if (transition) {
        const transitionDuration  = Util.getTransitionDurationFromElement(this._dialog);

        $(this._dialog)
          .one(Util.TRANSITION_END, transitionComplete)
          .emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    }

    _enforceFocus() {
      $(document)
        .off(Event$4.FOCUSIN) // Guard against infinite focus loop
        .on(Event$4.FOCUSIN, (event) => {
          if (document !== event.target &&
              this._element !== event.target &&
              $(this._element).has(event.target).length === 0) {
            this._element.focus();
          }
        });
    }

    _setEscapeEvent() {
      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event$4.KEYDOWN_DISMISS, (event) => {
          if (event.which === ESCAPE_KEYCODE) {
            event.preventDefault();
            this.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event$4.KEYDOWN_DISMISS);
      }
    }

    _setResizeEvent() {
      if (this._isShown) {
        $(window).on(Event$4.RESIZE, (event) => this.handleUpdate(event));
      } else {
        $(window).off(Event$4.RESIZE);
      }
    }

    _hideModal() {
      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', true);
      this._element.removeAttribute('aria-modal');
      this._isTransitioning = false;
      this._showBackdrop(() => {
        $(document.body).removeClass(ClassName$4.OPEN);
        this._resetAdjustments();
        this._resetScrollbar();
        $(this._element).trigger(Event$4.HIDDEN);
      });
    }

    _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    }

    _showBackdrop(callback) {
      const animate = $(this._element).hasClass(ClassName$4.FADE)
        ? ClassName$4.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName$4.BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $(this._backdrop).appendTo(document.body);

        $(this._element).on(Event$4.CLICK_DISMISS, (event) => {
          if (this._ignoreBackdropClick) {
            this._ignoreBackdropClick = false;
            return
          }
          if (event.target !== event.currentTarget) {
            return
          }
          if (this._config.backdrop === 'static') {
            this._element.focus();
          } else {
            this.hide();
          }
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName$4.SHOW);

        if (!callback) {
          return
        }

        if (!animate) {
          callback();
          return
        }

        const backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

        $(this._backdrop)
          .one(Util.TRANSITION_END, callback)
          .emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName$4.SHOW);

        const callbackRemove = () => {
          this._removeBackdrop();
          if (callback) {
            callback();
          }
        };

        if ($(this._element).hasClass(ClassName$4.FADE)) {
          const backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $(this._backdrop)
            .one(Util.TRANSITION_END, callbackRemove)
            .emulateTransitionEnd(backdropTransitionDuration);
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

    _adjustDialog() {
      const isModalOverflowing =
        this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = `${this._scrollbarWidth}px`;
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = `${this._scrollbarWidth}px`;
      }
    }

    _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    }

    _checkScrollbar() {
      const rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    }

    _setScrollbar() {
      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        const fixedContent = [].slice.call(document.querySelectorAll(Selector$4.FIXED_CONTENT));
        const stickyContent = [].slice.call(document.querySelectorAll(Selector$4.STICKY_CONTENT));

        // Adjust fixed content padding
        $(fixedContent).each((index, element) => {
          const actualPadding = element.style.paddingRight;
          const calculatedPadding = $(element).css('padding-right');
          $(element)
            .data('padding-right', actualPadding)
            .css('padding-right', `${parseFloat(calculatedPadding) + this._scrollbarWidth}px`);
        });

        // Adjust sticky content margin
        $(stickyContent).each((index, element) => {
          const actualMargin = element.style.marginRight;
          const calculatedMargin = $(element).css('margin-right');
          $(element)
            .data('margin-right', actualMargin)
            .css('margin-right', `${parseFloat(calculatedMargin) - this._scrollbarWidth}px`);
        });

        // Adjust body padding
        const actualPadding = document.body.style.paddingRight;
        const calculatedPadding = $(document.body).css('padding-right');
        $(document.body)
          .data('padding-right', actualPadding)
          .css('padding-right', `${parseFloat(calculatedPadding) + this._scrollbarWidth}px`);
      }

      $(document.body).addClass(ClassName$4.OPEN);
    }

    _resetScrollbar() {
      // Restore fixed content padding
      const fixedContent = [].slice.call(document.querySelectorAll(Selector$4.FIXED_CONTENT));
      $(fixedContent).each((index, element) => {
        const padding = $(element).data('padding-right');
        $(element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      });

      // Restore sticky content
      const elements = [].slice.call(document.querySelectorAll(`${Selector$4.STICKY_CONTENT}`));
      $(elements).each((index, element) => {
        const margin = $(element).data('margin-right');
        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        }
      });

      // Restore body padding
      const padding = $(document.body).data('padding-right');
      $(document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    }

    _getScrollbarWidth() { // thx d.walsh
      const scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName$4.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth
    }

    // Static

    static _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY$4);
        const _config = {
          ...Default$2,
          ...$(this).data(),
          ...typeof config === 'object' && config ? config : {}
        };

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }
          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function (event) {
    let target;
    const selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    const config = $(target).data(DATA_KEY$4)
      ? 'toggle' : {
        ...$(target).data(),
        ...$(this).data()
      };

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    const $target = $(target).one(Event$4.SHOW, (showEvent) => {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return
      }

      $target.one(Event$4.HIDDEN, () => {
        if ($(this).is(':visible')) {
          this.focus();
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

  $.fn[NAME$4] = Modal._jQueryInterface;
  $.fn[NAME$4].Constructor = Modal;
  $.fn[NAME$4].noConflict = () => {
    $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Modal._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  const uriAttrs = [
    'background',
    'cite',
    'href',
    'itemtype',
    'longdesc',
    'poster',
    'src',
    'xlink:href'
  ];

  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;

  const DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };

  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */
  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;

  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */
  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    const attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN))
      }

      return true
    }

    const regExp = allowedAttributeList.filter((attrRegex) => attrRegex instanceof RegExp);

    // Check if a regular expression validates the attribute.
    for (let i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true
      }
    }

    return false
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml)
    }

    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    const whitelistKeys = Object.keys(whiteList);
    const elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    for (let i = 0, len = elements.length; i < len; i++) {
      const el = elements[i];
      const elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);

        continue
      }

      const attributeList = [].slice.call(el.attributes);
      const whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);

      attributeList.forEach((attr) => {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    }

    return createdDocument.body.innerHTML
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$5                  = 'tooltip';
  const VERSION$5               = '4.3.1';
  const DATA_KEY$5              = 'bs.tooltip';
  const EVENT_KEY$5             = `.${DATA_KEY$5}`;
  const JQUERY_NO_CONFLICT$5    = $.fn[NAME$5];
  const CLASS_PREFIX          = 'bs-tooltip';
  const BSCLS_PREFIX_REGEX    = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, 'g');
  const DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];

  const DefaultType$3 = {
    animation         : 'boolean',
    template          : 'string',
    title             : '(string|element|function)',
    trigger           : 'string',
    delay             : '(number|object)',
    html              : 'boolean',
    selector          : '(string|boolean)',
    placement         : '(string|function)',
    offset            : '(number|string|function)',
    container         : '(string|element|boolean)',
    fallbackPlacement : '(string|array)',
    boundary          : '(string|element)',
    sanitize          : 'boolean',
    sanitizeFn        : '(null|function)',
    whiteList         : 'object'
  };

  const AttachmentMap = {
    AUTO   : 'auto',
    TOP    : 'top',
    RIGHT  : 'right',
    BOTTOM : 'bottom',
    LEFT   : 'left'
  };

  const Default$3 = {
    animation         : true,
    template          : '<div class="tooltip" role="tooltip">' +
                      '<div class="arrow"></div>' +
                      '<div class="tooltip-inner"></div></div>',
    trigger           : 'hover focus',
    title             : '',
    delay             : 0,
    html              : false,
    selector          : false,
    placement         : 'top',
    offset            : 0,
    container         : false,
    fallbackPlacement : 'flip',
    boundary          : 'scrollParent',
    sanitize          : true,
    sanitizeFn        : null,
    whiteList         : DefaultWhitelist
  };

  const HoverState = {
    SHOW : 'show',
    OUT  : 'out'
  };

  const Event$5 = {
    HIDE       : `hide${EVENT_KEY$5}`,
    HIDDEN     : `hidden${EVENT_KEY$5}`,
    SHOW       : `show${EVENT_KEY$5}`,
    SHOWN      : `shown${EVENT_KEY$5}`,
    INSERTED   : `inserted${EVENT_KEY$5}`,
    CLICK      : `click${EVENT_KEY$5}`,
    FOCUSIN    : `focusin${EVENT_KEY$5}`,
    FOCUSOUT   : `focusout${EVENT_KEY$5}`,
    MOUSEENTER : `mouseenter${EVENT_KEY$5}`,
    MOUSELEAVE : `mouseleave${EVENT_KEY$5}`
  };

  const ClassName$5 = {
    FADE : 'fade',
    SHOW : 'show'
  };

  const Selector$5 = {
    TOOLTIP       : '.tooltip',
    TOOLTIP_INNER : '.tooltip-inner',
    ARROW         : '.arrow'
  };

  const Trigger = {
    HOVER  : 'hover',
    FOCUS  : 'focus',
    CLICK  : 'click',
    MANUAL : 'manual'
  };


  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Tooltip {
    constructor(element, config) {
      /**
       * Check for Popper dependency
       * Popper - https://popper.js.org
       */
      if (typeof Popper$1 === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)')
      }

      // private
      this._isEnabled     = true;
      this._timeout       = 0;
      this._hoverState    = '';
      this._activeTrigger = {};
      this._popper        = null;

      // Protected
      this.element = element;
      this.config  = this._getConfig(config);
      this.tip     = null;

      this._setListeners();
    }

    // Getters

    static get VERSION() {
      return VERSION$5
    }

    static get Default() {
      return Default$3
    }

    static get NAME() {
      return NAME$5
    }

    static get DATA_KEY() {
      return DATA_KEY$5
    }

    static get Event() {
      return Event$5
    }

    static get EVENT_KEY() {
      return EVENT_KEY$5
    }

    static get DefaultType() {
      return DefaultType$3
    }

    // Public

    enable() {
      this._isEnabled = true;
    }

    disable() {
      this._isEnabled = false;
    }

    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }

    toggle(event) {
      if (!this._isEnabled) {
        return
      }

      if (event) {
        const dataKey = this.constructor.DATA_KEY;
        let context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(
            event.currentTarget,
            this._getDelegateConfig()
          );
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($(this.getTipElement()).hasClass(ClassName$5.SHOW)) {
          this._leave(null, this);
          return
        }

        this._enter(null, this);
      }
    }

    dispose() {
      clearTimeout(this._timeout);

      $.removeData(this.element, this.constructor.DATA_KEY);

      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled     = null;
      this._timeout       = null;
      this._hoverState    = null;
      this._activeTrigger = null;
      if (this._popper !== null) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config  = null;
      this.tip     = null;
    }

    show() {
      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements')
      }

      const showEvent = $.Event(this.constructor.Event.SHOW);
      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);

        const shadowRoot = Util.findShadowRoot(this.element);
        const isInTheDom = $.contains(
          shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement,
          this.element
        );

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return
        }

        const tip   = this.getTipElement();
        const tipId = Util.getUID(this.constructor.NAME);

        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);

        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName$5.FADE);
        }

        const placement  = typeof this.config.placement === 'function'
          ? this.config.placement.call(this, tip, this.element)
          : this.config.placement;

        const attachment = this._getAttachment(placement);
        this.addAttachmentClass(attachment);

        const container = this._getContainer();
        $(tip).data(this.constructor.DATA_KEY, this);

        if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $(tip).appendTo(container);
        }

        $(this.element).trigger(this.constructor.Event.INSERTED);

        this._popper = new Popper$1(this.element, tip, {
          placement: attachment,
          modifiers: {
            offset: this._getOffset(),
            flip: {
              behavior: this.config.fallbackPlacement
            },
            arrow: {
              element: Selector$5.ARROW
            },
            preventOverflow: {
              boundariesElement: this.config.boundary
            }
          },
          onCreate: (data) => {
            if (data.originalPlacement !== data.placement) {
              this._handlePopperPlacementChange(data);
            }
          },
          onUpdate: (data) => this._handlePopperPlacementChange(data)
        });

        $(tip).addClass(ClassName$5.SHOW);

        // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().on('mouseover', null, $.noop);
        }

        const complete = () => {
          if (this.config.animation) {
            this._fixTransition();
          }
          const prevHoverState = this._hoverState;
          this._hoverState     = null;

          $(this.element).trigger(this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            this._leave(null, this);
          }
        };

        if ($(this.tip).hasClass(ClassName$5.FADE)) {
          const transitionDuration = Util.getTransitionDurationFromElement(this.tip);

          $(this.tip)
            .one(Util.TRANSITION_END, complete)
            .emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    }

    hide(callback) {
      const tip       = this.getTipElement();
      const hideEvent = $.Event(this.constructor.Event.HIDE);
      const complete = () => {
        if (this._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        this._cleanTipClass();
        this.element.removeAttribute('aria-describedby');
        $(this.element).trigger(this.constructor.Event.HIDDEN);
        if (this._popper !== null) {
          this._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return
      }

      $(tip).removeClass(ClassName$5.SHOW);

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        $(document.body).children().off('mouseover', null, $.noop);
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if ($(this.tip).hasClass(ClassName$5.FADE)) {
        const transitionDuration = Util.getTransitionDurationFromElement(tip);

        $(tip)
          .one(Util.TRANSITION_END, complete)
          .emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    }

    update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    }

    // Protected

    isWithContent() {
      return Boolean(this.getTitle())
    }

    addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(`${CLASS_PREFIX}-${attachment}`);
    }

    getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip
    }

    setContent() {
      const tip = this.getTipElement();
      this.setElementContent($(tip.querySelectorAll(Selector$5.TOOLTIP_INNER)), this.getTitle());
      $(tip).removeClass(`${ClassName$5.FADE} ${ClassName$5.SHOW}`);
    }

    setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }

        return
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    }

    getTitle() {
      let title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function'
          ? this.config.title.call(this.element)
          : this.config.title;
      }

      return title
    }

    // Private

    _getOffset() {
      const offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = (data) => {
          data.offsets = {
            ...data.offsets,
            ...this.config.offset(data.offsets, this.element) || {}
          };

          return data
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset
    }

    _getContainer() {
      if (this.config.container === false) {
        return document.body
      }

      if (Util.isElement(this.config.container)) {
        return $(this.config.container)
      }

      return $(document).find(this.config.container)
    }

    _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()]
    }

    _setListeners() {
      const triggers = this.config.trigger.split(' ');

      triggers.forEach((trigger) => {
        if (trigger === 'click') {
          $(this.element).on(
            this.constructor.Event.CLICK,
            this.config.selector,
            (event) => this.toggle(event)
          );
        } else if (trigger !== Trigger.MANUAL) {
          const eventIn = trigger === Trigger.HOVER
            ? this.constructor.Event.MOUSEENTER
            : this.constructor.Event.FOCUSIN;
          const eventOut = trigger === Trigger.HOVER
            ? this.constructor.Event.MOUSELEAVE
            : this.constructor.Event.FOCUSOUT;

          $(this.element)
            .on(
              eventIn,
              this.config.selector,
              (event) => this._enter(event)
            )
            .on(
              eventOut,
              this.config.selector,
              (event) => this._leave(event)
            );
        }
      });

      $(this.element).closest('.modal').on(
        'hide.bs.modal',
        () => {
          if (this.element) {
            this.hide();
          }
        }
      );

      if (this.config.selector) {
        this.config = {
          ...this.config,
          trigger: 'manual',
          selector: ''
        };
      } else {
        this._fixTitle();
      }
    }

    _fixTitle() {
      const titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute(
          'data-original-title',
          this.element.getAttribute('title') || ''
        );

        this.element.setAttribute('title', '');
      }
    }

    _enter(event, context) {
      const dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(
          event.currentTarget,
          this._getDelegateConfig()
        );
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[
          event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER
        ] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName$5.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return
      }

      context._timeout = setTimeout(() => {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    }

    _leave(event, context) {
      const dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(
          event.currentTarget,
          this._getDelegateConfig()
        );
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[
          event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER
        ] = false;
      }

      if (context._isWithActiveTrigger()) {
        return
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return
      }

      context._timeout = setTimeout(() => {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    }

    _isWithActiveTrigger() {
      for (const trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true
        }
      }

      return false
    }

    _getConfig(config) {
      const dataAttributes = $(this.element).data();

      Object.keys(dataAttributes)
        .forEach((dataAttr) => {
          if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
            delete dataAttributes[dataAttr];
          }
        });

      config = {
        ...this.constructor.Default,
        ...dataAttributes,
        ...typeof config === 'object' && config ? config : {}
      };

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(
        NAME$5,
        config,
        this.constructor.DefaultType
      );

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config
    }

    _getDelegateConfig() {
      const config = {};

      if (this.config) {
        for (const key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config
    }

    _cleanTipClass() {
      const $tip = $(this.getTipElement());
      const tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    }

    _handlePopperPlacementChange(popperData) {
      const popperInstance = popperData.instance;
      this.tip = popperInstance.popper;
      this._cleanTipClass();
      this.addAttachmentClass(this._getAttachment(popperData.placement));
    }

    _fixTransition() {
      const tip = this.getTipElement();
      const initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return
      }

      $(tip).removeClass(ClassName$5.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY$5);
        const _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }
          data[config]();
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$5] = Tooltip._jQueryInterface;
  $.fn[NAME$5].Constructor = Tooltip;
  $.fn[NAME$5].noConflict = () => {
    $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Tooltip._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$6                = 'popover';
  const VERSION$6             = '4.3.1';
  const DATA_KEY$6            = 'bs.popover';
  const EVENT_KEY$6           = `.${DATA_KEY$6}`;
  const JQUERY_NO_CONFLICT$6  = $.fn[NAME$6];
  const CLASS_PREFIX$1        = 'bs-popover';
  const BSCLS_PREFIX_REGEX$1  = new RegExp(`(^|\\s)${CLASS_PREFIX$1}\\S+`, 'g');

  const Default$4 = {
    ...Tooltip.Default,
    placement : 'right',
    trigger   : 'click',
    content   : '',
    template  : '<div class="popover" role="tooltip">' +
                '<div class="arrow"></div>' +
                '<h3 class="popover-header"></h3>' +
                '<div class="popover-body"></div></div>'
  };

  const DefaultType$4 = {
    ...Tooltip.DefaultType,
    content : '(string|element|function)'
  };

  const ClassName$6 = {
    FADE : 'fade',
    SHOW : 'show'
  };

  const Selector$6 = {
    TITLE   : '.popover-header',
    CONTENT : '.popover-body'
  };

  const Event$6 = {
    HIDE       : `hide${EVENT_KEY$6}`,
    HIDDEN     : `hidden${EVENT_KEY$6}`,
    SHOW       : `show${EVENT_KEY$6}`,
    SHOWN      : `shown${EVENT_KEY$6}`,
    INSERTED   : `inserted${EVENT_KEY$6}`,
    CLICK      : `click${EVENT_KEY$6}`,
    FOCUSIN    : `focusin${EVENT_KEY$6}`,
    FOCUSOUT   : `focusout${EVENT_KEY$6}`,
    MOUSEENTER : `mouseenter${EVENT_KEY$6}`,
    MOUSELEAVE : `mouseleave${EVENT_KEY$6}`
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Popover extends Tooltip {
    // Getters

    static get VERSION() {
      return VERSION$6
    }

    static get Default() {
      return Default$4
    }

    static get NAME() {
      return NAME$6
    }

    static get DATA_KEY() {
      return DATA_KEY$6
    }

    static get Event() {
      return Event$6
    }

    static get EVENT_KEY() {
      return EVENT_KEY$6
    }

    static get DefaultType() {
      return DefaultType$4
    }

    // Overrides

    isWithContent() {
      return this.getTitle() || this._getContent()
    }

    addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(`${CLASS_PREFIX$1}-${attachment}`);
    }

    getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip
    }

    setContent() {
      const $tip = $(this.getTipElement());

      // We use append for html objects to maintain js events
      this.setElementContent($tip.find(Selector$6.TITLE), this.getTitle());
      let content = this._getContent();
      if (typeof content === 'function') {
        content = content.call(this.element);
      }
      this.setElementContent($tip.find(Selector$6.CONTENT), content);

      $tip.removeClass(`${ClassName$6.FADE} ${ClassName$6.SHOW}`);
    }

    // Private

    _getContent() {
      return this.element.getAttribute('data-content') ||
        this.config.content
    }

    _cleanTipClass() {
      const $tip = $(this.getTipElement());
      const tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);
      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY$6);
        const _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }
          data[config]();
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$6] = Popover._jQueryInterface;
  $.fn[NAME$6].Constructor = Popover;
  $.fn[NAME$6].noConflict = () => {
    $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Popover._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$7               = 'scrollspy';
  const VERSION$7            = '4.3.1';
  const DATA_KEY$7           = 'bs.scrollspy';
  const EVENT_KEY$7          = `.${DATA_KEY$7}`;
  const DATA_API_KEY$5       = '.data-api';
  const JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];

  const Default$5 = {
    offset : 10,
    method : 'auto',
    target : ''
  };

  const DefaultType$5 = {
    offset : 'number',
    method : 'string',
    target : '(string|element)'
  };

  const Event$7 = {
    ACTIVATE      : `activate${EVENT_KEY$7}`,
    SCROLL        : `scroll${EVENT_KEY$7}`,
    LOAD_DATA_API : `load${EVENT_KEY$7}${DATA_API_KEY$5}`
  };

  const ClassName$7 = {
    DROPDOWN_ITEM : 'dropdown-item',
    DROPDOWN_MENU : 'dropdown-menu',
    ACTIVE        : 'active'
  };

  const Selector$7 = {
    DATA_SPY        : '[data-spy="scroll"]',
    ACTIVE          : '.active',
    NAV_LIST_GROUP  : '.nav, .list-group',
    NAV_LINKS       : '.nav-link',
    NAV_ITEMS       : '.nav-item',
    LIST_ITEMS      : '.list-group-item',
    DROPDOWN        : '.dropdown',
    DROPDOWN_ITEMS  : '.dropdown-item',
    DROPDOWN_TOGGLE : '.dropdown-toggle'
  };

  const OffsetMethod = {
    OFFSET   : 'offset',
    POSITION : 'position'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class ScrollSpy {
    constructor(element, config) {
      this._element       = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config        = this._getConfig(config);
      this._selector      = `${this._config.target} ${Selector$7.NAV_LINKS},` +
                            `${this._config.target} ${Selector$7.LIST_ITEMS},` +
                            `${this._config.target} ${Selector$7.DROPDOWN_ITEMS}`;
      this._offsets       = [];
      this._targets       = [];
      this._activeTarget  = null;
      this._scrollHeight  = 0;

      $(this._scrollElement).on(Event$7.SCROLL, (event) => this._process(event));

      this.refresh();
      this._process();
    }

    // Getters

    static get VERSION() {
      return VERSION$7
    }

    static get Default() {
      return Default$5
    }

    // Public

    refresh() {
      const autoMethod = this._scrollElement === this._scrollElement.window
        ? OffsetMethod.OFFSET : OffsetMethod.POSITION;

      const offsetMethod = this._config.method === 'auto'
        ? autoMethod : this._config.method;

      const offsetBase = offsetMethod === OffsetMethod.POSITION
        ? this._getScrollTop() : 0;

      this._offsets = [];
      this._targets = [];

      this._scrollHeight = this._getScrollHeight();

      const targets = [].slice.call(document.querySelectorAll(this._selector));

      targets
        .map((element) => {
          let target;
          const targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }

          if (target) {
            const targetBCR = target.getBoundingClientRect();
            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [
                $(target)[offsetMethod]().top + offsetBase,
                targetSelector
              ]
            }
          }
          return null
        })
        .filter((item) => item)
        .sort((a, b) => a[0] - b[0])
        .forEach((item) => {
          this._offsets.push(item[0]);
          this._targets.push(item[1]);
        });
    }

    dispose() {
      $.removeData(this._element, DATA_KEY$7);
      $(this._scrollElement).off(EVENT_KEY$7);

      this._element       = null;
      this._scrollElement = null;
      this._config        = null;
      this._selector      = null;
      this._offsets       = null;
      this._targets       = null;
      this._activeTarget  = null;
      this._scrollHeight  = null;
    }

    // Private

    _getConfig(config) {
      config = {
        ...Default$5,
        ...typeof config === 'object' && config ? config : {}
      };

      if (typeof config.target !== 'string') {
        let id = $(config.target).attr('id');
        if (!id) {
          id = Util.getUID(NAME$7);
          $(config.target).attr('id', id);
        }
        config.target = `#${id}`;
      }

      Util.typeCheckConfig(NAME$7, config, DefaultType$5);

      return config
    }

    _getScrollTop() {
      return this._scrollElement === window
        ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
    }

    _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      )
    }

    _getOffsetHeight() {
      return this._scrollElement === window
        ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
    }

    _process() {
      const scrollTop    = this._getScrollTop() + this._config.offset;
      const scrollHeight = this._getScrollHeight();
      const maxScroll    = this._config.offset +
        scrollHeight -
        this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        const target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }
        return
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;
        this._clear();
        return
      }

      const offsetLength = this._offsets.length;
      for (let i = offsetLength; i--;) {
        const isActiveTarget = this._activeTarget !== this._targets[i] &&
            scrollTop >= this._offsets[i] &&
            (typeof this._offsets[i + 1] === 'undefined' ||
                scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    }

    _activate(target) {
      this._activeTarget = target;

      this._clear();

      const queries = this._selector
        .split(',')
        .map((selector) => `${selector}[data-target="${target}"],${selector}[href="${target}"]`);

      const $link = $([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(ClassName$7.DROPDOWN_ITEM)) {
        $link.closest(Selector$7.DROPDOWN).find(Selector$7.DROPDOWN_TOGGLE).addClass(ClassName$7.ACTIVE);
        $link.addClass(ClassName$7.ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(ClassName$7.ACTIVE);
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        $link.parents(Selector$7.NAV_LIST_GROUP).prev(`${Selector$7.NAV_LINKS}, ${Selector$7.LIST_ITEMS}`).addClass(ClassName$7.ACTIVE);
        // Handle special case when .nav-link is inside .nav-item
        $link.parents(Selector$7.NAV_LIST_GROUP).prev(Selector$7.NAV_ITEMS).children(Selector$7.NAV_LINKS).addClass(ClassName$7.ACTIVE);
      }

      $(this._scrollElement).trigger(Event$7.ACTIVATE, {
        relatedTarget: target
      });
    }

    _clear() {
      [].slice.call(document.querySelectorAll(this._selector))
        .filter((node) => node.classList.contains(ClassName$7.ACTIVE))
        .forEach((node) => node.classList.remove(ClassName$7.ACTIVE));
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY$7);
        const _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }
          data[config]();
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(window).on(Event$7.LOAD_DATA_API, () => {
    const scrollSpys = [].slice.call(document.querySelectorAll(Selector$7.DATA_SPY));
    const scrollSpysLength = scrollSpys.length;

    for (let i = scrollSpysLength; i--;) {
      const $spy = $(scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$7] = ScrollSpy._jQueryInterface;
  $.fn[NAME$7].Constructor = ScrollSpy;
  $.fn[NAME$7].noConflict = () => {
    $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return ScrollSpy._jQueryInterface
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$8               = 'tab';
  const VERSION$8            = '4.3.1';
  const DATA_KEY$8           = 'bs.tab';
  const EVENT_KEY$8          = `.${DATA_KEY$8}`;
  const DATA_API_KEY$6       = '.data-api';
  const JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];

  const Event$8 = {
    HIDE           : `hide${EVENT_KEY$8}`,
    HIDDEN         : `hidden${EVENT_KEY$8}`,
    SHOW           : `show${EVENT_KEY$8}`,
    SHOWN          : `shown${EVENT_KEY$8}`,
    CLICK_DATA_API : `click${EVENT_KEY$8}${DATA_API_KEY$6}`
  };

  const ClassName$8 = {
    DROPDOWN_MENU : 'dropdown-menu',
    ACTIVE        : 'active',
    DISABLED      : 'disabled',
    FADE          : 'fade',
    SHOW          : 'show'
  };

  const Selector$8 = {
    DROPDOWN              : '.dropdown',
    NAV_LIST_GROUP        : '.nav, .list-group',
    ACTIVE                : '.active',
    ACTIVE_UL             : '> li > .active',
    DATA_TOGGLE           : '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE       : '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD : '> .dropdown-menu .active'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Tab {
    constructor(element) {
      this._element = element;
    }

    // Getters

    static get VERSION() {
      return VERSION$8
    }

    // Public

    show() {
      if (this._element.parentNode &&
          this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
          $(this._element).hasClass(ClassName$8.ACTIVE) ||
          $(this._element).hasClass(ClassName$8.DISABLED)) {
        return
      }

      let target;
      let previous;
      const listElement = $(this._element).closest(Selector$8.NAV_LIST_GROUP)[0];
      const selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$8.ACTIVE_UL : Selector$8.ACTIVE;
        previous = $.makeArray($(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      const hideEvent = $.Event(Event$8.HIDE, {
        relatedTarget: this._element
      });

      const showEvent = $.Event(Event$8.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() ||
          hideEvent.isDefaultPrevented()) {
        return
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(
        this._element,
        listElement
      );

      const complete = () => {
        const hiddenEvent = $.Event(Event$8.HIDDEN, {
          relatedTarget: this._element
        });

        const shownEvent = $.Event(Event$8.SHOWN, {
          relatedTarget: previous
        });

        $(previous).trigger(hiddenEvent);
        $(this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    }

    dispose() {
      $.removeData(this._element, DATA_KEY$8);
      this._element = null;
    }

    // Private

    _activate(element, container, callback) {
      const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL')
        ? $(container).find(Selector$8.ACTIVE_UL)
        : $(container).children(Selector$8.ACTIVE);

      const active = activeElements[0];
      const isTransitioning = callback && (active && $(active).hasClass(ClassName$8.FADE));
      const complete = () => this._transitionComplete(
        element,
        active,
        callback
      );

      if (active && isTransitioning) {
        const transitionDuration = Util.getTransitionDurationFromElement(active);

        $(active)
          .removeClass(ClassName$8.SHOW)
          .one(Util.TRANSITION_END, complete)
          .emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    }

    _transitionComplete(element, active, callback) {
      if (active) {
        $(active).removeClass(ClassName$8.ACTIVE);

        const dropdownChild = $(active.parentNode).find(
          Selector$8.DROPDOWN_ACTIVE_CHILD
        )[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName$8.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $(element).addClass(ClassName$8.ACTIVE);
      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(ClassName$8.FADE)) {
        element.classList.add(ClassName$8.SHOW);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName$8.DROPDOWN_MENU)) {
        const dropdownElement = $(element).closest(Selector$8.DROPDOWN)[0];

        if (dropdownElement) {
          const dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$8.DROPDOWN_TOGGLE));

          $(dropdownToggleList).addClass(ClassName$8.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        const $this = $(this);
        let data = $this.data(DATA_KEY$8);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$8, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }
          data[config]();
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document)
    .on(Event$8.CLICK_DATA_API, Selector$8.DATA_TOGGLE, function (event) {
      event.preventDefault();
      Tab._jQueryInterface.call($(this), 'show');
    });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$8] = Tab._jQueryInterface;
  $.fn[NAME$8].Constructor = Tab;
  $.fn[NAME$8].noConflict = () => {
    $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return Tab._jQueryInterface
  };

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var Util$1 = function () {
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
      transitionEnd = transitionEndTest(); // generate a concatenated transition end event selector

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

    var Base =
    /*#__PURE__*/
    function () {
      /**
       *
       * @param element
       * @param config
       * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
       */
      function Base($element, config, properties) {
        if (properties === void 0) {
          properties = {};
        }

        this.$element = $element;
        this.config = $.extend(true, {}, Default, config); // set properties for use in the constructor initialization

        for (var key in properties) {
          this[key] = properties[key];
        }
      }

      var _proto = Base.prototype;

      _proto.dispose = function dispose(dataKey) {
        this.$element.data(dataKey, null);
        this.$element = null;
        this.config = null;
      } // ------------------------------------------------------------------------
      // protected
      ;

      _proto.addFormGroupFocus = function addFormGroupFocus() {
        if (!this.$element.prop("disabled")) {
          this.$bmdFormGroup.addClass(ClassName.IS_FOCUSED);
        }
      };

      _proto.removeFormGroupFocus = function removeFormGroupFocus() {
        this.$bmdFormGroup.removeClass(ClassName.IS_FOCUSED);
      };

      _proto.removeIsFilled = function removeIsFilled() {
        this.$bmdFormGroup.removeClass(ClassName.IS_FILLED);
      };

      _proto.addIsFilled = function addIsFilled() {
        this.$bmdFormGroup.addClass(ClassName.IS_FILLED);
      } // Find bmd-form-group
      ;

      _proto.findMdbFormGroup = function findMdbFormGroup(raiseError) {
        if (raiseError === void 0) {
          raiseError = true;
        }

        var mfg = this.$element.closest(Selector.BMD_FORM_GROUP);

        if (mfg.length === 0 && raiseError) {
          $.error("Failed to find " + Selector.BMD_FORM_GROUP + " for " + Util$1.describe(this.$element));
        }

        return mfg;
      } // ------------------------------------------------------------------------
      // private
      // ------------------------------------------------------------------------
      // static
      ;

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
        create: true,
        // create a wrapper if form-group not found
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

    var BaseInput =
    /*#__PURE__*/
    function (_Base) {
      _inheritsLoose(BaseInput, _Base);

      /**
       *
       * @param element
       * @param config
       * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
       */
      function BaseInput($element, config, properties) {
        var _this;

        if (properties === void 0) {
          properties = {};
        }

        _this = _Base.call(this, $element, $.extend(true, {}, Default, config), properties) || this; // Enforce no overlap between components to prevent side effects

        _this._rejectInvalidComponentMatches(); // Enforce expected structure (if any)


        _this.rejectWithoutRequiredStructure(); // Enforce required classes for a consistent rendering


        _this._rejectWithoutRequiredClasses(); // Resolve the form-group first, it will be used for bmd-form-group if possible
        //   note: different components have different rules


        _this.$formGroup = _this.findFormGroup(_this.config.formGroup.required); // Will add bmd-form-group to form-group or create an bmd-form-group
        //  Performance Note: for those forms that are really performance driven, create the markup with the .bmd-form-group to avoid
        //    rendering changes once added.

        _this.$bmdFormGroup = _this.resolveMdbFormGroup(); // Resolve and mark the bmdLabel if necessary as defined by the config

        _this.$bmdLabel = _this.resolveMdbLabel(); // Signal to the bmd-form-group that a form-control-* variation is being used

        _this.resolveMdbFormGroupSizing();

        _this.addFocusListener();

        _this.addChangeListener();

        if (_this.$element.val() != "") {
          _this.addIsFilled();
        }

        return _this;
      }

      var _proto = BaseInput.prototype;

      _proto.dispose = function dispose(dataKey) {
        _Base.prototype.dispose.call(this, dataKey);

        this.$bmdFormGroup = null;
        this.$formGroup = null;
      } // ------------------------------------------------------------------------
      // protected
      ;

      _proto.rejectWithoutRequiredStructure = function rejectWithoutRequiredStructure() {// implement
      };

      _proto.addFocusListener = function addFocusListener() {
        var _this2 = this;

        this.$element.on("focus", function () {
          _this2.addFormGroupFocus();
        }).on("blur", function () {
          _this2.removeFormGroupFocus();
        });
      };

      _proto.addChangeListener = function addChangeListener() {
        var _this3 = this;

        this.$element.on("keydown paste", function (event) {
          if (Util$1.isChar(event)) {
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
      };

      _proto.addHasDanger = function addHasDanger() {
        this.$bmdFormGroup.addClass(ClassName.HAS_DANGER);
      };

      _proto.removeHasDanger = function removeHasDanger() {
        this.$bmdFormGroup.removeClass(ClassName.HAS_DANGER);
      };

      _proto.isEmpty = function isEmpty() {
        return this.$element.val() === null || this.$element.val() === undefined || this.$element.val() === "";
      } // Will add bmd-form-group to form-group or create a bmd-form-group if necessary
      ;

      _proto.resolveMdbFormGroup = function resolveMdbFormGroup() {
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
            this.$formGroup.addClass(ClassName.BMD_FORM_GROUP); // OLD: may want to implement this after all, see how the styling turns out, but using an existing form-group is less manipulation of the dom and therefore preferable
            // A form-group does exist, so add an bmd-form-group wrapping it's internal contents
            //fg.wrapInner(this.config.bmdFormGroup.template)
          }

          mfg = this.findMdbFormGroup(this.config.bmdFormGroup.required);
        }

        return mfg;
      } // Demarcation element (e.g. first child of a form-group)
      //  Subclasses such as file inputs may have different structures
      ;

      _proto.outerElement = function outerElement() {
        return this.$element;
      } // Will add bmd-label to bmd-form-group if not already specified
      ;

      _proto.resolveMdbLabel = function resolveMdbLabel() {
        var label = this.$bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD);

        if (label === undefined || label.length === 0) {
          // we need to find it based on the configured selectors
          label = this.findMdbLabel(this.config.label.required);

          if (label === undefined || label.length === 0) ; else {
            // a candidate label was found, add the configured default class name
            label.addClass(this.config.label.className);
          }
        }

        return label;
      } // Find bmd-label variant based on the config selectors
      ;

      _proto.findMdbLabel = function findMdbLabel(raiseError) {
        if (raiseError === void 0) {
          raiseError = true;
        }

        var label = null; // use the specified selector order

        for (var _iterator = this.config.label.selectors, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var selector = _ref;

          if ($.isFunction(selector)) {
            label = selector(this);
          } else {
            label = this.$bmdFormGroup.find(selector);
          }

          if (label !== undefined && label.length > 0) {
            break;
          }
        }

        if (label.length === 0 && raiseError) {
          $.error("Failed to find " + Selector.BMD_LABEL_WILDCARD + " within form-group for " + Util$1.describe(this.$element));
        }

        return label;
      } // Find bmd-form-group
      ;

      _proto.findFormGroup = function findFormGroup(raiseError) {
        if (raiseError === void 0) {
          raiseError = true;
        }

        var fg = this.$element.closest(Selector.FORM_GROUP);

        if (fg.length === 0 && raiseError) {
          $.error("Failed to find " + Selector.FORM_GROUP + " for " + Util$1.describe(this.$element));
        }

        return fg;
      } // Due to the interconnected nature of labels/inputs/help-blocks, signal the bmd-form-group-* size variation based on
      //  a found form-control-* size
      ;

      _proto.resolveMdbFormGroupSizing = function resolveMdbFormGroupSizing() {
        if (!this.config.convertInputSizeVariations) {
          return;
        } // Modification - Change text-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)


        for (var inputSize in FormControlSizeMarkers) {
          if (this.$element.hasClass(inputSize)) {
            //this.$element.removeClass(inputSize)
            this.$bmdFormGroup.addClass(FormControlSizeMarkers[inputSize]);
          }
        }
      } // ------------------------------------------------------------------------
      // private
      ;

      _proto._rejectInvalidComponentMatches = function _rejectInvalidComponentMatches() {
        for (var _iterator2 = this.config.invalidComponentMatches, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var otherComponent = _ref2;
          otherComponent.rejectMatch(this.constructor.name, this.$element);
        }
      };

      _proto._rejectWithoutRequiredClasses = function _rejectWithoutRequiredClasses() {
        for (var _iterator3 = this.config.requiredClasses, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref3;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
          }

          var requiredClass = _ref3;

          if (requiredClass.indexOf("||") !== -1) {
            var oneOf = requiredClass.split("||");

            for (var _iterator4 = oneOf, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
              var _ref4;

              if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref4 = _iterator4[_i4++];
              } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref4 = _i4.value;
              }

              var _requiredClass = _ref4;

              if (this.$element.hasClass(_requiredClass)) {
                break;
              }
            }
          } else if (this.$element.hasClass(requiredClass)) ;
        }
      } // ------------------------------------------------------------------------
      // static
      ;

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
        required: false // Prioritized find order for resolving the label to be used as an bmd-label if not specified in the markup
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

    var BaseSelection =
    /*#__PURE__*/
    function (_BaseInput) {
      _inheritsLoose(BaseSelection, _BaseInput);

      function BaseSelection($element, config, properties) {
        var _this;

        // properties = {inputType: checkbox, outerClass: checkbox-inline}
        // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
        // '.${this.outerClass} > label > input[type=${this.inputType}]'
        _this = _BaseInput.call(this, $element, $.extend(true, {}, Default, config), properties) || this;

        _this.decorateMarkup();

        return _this;
      } // ------------------------------------------------------------------------
      // protected


      var _proto = BaseSelection.prototype;

      _proto.decorateMarkup = function decorateMarkup() {
        var $decorator = $(this.config.template);
        this.$element.after($decorator); // initialize ripples after decorator has been inserted into DOM

        if (this.config.ripples !== false) {
          $decorator.bmdRipples();
        }
      } // Demarcation element (e.g. first child of a form-group)
      ;

      _proto.outerElement = function outerElement() {
        // .checkbox|switch|radio > label > input[type=checkbox|radio]
        // label.checkbox-inline > input[type=checkbox|radio]
        // .${this.outerClass} > label > input[type=${this.inputType}]
        return this.$element.parent().closest("." + this.outerClass);
      };

      _proto.rejectWithoutRequiredStructure = function rejectWithoutRequiredStructure() {
        // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
        // '.${this.outerClass} > label > input[type=${this.inputType}]'
        Util$1.assert(this.$element, !this.$element.parent().prop("tagName") === "label", this.constructor.name + "'s " + Util$1.describe(this.$element) + " parent element should be <label>.");
        Util$1.assert(this.$element, !this.outerElement().hasClass(this.outerClass), this.constructor.name + "'s " + Util$1.describe(this.$element) + " outer element should have class " + this.outerClass + ".");
      };

      _proto.addFocusListener = function addFocusListener() {
        var _this2 = this;

        // checkboxes didn't appear to bubble to the document, so we'll bind these directly
        this.$element.closest(Selector.LABEL).hover(function () {
          _this2.addFormGroupFocus();
        }, function () {
          _this2.removeFormGroupFocus();
        });
      };

      _proto.addChangeListener = function addChangeListener() {
        var _this3 = this;

        this.$element.change(function () {
          _this3.$element.blur();
        });
      } // ------------------------------------------------------------------------
      // private
      ;

      return BaseSelection;
    }(BaseInput);

    return BaseSelection;
  }(jQuery);

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

    var Checkbox =
    /*#__PURE__*/
    function (_BaseSelection) {
      _inheritsLoose(Checkbox, _BaseSelection);

      function Checkbox($element, config, properties) {
        if (properties === void 0) {
          properties = {
            inputType: NAME,
            outerClass: NAME
          };
        }

        return _BaseSelection.call(this, $element, $.extend(true, //{invalidComponentMatches: [File, Radio, Text, Textarea, Select]},
        Default, config), properties) || this;
      }

      var _proto = Checkbox.prototype;

      _proto.dispose = function dispose(dataKey) {
        if (dataKey === void 0) {
          dataKey = DATA_KEY;
        }

        _BaseSelection.prototype.dispose.call(this, dataKey);
      };

      Checkbox.matches = function matches($element) {
        // '.checkbox > label > input[type=checkbox]'
        if ($element.attr("type") === "checkbox") {
          return true;
        }

        return false;
      };

      Checkbox.rejectMatch = function rejectMatch(component, $element) {
        Util$1.assert(this.$element, this.matches($element), component + " component element " + Util$1.describe($element) + " is invalid for type='checkbox'.");
      } // ------------------------------------------------------------------------
      // protected
      // ------------------------------------------------------------------------
      // protected
      // ------------------------------------------------------------------------
      // private
      // ------------------------------------------------------------------------
      // static
      ;

      Checkbox._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Checkbox($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      };

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
        create: false,
        // no bmd-form-group creation if form-group not present. It messes with the layout.
        required: false
      }
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var CheckboxInline =
    /*#__PURE__*/
    function (_Checkbox) {
      _inheritsLoose(CheckboxInline, _Checkbox);

      function CheckboxInline($element, config, properties) {
        if (properties === void 0) {
          properties = {
            inputType: "checkbox",
            outerClass: "checkbox-inline"
          };
        }

        return _Checkbox.call(this, $element, $.extend(true, {}, Default, config), properties) || this;
      }

      var _proto = CheckboxInline.prototype;

      _proto.dispose = function dispose() {
        _Checkbox.prototype.dispose.call(this, DATA_KEY);
      } //static matches($element) {
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
      ;

      CheckboxInline._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new CheckboxInline($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      };

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

    var CollapseInline =
    /*#__PURE__*/
    function (_Base) {
      _inheritsLoose(CollapseInline, _Base);

      // $element is expected to be the trigger
      //  i.e. <button class="btn bmd-btn-icon" for="search" data-toggle="collapse" data-target="#search-field" aria-expanded="false" aria-controls="search-field">
      function CollapseInline($element, config) {
        var _this;

        _this = _Base.call(this, $element, $.extend(true, {}, Default, config)) || this;
        _this.$bmdFormGroup = _this.findMdbFormGroup(true);
        var collapseSelector = $element.data("target");
        _this.$collapse = $(collapseSelector);
        Util$1.assert($element, _this.$collapse.length === 0, "Cannot find collapse target for " + Util$1.describe($element));
        Util$1.assert(_this.$collapse, !_this.$collapse.hasClass(ClassName.COLLAPSE), Util$1.describe(_this.$collapse) + " is expected to have the '" + ClassName.COLLAPSE + "' class.  It is being targeted by " + Util$1.describe($element)); // find the first input for focusing

        var $inputs = _this.$bmdFormGroup.find(Selector.ANY_INPUT);

        if ($inputs.length > 0) {
          _this.$input = $inputs.first();
        } // automatically add the marker class to collapse width instead of height - nice convenience because it is easily forgotten


        if (!_this.$collapse.hasClass(ClassName.WIDTH)) {
          _this.$collapse.addClass(ClassName.WIDTH);
        }

        if (_this.$input) {
          // add a listener to set focus
          _this.$collapse.on("shown.bs.collapse", function () {
            _this.$input.focus();
          }); // add a listener to collapse field


          _this.$input.blur(function () {
            _this.$collapse.collapse("hide");
          });
        }

        return _this;
      }

      var _proto = CollapseInline.prototype;

      _proto.dispose = function dispose() {
        _Base.prototype.dispose.call(this, DATA_KEY);

        this.$bmdFormGroup = null;
        this.$collapse = null;
        this.$input = null;
      } // ------------------------------------------------------------------------
      // private
      // ------------------------------------------------------------------------
      // static
      ;

      CollapseInline._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new CollapseInline($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      };

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

    var File =
    /*#__PURE__*/
    function (_BaseInput) {
      _inheritsLoose(File, _BaseInput);

      function File($element, config) {
        var _this;

        _this = _BaseInput.call(this, $element, $.extend(true, //{invalidComponentMatches: [Checkbox, Radio, Text, Textarea, Select, Switch]},
        Default, config)) || this;

        _this.$bmdFormGroup.addClass(ClassName.IS_FILE);

        return _this;
      }

      var _proto = File.prototype;

      _proto.dispose = function dispose() {
        _BaseInput.prototype.dispose.call(this, DATA_KEY);
      };

      File.matches = function matches($element) {
        if ($element.attr("type") === "file") {
          return true;
        }

        return false;
      };

      File.rejectMatch = function rejectMatch(component, $element) {
        Util$1.assert(this.$element, this.matches($element), component + " component element " + Util$1.describe($element) + " is invalid for type='file'.");
      } // ------------------------------------------------------------------------
      // protected
      // Demarcation element (e.g. first child of a form-group)
      ;

      _proto.outerElement = function outerElement() {
        // label.file > input[type=file]
        return this.$element.parent().closest("." + ClassName.FILE);
      };

      _proto.rejectWithoutRequiredStructure = function rejectWithoutRequiredStructure() {
        // label.file > input[type=file]
        Util$1.assert(this.$element, !this.outerElement().prop("tagName") === "label", this.constructor.name + "'s " + Util$1.describe(this.$element) + " parent element " + Util$1.describe(this.outerElement()) + " should be <label>.");
        Util$1.assert(this.$element, !this.outerElement().hasClass(ClassName.FILE), this.constructor.name + "'s " + Util$1.describe(this.$element) + " parent element " + Util$1.describe(this.outerElement()) + " should have class ." + ClassName.FILE + ".");
      };

      _proto.addFocusListener = function addFocusListener() {
        var _this2 = this;

        this.$bmdFormGroup.on("focus", function () {
          _this2.addFormGroupFocus();
        }).on("blur", function () {
          _this2.removeFormGroupFocus();
        });
      };

      _proto.addChangeListener = function addChangeListener() {
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
      } // ------------------------------------------------------------------------
      // private
      // ------------------------------------------------------------------------
      // static
      ;

      File._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new File($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      };

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

    var Radio =
    /*#__PURE__*/
    function (_BaseSelection) {
      _inheritsLoose(Radio, _BaseSelection);

      function Radio($element, config, properties) {
        if (properties === void 0) {
          properties = {
            inputType: NAME,
            outerClass: NAME
          };
        }

        return _BaseSelection.call(this, $element, $.extend(true, //{invalidComponentMatches: [Checkbox, File, Switch, Text]},
        Default, config), properties) || this;
      }

      var _proto = Radio.prototype;

      _proto.dispose = function dispose(dataKey) {
        if (dataKey === void 0) {
          dataKey = DATA_KEY;
        }

        _BaseSelection.prototype.dispose.call(this, dataKey);
      };

      Radio.matches = function matches($element) {
        // '.radio > label > input[type=radio]'
        if ($element.attr("type") === "radio") {
          return true;
        }

        return false;
      };

      Radio.rejectMatch = function rejectMatch(component, $element) {
        Util$1.assert(this.$element, this.matches($element), component + " component element " + Util$1.describe($element) + " is invalid for type='radio'.");
      } // ------------------------------------------------------------------------
      // protected
      //decorateMarkup() {
      //  this.$element.after(this.config.template)
      //}
      // ------------------------------------------------------------------------
      // private
      // ------------------------------------------------------------------------
      // static
      ;

      Radio._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Radio($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      };

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
        create: false,
        // no bmd-form-group creation if form-group not present. It messes with the layout.
        required: false
      }
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var RadioInline =
    /*#__PURE__*/
    function (_Radio) {
      _inheritsLoose(RadioInline, _Radio);

      function RadioInline($element, config, properties) {
        if (properties === void 0) {
          properties = {
            inputType: "radio",
            outerClass: "radio-inline"
          };
        }

        return _Radio.call(this, $element, $.extend(true, {}, Default, config), properties) || this;
      }

      var _proto = RadioInline.prototype;

      _proto.dispose = function dispose() {
        _Radio.prototype.dispose.call(this, DATA_KEY);
      } // ------------------------------------------------------------------------
      // protected
      // ------------------------------------------------------------------------
      // protected
      // ------------------------------------------------------------------------
      // private
      // ------------------------------------------------------------------------
      // static
      ;

      RadioInline._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new RadioInline($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      };

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

    var BaseFormControl =
    /*#__PURE__*/
    function (_BaseInput) {
      _inheritsLoose(BaseFormControl, _BaseInput);

      function BaseFormControl($element, config) {
        var _this;

        _this = _BaseInput.call(this, $element, $.extend(true, Default, config)) || this; // Initially mark as empty

        if (_this.isEmpty()) {
          _this.removeIsFilled();
        }

        return _this;
      }

      return BaseFormControl;
    }(BaseInput);

    return BaseFormControl;
  }(jQuery);

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

    var Select =
    /*#__PURE__*/
    function (_BaseFormControl) {
      _inheritsLoose(Select, _BaseFormControl);

      function Select($element, config) {
        var _this;

        _this = _BaseFormControl.call(this, $element, $.extend(true, //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Text, Textarea]},
        Default, config)) || this; // floating labels will cover the options, so trigger them to be above (if used)

        _this.addIsFilled();

        return _this;
      }

      var _proto = Select.prototype;

      _proto.dispose = function dispose() {
        _BaseFormControl.prototype.dispose.call(this, DATA_KEY);
      };

      Select.matches = function matches($element) {
        if ($element.prop("tagName") === "select") {
          return true;
        }

        return false;
      };

      Select.rejectMatch = function rejectMatch(component, $element) {
        Util$1.assert(this.$element, this.matches($element), component + " component element " + Util$1.describe($element) + " is invalid for <select>.");
      } // ------------------------------------------------------------------------
      // protected
      // ------------------------------------------------------------------------
      // private
      // ------------------------------------------------------------------------
      // static
      ;

      Select._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Select($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      };

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

    var Switch =
    /*#__PURE__*/
    function (_Checkbox) {
      _inheritsLoose(Switch, _Checkbox);

      function Switch($element, config, properties) {
        if (properties === void 0) {
          properties = {
            inputType: "checkbox",
            outerClass: "switch"
          };
        }

        return _Checkbox.call(this, $element, $.extend(true, {}, Default, config), properties) || this; // selector: '.switch > label > input[type=checkbox]'
      }

      var _proto = Switch.prototype;

      _proto.dispose = function dispose() {
        _Checkbox.prototype.dispose.call(this, DATA_KEY);
      } // ------------------------------------------------------------------------
      // protected
      // ------------------------------------------------------------------------
      // private
      // ------------------------------------------------------------------------
      // static
      ;

      Switch._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Switch($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      };

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

    var Text =
    /*#__PURE__*/
    function (_BaseFormControl) {
      _inheritsLoose(Text, _BaseFormControl);

      function Text($element, config) {
        return _BaseFormControl.call(this, $element, $.extend(true, //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Select, Textarea]},
        Default, config)) || this;
      }

      var _proto = Text.prototype;

      _proto.dispose = function dispose(dataKey) {
        if (dataKey === void 0) {
          dataKey = DATA_KEY;
        }

        _BaseFormControl.prototype.dispose.call(this, dataKey);
      };

      Text.matches = function matches($element) {
        if ($element.attr("type") === "text") {
          return true;
        }

        return false;
      };

      Text.rejectMatch = function rejectMatch(component, $element) {
        Util$1.assert(this.$element, this.matches($element), component + " component element " + Util$1.describe($element) + " is invalid for type='text'.");
      } // ------------------------------------------------------------------------
      // protected
      // ------------------------------------------------------------------------
      // private
      // ------------------------------------------------------------------------
      // static
      ;

      Text._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Text($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      };

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

    var Textarea =
    /*#__PURE__*/
    function (_BaseFormControl) {
      _inheritsLoose(Textarea, _BaseFormControl);

      function Textarea($element, config) {
        return _BaseFormControl.call(this, $element, $.extend(true, //{invalidComponentMatches: [Checkbox, File, Radio, Text, Select, Switch]},
        Default, config)) || this;
      }

      var _proto = Textarea.prototype;

      _proto.dispose = function dispose() {
        _BaseFormControl.prototype.dispose.call(this, DATA_KEY);
      };

      Textarea.matches = function matches($element) {
        if ($element.prop("tagName") === "textarea") {
          return true;
        }

        return false;
      };

      Textarea.rejectMatch = function rejectMatch(component, $element) {
        Util$1.assert(this.$element, this.matches($element), component + " component element " + Util$1.describe($element) + " is invalid for <textarea>.");
      } // ------------------------------------------------------------------------
      // protected
      // ------------------------------------------------------------------------
      // private
      // ------------------------------------------------------------------------
      // static
      ;

      Textarea._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Textarea($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      };

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

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.0): dropdown.js
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
    var VERSION = '4.1.0';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY,
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

    var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      } // getters


      var _proto = Dropdown.prototype;

      // public
      _proto.toggle = function toggle() {
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

        var element = this._element; // for dropup with alignment we use the parent as popper container

        if ($(parent).hasClass(ClassName.DROPUP)) {
          if ($(this._menu).hasClass(ClassName.MENULEFT) || $(this._menu).hasClass(ClassName.MENURIGHT)) {
            element = parent;
          }
        }

        this._popper = new Popper(element, this._menu, this._getPopperConfig()); // if this is a touch-enabled device we add extra
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
        $(this._menu).addClass(ClassName.SHOW + " " + ClassName.SHOWING);
        $(parent).addClass(ClassName.SHOW);
      };

      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._element).off(EVENT_KEY);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
      };

      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      } // private
      ;

      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;

        $(this._element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this2.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        var elementData = $(this._element).data();

        if (elementData.placement !== undefined) {
          elementData.placement = AttachmentMap[elementData.placement.toUpperCase()];
        }

        config = $.extend({}, this.constructor.Default, $(this._element).data(), config);
        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);

          this._menu = $(parent).find(Selector.MENU)[0];
        }

        return this._menu;
      };

      _proto._getPlacement = function _getPlacement() {
        var $parentDropdown = $(this._element).parent();
        var placement = this._config.placement; // Handle dropup

        if ($parentDropdown.hasClass(ClassName.DROPUP) || this._config.placement === AttachmentMap.TOP) {
          placement = AttachmentMap.TOP;

          if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return $(this._element).closest('.navbar').length > 0;
      };

      _proto._getPopperConfig = function _getPopperConfig() {
        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: {
              offset: this._config.offset
            },
            flip: {
              enabled: this._config.flip
            }
          } // Disable Popper.js for Dropdown in Navbar

        };

        if (this._inNavbar) {
          popperConfig.modifiers.applyStyle = {
            enabled: !this._inNavbar
          };
        }

        return popperConfig;
      } // static
      ;

      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
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
            return "continue";
          }

          var dropdownMenu = context._menu;

          if (!$(parent).hasClass(ClassName.SHOW)) {
            return "continue";
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
            return "continue";
          }

          var hideEvent = $.Event(Event.HIDE, relatedTarget);
          $(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            return "continue";
          } // if this is a touch-enabled device we remove the extra
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

          if (_ret === "continue") continue;
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = $(selector)[0];
        }

        return parent || element.parentNode;
      };

      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
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
      };

      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "DefaultType",
        get: function get() {
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


    $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
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

    var BaseLayout =
    /*#__PURE__*/
    function (_Base) {
      _inheritsLoose(BaseLayout, _Base);

      function BaseLayout($element, config, properties) {
        var _this;

        if (properties === void 0) {
          properties = {};
        }

        _this = _Base.call(this, $element, $.extend(true, {}, Default, config), properties) || this;
        _this.$container = _this.findContainer(true);
        _this.$backdrop = _this.resolveBackdrop();

        _this.resolveCanvas();

        return _this;
      }

      var _proto = BaseLayout.prototype;

      _proto.dispose = function dispose(dataKey) {
        _Base.prototype.dispose.call(this, dataKey);

        this.$container = null;
        this.$backdrop = null;
      } // ------------------------------------------------------------------------
      // protected
      // Will wrap container in bmd-layout-canvas if necessary
      ;

      _proto.resolveCanvas = function resolveCanvas() {
        var bd = this.findCanvas(false);

        if (bd === undefined || bd.length === 0) {
          if (this.config.canvas.create) {
            this.$container.wrap(this.config.canvas.template);
          }

          bd = this.findCanvas(this.config.canvas.required);
        }

        return bd;
      } // Find closest bmd-layout-container based on the given context
      ;

      _proto.findCanvas = function findCanvas(raiseError, context) {
        if (raiseError === void 0) {
          raiseError = true;
        }

        if (context === void 0) {
          context = this.$container;
        }

        var canvas = context.closest(Selector.CANVAS);

        if (canvas.length === 0 && raiseError) {
          $.error("Failed to find " + Selector.CANVAS + " for " + Util$1.describe(context));
        }

        return canvas;
      } // Will add bmd-layout-backdrop to bmd-layout-container if necessary
      ;

      _proto.resolveBackdrop = function resolveBackdrop() {
        var bd = this.findBackdrop(false);

        if (bd === undefined || bd.length === 0) {
          if (this.config.backdrop.create) {
            this.$container.append(this.config.backdrop.template);
          }

          bd = this.findBackdrop(this.config.backdrop.required);
        }

        return bd;
      } // Find closest bmd-layout-container based on the given context
      ;

      _proto.findBackdrop = function findBackdrop(raiseError, context) {
        if (raiseError === void 0) {
          raiseError = true;
        }

        if (context === void 0) {
          context = this.$container;
        }

        var backdrop = context.find("> " + Selector.BACKDROP);

        if (backdrop.length === 0 && raiseError) {
          $.error("Failed to find " + Selector.BACKDROP + " for " + Util$1.describe(context));
        }

        return backdrop;
      } // Find closest bmd-layout-container based on the given context
      ;

      _proto.findContainer = function findContainer(raiseError, context) {
        if (raiseError === void 0) {
          raiseError = true;
        }

        if (context === void 0) {
          context = this.$element;
        }

        var container = context.closest(Selector.CONTAINER);

        if (container.length === 0 && raiseError) {
          $.error("Failed to find " + Selector.CONTAINER + " for " + Util$1.describe(context));
        }

        return container;
      } // ------------------------------------------------------------------------
      // private
      // ------------------------------------------------------------------------
      // static
      ;

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
      ESCAPE: 27 //ENTER: 13,
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

    var Drawer =
    /*#__PURE__*/
    function (_BaseLayout) {
      _inheritsLoose(Drawer, _BaseLayout);

      // $element is expected to be the trigger
      //  i.e. <button class="btn bmd-btn-icon" for="search" data-toggle="drawer" data-target="#my-side-nav-drawer" aria-expanded="false" aria-controls="my-side-nav-drawer">
      function Drawer($element, config) {
        var _this;

        _this = _BaseLayout.call(this, $element, $.extend(true, {}, Default, config)) || this;
        _this.$toggles = $("[data-toggle=\"drawer\"][href=\"#" + _this.$element[0].id + "\"], [data-toggle=\"drawer\"][data-target=\"#" + _this.$element[0].id + "\"]");

        _this._addAria(); // click or escape on the backdrop closes the drawer


        _this.$backdrop.keydown(function (ev) {
          if (ev.which === Keycodes.ESCAPE) {
            _this.hide();
          }
        }).click(function () {
          _this.hide();
        }); // escape on the drawer closes it


        _this.$element.keydown(function (ev) {
          if (ev.which === Keycodes.ESCAPE) {
            _this.hide();
          }
        }); // any toggle button clicks


        _this.$toggles.click(function () {
          _this.toggle();
        });

        return _this;
      }

      var _proto = Drawer.prototype;

      _proto.dispose = function dispose() {
        _BaseLayout.prototype.dispose.call(this, DATA_KEY);

        this.$toggles = null;
      };

      _proto.toggle = function toggle() {
        if (this._isOpen()) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        if (this._isForcedClosed() || this._isOpen()) {
          return;
        }

        this.$toggles.attr("aria-expanded", true);
        this.$element.attr("aria-expanded", true);
        this.$element.attr("aria-hidden", false); // focus on the first focusable item

        var $focusOn = this.$element.find(this.config.focusSelector);

        if ($focusOn.length > 0) {
          $focusOn.first().focus();
        }

        this.$container.addClass(ClassName.DRAWER_IN); // backdrop is responsively styled based on bmd-drawer-overlay, therefore style is none of our concern, simply add the marker class and let the scss determine if it should be displayed or not.

        this.$backdrop.addClass(ClassName.IN);
      };

      _proto.hide = function hide() {
        if (!this._isOpen()) {
          return;
        }

        this.$toggles.attr("aria-expanded", false);
        this.$element.attr("aria-expanded", false);
        this.$element.attr("aria-hidden", true);
        this.$container.removeClass(ClassName.DRAWER_IN);
        this.$backdrop.removeClass(ClassName.IN);
      } // ------------------------------------------------------------------------
      // private
      ;

      _proto._isOpen = function _isOpen() {
        return this.$container.hasClass(ClassName.DRAWER_IN);
      };

      _proto._isForcedClosed = function _isForcedClosed() {
        return this.$container.hasClass(ClassName.DRAWER_OUT);
      };

      _proto._addAria = function _addAria() {
        var isOpen = this._isOpen();

        this.$element.attr("aria-expanded", isOpen);
        this.$element.attr("aria-hidden", isOpen);

        if (this.$toggles.length) {
          this.$toggles.attr("aria-expanded", isOpen);
        }
      } // ------------------------------------------------------------------------
      // static
      ;

      Drawer._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Drawer($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      };

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

    var Ripples =
    /*#__PURE__*/
    function () {
      function Ripples($element, config) {
        var _this = this;

        this.$element = $element; // console.log(`Adding ripples to ${Util.describe(this.$element)}`)  // eslint-disable-line no-console

        this.config = $.extend(true, {}, Default, config); // attach initial listener

        this.$element.on(this.config.trigger.start, function (event) {
          _this._onStartRipple(event);
        });
      }

      var _proto = Ripples.prototype;

      _proto.dispose = function dispose() {
        this.$element.data(DATA_KEY, null);
        this.$element = null;
        this.$container = null;
        this.$decorator = null;
        this.config = null;
      } // ------------------------------------------------------------------------
      // private
      ;

      _proto._onStartRipple = function _onStartRipple(event) {
        var _this2 = this;

        // Verify if the user is just touching on a device and return if so
        if (this._isTouch() && event.type === "mousedown") {
          return;
        } // Find or create the ripple container element


        this._findOrCreateContainer(); // Get relY and relX positions of the container element


        var relY = this._getRelY(event);

        var relX = this._getRelX(event); // If relY and/or relX are false, return the event


        if (!relY && !relX) {
          return;
        } // set the location and color each time (even if element is cached)


        this.$decorator.css({
          left: relX,
          top: relY,
          "background-color": this._getRipplesColor()
        }); // Make sure the ripple has the styles applied (ugly hack but it works)

        this._forceStyleApplication(); // Turn on the ripple animation


        this.rippleOn(); // Call the rippleEnd function when the transition 'on' ends

        setTimeout(function () {
          _this2.rippleEnd();
        }, this.config.duration); // Detect when the user leaves the element to cleanup if not already done?

        this.$element.on(this.config.trigger.end, function () {
          if (_this2.$decorator) {
            // guard against race condition/mouse attack
            _this2.$decorator.data("mousedown", "off");

            if (_this2.$decorator.data("animating") === "off") {
              _this2.rippleOut();
            }
          }
        });
      };

      _proto._findOrCreateContainer = function _findOrCreateContainer() {
        if (!this.$container || !this.$container.length > 0) {
          this.$element.append(this.config.container.template);
          this.$container = this.$element.find(Selector.CONTAINER);
        } // always add the rippleElement, it is always removed


        this.$container.append(this.config.decorator.template);
        this.$decorator = this.$container.find(Selector.DECORATOR);
      } // Make sure the ripple has the styles applied (ugly hack but it works)
      ;

      _proto._forceStyleApplication = function _forceStyleApplication() {
        return window.getComputedStyle(this.$decorator[0]).opacity;
      }
      /**
       * Get the relX
       */
      ;

      _proto._getRelX = function _getRelX(event) {
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
      ;

      _proto._getRelY = function _getRelY(event) {
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
      ;

      _proto._getRipplesColor = function _getRipplesColor() {
        var color = this.$element.data("ripple-color") ? this.$element.data("ripple-color") : window.getComputedStyle(this.$element[0]).color;
        return color;
      }
      /**
       * Verify if the client is using a mobile device
       */
      ;

      _proto._isTouch = function _isTouch() {
        return this.config.touchUserAgentRegex.test(navigator.userAgent);
      }
      /**
       * End the animation of the ripple
       */
      ;

      _proto.rippleEnd = function rippleEnd() {
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
      ;

      _proto.rippleOut = function rippleOut() {
        var _this3 = this;

        this.$decorator.off();

        if (Util$1.transitionEndSupported()) {
          this.$decorator.addClass("ripple-out");
        } else {
          this.$decorator.animate({
            opacity: 0
          }, 100, function () {
            _this3.$decorator.trigger("transitionend");
          });
        }

        this.$decorator.on(Util$1.transitionEndSelector(), function () {
          if (_this3.$decorator) {
            _this3.$decorator.remove();

            _this3.$decorator = null;
          }
        });
      }
      /**
       * Turn on the ripple effect
       */
      ;

      _proto.rippleOn = function rippleOn() {
        var _this4 = this;

        var size = this._getNewSize();

        if (Util$1.transitionEndSupported()) {
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
      ;

      _proto._getNewSize = function _getNewSize() {
        return Math.max(this.$element.outerWidth(), this.$element.outerHeight()) / this.$decorator.outerWidth() * 2.5;
      } // ------------------------------------------------------------------------
      // static
      ;

      Ripples._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Ripples($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      };

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
    var LAST_VALUE_DATA_KEY = "bmd.last_value";
    var Default = {};
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Autofill =
    /*#__PURE__*/
    function (_Base) {
      _inheritsLoose(Autofill, _Base);

      function Autofill($element, config) {
        var _this;

        _this = _Base.call(this, $element, $.extend(true, {}, Default, config)) || this;

        _this._watchLoading();

        _this._attachEventHandlers();

        return _this;
      }

      var _proto = Autofill.prototype;

      _proto.dispose = function dispose() {
        _Base.prototype.dispose.call(this, DATA_KEY);
      } // ------------------------------------------------------------------------
      // private
      ;

      _proto._watchLoading = function _watchLoading() {
        var _this2 = this;

        // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
        setTimeout(function () {
          clearInterval(_this2._onLoading);
        }, 10000);
      } // This part of code will detect autofill when the page is loading (username and password inputs for example)
      ;

      _proto._onLoading = function _onLoading() {
        setInterval(function () {
          $("input[type!=checkbox]").each(function (index, element) {
            var $element = $(element);
            var previousValue = $element.data(LAST_VALUE_DATA_KEY);

            if (previousValue === undefined) {
              previousValue = $element.attr("value");
            }

            if (previousValue === undefined) {
              previousValue = "";
            }

            var currentValue = $element.val();

            if (currentValue !== previousValue) {
              $element.trigger("change");
            }

            $element.data(LAST_VALUE_DATA_KEY, currentValue);
          });
        }, 100);
      };

      _proto._attachEventHandlers = function _attachEventHandlers() {
        // Listen on inputs of the focused form
        //  (because user can select from the autofill dropdown only when the input has focus)
        var focused = null;
        $(document).on("focus", "input", function (event) {
          var $inputs = $(event.currentTarget).closest("form").find("input").not("[type=file], [type=date]");
          focused = setInterval(function () {
            $inputs.each(function (index, element) {
              var $element = $(element);
              var previousValue = $element.data(LAST_VALUE_DATA_KEY);

              if (previousValue === undefined) {
                previousValue = $element.attr("value");
              }

              if (previousValue === undefined) {
                previousValue = "";
              }

              var currentValue = $element.val();

              if (currentValue !== previousValue) {
                $element.trigger("change");
              }

              $element.data(LAST_VALUE_DATA_KEY, currentValue);
            });
          }, 100);
        }).on("blur", ".form-group input", function () {
          clearInterval(focused);
        });
      } // ------------------------------------------------------------------------
      // static
      ;

      Autofill._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Autofill($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      };

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
      "switch": {
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
      instantiation: ["ripples", "checkbox", "checkboxInline", "collapseInline", "drawer", //'file',
      "radio", "radioInline", "switch", "text", "textarea", "select", "autofill"]
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BootstrapMaterialDesign =
    /*#__PURE__*/
    function () {
      function BootstrapMaterialDesign($element, config) {
        var _this = this;

        this.$element = $element;
        this.config = $.extend(true, {}, Default, config);
        var $document = $(document);

        var _loop = function _loop() {
          if (_isArray) {
            if (_i >= _iterator.length) return "break";
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) return "break";
            _ref = _i.value;
          }

          var component = _ref;
          // the component's config fragment is passed in directly, allowing users to override
          var componentConfig = _this.config[component]; // check to make sure component config is enabled (not `false`)

          if (componentConfig) {
            // assemble the selector as it may be an array
            var selector = _this._resolveSelector(componentConfig); // mix in global options


            componentConfig = $.extend(true, {}, _this.config.global, componentConfig); // create the jquery fn name e.g. 'bmdText' for 'text'

            var componentName = "" + (component.charAt(0).toUpperCase() + component.slice(1));
            var jqueryFn = "bmd" + componentName;

            try {
              // safely instantiate component on selector elements with config, report errors and move on.
              // console.debug(`instantiating: $('${selector}')[${jqueryFn}](${componentConfig})`) // eslint-disable-line no-console
              $(selector)[jqueryFn](componentConfig); // add to arrive if present and enabled

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

        for (var _iterator = this.config.instantiation, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          var _ret = _loop();

          if (_ret === "break") break;
        }
      }

      var _proto = BootstrapMaterialDesign.prototype;

      _proto.dispose = function dispose() {
        this.$element.data(DATA_KEY, null);
        this.$element = null;
        this.config = null;
      } // ------------------------------------------------------------------------
      // private
      ;

      _proto._resolveSelector = function _resolveSelector(componentConfig) {
        var selector = componentConfig.selector;

        if (Array.isArray(selector)) {
          selector = selector.join(", ");
        }

        return selector;
      } // ------------------------------------------------------------------------
      // static
      ;

      BootstrapMaterialDesign._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new BootstrapMaterialDesign($element, config);
            $element.data(DATA_KEY, data);
          }
        });
      };

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

}));
//# sourceMappingURL=bootstrap-material-design.js.map
