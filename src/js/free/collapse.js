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

const EVENT_SHOW_BS = 'show.bs.collapse';
const EVENT_SHOWN_BS = 'shown.bs.collapse';
const EVENT_HIDE_BS = 'hide.bs.collapse';
const EVENT_HIDDEN_BS = 'hidden.bs.collapse';

const EXTENDED_EVENTS = [{ name: 'show' }, { name: 'shown' }, { name: 'hide' }, { name: 'hidden' }];

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
    this._bindMdbEvents();
  }

  _bindMdbEvents() {
    EventHandler.extend(this._element, EXTENDED_EVENTS, NAME);
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
