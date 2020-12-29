import { getjQuery } from '../mdb/util/index';
import EventHandler from '../mdb/dom/event-handler';
import SelectorEngine from '../mdb/dom/selector-engine';
import Manipulator from '../mdb/dom/manipulator';
import BSScrollSpy from '../bootstrap/src/scrollspy';

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

const SELECTOR_DATA_SPY = '[data-spy="scroll"]';

class ScrollSpy extends BSScrollSpy {
  constructor(element, data) {
    super(element, data);

    this._scrollElement = element.tagName === 'BODY' ? window : element;

    this._init();
  }

  dispose() {
    EventHandler.off(this._scrollElement, EVENT_ACTIVATE_BS);
    this._scrollElement = null;

    super.dispose();
  }

  // Getters
  static get NAME() {
    return NAME;
  }

  // Private
  _init() {
    this._bindActivateEvent();
  }

  _bindActivateEvent() {
    EventHandler.on(this._scrollElement, EVENT_ACTIVATE_BS, (e) => {
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

SelectorEngine.find(SELECTOR_DATA_SPY).forEach((el) => {
  let instance = ScrollSpy.getInstance(el);
  if (!instance) {
    instance = new ScrollSpy(el, Manipulator.getDataAttributes(el));
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
  $.fn[NAME] = ScrollSpy.jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy.jQueryInterface;
  };
}

export default ScrollSpy;
