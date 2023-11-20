import EventHandler from '../mdb/dom/event-handler';
import SelectorEngine from '../mdb/dom/selector-engine';
import Manipulator from '../mdb/dom/manipulator';
import BSScrollSpy from '../bootstrap/mdb-prefix/scrollspy';
import { bindCallbackEventsIfNeeded } from '../autoinit/init';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'scrollspy';
const DATA_KEY = `mdb.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;

const EVENT_ACTIVATE_BS = 'activate.bs.scrollspy';
const EVENT_ACTIVATE = `activate${EVENT_KEY}`;

const CLASS_COLLAPSIBLE = 'collapsible-scrollspy';
const CLASS_ACTIVE = 'active';

const SELECTOR_LIST = 'ul';
const SELECTOR_ACTIVE = `.${CLASS_ACTIVE}`;
const SELECTOR_COLLAPSIBLE_SCROLLSPY = `.${CLASS_COLLAPSIBLE}`;

class ScrollSpy extends BSScrollSpy {
  constructor(element, data) {
    super(element, data);

    this._collapsibles = [];
    this._init();

    Manipulator.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }

  dispose() {
    EventHandler.off(this._scrollElement, EVENT_ACTIVATE_BS);
    Manipulator.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);

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
    EventHandler.on(this._element, EVENT_ACTIVATE_BS, (e) => {
      this._showSubsection();
      this._hideSubsection();
      EventHandler.trigger(this._element, EVENT_ACTIVATE, {
        relatedTarget: e.relatedTarget,
      });
    });
  }
}

export default ScrollSpy;
