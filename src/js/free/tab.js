import { getElementFromSelector } from '../mdb/util/index';
import EventHandler from '../mdb/dom/event-handler';
import BSTab from '../bootstrap/mdb-prefix/tab';
import Manipulator from '../mdb/dom/manipulator';
import { bindCallbackEventsIfNeeded } from '../autoinit/init';
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'tab';
const DATA_KEY = `mdb.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;

const EVENT_SHOW_BS = 'show.bs.tab';
const EVENT_SHOWN_BS = 'shown.bs.tab';
const EVENT_HIDE_BS = 'hide.bs.tab';
const EVENT_HIDDEN_BS = 'hidden.bs.tab';

const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;

const CLASS_NAME_ACTIVE = 'active';
const CLASS_NAME_FADE = 'fade';
const CLASS_NAME_SHOW = 'show';

class Tab extends BSTab {
  constructor(element) {
    super(element);

    Manipulator.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }

  dispose() {
    EventHandler.off(this._element, EVENT_SHOW_BS);
    EventHandler.off(this._element, EVENT_SHOWN_BS);
    Manipulator.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);

    super.dispose();
  }

  // Getters
  static get NAME() {
    return NAME;
  }

  // Override
  show() {
    // Shows this elem and deactivate the active sibling if exists
    const innerElem = this._element;
    if (this._elemIsActive(innerElem)) {
      return;
    }

    // Search for active tab on same parent to deactivate it
    const active = this._getActiveElem();

    let hideEvent = null;
    let hideEventMdb = null;

    if (active) {
      hideEvent = EventHandler.trigger(active, EVENT_HIDE_BS, { relatedTarget: innerElem });
      hideEventMdb = EventHandler.trigger(active, EVENT_HIDE, { relatedTarget: innerElem });
    }

    const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW_BS, { relatedTarget: active });
    const showEventMdb = EventHandler.trigger(innerElem, EVENT_SHOW, { relatedTarget: active });

    if (
      showEvent.defaultPrevented ||
      showEventMdb.defaultPrevented ||
      (hideEvent && hideEvent.defaultPrevented) ||
      (hideEventMdb && hideEventMdb.defaultPrevented)
    ) {
      return;
    }

    this._deactivate(active, innerElem);
    this._activate(innerElem, active);
  }

  _activate(element, relatedElem) {
    if (!element) {
      return;
    }

    element.classList.add(CLASS_NAME_ACTIVE);

    this._activate(getElementFromSelector(element)); // Search and activate/show the proper section

    const complete = () => {
      if (element.getAttribute('role') !== 'tab') {
        element.classList.add(CLASS_NAME_SHOW);
        return;
      }

      element.focus();
      element.removeAttribute('tabindex');
      element.setAttribute('aria-selected', true);
      this._toggleDropDown(element, true);
      EventHandler.trigger(element, EVENT_SHOWN_BS, {
        relatedTarget: relatedElem,
      });
      EventHandler.trigger(element, EVENT_SHOWN, {
        relatedTarget: relatedElem,
      });
    };

    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
  }

  _deactivate(element, relatedElem) {
    if (!element) {
      return;
    }

    element.classList.remove(CLASS_NAME_ACTIVE);
    element.blur();

    this._deactivate(getElementFromSelector(element)); // Search and deactivate the shown section too

    const complete = () => {
      if (element.getAttribute('role') !== 'tab') {
        element.classList.remove(CLASS_NAME_SHOW);
        return;
      }

      element.setAttribute('aria-selected', false);
      element.setAttribute('tabindex', '-1');
      this._toggleDropDown(element, false);
      EventHandler.trigger(element, EVENT_HIDDEN_BS, { relatedTarget: relatedElem });
      EventHandler.trigger(element, EVENT_HIDDEN, { relatedTarget: relatedElem });
    };

    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
  }
}

export default Tab;
