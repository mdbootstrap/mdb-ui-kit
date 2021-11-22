import { element, getjQuery, typeCheckConfig, onDOMContentLoaded } from '../mdb/util/index';
import Data from '../mdb/dom/data';
import EventHandler from '../mdb/dom/event-handler';
import Manipulator from '../mdb/dom/manipulator';
import SelectorEngine from '../mdb/dom/selector-engine';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'ripple';
const DATA_KEY = 'mdb.ripple';
const CLASSNAME_RIPPLE = 'ripple-surface';
const CLASSNAME_RIPPLE_WAVE = 'ripple-wave';
const SELECTOR_COMPONENT = ['.btn', '.ripple'];

const CLASSNAME_UNBOUND = 'ripple-surface-unbound';
const GRADIENT =
  'rgba({{color}}, 0.2) 0, rgba({{color}}, 0.3) 40%, rgba({{color}}, 0.4) 50%, rgba({{color}}, 0.5) 60%, rgba({{color}}, 0) 70%';
const DEFAULT_RIPPLE_COLOR = [0, 0, 0];
const BOOTSTRAP_COLORS = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
];

// Sets value when run opacity transition
// Hide element after 50% (0.5) time of animation and finish on 100%
const TRANSITION_BREAK_OPACITY = 0.5;

const Default = {
  rippleCentered: false,
  rippleColor: '',
  rippleDuration: '500ms',
  rippleRadius: 0,
  rippleUnbound: false,
};

