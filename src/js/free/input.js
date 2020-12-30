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
const OUTLINE_TEXTAREA = `.${CLASSNAME_WRAPPER} textarea`;

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Input {
  constructor(element) {
    this._element = element;
    this._label = null;
    this._labelWidth = 0;
    this._labelMarginLeft = 0;
    this._notchLeading = null;
    this._notchMiddle = null;
    this._notchTrailing = null;

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
    this._getLabelData();
    this._applyDivs();
    this._applyNotch();
    this._applyActiveClass();
  }

  dispose() {
    Data.removeData(this._element, DATA_KEY);
    this._element = null;
  }

  // Private
  _getLabelData() {
    this._label = SelectorEngine.findOne('label', this._element);
    if (this._label === null) return;
    this._getLabelWidth();

    if (!this._element.classList.contains('input-group')) return;
    this._getLabelPositionInInputGroup();
  }

  _getLabelWidth() {
    this._labelWidth = this._label.clientWidth * 0.8 + 8;
  }

  _getLabelPositionInInputGroup() {
    const input =
      SelectorEngine.findOne('input', this._element) ||
      SelectorEngine.findOne('textarea', this._element);
    const prefix = SelectorEngine.prev(input, '.input-group-text')[0];
    if (prefix === undefined) return;
    this._labelMarginLeft = prefix.offsetWidth - 1;
  }

  _applyDivs() {
    const notchWrapper = element('div');
    Manipulator.addClass(notchWrapper, 'form-notch');
    this._notchLeading = element('div');
    Manipulator.addClass(this._notchLeading, 'form-notch-leading');
    this._notchMiddle = element('div');
    Manipulator.addClass(this._notchMiddle, 'form-notch-middle');
    this._notchTrailing = element('div');
    Manipulator.addClass(this._notchTrailing, 'form-notch-trailing');

    notchWrapper.append(this._notchLeading);
    notchWrapper.append(this._notchMiddle);
    notchWrapper.append(this._notchTrailing);
    this._element.append(notchWrapper);
  }

  _applyNotch() {
    this._notchMiddle.style.width = `${this._labelWidth}px`;
    this._notchLeading.style.width = `${this._labelMarginLeft + 9}px`;

    if (this._label === null) return;
    this._label.style.marginLeft = `${this._labelMarginLeft}px`;
  }

  _applyActiveClass(event) {
    const input = event
      ? event.target
      : SelectorEngine.findOne('input', this._element) ||
        SelectorEngine.findOne('textarea', this._element);
    if (input.value !== '') {
      Manipulator.addClass(input, 'active');
    }
  }

  _removeActiveClass(event) {
    const input = event
      ? event.target
      : SelectorEngine.findOne('input', this._element) ||
        SelectorEngine.findOne('textarea', this._element);
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

  static getInstance(element) {
    return Data.getData(element, DATA_KEY);
  }
}

EventHandler.on(document, 'focus', OUTLINE_INPUT, Input.applyActiveClass(new Input()));
EventHandler.on(document, 'input', OUTLINE_INPUT, Input.applyActiveClass(new Input()));
EventHandler.on(document, 'blur', OUTLINE_INPUT, Input.removeActiveClass(new Input()));

EventHandler.on(document, 'focus', OUTLINE_TEXTAREA, Input.applyActiveClass(new Input()));
EventHandler.on(document, 'input', OUTLINE_TEXTAREA, Input.applyActiveClass(new Input()));
EventHandler.on(document, 'blur', OUTLINE_TEXTAREA, Input.removeActiveClass(new Input()));

// auto-init
SelectorEngine.find(`.${CLASSNAME_WRAPPER}`).forEach((element) => {
  new Input(element).init();
});

export default Input;
