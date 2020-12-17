import { getjQuery, getElementFromSelector, onDOMContentLoaded } from '../mdb/util/index';
import EventHandler from '../mdb/dom/event-handler';
import SelectorEngine from '../mdb/dom/selector-engine';
import BSTab from '../bootstrap/mdb-prefix/tab';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'tab';
const DATA_KEY = `mdb.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;

const EVENT_SHOW_BS = 'show.bs.tab';
const EVENT_SHOWN_BS = 'shown.bs.tab';
const EVENT_HIDE_BS = 'hide.bs.tab';
const EVENT_HIDDEN_BS = 'hidden.bs.tab';

const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;

const CLASS_NAME_ACTIVE = 'active';
const CLASS_NAME_DISABLED = 'disabled';

const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';

const SELECTOR_ACTIVE = '.active';
const SELECTOR_ACTIVE_UL = ':scope > li > .active';

const SELECTOR_DATA_TOGGLE =
  '[data-mdb-toggle="tab"], [data-mdb-toggle="pill"], [data-mdb-toggle="list"]';

class Tab extends BSTab {
  constructor(element) {
    super(element);

    this._previous = null;

    this._init();
  }

  dispose() {
    EventHandler.off(this._element, EVENT_SHOW_BS);
    EventHandler.off(this._element, EVENT_SHOWN_BS);

    super.dispose();
  }

  // Getters
  static get NAME() {
    return NAME;
  }

  // Override
  show() {
    if (
      (this._element.parentNode &&
        this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
        this._element.classList.contains(CLASS_NAME_ACTIVE)) ||
      this._element.classList.contains(CLASS_NAME_DISABLED)
    ) {
      return;
    }

    const target = getElementFromSelector(this._element);
    const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

    if (listElement) {
      const itemSelector =
        listElement.nodeName === 'UL' || listElement.nodeName === 'OL'
          ? SELECTOR_ACTIVE_UL
          : SELECTOR_ACTIVE;
      this._previous = SelectorEngine.find(itemSelector, listElement);
      this._previous = this._previous[this._previous.length - 1];
    }

    let hideEvent = null;
    let hideEventMdb = null;

    if (this._previous) {
      hideEvent = EventHandler.trigger(this._previous, EVENT_HIDE_BS, {
        relatedTarget: this._element,
      });
      hideEventMdb = EventHandler.trigger(this._previous, EVENT_HIDE, {
        relatedTarget: this._element,
      });
    }

    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW_BS, {
      relatedTarget: this._previous,
    });

    if (
      showEvent.defaultPrevented ||
      (hideEvent !== null && hideEvent.defaultPrevented) ||
      (hideEventMdb !== null && hideEventMdb.defaultPrevented)
    ) {
      return;
    }

    this._activate(this._element, listElement);

    const complete = () => {
      EventHandler.trigger(this._previous, EVENT_HIDDEN_BS, {
        relatedTarget: this._element,
      });
      EventHandler.trigger(this._previous, EVENT_HIDDEN, {
        relatedTarget: this._element,
      });

      EventHandler.trigger(this._element, EVENT_SHOWN_BS, {
        relatedTarget: this._previous,
      });
    };

    if (target) {
      this._activate(target, target.parentNode, complete);
    } else {
      complete();
    }
  }

  // Private
  _init() {
    this._bindShowEvent();
    this._bindShownEvent();
    this._bindHideEvent();
    this._bindHiddenEvent();
  }

  _bindShowEvent() {
    EventHandler.on(this._element, EVENT_SHOW_BS, (e) => {
      EventHandler.trigger(this._element, EVENT_SHOW, {
        relatedTarget: e.relatedTarget,
      });
    });
  }

  _bindShownEvent() {
    EventHandler.on(this._element, EVENT_SHOWN_BS, (e) => {
      EventHandler.trigger(this._element, EVENT_SHOWN, {
        relatedTarget: e.relatedTarget,
      });
    });
  }

  _bindHideEvent() {
    EventHandler.on(this._previous, EVENT_HIDE_BS, () => {
      EventHandler.trigger(this._previous, EVENT_HIDE);
    });
  }

  _bindHiddenEvent() {
    EventHandler.on(this._previous, EVENT_HIDDEN_BS, () => {
      EventHandler.trigger(this._previous, EVENT_HIDDEN);
    });
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation - auto initialization
 * ------------------------------------------------------------------------
 */

SelectorEngine.find(SELECTOR_DATA_TOGGLE).forEach((el) => {
  let instance = Tab.getInstance(el);
  if (!instance) {
    instance = new Tab(el);
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
    $.fn[NAME] = Tab.jQueryInterface;
    $.fn[NAME].Constructor = Tab;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab.jQueryInterface;
    };
  }
});

export default Tab;
