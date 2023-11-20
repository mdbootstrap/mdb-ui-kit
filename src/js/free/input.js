import { element, onDOMContentLoaded } from '../mdb/util/index';
import Data from '../mdb/dom/data';
import EventHandler from '../mdb/dom/event-handler';
import Manipulator from '../mdb/dom/manipulator';
import SelectorEngine from '../mdb/dom/selector-engine';
import 'detect-autofill';
import BaseComponent from './base-component';
import { bindCallbackEventsIfNeeded } from '../autoinit/init';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'input';
const DATA_KEY = 'mdb.input';
const CLASSNAME_ACTIVE = 'active';
const CLASSNAME_NOTCH = 'form-notch';
const CLASSNAME_NOTCH_LEADING = 'form-notch-leading';
const CLASSNAME_NOTCH_MIDDLE = 'form-notch-middle';
const CLASSNAME_NOTCH_TRAILING = 'form-notch-trailing';
const CLASSNAME_PLACEHOLDER_ACTIVE = 'placeholder-active';
const CLASSNAME_HELPER = 'form-helper';
const CLASSNAME_COUNTER = 'form-counter';

const SELECTOR_NOTCH = `.${CLASSNAME_NOTCH}`;
const SELECTOR_NOTCH_LEADING = `.${CLASSNAME_NOTCH_LEADING}`;
const SELECTOR_NOTCH_MIDDLE = `.${CLASSNAME_NOTCH_MIDDLE}`;
const SELECTOR_HELPER = `.${CLASSNAME_HELPER}`;

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Input extends BaseComponent {
  constructor(element) {
    super(element);

    this._label = null;
    this._labelWidth = 0;
    this._labelMarginLeft = 0;
    this._notchLeading = null;
    this._notchMiddle = null;
    this._notchTrailing = null;
    this._initiated = false;
    this._helper = null;
    this._counter = false;
    this._counterElement = null;
    this._maxLength = 0;
    this._leadingIcon = null;
    if (this._element) {
      this.init();
      Manipulator.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
      bindCallbackEventsIfNeeded(this.constructor);
    }
  }

  // Getters
  static get NAME() {
    return NAME;
  }

  get input() {
    const inputElement =
      SelectorEngine.findOne('input', this._element) ||
      SelectorEngine.findOne('textarea', this._element);
    return inputElement;
  }

  // Public
  init() {
    if (this._initiated) {
      return;
    }
    this._getLabelData();
    this._applyDivs();
    this._applyNotch();
    this._activate();
    this._getHelper();
    this._getCounter();
    this._initiated = true;
  }

  update() {
    this._getLabelData();
    this._getNotchData();
    this._applyNotch();
    this._activate();
    this._getHelper();
    this._getCounter();
  }

  forceActive() {
    Manipulator.addClass(this.input, CLASSNAME_ACTIVE);
  }

  forceInactive() {
    Manipulator.removeClass(this.input, CLASSNAME_ACTIVE);
  }

  dispose() {
    this._removeBorder();
    Manipulator.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);

    super.dispose();
  }

  // Private

  /*
  _getIcons() {
    this._leadingIcon = SelectorEngine.findOne('i.leading', this._element);

    if (this._leadingIcon !== null) {
      this._applyLeadingIcon();
    }
  }

  _applyLeadingIcon() {
    this._label.innerHTML = ` ${this._label.innerHTML}`;
    this._label.insertBefore(this._leadingIcon, this._label.firstChild);
  }
  */

  _getLabelData() {
    this._label = SelectorEngine.findOne('label', this._element);
    if (this._label === null) {
      this._showPlaceholder();
    } else {
      this._getLabelWidth();
      this._getLabelPositionInInputGroup();
      this._toggleDefaultDatePlaceholder();
    }
  }

  _getHelper() {
    this._helper = SelectorEngine.findOne(SELECTOR_HELPER, this._element);
  }

  _getCounter() {
    this._counter = Manipulator.getDataAttribute(this.input, 'showcounter');
    if (this._counter) {
      this._maxLength = this.input.maxLength;
      this._showCounter();
    }
  }

  _showCounter() {
    const counters = SelectorEngine.find('.form-counter', this._element);
    if (counters.length > 0) {
      return;
    }
    this._counterElement = document.createElement('div');
    Manipulator.addClass(this._counterElement, CLASSNAME_COUNTER);
    const actualLength = this.input.value.length;
    this._counterElement.innerHTML = `${actualLength} / ${this._maxLength}`;
    this._helper.appendChild(this._counterElement);
    this._bindCounter();
  }

  _bindCounter() {
    EventHandler.on(this.input, 'input', () => {
      const actualLength = this.input.value.length;
      this._counterElement.innerHTML = `${actualLength} / ${this._maxLength}`;
    });
  }

  _toggleDefaultDatePlaceholder(input = this.input) {
    const isTypeDate = input.getAttribute('type') === 'date';

    if (!isTypeDate) {
      return;
    }

    const isInputFocused = document.activeElement === input;

    if (!isInputFocused && !input.value) {
      input.style.opacity = 0;
    } else {
      input.style.opacity = 1;
    }
  }

  _showPlaceholder() {
    Manipulator.addClass(this.input, CLASSNAME_PLACEHOLDER_ACTIVE);
  }

  _getNotchData() {
    this._notchMiddle = SelectorEngine.findOne(SELECTOR_NOTCH_MIDDLE, this._element);
    this._notchLeading = SelectorEngine.findOne(SELECTOR_NOTCH_LEADING, this._element);
  }

  _getLabelWidth() {
    this._labelWidth = this._label.clientWidth * 0.8 + 8;
  }

  _getLabelPositionInInputGroup() {
    this._labelMarginLeft = 0;

    if (!this._element.classList.contains('input-group')) return;
    const input = this.input;
    const prefix = SelectorEngine.prev(input, '.input-group-text')[0];
    if (prefix === undefined) {
      this._labelMarginLeft = 0;
    } else {
      this._labelMarginLeft = prefix.offsetWidth - 1;
    }
  }

  _applyDivs() {
    const allNotchWrappers = SelectorEngine.find(SELECTOR_NOTCH, this._element);
    const notchWrapper = element('div');
    Manipulator.addClass(notchWrapper, CLASSNAME_NOTCH);
    this._notchLeading = element('div');
    Manipulator.addClass(this._notchLeading, CLASSNAME_NOTCH_LEADING);
    this._notchMiddle = element('div');
    Manipulator.addClass(this._notchMiddle, CLASSNAME_NOTCH_MIDDLE);
    this._notchTrailing = element('div');
    Manipulator.addClass(this._notchTrailing, CLASSNAME_NOTCH_TRAILING);
    if (allNotchWrappers.length >= 1) {
      return;
    }
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
    const border = SelectorEngine.findOne(SELECTOR_NOTCH, this._element);
    if (border) border.remove();
  }

  _activate(event) {
    onDOMContentLoaded(() => {
      this._getElements(event);
      const input = event ? event.target : this.input;

      if (input.value !== '') {
        Manipulator.addClass(input, CLASSNAME_ACTIVE);
      }
      this._toggleDefaultDatePlaceholder(input);
    });
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
        this._notchLeading = SelectorEngine.findOne(
          SELECTOR_NOTCH_LEADING,
          event.target.parentNode
        );
        this._applyNotch();
      }
    }
  }

  _deactivate(event) {
    const input = event ? event.target : this.input;

    if (input.value === '') {
      input.classList.remove(CLASSNAME_ACTIVE);
    }
    this._toggleDefaultDatePlaceholder(input);
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

  static jQueryInterface(config, options) {
    return this.each(function () {
      let data = Data.getData(this, DATA_KEY);
      const _config = typeof config === 'object' && config;
      if (!data && /dispose/.test(config)) {
        return;
      }
      if (!data) {
        data = new Input(this, _config);
      }
      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](options);
      }
    });
  }
}

export default Input;
