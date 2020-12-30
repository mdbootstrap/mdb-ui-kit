import { getjQuery } from '../mdb/util/index';
import EventHandler from '../bootstrap/src/dom/event-handler';
import SelectorEngine from '../mdb/dom/selector-engine';
import BSDropdown from '../bootstrap/src/dropdown';
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'dropdown';
const SELECTOR_EXPAND = '[data-toggle="dropdown"]';

const EVENT_HIDE = 'hide.bs.dropdown';
const EVENT_HIDDEN = 'hidden.bs.dropdown';
const EVENT_SHOW = 'show.bs.dropdown';

const ANIMATION_CLASS = 'animation';
const ANIMATION_SHOW_CLASS = 'fade-in';
const ANIMATION_HIDE_CLASS = 'fade-out';

class Dropdown extends BSDropdown {
  constructor(element, data) {
    super(element, data);
    this._options = this._getConfig(data);
    this._parent = Dropdown.getParentFromElement(this._element);
    this._menuStyle = '';
    this._xPlacement = '';
    this._init();
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
