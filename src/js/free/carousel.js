import { getjQuery, onDOMContentLoaded } from '../mdb/util/index';
import EventHandler from '../mdb/dom/event-handler';
import SelectorEngine from '../mdb/dom/selector-engine';
import BSCarousel from '../bootstrap/mdb-prefix/carousel';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'carousel';
const DATA_KEY = `mdb.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;

const EVENT_SLIDE_BS = 'slide.bs.carousel';
const EVENT_SLID_BS = 'slid.bs.carousel';

const EVENT_SLIDE = `slide${EVENT_KEY}`;
const EVENT_SLID = `slid${EVENT_KEY}`;

const SELECTOR_DATA_RIDE = '[data-mdb-ride="carousel"]';

class Carousel extends BSCarousel {
  constructor(element, data) {
    super(element, data);

    this._init();
  }

  dispose() {
    EventHandler.off(this._element, EVENT_SLIDE_BS);
    EventHandler.off(this._element, EVENT_SLID_BS);

    super.dispose();
  }

  // Getters
  static get NAME() {
    return NAME;
  }

  // Private
  _init() {
    this._bindSlideEvent();
    this._bindSlidEvent();
  }

  _bindSlideEvent() {
    EventHandler.on(this._element, EVENT_SLIDE_BS, (e) => {
      EventHandler.trigger(this._element, EVENT_SLIDE, {
        relatedTarget: e.relatedTarget,
        direction: e.direction,
        from: e.from,
        to: e.to,
      });
    });
  }

  _bindSlidEvent() {
    EventHandler.on(this._element, EVENT_SLID_BS, (e) => {
      EventHandler.trigger(this._element, EVENT_SLID, {
        relatedTarget: e.relatedTarget,
        direction: e.direction,
        from: e.from,
        to: e.to,
      });
    });
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation - auto initialization
 * ------------------------------------------------------------------------
 */

SelectorEngine.find(SELECTOR_DATA_RIDE).forEach((el) => {
  let instance = Carousel.getInstance(el);
  if (!instance) {
    instance = new Carousel(el);
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
    $.fn[NAME] = Carousel.jQueryInterface;
    $.fn[NAME].Constructor = Carousel;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel.jQueryInterface;
    };
  }
});

export default Carousel;
