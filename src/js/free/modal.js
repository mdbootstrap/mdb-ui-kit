import { getjQuery, getSelectorFromElement, onDOMContentLoaded } from '../mdb/util/index';
import EventHandler from '../mdb/dom/event-handler';
import SelectorEngine from '../mdb/dom/selector-engine';
import BSModal from '../bootstrap/mdb-prefix/modal';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'modal';
const DATA_KEY = `mdb.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;

const EVENT_HIDE_BS = 'hide.bs.modal';
const EVENT_HIDE_PREVENTED_BS = 'hidePrevented.bs.modal';
const EVENT_HIDDEN_BS = 'hidden.bs.modal';
const EVENT_SHOW_BS = 'show.bs.modal';
const EVENT_SHOWN_BS = 'shown.bs.modal';

const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;

const SELECTOR_DATA_TOGGLE = '[data-mdb-toggle="modal"]';

class Modal extends BSModal {
  constructor(element, data) {
    super(element, data);

    this._init();
  }

  dispose() {
    EventHandler.off(this._element, EVENT_SHOW_BS);
    EventHandler.off(this._element, EVENT_SHOWN_BS);
    EventHandler.off(this._element, EVENT_HIDE_BS);
    EventHandler.off(this._element, EVENT_HIDDEN_BS);
    EventHandler.off(this._element, EVENT_HIDE_PREVENTED_BS);

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
    this._bindHidePreventedEvent();
  }

  _bindShowEvent() {
    EventHandler.on(this._element, EVENT_SHOW_BS, (e) => {
      EventHandler.trigger(this._element, EVENT_SHOW, { relatedTarget: e.relatedTarget });
    });
  }

  _bindShownEvent() {
    EventHandler.on(this._element, EVENT_SHOWN_BS, (e) => {
      EventHandler.trigger(this._element, EVENT_SHOWN, { relatedTarget: e.relatedTarget });
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

  _bindHidePreventedEvent() {
    EventHandler.on(this._element, EVENT_HIDE_PREVENTED_BS, () => {
      EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
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
  const selectorElement = SelectorEngine.findOne(selector);

  let instance = Modal.getInstance(selectorElement);
  if (!instance) {
    instance = new Modal(selectorElement);
  }
});

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .modal to jQuery only if jQuery is present
 */

onDOMContentLoaded(() => {
  const $ = getjQuery();

  if ($) {
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    $.fn[NAME] = Modal.jQueryInterface;
    $.fn[NAME].Constructor = Modal;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal.jQueryInterface;
    };
  }
});

export default Modal;
