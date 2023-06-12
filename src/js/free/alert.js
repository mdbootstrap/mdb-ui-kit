import { getjQuery, onDOMContentLoaded } from '../mdb/util/index';
import EventHandler from '../mdb/dom/event-handler';
import SelectorEngine from '../mdb/dom/selector-engine';
import BSAlert from '../bootstrap/mdb-prefix/alert';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'alert';

const EVENT_CLOSE_BS = 'close.bs.alert';
const EVENT_CLOSED_BS = 'closed.bs.alert';

const EXTENDED_EVENTS = [{ name: 'close' }, { name: 'closed' }];

const SELECTOR_ALERT = '.alert';

class Alert extends BSAlert {
  constructor(element, data = {}) {
    super(element, data);

    this._init();
  }

  dispose() {
    EventHandler.off(this._element, EVENT_CLOSE_BS);
    EventHandler.off(this._element, EVENT_CLOSED_BS);

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

SelectorEngine.find(SELECTOR_ALERT).forEach((el) => {
  let instance = Alert.getInstance(el);
  if (!instance) {
    instance = new Alert(el);
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
    $.fn[NAME] = Alert.jQueryInterface;
    $.fn[NAME].Constructor = Alert;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert.jQueryInterface;
    };
  }
});

export default Alert;
