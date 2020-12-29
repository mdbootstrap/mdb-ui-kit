import { getjQuery, typeCheckConfig } from '../mdb/util/index';
import EventHandler from '../bootstrap/src/dom/event-handler';
import SelectorEngine from '../mdb/dom/selector-engine';
import BSDropdown from '../bootstrap/src/dropdown';
import Manipulator from '../bootstrap/src/dom/manipulator';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'dropdown';
const SELECTOR_EXPAND = '[data-toggle="dropdown"]';

const Default = {
  offset: 0,
  flip: true,
  boundary: 'scrollParent',
  reference: 'toggle',
  display: 'dynamic',
  popperConfig: null,
  dropdownAnimation: 'on',
};

const DefaultType = {
  offset: '(number|string|function)',
  flip: 'boolean',
  boundary: '(string|element)',
  reference: '(string|element)',
  display: 'string',
  popperConfig: '(null|object)',
  dropdownAnimation: 'string',
};

const EVENT_HIDE = 'hide.bs.dropdown';
const EVENT_HIDDEN = 'hidden.bs.dropdown';
const EVENT_SHOW = 'show.bs.dropdown';

const ANIMATION_CLASS = 'animation';
const ANIMATION_SHOW_CLASS = 'fade-in';
const ANIMATION_HIDE_CLASS = 'fade-out';

class Dropdown extends BSDropdown {
  constructor(element, data) {
    super(element, data);
    this._config = this._getConfig(data);
    this._parent = Dropdown.getParentFromElement(this._element);
    this._menuStyle = '';
    this._xPlacement = '';

    if (this._config.dropdownAnimation === 'on') {
      this._init();
    }
  }

  dispose() {
    EventHandler.off(this._element, EVENT_SHOW);
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

  _bindShowEvent() {
    EventHandler.on(this._element, EVENT_SHOW, () => {
      this._dropdownAnimationStart('show');
    });
  }

  _bindHideEvent() {
    EventHandler.on(this._parent, EVENT_HIDE, () => {
      this._menuStyle = this._menu.style.cssText;
      this._xPlacement = this._menu.getAttribute('x-placement');
    });
  }

  _bindHiddenEvent() {
    EventHandler.on(this._parent, EVENT_HIDDEN, () => {
      this._menu.style.cssText = this._menuStyle;
      this._menu.setAttribute('x-placement', this._xPlacement);

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

export default Dropdown;
