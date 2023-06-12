import { getjQuery, onDOMContentLoaded } from '../mdb/util/index';
import EventHandler from '../mdb/dom/event-handler';
import SelectorEngine from '../mdb/dom/selector-engine';
import BSPopover from '../bootstrap/mdb-prefix/popover';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'popover';

const EVENT_SHOW_BS = 'show.bs.popover';
const EVENT_SHOWN_BS = 'shown.bs.popover';
const EVENT_HIDE_BS = 'hide.bs.popover';
const EVENT_HIDDEN_BS = 'hidden.bs.popover';
const EVENT_INSERTED_BS = 'inserted.bs.popover';

const EXTENDED_EVENTS = [
  { name: 'show' },
  { name: 'shown' },
  { name: 'hide' },
  { name: 'hidden' },
  { name: 'inserted' },
];

const SELECTOR_DATA_TOGGLE = '[data-mdb-toggle="popover"]';

class Popover extends BSPopover {
  constructor(element, data) {
    super(element, data);

    this._init();
  }

  dispose() {
    EventHandler.off(this.element, EVENT_SHOW_BS);
    EventHandler.off(this.element, EVENT_SHOWN_BS);
    EventHandler.off(this.element, EVENT_HIDE_BS);
    EventHandler.off(this.element, EVENT_HIDDEN_BS);
    EventHandler.off(this.element, EVENT_INSERTED_BS);

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
  let instance = Popover.getInstance(el);
  if (!instance) {
    instance = new Popover(el);
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
    $.fn[NAME] = Popover.jQueryInterface;
    $.fn[NAME].Constructor = Popover;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover.jQueryInterface;
    };
  }
});

export default Popover;
