import EventHandler from '../mdb/dom/event-handler';
import BSModal from '../bootstrap/mdb-prefix/modal';
import Manipulator from '../mdb/dom/manipulator';
import { bindCallbackEventsIfNeeded } from '../autoinit/init';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'modal';

const EVENT_HIDE_BS = 'hide.bs.modal';
const EVENT_HIDE_PREVENTED_BS = 'hidePrevented.bs.modal';
const EVENT_HIDDEN_BS = 'hidden.bs.modal';
const EVENT_SHOW_BS = 'show.bs.modal';
const EVENT_SHOWN_BS = 'shown.bs.modal';

const EXTENDED_EVENTS = [
  { name: 'show', parametersToCopy: ['relatedTarget'] },
  { name: 'shown', parametersToCopy: ['relatedTarget'] },
  { name: 'hide' },
  { name: 'hidePrevented' },
  { name: 'hidden' },
];

class Modal extends BSModal {
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
    EventHandler.off(this._element, EVENT_HIDE_PREVENTED_BS);
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

export default Modal;
