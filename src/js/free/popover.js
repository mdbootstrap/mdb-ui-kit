import EventHandler from '../mdb/dom/event-handler';
import BSPopover from '../bootstrap/mdb-prefix/popover';
import Manipulator from '../mdb/dom/manipulator';
import { bindCallbackEventsIfNeeded } from '../autoinit/init';

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

class Popover extends BSPopover {
  constructor(element, data) {
    super(element, data);

    this._init();
    Manipulator.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }

  dispose() {
    EventHandler.off(this.element, EVENT_SHOW_BS);
    EventHandler.off(this.element, EVENT_SHOWN_BS);
    EventHandler.off(this.element, EVENT_HIDE_BS);
    EventHandler.off(this.element, EVENT_HIDDEN_BS);
    EventHandler.off(this.element, EVENT_INSERTED_BS);
    Manipulator.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);

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

export default Popover;
