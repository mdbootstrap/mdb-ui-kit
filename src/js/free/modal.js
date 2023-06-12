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
