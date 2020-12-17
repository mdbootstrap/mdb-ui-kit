import TouchUtil from './touchUtil';
import EventHandler from '../../dom/event-handler';

const DEFAULT_OPTIONS = {
  threshold: 10,
  direction: 'all',
};

class Swipe extends TouchUtil {
  constructor(element, options) {
    super();
    this._element = element;
    this._startPosition = null;
    this._options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
  }

  handleTouchStart(e) {
    this._startPosition = this._getCoordinates(e);
  }

  handleTouchMove(e) {
    if (!this._startPosition) return;

    const position = this._getCoordinates(e);
    const displacement = {
      x: position.x - this._startPosition.x,
      y: position.y - this._startPosition.y,
    };

    const swipe = this._getDirection(displacement);

    if (this._options.direction === 'all') {
      if (swipe.y.value < this._options.threshold && swipe.x.value < this._options.threshold) {
        return;
      }
      const direction = swipe.y.value > swipe.x.value ? swipe.y.direction : swipe.x.direction;
      EventHandler.trigger(this._element, `swipe${direction}`);
      EventHandler.trigger(this._element, 'swipe', { direction });
      this._startPosition = null;
      return;
    }

    const axis = this._options.direction === 'left' || this._options === 'right' ? 'x' : 'y';

    if (
      swipe[axis].direction === this._options.direction &&
      swipe[axis].value > this._options.threshold
    ) {
      EventHandler.trigger(this._element, `swipe${swipe[axis].direction}`);
      this._startPosition = null;
    }
  }

  handleTouchEnd() {
    this._startPosition = null;
  }
}

export default Swipe;
