import { getjQuery, onDOMContentLoaded } from '../mdb/util/index';
import EventHandler from '../mdb/dom/event-handler';
import SelectorEngine from '../mdb/dom/selector-engine';
import BSToast from '../bootstrap/mdb-prefix/toast';

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

const SELECTOR_TOAST = '.toast';

class Toast extends BSToast {
  constructor(element, data) {
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

SelectorEngine.find(SELECTOR_TOAST).forEach((el) => {
  let instance = Toast.getInstance(el);
  if (!instance) {
    instance = new Toast(el);
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
    $.fn[NAME] = Toast.jQueryInterface;
    $.fn[NAME].Constructor = Toast;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Toast.jQueryInterface;
    };
  }
});

export default Toast;
