import { element } from '../mdb/util/index';
import Data from '../mdb/dom/data';
import EventHandler from '../mdb/dom/event-handler';
import Manipulator from '../mdb/dom/manipulator';
import SelectorEngine from '../mdb/dom/selector-engine';
import BaseComponent from './base-component';
import { bindCallbackEventsIfNeeded } from '../autoinit/init';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'range';
const DATA_KEY = 'mdb.range';
const CLASSNAME_THUMB = 'thumb';
const CLASSNAME_ACTIVE = 'thumb-active';
const CLASSNAME_THUMB_VALUE = 'thumb-value';

const SELECTOR_THUMB_VALUE = `.${CLASSNAME_THUMB_VALUE}`;
const SELECTOR_THUMB = `.${CLASSNAME_THUMB}`;

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Range extends BaseComponent {
  constructor(element) {
    super(element);

    this._initiated = false;
    this._thumb = null;

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

  get rangeInput() {
    return SelectorEngine.findOne('input[type=range]', this._element);
  }

  // Public
  init() {
    if (this._initiated) {
      return;
    }
    this._addThumb();
    this._thumbUpdate();
    this._handleEvents();
    this._initiated = true;
  }

  dispose() {
    this._disposeEvents();
    Manipulator.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);

    super.dispose();
  }

  // Private
  _addThumb() {
    const RANGE_THUMB = element('span');
    Manipulator.addClass(RANGE_THUMB, CLASSNAME_THUMB);
    RANGE_THUMB.innerHTML = '<span class="thumb-value"></span>';
    this._element.append(RANGE_THUMB);
    this._thumb = SelectorEngine.findOne(SELECTOR_THUMB, this._element);
  }

  _handleEvents() {
    EventHandler.on(this.rangeInput, 'mousedown', () => this._showThumb());
    EventHandler.on(this.rangeInput, 'mouseup', () => this._hideThumb());
    EventHandler.on(this.rangeInput, 'touchstart', () => this._showThumb());
    EventHandler.on(this.rangeInput, 'touchend', () => this._hideThumb());
    EventHandler.on(this.rangeInput, 'input', () => this._thumbUpdate());
  }

  _disposeEvents() {
    EventHandler.off(this.rangeInput, 'mousedown');
    EventHandler.off(this.rangeInput, 'mouseup');
    EventHandler.off(this.rangeInput, 'touchstart');
    EventHandler.off(this.rangeInput, 'touchend');
    EventHandler.off(this.rangeInput, 'input');
  }

  _showThumb() {
    Manipulator.addClass(this._thumb, CLASSNAME_ACTIVE);
  }

  _hideThumb() {
    Manipulator.removeClass(this._thumb, CLASSNAME_ACTIVE);
  }

  _thumbUpdate() {
    const rangeInput = this.rangeInput;
    const inputValue = rangeInput.value;
    const minValue = rangeInput.min ? rangeInput.min : 0;
    const maxValue = rangeInput.max ? rangeInput.max : 100;
    const thumbValue = SelectorEngine.findOne(SELECTOR_THUMB_VALUE, this._thumb);
    thumbValue.textContent = inputValue;
    const newValue = Number(((inputValue - minValue) * 100) / (maxValue - minValue));
    Manipulator.style(this._thumb, { left: `calc(${newValue}% + (${8 - newValue * 0.15}px))` });
  }
  // Static

  static jQueryInterface(config, options) {
    return this.each(function () {
      let data = Data.getData(this, DATA_KEY);
      const _config = typeof config === 'object' && config;
      if (!data && /dispose/.test(config)) {
        return;
      }
      if (!data) {
        data = new Range(this, _config);
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

export default Range;
