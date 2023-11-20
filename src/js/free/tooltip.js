import EventHandler from '../mdb/dom/event-handler';
import BSTooltip from '../bootstrap/mdb-prefix/tooltip';
import Manipulator from '../mdb/dom/manipulator';
import { bindCallbackEventsIfNeeded } from '../autoinit/init';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'tooltip';

const EVENT_HIDE_BS = 'hide.bs.tooltip';
const EVENT_HIDDEN_BS = 'hidden.bs.tooltip';
const EVENT_SHOW_BS = 'show.bs.tooltip';
const EVENT_SHOWN_BS = 'shown.bs.tooltip';
const EVENT_INSERTED_BS = 'inserted.bs.tooltip';

const EXTENDED_EVENTS = [
  { name: 'show' },
  { name: 'shown' },
  { name: 'hide' },
  { name: 'hidden' },
  { name: 'inserted' },
];

class Tooltip extends BSTooltip {
  constructor(element, data) {
    super(element, data);

    this._init();
    Manipulator.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }

  dispose() {
    EventHandler.off(this._element, EVENT_SHOW_BS);
    EventHandler.off(this._element, EVENT_SHOWN_BS);
    EventHandler.off(this._element, EVENT_HIDE_BS);
    EventHandler.off(this._element, EVENT_HIDDEN_BS);
    EventHandler.off(this._element, EVENT_INSERTED_BS);
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

export default Tooltip;
