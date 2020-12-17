import SelectorEngine from '../dom/selector-engine';
import { isVisible, typeCheckConfig } from './index';

const NAME = 'Stack';

const DEFAULT_OPTIONS = {
  position: 'top',
  container: null,
  refresh: 1000,
  filter: (el) => {
    return el;
  },
};

const TYPE_OPTIONS = {
  position: 'string',
  container: '(undefined|null|string)',
  refresh: 'number',
  filter: 'function',
};

class Stack {
  constructor(element, selector, options) {
    this._element = element;
    this._selector = selector;
    this._options = this._getConfig(options);

    this._offset = null;

    if (this._options.container) {
      this._parent = SelectorEngine.findOne(this._options.container);
    }
  }

  get stackableElements() {
    return SelectorEngine.find(this._selector)
      .filter((el, i) => this._options.filter(el, i))
      .map((el) => ({ el, rect: el.getBoundingClientRect() }))
      .filter(({ el, rect }) => {
        const basicCondition = el !== this._element && isVisible(el);
        if (this._offset === null) {
          return basicCondition;
        }

        return basicCondition && this._getBoundryOffset(rect) < this._offset;
      })
      .sort((a, b) => {
        return this._getBoundryOffset(b.rect) - this._getBoundryOffset(a.rect);
      });
  }

  get nextElements() {
    return SelectorEngine.find(this._selector)
      .filter((el) => el !== this._element)
      .filter((el, i) => this._options.filter(el, i))
      .filter((el) => {
        return this._getBoundryOffset(el.getBoundingClientRect()) > this._offset;
      });
  }

  _getConfig(options) {
    const config = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    typeCheckConfig(NAME, config, TYPE_OPTIONS);

    return config;
  }

  _getBoundryOffset(rect) {
    const { position } = this._options;

    let parentTopOffset = 0;
    let parentBottomBoundry = window.innerHeight;

    if (this._parent) {
      const parentRect = this._parent.getBoundingClientRect();

      parentTopOffset = parentRect.top;
      parentBottomBoundry = parentRect.bottom;
    }

    if (position === 'top') {
      return rect.top - parentTopOffset;
    }
    return parentBottomBoundry - rect.bottom;
  }

  calculateOffset() {
    const [previousElement] = this.stackableElements;

    if (!previousElement) {
      this._offset = 0;
    } else {
      this._offset = this._getBoundryOffset(previousElement.rect) + previousElement.rect.height;
    }

    return this._offset;
  }
}

export default Stack;
