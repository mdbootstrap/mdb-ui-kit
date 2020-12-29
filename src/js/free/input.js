import { element } from '../mdb/util/index';
import Data from '../mdb/dom/data';
import EventHandler from '../bootstrap/src/dom/event-handler';
import Manipulator from '../mdb/dom/manipulator';
import SelectorEngine from '../mdb/dom/selector-engine';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'input';
const DATA_KEY = 'mdb.input';
const CLASSNAME_WRAPPER = 'form-outline';
const OUTLINE_INPUT = `.${CLASSNAME_WRAPPER} input`;

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Input {
  constructor(element) {
    this._element = element;
    this._labelWidth = 0;
    this._notchMiddle = null;

    if (this._element) {
      Data.setData(element, DATA_KEY, this);
    }
  }

  // Getters
  static get NAME() {
    return NAME;
  }

  // Public
  init() {
    this._calculateLabelWidth();
    this._applyDivs();
    this._applyNotchWidth();
    this._applyActiveClass();
  }

  dispose() {
    Data.removeData(this._element, DATA_KEY);
    this._element = null;
  }

  // Private
  _calculateLabelWidth() {
    const label = SelectorEngine.findOne('label.form-label', this._element);
    this._labelWidth = label.clientWidth * 0.8 + 8;
  }

  _applyDivs() {
    const notchWrapper = element('div');
    Manipulator.addClass(notchWrapper, 'form-notch');
    const notchLeading = element('div');
    Manipulator.addClass(notchLeading, 'form-notch-leading');
    this._notchMiddle = element('div');
    Manipulator.addClass(this._notchMiddle, 'form-notch-middle');
    const notchTrailing = element('div');
    Manipulator.addClass(notchTrailing, 'form-notch-trailing');

    notchWrapper.append(notchLeading);
    notchWrapper.append(this._notchMiddle);
    notchWrapper.append(notchTrailing);
    this._element.append(notchWrapper);
  }

  _applyNotchWidth() {
    this._notchMiddle.style.width = `${this._labelWidth}px`;
  }

  _applyActiveClass(event) {
    const input = event ? event.target : SelectorEngine.findOne('input', this._element);
    if (input.value !== '') {
      Manipulator.addClass(input, 'active');
    }
  }

  _removeActiveClass(event) {
    const input = event ? event.target : SelectorEngine.findOne('input', this._element);
    if (input.value === '') {
      input.classList.remove('active');
    }
  }

  static applyActiveClass(instance) {
    return function (event) {
      instance._applyActiveClass(event);
    };
  }

  static removeActiveClass(instance) {
    return function (event) {
      instance._removeActiveClass(event);
    };
  }
}

EventHandler.on(document, 'focus', OUTLINE_INPUT, Input.applyActiveClass(new Input()));
EventHandler.on(document, 'input', OUTLINE_INPUT, Input.applyActiveClass(new Input()));
EventHandler.on(document, 'blur', OUTLINE_INPUT, Input.removeActiveClass(new Input()));

// auto-init
SelectorEngine.find(`.${CLASSNAME_WRAPPER}`).forEach((input) => {
  new Input(input).init();
});

export default Input;
