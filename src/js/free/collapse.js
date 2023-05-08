import { getjQuery, onDOMContentLoaded, getSelectorFromElement } from '../mdb/util/index';
import EventHandler from '../mdb/dom/event-handler';
import SelectorEngine from '../mdb/dom/selector-engine';
import BSCollapse from '../bootstrap/mdb-prefix/collapse';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'collapse';
const DATA_KEY = `mdb.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;

const EVENT_SHOW_BS = 'show.bs.collapse';
const EVENT_SHOWN_BS = 'shown.bs.collapse';
const EVENT_HIDE_BS = 'hide.bs.collapse';
const EVENT_HIDDEN_BS = 'hidden.bs.collapse';

const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;

const SELECTOR_DATA_TOGGLE = '[data-mdb-toggle="collapse"]';

class Collapse extends BSCollapse {
  constructor(element, data = {}) {
    super(element, data);

    this._init();
  }

  dispose() {
    EventHandler.off(this._element, EVENT_SHOW_BS);
    EventHandler.off(this._element, EVENT_SHOWN_BS);
    EventHandler.off(this._element, EVENT_HIDE_BS);
    EventHandler.off(this._element, EVENT_HIDDEN_BS);

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

  _bindShowEvent() {
    EventHandler.on(this._element, EVENT_SHOW_BS, () => {
      EventHandler.trigger(this._element, EVENT_SHOW);
    });
  }

  _bindShownEvent() {
    EventHandler.on(this._element, EVENT_SHOWN_BS, () => {
      EventHandler.trigger(this._element, EVENT_SHOWN);
    });
  }

  _bindHideEvent() {
    EventHandler.on(this._element, EVENT_HIDE_BS, () => {
      EventHandler.trigger(this._element, EVENT_HIDE);
    });
  }

  _bindHiddenEvent() {
    EventHandler.on(this._element, EVENT_HIDDEN_BS, () => {
      EventHandler.trigger(this._element, EVENT_HIDDEN);
    });
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation - auto initialization
 * ------------------------------------------------------------------------
 */

SelectorEngine.find(SELECTOR_DATA_TOGGLE).forEach((el) => {
  const selector = getSelectorFromElement(el);
  const selectorElements = SelectorEngine.find(selector);

  selectorElements.forEach((element) => {
    Collapse.getOrCreateInstance(element, { toggle: false });
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
    $.fn[NAME] = Collapse.jQueryInterface;
    $.fn[NAME].Constructor = Collapse;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse.jQueryInterface;
    };
  }
});

export default Collapse;
