import EventHandler from '../mdb/dom/event-handler';
import BSToast from '../bootstrap/mdb-prefix/toast';
import Manipulator from '../mdb/dom/manipulator';
import { bindCallbackEventsIfNeeded } from '../autoinit/init';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'toast';

const EVENT_SHOW_BS = 'show.bs.toast';
const EVENT_SHOWN_BS = 'shown.bs.toast';
const EVENT_HIDE_BS = 'hide.bs.toast';
const EVENT_HIDDEN_BS = 'hidden.bs.toast';

const EXTENDED_EVENTS = [{ name: 'show' }, { name: 'shown' }, { name: 'hide' }, { name: 'hidden' }];

class Toast extends BSToast {
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

export default Toast;
