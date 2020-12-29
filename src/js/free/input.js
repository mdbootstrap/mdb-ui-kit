import { element } from '../mdb/util/index';
import Data from '../mdb/dom/data';
import EventHandler from '../bootstrap/src/dom/event-handler';
import Manipulator from '../mdb/dom/manipulator';
import SelectorEngine from '../mdb/dom/selector-engine';
import 'detect-autofill';

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
    this._activate();
  }

  update() {
    this._getLabelData();
    this._getNotchData();
    this._applyNotch();
    this._activate();
  }

  forceActive() {
    const input =
      SelectorEngine.findOne('input', this._element) ||
      SelectorEngine.findOne('textarea', this._element);
    Manipulator.addClass(input, 'active');
  }

  dispose() {
    this._removeBorder();

    Data.removeData(this._element, DATA_KEY);
    this._element = null;
  }

  // Private
  _getLabelData() {
    this._label = SelectorEngine.findOne('label', this._element);
    if (this._label === null) return;
    this._getLabelWidth();
    this._getLabelPositionInInputGroup();
  }

  _getNotchData() {
    this._notchMiddle = SelectorEngine.findOne('.form-notch-middle', this._element);
    this._notchLeading = SelectorEngine.findOne('.form-notch-leading', this._element);
  }

  _getLabelWidth() {
    this._labelWidth = this._label.clientWidth * 0.8 + 8;
  }

  _getLabelPositionInInputGroup() {
    this._labelMarginLeft = 0;

    if (!this._element.classList.contains('input-group')) return;
    const input =
      SelectorEngine.findOne('input', this._element) ||
      SelectorEngine.findOne('textarea', this._element);
    const prefix = SelectorEngine.prev(input, '.input-group-text')[0];
    if (prefix === undefined) {
      this._labelMarginLeft = 0;
    } else {
      this._labelMarginLeft = prefix.offsetWidth - 1;
    }
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

  _removeBorder() {
    const border = SelectorEngine.findOne('.form-notch', this._element);
    if (border) border.remove();
  }

  _activate(event) {
    this._getElements(event);

    const input = event
      ? event.target
      : SelectorEngine.findOne('input', this._element) ||
        SelectorEngine.findOne('textarea', this._element);

    if (input.value !== '') {
      Manipulator.addClass(input, 'active');
    }
  }

  _getElements(event) {
    if (event) {
      this._element = event.target.parentNode;
      this._label = SelectorEngine.findOne('label', this._element);
    }

    if (event && this._label) {
      const prevLabelWidth = this._labelWidth;
      this._getLabelData();

      if (prevLabelWidth !== this._labelWidth) {
        this._notchMiddle = SelectorEngine.findOne('.form-notch-middle', event.target.parentNode);
        this._notchLeading = SelectorEngine.findOne('.form-notch-leading', event.target.parentNode);
        this._applyNotch();
      }
    }
  }

  _deactivate(event) {
    const input = event
      ? event.target
      : SelectorEngine.findOne('input', this._element) ||
        SelectorEngine.findOne('textarea', this._element);
    if (input.value === '') {
      input.classList.remove('active');
    }
  }

  static activate(instance) {
    return function (event) {
      instance._activate(event);
    };
  }

  static deactivate(instance) {
    return function (event) {
      instance._deactivate(event);
    };
  }

  static getInstance(element) {
    return Data.getData(element, DATA_KEY);
  }
}

EventHandler.on(document, 'focus', OUTLINE_INPUT, Input.activate(new Input()));
EventHandler.on(document, 'input', OUTLINE_INPUT, Input.activate(new Input()));
EventHandler.on(document, 'blur', OUTLINE_INPUT, Input.deactivate(new Input()));

EventHandler.on(document, 'focus', OUTLINE_TEXTAREA, Input.activate(new Input()));
EventHandler.on(document, 'input', OUTLINE_TEXTAREA, Input.activate(new Input()));
EventHandler.on(document, 'blur', OUTLINE_TEXTAREA, Input.deactivate(new Input()));

EventHandler.on(window, 'shown.bs.modal', (e) => {
  SelectorEngine.find(OUTLINE_INPUT, e.target).forEach((element) => {
    const instance = Input.getInstance(element.parentNode);
    if (!instance) return;
    instance.update();
  });
  SelectorEngine.find(OUTLINE_TEXTAREA, e.target).forEach((element) => {
    const instance = Input.getInstance(element.parentNode);
    if (!instance) return;
    instance.update();
  });
});

EventHandler.on(window, 'shown.bs.dropdown', (e) => {
  SelectorEngine.find(OUTLINE_INPUT, e.target).forEach((element) => {
    const instance = Input.getInstance(element.parentNode);
    if (!instance) return;
    instance.update();
  });
  SelectorEngine.find(OUTLINE_TEXTAREA, e.target).forEach((element) => {
    const instance = Input.getInstance(element.parentNode);
    if (!instance) return;
    instance.update();
  });
});

EventHandler.on(window, 'shown.bs.tab', (e) => {
  const targetId = e.target.href.split('#')[1];
  const target = SelectorEngine.findOne(`#${targetId}`);
  SelectorEngine.find(OUTLINE_INPUT, target).forEach((element) => {
    const instance = Input.getInstance(element.parentNode);
    if (!instance) return;
    instance.update();
  });
  SelectorEngine.find(OUTLINE_TEXTAREA, target).forEach((element) => {
    const instance = Input.getInstance(element.parentNode);
    if (!instance) return;
    instance.update();
  });
});

// auto-init
SelectorEngine.find(`.${CLASSNAME_WRAPPER}`).forEach((element) => {
  new Input(element).init();
});

// auto-fill
EventHandler.on(window, 'onautocomplete', (e) => {
  const instance = Input.getInstance(e.target.parentNode);
  if (!instance) return;
  instance.forceActive();
});

export default Input;
