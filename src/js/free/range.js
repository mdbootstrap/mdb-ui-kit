import { getjQuery, element, onDOMContentLoaded } from '../mdb/util/index';
import Data from '../mdb/dom/data';
import EventHandler from '../mdb/dom/event-handler';
import Manipulator from '../mdb/dom/manipulator';
import SelectorEngine from '../mdb/dom/selector-engine';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'range';
const DATA_KEY = 'mdb.range';
const CLASSNAME_THUMB = 'thumb';
const CLASSNAME_WRAPPER = 'range';
const CLASSNAME_ACTIVE = 'thumb-active';
const CLASSNAME_THUMB_VALUE = 'thumb-value';

const SELECTOR_THUMB_VALUE = `.${CLASSNAME_THUMB_VALUE}`;
const SELECTOR_WRAPPER = `.${CLASSNAME_WRAPPER}`;

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Range {
  constructor(element) {
    this._element = element;
    this._initiated = false;

    if (this._element) {
      Data.setData(element, DATA_KEY, this);
      this.init();
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
    this._updateValue();
    this._thumbPositionUpdate();
    this._handleEvents();
    this._initiated = true;
  }

  dispose() {
    this._disposeEvents();
    Data.removeData(this._element, DATA_KEY);
    this._element = null;
  }

  // Private
  _addThumb() {
    const RANGE_THUMB = element('span');
    Manipulator.addClass(RANGE_THUMB, CLASSNAME_THUMB);
    RANGE_THUMB.innerHTML = '<span class="thumb-value"></span>';
    this._element.append(RANGE_THUMB);
  }

  _updateValue() {
    const thumbValue = SelectorEngine.findOne(SELECTOR_THUMB_VALUE, this._element);
    thumbValue.textContent = this.rangeInput.value;
    this.rangeInput.oninput = () => (thumbValue.textContent = this.rangeInput.value);
  }

  _handleEvents() {
    EventHandler.on(this.rangeInput, 'mousedown', () => this._showThumb());
    EventHandler.on(this.rangeInput, 'mouseup', () => this._hideThumb());
    EventHandler.on(this.rangeInput, 'touchstart', () => this._showThumb());
    EventHandler.on(this.rangeInput, 'touchend', () => this._hideThumb());
    EventHandler.on(this.rangeInput, 'input', () => this._thumbPositionUpdate());
  }

  _disposeEvents() {
    EventHandler.off(this.rangeInput, 'mousedown', this._showThumb);
    EventHandler.off(this.rangeInput, 'mouseup', this._hideThumb);
    EventHandler.off(this.rangeInput, 'touchstart', this._showThumb);
    EventHandler.off(this.rangeInput, 'touchend', this._hideThumb);
    EventHandler.off(this.rangeInput, 'input', this._thumbPositionUpdate);
  }

  _showThumb() {
    Manipulator.addClass(this._element.lastElementChild, CLASSNAME_ACTIVE);
  }

  _hideThumb() {
    Manipulator.removeClass(this._element.lastElementChild, CLASSNAME_ACTIVE);
  }

  _thumbPositionUpdate() {
    const rangeInput = this.rangeInput;
    const inputValue = rangeInput.value;
    const minValue = rangeInput.min ? rangeInput.min : 0;
    const maxValue = rangeInput.max ? rangeInput.max : 100;
    const thumb = this._element.lastElementChild;
    const newValue = Number(((inputValue - minValue) * 100) / (maxValue - minValue));
    thumb.firstElementChild.textContent = inputValue;
    Manipulator.style(thumb, { left: `calc(${newValue}% + (${8 - newValue * 0.15}px))` });
  }
  // Static

  static getInstance(element) {
    return Data.getData(element, DATA_KEY);
  }

  static getOrCreateInstance(element, config = {}) {
    return (
      this.getInstance(element) || new this(element, typeof config === 'object' ? config : null)
    );
  }

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

// auto-init
SelectorEngine.find(SELECTOR_WRAPPER).map((element) => new Range(element));

// jQuery init
onDOMContentLoaded(() => {
  const $ = getjQuery();

  if ($) {
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    $.fn[NAME] = Range.jQueryInterface;
    $.fn[NAME].Constructor = Range;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Range.jQueryInterface;
    };
  }
});

export default Range;
