import EventHandler from '../mdb/dom/event-handler';
import BSAlert from '../bootstrap/mdb-prefix/alert';
import Manipulator from '../mdb/dom/manipulator';
import { bindCallbackEventsIfNeeded } from '../autoinit/init';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'alert';

const EVENT_CLOSE_BS = 'close.bs.alert';
const EVENT_CLOSED_BS = 'closed.bs.alert';

const EXTENDED_EVENTS = [{ name: 'close' }, { name: 'closed' }];

class Alert extends BSAlert {
  constructor(element, data = {}) {
    super(element, data);

    this._init();
    Manipulator.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }

  dispose() {
    EventHandler.off(this._element, EVENT_CLOSE_BS);
    EventHandler.off(this._element, EVENT_CLOSED_BS);
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

export default Alert;
