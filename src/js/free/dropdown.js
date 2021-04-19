import { getjQuery, typeCheckConfig, onDOMContentLoaded } from '../mdb/util/index';
import EventHandler from '../mdb/dom/event-handler';
import SelectorEngine from '../mdb/dom/selector-engine';
import Manipulator from '../mdb/dom/manipulator';
import BSDropdown from '../bootstrap/mdb-prefix/dropdown';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'dropdown';
const DATA_KEY = `mdb.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;

const SELECTOR_EXPAND = '[data-mdb-toggle="dropdown"]';

const Default = {
  offset: [0, 2],
  flip: true,
  boundary: 'clippingParents',
  reference: 'toggle',
  display: 'dynamic',
  popperConfig: null,
  dropdownAnimation: 'on',
};

const DefaultType = {
  offset: '(array|string|function)',
  flip: 'boolean',
  boundary: '(string|element)',
  reference: '(string|element|object)',
  display: 'string',
  popperConfig: '(null|object|function)',
  dropdownAnimation: 'string',
};

const EVENT_HIDE = 'hide.bs.dropdown';
const EVENT_HIDDEN = 'hidden.bs.dropdown';
const EVENT_SHOW = 'show.bs.dropdown';
const EVENT_SHOWN = 'shown.bs.dropdown';

const EVENT_HIDE_MDB = `hide${EVENT_KEY}`;
const EVENT_HIDDEN_MDB = `hidden${EVENT_KEY}`;
const EVENT_SHOW_MDB = `show${EVENT_KEY}`;
const EVENT_SHOWN_MDB = `shown${EVENT_KEY}`;

const ANIMATION_CLASS = 'animation';
const ANIMATION_SHOW_CLASS = 'fade-in';
const ANIMATION_HIDE_CLASS = 'fade-out';

class Dropdown extends BSDropdown {
  constructor(element, data) {
    super(element, data);
    this._config = this._getConfig(data);
    this._parent = Dropdown.getParentFromElement(this._element);
    this._menuStyle = '';
    this._popperPlacement = '';
    this._mdbPopperConfig = '';

    //* prevents dropdown close issue when system animation is turned off
    const isPrefersReducedMotionSet = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this._config.dropdownAnimation === 'on' && !isPrefersReducedMotionSet) {
      this._init();
    }
  }

  dispose() {
    EventHandler.off(this._element, EVENT_SHOW);
    EventHandler.off(this._parent, EVENT_SHOWN);
    EventHandler.off(this._parent, EVENT_HIDE);
    EventHandler.off(this._parent, EVENT_HIDDEN);
    super.dispose();
  }

  // Getters
  static get NAME() {
    return NAME;
  }

  // Private
  _init() {
    this._bindShowEvent();
    this._bindShownEvent();
    this._bindHideEvent();
    this._bindHiddenEvent();
  }

  _getConfig(options) {
    const config = {
      ...Default,
      ...Manipulator.getDataAttributes(this._element),
      ...options,
    };
    typeCheckConfig(NAME, config, DefaultType);
    return config;
  }

  _getOffset() {
    const { offset } = this._config;

    if (typeof offset === 'string') {
      return offset.split(',').map((val) => Number.parseInt(val, 10));
    }

    if (typeof offset === 'function') {
      return (popperData) => offset(popperData, this._element);
    }

    return offset;
  }

  _getPopperConfig() {
    const popperConfig = {
      placement: this._getPlacement(),
      modifiers: [
        {
          name: 'preventOverflow',
          options: {
            altBoundary: this._config.flip,
            boundary: this._config.boundary,
          },
        },
        {
          name: 'offset',
          options: {
            offset: this._getOffset(),
          },
        },
      ],
    };

    // Disable Popper if we have a static display
    if (this._config.display === 'static') {
      popperConfig.modifiers = [
        {
          name: 'applyStyles',
          enabled: false,
        },
      ];
    }

    return {
      ...popperConfig,
      /* eslint no-extra-parens: "off" */
      ...(typeof this._config.popperConfig === 'function'
        ? this._config.popperConfig(popperConfig)
        : this._config.popperConfig),
    };
  }

  _bindShowEvent() {
    EventHandler.on(this._element, EVENT_SHOW, (e) => {
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW_MDB, {
        relatedTarget: e.relatedTarget,
      });

      if (showEvent.defaultPrevented) {
        e.preventDefault();
        return;
      }

      this._dropdownAnimationStart('show');
    });
  }

  _bindShownEvent() {
    EventHandler.on(this._parent, EVENT_SHOWN, (e) => {
      const shownEvent = EventHandler.trigger(this._parent, EVENT_SHOWN_MDB, {
        relatedTarget: e.relatedTarget,
      });

      if (shownEvent.defaultPrevented) {
        e.preventDefault();
        return;
      }
    });
  }

  _bindHideEvent() {
    EventHandler.on(this._parent, EVENT_HIDE, (e) => {
      const hideEvent = EventHandler.trigger(this._parent, EVENT_HIDE_MDB, {
        relatedTarget: e.relatedTarget,
      });

      if (hideEvent.defaultPrevented) {
        e.preventDefault();
        return;
      }

      this._menuStyle = this._menu.style.cssText;
      this._popperPlacement = this._menu.getAttribute('data-popper-placement');
      this._mdbPopperConfig = this._menu.getAttribute('data-mdb-popper');
    });
  }

  _bindHiddenEvent() {
    EventHandler.on(this._parent, EVENT_HIDDEN, (e) => {
      const hiddenEvent = EventHandler.trigger(this._parent, EVENT_HIDDEN_MDB, {
        relatedTarget: e.relatedTarget,
      });

      if (hiddenEvent.defaultPrevented) {
        e.preventDefault();
        return;
      }

      if (this._config.display !== 'static' && this._menuStyle !== '') {
        this._menu.style.cssText = this._menuStyle;
      }

      this._menu.setAttribute('data-popper-placement', this._popperPlacement);
      this._menu.setAttribute('data-mdb-popper', this._mdbPopperConfig);

      this._dropdownAnimationStart('hide');
    });
  }

  _dropdownAnimationStart(action) {
    switch (action) {
      case 'show':
        this._menu.classList.add(ANIMATION_CLASS, ANIMATION_SHOW_CLASS);
        this._menu.classList.remove(ANIMATION_HIDE_CLASS);
        break;
      default:
        // hide
        this._menu.classList.add(ANIMATION_CLASS, ANIMATION_HIDE_CLASS);
        this._menu.classList.remove(ANIMATION_SHOW_CLASS);
        break;
    }

    this._bindAnimationEnd();
  }

  _bindAnimationEnd() {
    EventHandler.one(this._menu, 'animationend', () => {
      this._menu.classList.remove(ANIMATION_CLASS, ANIMATION_HIDE_CLASS, ANIMATION_SHOW_CLASS);
    });
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation - auto initialization
 * ------------------------------------------------------------------------
 */

SelectorEngine.find(SELECTOR_EXPAND).forEach((el) => {
  let instance = Dropdown.getInstance(el);
  if (!instance) {
    instance = new Dropdown(el);
  }
});

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .rating to jQuery only if jQuery is present
 */

onDOMContentLoaded(() => {
  const $ = getjQuery();

  if ($) {
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    $.fn[NAME] = Dropdown.jQueryInterface;
    $.fn[NAME].Constructor = Dropdown;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown.jQueryInterface;
    };
  }
});

export default Dropdown;
