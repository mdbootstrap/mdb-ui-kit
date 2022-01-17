import { getjQuery, onDOMContentLoaded } from '../mdb/util/index';
import EventHandler from '../mdb/dom/event-handler';
import SelectorEngine from '../mdb/dom/selector-engine';
import Manipulator from '../mdb/dom/manipulator';
import BSScrollSpy from '../bootstrap/mdb-prefix/scrollspy';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'scrollspy';
const DATA_KEY = `mdb.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;
const DATA_API_KEY = '.data-api';

const EVENT_ACTIVATE_BS = 'activate.bs.scrollspy';
const EVENT_ACTIVATE = `activate${EVENT_KEY}`;
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;

const CLASS_COLLAPSIBLE = 'collapsible-scrollspy';
const CLASS_ACTIVE = 'active';

const SELECTOR_LIST = 'ul';
const SELECTOR_DATA_SPY = '[data-mdb-spy="scroll"]';
const SELECTOR_ACTIVE = `.${CLASS_ACTIVE}`;
const SELECTOR_COLLAPSIBLE_SCROLLSPY = `.${CLASS_COLLAPSIBLE}`;

class ScrollSpy extends BSScrollSpy {
  constructor(element, data) {
    super(element, data);

    this._collapsibles = [];
    this._init();
  }

  dispose() {
    EventHandler.off(this._scrollElement, EVENT_ACTIVATE_BS);

    super.dispose();
  }

  // Getters
  static get NAME() {
    return NAME;
  }

  // Private
  _init() {
    this._bindActivateEvent();
    this._getCollapsibles();

    if (this._collapsibles.length === 0) {
      return;
    }

    this._showSubsection();
    this._hideSubsection();
  }

  _getHeight(element) {
    return element.offsetHeight;
  }

  _hide(target) {
    const itemsToHide = SelectorEngine.findOne(SELECTOR_LIST, target.parentNode);
    itemsToHide.style.overflow = 'hidden';
    itemsToHide.style.height = `${0}px`;
  }

  _show(target, destinedHeight) {
    target.style.height = destinedHeight;
  }

  _getCollapsibles() {
    const collapsibleElements = SelectorEngine.find(SELECTOR_COLLAPSIBLE_SCROLLSPY);

    if (!collapsibleElements) {
      return;
    }

    collapsibleElements.forEach((collapsibleElement) => {
      const listParent = collapsibleElement.parentNode;
      const list = SelectorEngine.findOne(SELECTOR_LIST, listParent);
      const listHeight = list.offsetHeight;
      this._collapsibles.push({
        element: list,
        relatedTarget: collapsibleElement.getAttribute('href'),
        height: `${listHeight}px`,
      });
    });
  }

  _showSubsection() {
    const activeElements = SelectorEngine.find(SELECTOR_ACTIVE);
    const actives = activeElements.filter((active) => {
      return Manipulator.hasClass(active, CLASS_COLLAPSIBLE);
    });

    actives.forEach((active) => {
      const list = SelectorEngine.findOne(SELECTOR_LIST, active.parentNode);
      const height = this._collapsibles.find((collapsible) => {
        return (collapsible.relatedTarget = active.getAttribute('href'));
      }).height;
      this._show(list, height);
    });
  }

  _hideSubsection() {
    const unactives = SelectorEngine.find(SELECTOR_COLLAPSIBLE_SCROLLSPY).filter((collapsible) => {
      return Manipulator.hasClass(collapsible, 'active') === false;
    });
    unactives.forEach((unactive) => {
      this._hide(unactive);
    });
  }

  _bindActivateEvent() {
    EventHandler.on(this._scrollElement, EVENT_ACTIVATE_BS, (e) => {
      this._showSubsection();
      this._hideSubsection();
      EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
        relatedTarget: e.relatedTarget,
      });
    });
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation - auto initialization
 * ------------------------------------------------------------------------
 */

EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  SelectorEngine.find(SELECTOR_DATA_SPY).forEach((el) => {
    let instance = ScrollSpy.getInstance(el);
    if (!instance) {
      instance = new ScrollSpy(el, Manipulator.getDataAttributes(el));
    }
  });
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
    $.fn[NAME] = ScrollSpy.jQueryInterface;
    $.fn[NAME].Constructor = ScrollSpy;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy.jQueryInterface;
    };
  }
});

export default ScrollSpy;
