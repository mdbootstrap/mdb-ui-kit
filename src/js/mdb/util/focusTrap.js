import SelectorEngine from '../dom/selector-engine';
import { isVisible } from './index';

class FocusTrap {
  constructor(element, options = {}) {
    this._element = element;
    this._event = options.event || 'blur';
    this._condition = options.condition || (() => true);
    this._selector =
      options.selector || 'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this._onlyVisible = options.onlyVisible || false;
    this._focusableElements = [];
    this._firstElement = null;
    this._lastElement = null;

    this.handler = (e) => {
      if (this._condition(e) && e.target === this._lastElement) {
        e.preventDefault();
        this._firstElement.focus();
      }
    };
  }

  trap() {
    this._setElements();
    this._init();
    this._setFocusTrap();
  }

  disable() {
    this._focusableElements.forEach((element) => {
      element.removeEventListener(this._event, this.handler);
    });
  }

  update() {
    this._setElements();
    this._setFocusTrap();
  }

  _init() {
    const handler = (e) => {
      if (!this._firstElement || e.key !== 'Tab') return;
      e.preventDefault();
      this._firstElement.focus();

      window.removeEventListener('keydown', handler);
    };

    window.addEventListener('keydown', handler);
  }

  _filterVisible(elements) {
    return elements.filter((el) => {
      if (!isVisible(el)) return false;

      const ancestors = SelectorEngine.parents(el, '*');

      for (let i = 0; i < ancestors.length; i++) {
        const style = window.getComputedStyle(ancestors[i]);
        if (style && (style.display === 'none' || style.visibility === 'hidden')) return false;
      }
      return true;
    });
  }

  _setElements() {
    this._focusableElements = SelectorEngine.find(this._selector, this._element);

    if (this._onlyVisible) {
      this._focusableElements = this._filterVisible(this._focusableElements);
    }

    this._firstElement = this._focusableElements[0];
    this._lastElement = this._focusableElements[this._focusableElements.length - 1];
  }

  _setFocusTrap() {
    this._focusableElements.forEach((element, i) => {
      if (i === this._focusableElements.length - 1) {
        element.addEventListener(this._event, this.handler);
      } else {
        element.removeEventListener(this._event, this.handler);
      }
    });
  }
}

export default FocusTrap;