const DefaultType = {
  rippleCentered: 'boolean',
  rippleColor: 'string',
  rippleDuration: 'string',
  rippleRadius: 'number',
  rippleUnbound: 'boolean',
};

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Ripple {
  constructor(element, options) {
    this._element = element;
    this._options = this._getConfig(options);

    if (this._element) {
      Data.setData(element, DATA_KEY, this);
      Manipulator.addClass(this._element, CLASSNAME_RIPPLE);
    }

    this._clickHandler = this._createRipple.bind(this);
    this._rippleTimer = null;
    this._isMinWidthSet = false;

    this.init();
  }

  // Getters

  static get NAME() {
    return NAME;
  }

  // Public

  init() {
    this._addClickEvent(this._element);
  }

  dispose() {
    Data.removeData(this._element, DATA_KEY);
    EventHandler.off(this._element, 'click', this._clickHandler);
    this._element = null;
    this._options = null;
  }

  // Private

  _autoInit(event) {
    SELECTOR_COMPONENT.forEach((selector) => {
      const target = SelectorEngine.closest(event.target, selector);
      if (target) {
        this._element = SelectorEngine.closest(event.target, selector);
      }
    });

    if (!this._element.style.minWidth) {
      Manipulator.style(this._element, { 'min-width': `${this._element.offsetWidth}px` });
      this._isMinWidthSet = true;
    }

    Manipulator.addClass(this._element, CLASSNAME_RIPPLE);
    this._options = this._getConfig();
    this._createRipple(event);
  }

  _addClickEvent(target) {
    EventHandler.on(target, 'mousedown', this._clickHandler);
  }

  _createRipple(event) {
    if (!Manipulator.hasClass(this._element, CLASSNAME_RIPPLE)) {
      Manipulator.addClass(this._element, CLASSNAME_RIPPLE);
    }

    const { layerX, layerY } = event;
    const offsetX = layerX;
    const offsetY = layerY;
    const height = this._element.offsetHeight;
    const width = this._element.offsetWidth;
    const duration = this._durationToMsNumber(this._options.rippleDuration);
    const diameterOptions = {
      offsetX: this._options.rippleCentered ? height / 2 : offsetX,
      offsetY: this._options.rippleCentered ? width / 2 : offsetY,
      height,
      width,
    };
    const diameter = this._getDiameter(diameterOptions);
    const radiusValue = this._options.rippleRadius || diameter / 2;

    const opacity = {
      delay: duration * TRANSITION_BREAK_OPACITY,
      duration: duration - duration * TRANSITION_BREAK_OPACITY,
    };

    const styles = {
      left: this._options.rippleCentered
        ? `${width / 2 - radiusValue}px`
        : `${offsetX - radiusValue}px`,
      top: this._options.rippleCentered
        ? `${height / 2 - radiusValue}px`
        : `${offsetY - radiusValue}px`,
      height: `${this._options.rippleRadius * 2 || diameter}px`,
      width: `${this._options.rippleRadius * 2 || diameter}px`,
      transitionDelay: `0s, ${opacity.delay}ms`,
      transitionDuration: `${duration}ms, ${opacity.duration}ms`,
    };

    const rippleHTML = element('div');

    this._createHTMLRipple({ wrapper: this._element, ripple: rippleHTML, styles });
    this._removeHTMLRipple({ ripple: rippleHTML, duration });
  }

  _createHTMLRipple({ wrapper, ripple, styles }) {
    Object.keys(styles).forEach((property) => (ripple.style[property] = styles[property]));
    ripple.classList.add(CLASSNAME_RIPPLE_WAVE);
    if (this._options.rippleColor !== '') {
      this._removeOldColorClasses(wrapper);
      this._addColor(ripple, wrapper);
    }

    this._toggleUnbound(wrapper);
    this._appendRipple(ripple, wrapper);
  }

  _removeHTMLRipple({ ripple, duration }) {
    if (this._rippleTimer) {
      clearTimeout(this._rippleTimer);
      this._rippleTimer = null;
    }
    this._rippleTimer = setTimeout(() => {
      if (ripple) {
        ripple.remove();
        if (this._element) {
          SelectorEngine.find(`.${CLASSNAME_RIPPLE_WAVE}`, this._element).forEach((rippleEl) => {
            rippleEl.remove();
          });
          if (this._isMinWidthSet) {
            Manipulator.style(this._element, { 'min-width': '' });
            this._isMinWidthSet = false;
          }
          Manipulator.removeClass(this._element, CLASSNAME_RIPPLE);
        }
      }
    }, duration);
  }

  _durationToMsNumber(time) {
    return Number(time.replace('ms', '').replace('s', '000'));
  }

  _getConfig(config = {}) {
    const dataAttributes = Manipulator.getDataAttributes(this._element);

    config = {
      ...Default,
      ...dataAttributes,
      ...config,
    };

    typeCheckConfig(NAME, config, DefaultType);
    return config;
  }

  _getDiameter({ offsetX, offsetY, height, width }) {
    const top = offsetY <= height / 2;
    const left = offsetX <= width / 2;
    const pythagorean = (sideA, sideB) => Math.sqrt(sideA ** 2 + sideB ** 2);

    const positionCenter = offsetY === height / 2 && offsetX === width / 2;
    // mouse position on the quadrants of the coordinate system
    const quadrant = {
      first: top === true && left === false,
      second: top === true && left === true,
      third: top === false && left === true,
      fourth: top === false && left === false,
    };

    const getCorner = {
      topLeft: pythagorean(offsetX, offsetY),
      topRight: pythagorean(width - offsetX, offsetY),
      bottomLeft: pythagorean(offsetX, height - offsetY),
      bottomRight: pythagorean(width - offsetX, height - offsetY),
    };

    let diameter = 0;

    if (positionCenter || quadrant.fourth) {
      diameter = getCorner.topLeft;
    } else if (quadrant.third) {
      diameter = getCorner.topRight;
    } else if (quadrant.second) {
      diameter = getCorner.bottomRight;
    } else if (quadrant.first) {
      diameter = getCorner.bottomLeft;
    }
    return diameter * 2;
  }

  _appendRipple(target, parent) {
    const FIX_ADD_RIPPLE_EFFECT = 50; // delay for active animations
    parent.appendChild(target);
    setTimeout(() => {
      Manipulator.addClass(target, 'active');
    }, FIX_ADD_RIPPLE_EFFECT);
  }

  _toggleUnbound(target) {
    if (this._options.rippleUnbound === true) {
      Manipulator.addClass(target, CLASSNAME_UNBOUND);
    } else {
      target.classList.remove(CLASSNAME_UNBOUND);
    }
  }

  _addColor(target, parent) {
    const IS_BOOTSTRAP_COLOR = BOOTSTRAP_COLORS.find(
      (color) => color === this._options.rippleColor.toLowerCase()
    );

    if (IS_BOOTSTRAP_COLOR) {
      Manipulator.addClass(
        parent,
        `${CLASSNAME_RIPPLE}-${this._options.rippleColor.toLowerCase()}`
      );
    } else {
      const rgbValue = this._colorToRGB(this._options.rippleColor).join(',');
      const gradientImage = GRADIENT.split('{{color}}').join(`${rgbValue}`);
      target.style.backgroundImage = `radial-gradient(circle, ${gradientImage})`;
    }
  }

  _removeOldColorClasses(target) {
    const REGEXP_CLASS_COLOR = new RegExp(`${CLASSNAME_RIPPLE}-[a-z]+`, 'gi');
    const PARENT_CLASSS_COLOR = target.classList.value.match(REGEXP_CLASS_COLOR) || [];
    PARENT_CLASSS_COLOR.forEach((className) => {
      target.classList.remove(className);
    });
  }

  _colorToRGB(color) {
    function hexToRgb(color) {
      const HEX_COLOR_LENGTH = 7;
      const IS_SHORT_HEX = color.length < HEX_COLOR_LENGTH;
      if (IS_SHORT_HEX) {
        color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
      }
      return [
        parseInt(color.substr(1, 2), 16),
        parseInt(color.substr(3, 2), 16),
        parseInt(color.substr(5, 2), 16),
      ];
    }

    function namedColorsToRgba(color) {
      const tempElem = document.body.appendChild(document.createElement('fictum'));
      const flag = 'rgb(1, 2, 3)';
      tempElem.style.color = flag;
      if (tempElem.style.color !== flag) {
        return DEFAULT_RIPPLE_COLOR;
      }
      tempElem.style.color = color;
      if (tempElem.style.color === flag || tempElem.style.color === '') {
        return DEFAULT_RIPPLE_COLOR;
      } // color parse failed
      color = getComputedStyle(tempElem).color;
      document.body.removeChild(tempElem);
      return color;
    }

    function rgbaToRgb(color) {
      color = color.match(/[.\d]+/g).map((a) => +Number(a));
      color.length = 3;
      return color;
    }

    if (color.toLowerCase() === 'transparent') {
      return DEFAULT_RIPPLE_COLOR;
    }
    if (color[0] === '#') {
      return hexToRgb(color);
    }
    if (color.indexOf('rgb') === -1) {
      color = namedColorsToRgba(color);
    }
    if (color.indexOf('rgb') === 0) {
      return rgbaToRgb(color);
    }

    return DEFAULT_RIPPLE_COLOR;
  }

  // Static
  static autoInitial(instance) {
    return function (event) {
      instance._autoInit(event);
    };
  }

  static jQueryInterface(options) {
    return this.each(function () {
      const data = Data.getData(this, DATA_KEY);
      if (!data) {
        return new Ripple(this, options);
      }

      return null;
    });
  }

  static getInstance(element) {
    return Data.getData(element, DATA_KEY);
  }

  static getOrCreateInstance(element, config = {}) {
    return (
      this.getInstance(element) || new this(element, typeof config === 'object' ? config : null)
    );
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation - auto initialization
 * ------------------------------------------------------------------------
 */

SELECTOR_COMPONENT.forEach((selector) => {
  EventHandler.one(document, 'mousedown', selector, Ripple.autoInitial(new Ripple()));
});

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .ripple to jQuery only if jQuery is present
 */

onDOMContentLoaded(() => {
  const $ = getjQuery();

  if ($) {
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    $.fn[NAME] = Ripple.jQueryInterface;
    $.fn[NAME].Constructor = Ripple;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Ripple.jQueryInterface;
    };
  }
});

export default Ripple;
