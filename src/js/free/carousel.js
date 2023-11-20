import EventHandler from '../mdb/dom/event-handler';
import BSCarousel from '../bootstrap/mdb-prefix/carousel';
import Manipulator from '../mdb/dom/manipulator';
import { bindCallbackEventsIfNeeded } from '../autoinit/init';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'carousel';

const EVENT_SLIDE_BS = 'slide.bs.carousel';
const EVENT_SLID_BS = 'slid.bs.carousel';

const EXTENDED_EVENTS = [
  { name: 'slide', parametersToCopy: ['relatedTarget', 'direction', 'from', 'to'] },
  { name: 'slid', parametersToCopy: ['relatedTarget', 'direction', 'from', 'to'] },
];

class Carousel extends BSCarousel {
  constructor(element, data) {
    super(element, data);

    this._init();
    Manipulator.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }

  dispose() {
    EventHandler.off(this._element, EVENT_SLIDE_BS);
    EventHandler.off(this._element, EVENT_SLID_BS);
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

export default Carousel;
