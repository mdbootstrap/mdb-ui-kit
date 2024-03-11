var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const mapData = (() => {
  const storeData = {};
  let id = 1;
  return {
    set(element2, key, data) {
      if (typeof element2[key] === "undefined") {
        element2[key] = {
          key,
          id
        };
        id++;
      }
      storeData[element2[key].id] = data;
    },
    get(element2, key) {
      if (!element2 || typeof element2[key] === "undefined") {
        return null;
      }
      const keyProperties = element2[key];
      if (keyProperties.key === key) {
        return storeData[keyProperties.id];
      }
      return null;
    },
    delete(element2, key) {
      if (typeof element2[key] === "undefined") {
        return;
      }
      const keyProperties = element2[key];
      if (keyProperties.key === key) {
        delete storeData[keyProperties.id];
        delete element2[key];
      }
    }
  };
})();
const Data$1 = {
  setData(instance, key, data) {
    mapData.set(instance, key, data);
  },
  getData(instance, key) {
    return mapData.get(instance, key);
  },
  removeData(instance, key) {
    mapData.delete(instance, key);
  }
};
const toType$1 = (obj) => {
  if (obj === null || obj === void 0) {
    return `${obj}`;
  }
  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
};
const getSelector$1 = (element2) => {
  let selector = element2.getAttribute("data-mdb-target");
  if (!selector || selector === "#") {
    const hrefAttr = element2.getAttribute("href");
    selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
  }
  return selector;
};
const getSelectorFromElement = (element2) => {
  const selector = getSelector$1(element2);
  if (selector) {
    return document.querySelector(selector) ? selector : null;
  }
  return null;
};
const getElementFromSelector = (element2) => {
  const selector = getSelector$1(element2);
  return selector ? document.querySelector(selector) : null;
};
const isElement$2 = (obj) => {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (typeof obj.jquery !== "undefined") {
    obj = obj[0];
  }
  return typeof obj.nodeType !== "undefined";
};
const getElement$1 = (obj) => {
  if (isElement$2(obj)) {
    return obj.jquery ? obj[0] : obj;
  }
  if (typeof obj === "string" && obj.length > 0) {
    return document.querySelector(obj);
  }
  return null;
};
const typeCheckConfig = (componentName, config, configTypes) => {
  Object.keys(configTypes).forEach((property) => {
    const expectedTypes = configTypes[property];
    const value = config[property];
    const valueType = value && isElement$2(value) ? "element" : toType$1(value);
    if (!new RegExp(expectedTypes).test(valueType)) {
      throw new Error(
        `${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`
      );
    }
  });
};
const isVisible$1 = (element2) => {
  if (!element2) {
    return false;
  }
  if (element2.style && element2.parentNode && element2.parentNode.style) {
    const elementStyle = getComputedStyle(element2);
    const parentNodeStyle = getComputedStyle(element2.parentNode);
    return elementStyle.display !== "none" && parentNodeStyle.display !== "none" && elementStyle.visibility !== "hidden";
  }
  return false;
};
const isDisabled$1 = (element2) => {
  if (!element2 || element2.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }
  if (element2.classList.contains("disabled")) {
    return true;
  }
  if (typeof element2.disabled !== "undefined") {
    return element2.disabled;
  }
  return element2.hasAttribute("disabled") && element2.getAttribute("disabled") !== "false";
};
const getjQuery$1 = () => {
  const { jQuery } = window;
  if (jQuery && !document.body.hasAttribute("data-mdb-no-jquery")) {
    return jQuery;
  }
  return null;
};
const onDOMContentLoaded = (callback) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
};
document.documentElement.dir === "rtl";
const element = (tag) => {
  return document.createElement(tag);
};
const defineJQueryPlugin = (plugin) => {
  onDOMContentLoaded(() => {
    const $2 = getjQuery$1();
    if ($2) {
      const name = plugin.NAME;
      const JQUERY_NO_CONFLICT = $2.fn[name];
      $2.fn[name] = plugin.jQueryInterface;
      $2.fn[name].Constructor = plugin;
      $2.fn[name].noConflict = () => {
        $2.fn[name] = JQUERY_NO_CONFLICT;
        return plugin.jQueryInterface;
      };
    }
  });
};
const $ = getjQuery$1();
const namespaceRegex$1 = /[^.]*(?=\..*)\.|.*/;
const stripNameRegex$1 = /\..*/;
const stripUidRegex$1 = /::\d+$/;
const eventRegistry$1 = {};
let uidEvent$1 = 1;
const customEvents$1 = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
};
const nativeEvents$1 = [
  "click",
  "dblclick",
  "mouseup",
  "mousedown",
  "contextmenu",
  "mousewheel",
  "DOMMouseScroll",
  "mouseover",
  "mouseout",
  "mousemove",
  "selectstart",
  "selectend",
  "keydown",
  "keypress",
  "keyup",
  "orientationchange",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  "pointerdown",
  "pointermove",
  "pointerup",
  "pointerleave",
  "pointercancel",
  "gesturestart",
  "gesturechange",
  "gestureend",
  "focus",
  "blur",
  "change",
  "reset",
  "select",
  "submit",
  "focusin",
  "focusout",
  "load",
  "unload",
  "beforeunload",
  "resize",
  "move",
  "DOMContentLoaded",
  "readystatechange",
  "error",
  "abort",
  "scroll"
];
function getUidEvent(element2, uid) {
  return uid && `${uid}::${uidEvent$1++}` || element2.uidEvent || uidEvent$1++;
}
function getEvent(element2) {
  const uid = getUidEvent(element2);
  element2.uidEvent = uid;
  eventRegistry$1[uid] = eventRegistry$1[uid] || {};
  return eventRegistry$1[uid];
}
function bootstrapHandler$1(element2, fn2) {
  return function handler(event) {
    event.delegateTarget = element2;
    if (handler.oneOff) {
      EventHandler$1.off(element2, event.type, fn2);
    }
    return fn2.apply(element2, [event]);
  };
}
function bootstrapDelegationHandler$1(element2, selector, fn2) {
  return function handler(event) {
    const domElements = element2.querySelectorAll(selector);
    for (let { target } = event; target && target !== this; target = target.parentNode) {
      for (let i = domElements.length; i--; "") {
        if (domElements[i] === target) {
          event.delegateTarget = target;
          if (handler.oneOff) {
            EventHandler$1.off(element2, event.type, fn2);
          }
          return fn2.apply(target, [event]);
        }
      }
    }
    return null;
  };
}
function findHandler$1(events, handler, delegationSelector = null) {
  const uidEventList = Object.keys(events);
  for (let i = 0, len = uidEventList.length; i < len; i++) {
    const event = events[uidEventList[i]];
    if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
      return event;
    }
  }
  return null;
}
function normalizeParams(originalTypeEvent, handler, delegationFn) {
  const delegation = typeof handler === "string";
  const originalHandler = delegation ? delegationFn : handler;
  let typeEvent = originalTypeEvent.replace(stripNameRegex$1, "");
  const custom = customEvents$1[typeEvent];
  if (custom) {
    typeEvent = custom;
  }
  const isNative = nativeEvents$1.indexOf(typeEvent) > -1;
  if (!isNative) {
    typeEvent = originalTypeEvent;
  }
  return [delegation, originalHandler, typeEvent];
}
function addHandler$1(element2, originalTypeEvent, handler, delegationFn, oneOff) {
  if (typeof originalTypeEvent !== "string" || !element2) {
    return;
  }
  if (!handler) {
    handler = delegationFn;
    delegationFn = null;
  }
  const [delegation, originalHandler, typeEvent] = normalizeParams(
    originalTypeEvent,
    handler,
    delegationFn
  );
  const events = getEvent(element2);
  const handlers = events[typeEvent] || (events[typeEvent] = {});
  const previousFn = findHandler$1(handlers, originalHandler, delegation ? handler : null);
  if (previousFn) {
    previousFn.oneOff = previousFn.oneOff && oneOff;
    return;
  }
  const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex$1, ""));
  const fn2 = delegation ? bootstrapDelegationHandler$1(element2, handler, delegationFn) : bootstrapHandler$1(element2, handler);
  fn2.delegationSelector = delegation ? handler : null;
  fn2.originalHandler = originalHandler;
  fn2.oneOff = oneOff;
  fn2.uidEvent = uid;
  handlers[uid] = fn2;
  element2.addEventListener(typeEvent, fn2, delegation);
}
function removeHandler$1(element2, events, typeEvent, handler, delegationSelector) {
  const fn2 = findHandler$1(events[typeEvent], handler, delegationSelector);
  if (!fn2) {
    return;
  }
  element2.removeEventListener(typeEvent, fn2, Boolean(delegationSelector));
  delete events[typeEvent][fn2.uidEvent];
}
function removeNamespacedHandlers$1(element2, events, typeEvent, namespace) {
  const storeElementEvent = events[typeEvent] || {};
  Object.keys(storeElementEvent).forEach((handlerKey) => {
    if (handlerKey.indexOf(namespace) > -1) {
      const event = storeElementEvent[handlerKey];
      removeHandler$1(element2, events, typeEvent, event.originalHandler, event.delegationSelector);
    }
  });
}
const EventHandler$1 = {
  on(element2, event, handler, delegationFn) {
    addHandler$1(element2, event, handler, delegationFn, false);
  },
  one(element2, event, handler, delegationFn) {
    addHandler$1(element2, event, handler, delegationFn, true);
  },
  extend(element2, events, componentName) {
    events.forEach((event) => {
      EventHandler$1.on(element2, `${event.name}.bs.${componentName}`, (e) => {
        const eventParameters = {};
        if (event.parametersToCopy) {
          event.parametersToCopy.forEach((param) => {
            eventParameters[param] = e[param];
          });
        }
        const mdbEvent = EventHandler$1.trigger(
          element2,
          `${event.name}.mdb.${componentName}`,
          eventParameters
        );
        if (mdbEvent.defaultPrevented) {
          e.preventDefault();
        }
      });
    });
  },
  off(element2, originalTypeEvent, handler, delegationFn) {
    if (typeof originalTypeEvent !== "string" || !element2) {
      return;
    }
    const [delegation, originalHandler, typeEvent] = normalizeParams(
      originalTypeEvent,
      handler,
      delegationFn
    );
    const inNamespace = typeEvent !== originalTypeEvent;
    const events = getEvent(element2);
    const isNamespace = originalTypeEvent.charAt(0) === ".";
    if (typeof originalHandler !== "undefined") {
      if (!events || !events[typeEvent]) {
        return;
      }
      removeHandler$1(element2, events, typeEvent, originalHandler, delegation ? handler : null);
      return;
    }
    if (isNamespace) {
      Object.keys(events).forEach((elementEvent) => {
        removeNamespacedHandlers$1(element2, events, elementEvent, originalTypeEvent.slice(1));
      });
    }
    const storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach((keyHandlers) => {
      const handlerKey = keyHandlers.replace(stripUidRegex$1, "");
      if (!inNamespace || originalTypeEvent.indexOf(handlerKey) > -1) {
        const event = storeElementEvent[keyHandlers];
        removeHandler$1(element2, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  },
  trigger(element2, event, args) {
    if (typeof event !== "string" || !element2) {
      return null;
    }
    const typeEvent = event.replace(stripNameRegex$1, "");
    const inNamespace = event !== typeEvent;
    const isNative = nativeEvents$1.indexOf(typeEvent) > -1;
    let jQueryEvent;
    let bubbles = true;
    let nativeDispatch = true;
    let defaultPrevented = false;
    let evt = null;
    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args);
      $(element2).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }
    if (isNative) {
      evt = document.createEvent("HTMLEvents");
      evt.initEvent(typeEvent, bubbles, true);
    } else {
      evt = new CustomEvent(event, {
        bubbles,
        cancelable: true
      });
    }
    if (typeof args !== "undefined") {
      Object.keys(args).forEach((key) => {
        Object.defineProperty(evt, key, {
          get() {
            return args[key];
          }
        });
      });
    }
    if (defaultPrevented) {
      evt.preventDefault();
    }
    if (nativeDispatch) {
      element2.dispatchEvent(evt);
    }
    if (evt.defaultPrevented && typeof jQueryEvent !== "undefined") {
      jQueryEvent.preventDefault();
    }
    return evt;
  }
};
function normalizeData$1(val) {
  if (val === "true") {
    return true;
  }
  if (val === "false") {
    return false;
  }
  if (val === Number(val).toString()) {
    return Number(val);
  }
  if (val === "" || val === "null") {
    return null;
  }
  return val;
}
function normalizeDataKey$1(key) {
  return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
}
const Manipulator$1 = {
  setDataAttribute(element2, key, value) {
    element2.setAttribute(`data-mdb-${normalizeDataKey$1(key)}`, value);
  },
  removeDataAttribute(element2, key) {
    element2.removeAttribute(`data-mdb-${normalizeDataKey$1(key)}`);
  },
  getDataAttributes(element2) {
    if (!element2) {
      return {};
    }
    const attributes = {
      ...element2.dataset
    };
    Object.keys(attributes).filter((key) => key.startsWith("mdb")).forEach((key) => {
      let pureKey = key.replace(/^mdb/, "");
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
      attributes[pureKey] = normalizeData$1(attributes[key]);
    });
    return attributes;
  },
  getDataAttribute(element2, key) {
    return normalizeData$1(element2.getAttribute(`data-mdb-${normalizeDataKey$1(key)}`));
  },
  offset(element2) {
    const rect = element2.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };
  },
  position(element2) {
    return {
      top: element2.offsetTop,
      left: element2.offsetLeft
    };
  },
  style(element2, style) {
    Object.assign(element2.style, style);
  },
  toggleClass(element2, className) {
    if (!element2) {
      return;
    }
    if (element2.classList.contains(className)) {
      element2.classList.remove(className);
    } else {
      element2.classList.add(className);
    }
  },
  addClass(element2, className) {
    if (element2.classList.contains(className))
      return;
    element2.classList.add(className);
  },
  addStyle(element2, style) {
    Object.keys(style).forEach((property) => {
      element2.style[property] = style[property];
    });
  },
  removeClass(element2, className) {
    if (!element2.classList.contains(className))
      return;
    element2.classList.remove(className);
  },
  hasClass(element2, className) {
    return element2.classList.contains(className);
  }
};
const NODE_TEXT = 3;
const SelectorEngine$1 = {
  closest(element2, selector) {
    return element2.closest(selector);
  },
  matches(element2, selector) {
    return element2.matches(selector);
  },
  find(selector, element2 = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(element2, selector));
  },
  findOne(selector, element2 = document.documentElement) {
    return Element.prototype.querySelector.call(element2, selector);
  },
  children(element2, selector) {
    const children = [].concat(...element2.children);
    return children.filter((child) => child.matches(selector));
  },
  parents(element2, selector) {
    const parents = [];
    let ancestor = element2.parentNode;
    while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
      if (this.matches(ancestor, selector)) {
        parents.push(ancestor);
      }
      ancestor = ancestor.parentNode;
    }
    return parents;
  },
  prev(element2, selector) {
    let previous = element2.previousElementSibling;
    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }
      previous = previous.previousElementSibling;
    }
    return [];
  },
  next(element2, selector) {
    let next = element2.nextElementSibling;
    while (next) {
      if (this.matches(next, selector)) {
        return [next];
      }
      next = next.nextElementSibling;
    }
    return [];
  }
};
const elementMap = /* @__PURE__ */ new Map();
const Data = {
  set(element2, key, instance) {
    if (!elementMap.has(element2)) {
      elementMap.set(element2, /* @__PURE__ */ new Map());
    }
    const instanceMap = elementMap.get(element2);
    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      console.error(
        `Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`
      );
      return;
    }
    instanceMap.set(key, instance);
  },
  get(element2, key) {
    if (elementMap.has(element2)) {
      return elementMap.get(element2).get(key) || null;
    }
    return null;
  },
  remove(element2, key) {
    if (!elementMap.has(element2)) {
      return;
    }
    const instanceMap = elementMap.get(element2);
    instanceMap.delete(key);
    if (instanceMap.size === 0) {
      elementMap.delete(element2);
    }
  }
};
const MAX_UID = 1e6;
const MILLISECONDS_MULTIPLIER = 1e3;
const TRANSITION_END = "transitionend";
const parseSelector = (selector) => {
  if (selector && window.CSS && window.CSS.escape) {
    selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
  }
  return selector;
};
const toType = (object) => {
  if (object === null || object === void 0) {
    return `${object}`;
  }
  return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
};
const getUID = (prefix) => {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));
  return prefix;
};
const getTransitionDurationFromElement = (element2) => {
  if (!element2) {
    return 0;
  }
  let { transitionDuration, transitionDelay } = window.getComputedStyle(element2);
  const floatTransitionDuration = Number.parseFloat(transitionDuration);
  const floatTransitionDelay = Number.parseFloat(transitionDelay);
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  }
  transitionDuration = transitionDuration.split(",")[0];
  transitionDelay = transitionDelay.split(",")[0];
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};
const triggerTransitionEnd = (element2) => {
  element2.dispatchEvent(new Event(TRANSITION_END));
};
const isElement$1 = (object) => {
  if (!object || typeof object !== "object") {
    return false;
  }
  if (typeof object.jquery !== "undefined") {
    object = object[0];
  }
  return typeof object.nodeType !== "undefined";
};
const getElement = (object) => {
  if (isElement$1(object)) {
    return object.jquery ? object[0] : object;
  }
  if (typeof object === "string" && object.length > 0) {
    return document.querySelector(parseSelector(object));
  }
  return null;
};
const isVisible = (element2) => {
  if (!isElement$1(element2) || element2.getClientRects().length === 0) {
    return false;
  }
  const elementIsVisible = getComputedStyle(element2).getPropertyValue("visibility") === "visible";
  const closedDetails = element2.closest("details:not([open])");
  if (!closedDetails) {
    return elementIsVisible;
  }
  if (closedDetails !== element2) {
    const summary = element2.closest("summary");
    if (summary && summary.parentNode !== closedDetails) {
      return false;
    }
    if (summary === null) {
      return false;
    }
  }
  return elementIsVisible;
};
const isDisabled = (element2) => {
  if (!element2 || element2.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }
  if (element2.classList.contains("disabled")) {
    return true;
  }
  if (typeof element2.disabled !== "undefined") {
    return element2.disabled;
  }
  return element2.hasAttribute("disabled") && element2.getAttribute("disabled") !== "false";
};
const findShadowRoot = (element2) => {
  if (!document.documentElement.attachShadow) {
    return null;
  }
  if (typeof element2.getRootNode === "function") {
    const root = element2.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }
  if (element2 instanceof ShadowRoot) {
    return element2;
  }
  if (!element2.parentNode) {
    return null;
  }
  return findShadowRoot(element2.parentNode);
};
const noop = () => {
};
const reflow = (element2) => {
  element2.offsetHeight;
};
const getjQuery = () => {
  if (window.jQuery && !document.body.hasAttribute("data-mdb-no-jquery")) {
    return window.jQuery;
  }
  return null;
};
const isRTL = () => document.documentElement.dir === "rtl";
const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
  return typeof possibleCallback === "function" ? possibleCallback(...args) : defaultValue;
};
const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
  if (!waitForTransition) {
    execute(callback);
    return;
  }
  const durationPadding = 5;
  const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
  let called = false;
  const handler = ({ target }) => {
    if (target !== transitionElement) {
      return;
    }
    called = true;
    transitionElement.removeEventListener(TRANSITION_END, handler);
    execute(callback);
  };
  transitionElement.addEventListener(TRANSITION_END, handler);
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(transitionElement);
    }
  }, emulatedDuration);
};
const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
  const listLength = list.length;
  let index = list.indexOf(activeElement);
  if (index === -1) {
    return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
  }
  index += shouldGetNext ? 1 : -1;
  if (isCycleAllowed) {
    index = (index + listLength) % listLength;
  }
  return list[Math.max(0, Math.min(index, listLength - 1))];
};
const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
const stripNameRegex = /\..*/;
const stripUidRegex = /::\d+$/;
const eventRegistry = {};
let uidEvent = 1;
const customEvents = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
};
const nativeEvents = /* @__PURE__ */ new Set([
  "click",
  "dblclick",
  "mouseup",
  "mousedown",
  "contextmenu",
  "mousewheel",
  "DOMMouseScroll",
  "mouseover",
  "mouseout",
  "mousemove",
  "selectstart",
  "selectend",
  "keydown",
  "keypress",
  "keyup",
  "orientationchange",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  "pointerdown",
  "pointermove",
  "pointerup",
  "pointerleave",
  "pointercancel",
  "gesturestart",
  "gesturechange",
  "gestureend",
  "focus",
  "blur",
  "change",
  "reset",
  "select",
  "submit",
  "focusin",
  "focusout",
  "load",
  "unload",
  "beforeunload",
  "resize",
  "move",
  "DOMContentLoaded",
  "readystatechange",
  "error",
  "abort",
  "scroll"
]);
function makeEventUid(element2, uid) {
  return uid && `${uid}::${uidEvent++}` || element2.uidEvent || uidEvent++;
}
function getElementEvents(element2) {
  const uid = makeEventUid(element2);
  element2.uidEvent = uid;
  eventRegistry[uid] = eventRegistry[uid] || {};
  return eventRegistry[uid];
}
function bootstrapHandler(element2, fn2) {
  return function handler(event) {
    hydrateObj(event, { delegateTarget: element2 });
    if (handler.oneOff) {
      EventHandler.off(element2, event.type, fn2);
    }
    return fn2.apply(element2, [event]);
  };
}
function bootstrapDelegationHandler(element2, selector, fn2) {
  return function handler(event) {
    const domElements = element2.querySelectorAll(selector);
    for (let { target } = event; target && target !== this; target = target.parentNode) {
      for (const domElement of domElements) {
        if (domElement !== target) {
          continue;
        }
        hydrateObj(event, { delegateTarget: target });
        if (handler.oneOff) {
          EventHandler.off(element2, event.type, selector, fn2);
        }
        return fn2.apply(target, [event]);
      }
    }
  };
}
function findHandler(events, callable, delegationSelector = null) {
  return Object.values(events).find(
    (event) => event.callable === callable && event.delegationSelector === delegationSelector
  );
}
function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
  const isDelegated = typeof handler === "string";
  const callable = isDelegated ? delegationFunction : handler || delegationFunction;
  let typeEvent = getTypeEvent(originalTypeEvent);
  if (!nativeEvents.has(typeEvent)) {
    typeEvent = originalTypeEvent;
  }
  return [isDelegated, callable, typeEvent];
}
function addHandler(element2, originalTypeEvent, handler, delegationFunction, oneOff) {
  if (typeof originalTypeEvent !== "string" || !element2) {
    return;
  }
  let [isDelegated, callable, typeEvent] = normalizeParameters(
    originalTypeEvent,
    handler,
    delegationFunction
  );
  if (originalTypeEvent in customEvents) {
    const wrapFunction = (fn3) => {
      return function(event) {
        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
          return fn3.call(this, event);
        }
      };
    };
    callable = wrapFunction(callable);
  }
  const events = getElementEvents(element2);
  const handlers = events[typeEvent] || (events[typeEvent] = {});
  const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
  if (previousFunction) {
    previousFunction.oneOff = previousFunction.oneOff && oneOff;
    return;
  }
  const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
  const fn2 = isDelegated ? bootstrapDelegationHandler(element2, handler, callable) : bootstrapHandler(element2, callable);
  fn2.delegationSelector = isDelegated ? handler : null;
  fn2.callable = callable;
  fn2.oneOff = oneOff;
  fn2.uidEvent = uid;
  handlers[uid] = fn2;
  element2.addEventListener(typeEvent, fn2, isDelegated);
}
function removeHandler(element2, events, typeEvent, handler, delegationSelector) {
  const fn2 = findHandler(events[typeEvent], handler, delegationSelector);
  if (!fn2) {
    return;
  }
  element2.removeEventListener(typeEvent, fn2, Boolean(delegationSelector));
  delete events[typeEvent][fn2.uidEvent];
}
function removeNamespacedHandlers(element2, events, typeEvent, namespace) {
  const storeElementEvent = events[typeEvent] || {};
  for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
    if (handlerKey.includes(namespace)) {
      removeHandler(element2, events, typeEvent, event.callable, event.delegationSelector);
    }
  }
}
function getTypeEvent(event) {
  event = event.replace(stripNameRegex, "");
  return customEvents[event] || event;
}
const EventHandler = {
  on(element2, event, handler, delegationFunction) {
    addHandler(element2, event, handler, delegationFunction, false);
  },
  one(element2, event, handler, delegationFunction) {
    addHandler(element2, event, handler, delegationFunction, true);
  },
  off(element2, originalTypeEvent, handler, delegationFunction) {
    if (typeof originalTypeEvent !== "string" || !element2) {
      return;
    }
    const [isDelegated, callable, typeEvent] = normalizeParameters(
      originalTypeEvent,
      handler,
      delegationFunction
    );
    const inNamespace = typeEvent !== originalTypeEvent;
    const events = getElementEvents(element2);
    const storeElementEvent = events[typeEvent] || {};
    const isNamespace = originalTypeEvent.startsWith(".");
    if (typeof callable !== "undefined") {
      if (!Object.keys(storeElementEvent).length) {
        return;
      }
      removeHandler(element2, events, typeEvent, callable, isDelegated ? handler : null);
      return;
    }
    if (isNamespace) {
      for (const elementEvent of Object.keys(events)) {
        removeNamespacedHandlers(element2, events, elementEvent, originalTypeEvent.slice(1));
      }
    }
    for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
      const handlerKey = keyHandlers.replace(stripUidRegex, "");
      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        removeHandler(element2, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  },
  trigger(element2, event, args) {
    if (typeof event !== "string" || !element2) {
      return null;
    }
    const $2 = getjQuery();
    const typeEvent = getTypeEvent(event);
    const inNamespace = event !== typeEvent;
    let jQueryEvent = null;
    let bubbles = true;
    let nativeDispatch = true;
    let defaultPrevented = false;
    if (inNamespace && $2) {
      jQueryEvent = $2.Event(event, args);
      $2(element2).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }
    const evt = hydrateObj(new Event(event, { bubbles, cancelable: true }), args);
    if (defaultPrevented) {
      evt.preventDefault();
    }
    if (nativeDispatch) {
      element2.dispatchEvent(evt);
    }
    if (evt.defaultPrevented && jQueryEvent) {
      jQueryEvent.preventDefault();
    }
    return evt;
  }
};
function hydrateObj(obj, meta = {}) {
  for (const [key, value] of Object.entries(meta)) {
    try {
      obj[key] = value;
    } catch {
      Object.defineProperty(obj, key, {
        configurable: true,
        get() {
          return value;
        }
      });
    }
  }
  return obj;
}
function normalizeData(value) {
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  if (value === Number(value).toString()) {
    return Number(value);
  }
  if (value === "" || value === "null") {
    return null;
  }
  if (typeof value !== "string") {
    return value;
  }
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return value;
  }
}
function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
}
const Manipulator = {
  setDataAttribute(element2, key, value) {
    element2.setAttribute(`data-mdb-${normalizeDataKey(key)}`, value);
  },
  removeDataAttribute(element2, key) {
    element2.removeAttribute(`data-mdb-${normalizeDataKey(key)}`);
  },
  getDataAttributes(element2) {
    if (!element2) {
      return {};
    }
    const attributes = {};
    const mdbKeys = Object.keys(element2.dataset).filter(
      (key) => key.startsWith("mdb") && !key.startsWith("mdbConfig")
    );
    for (const key of mdbKeys) {
      let pureKey = key.replace(/^mdb/, "");
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
      attributes[pureKey] = normalizeData(element2.dataset[key]);
    }
    return attributes;
  },
  getDataAttribute(element2, key) {
    return normalizeData(element2.getAttribute(`data-mdb-${normalizeDataKey(key)}`));
  }
};
class Config {
  // Getters
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  _getConfig(config) {
    config = this._mergeConfigObj(config);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }
  _configAfterMerge(config) {
    return config;
  }
  _mergeConfigObj(config, element2) {
    const jsonConfig = isElement$1(element2) ? Manipulator.getDataAttribute(element2, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof jsonConfig === "object" ? jsonConfig : {},
      ...isElement$1(element2) ? Manipulator.getDataAttributes(element2) : {},
      ...typeof config === "object" ? config : {}
    };
  }
  _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
    for (const [property, expectedTypes] of Object.entries(configTypes)) {
      const value = config[property];
      const valueType = isElement$1(value) ? "element" : toType(value);
      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`
        );
      }
    }
  }
}
const VERSION = "5.3.2";
let BaseComponent$1 = class BaseComponent extends Config {
  constructor(element2, config) {
    super();
    element2 = getElement(element2);
    if (!element2) {
      return;
    }
    this._element = element2;
    this._config = this._getConfig(config);
    Data.set(this._element, this.constructor.DATA_KEY, this);
  }
  // Public
  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY);
    EventHandler.off(this._element, this.constructor.EVENT_KEY);
    for (const propertyName of Object.getOwnPropertyNames(this)) {
      this[propertyName] = null;
    }
  }
  _queueCallback(callback, element2, isAnimated = true) {
    executeAfterTransition(callback, element2, isAnimated);
  }
  _getConfig(config) {
    config = this._mergeConfigObj(config, this._element);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }
  // Static
  static getInstance(element2) {
    return Data.get(getElement(element2), this.DATA_KEY);
  }
  static getOrCreateInstance(element2, config = {}) {
    return this.getInstance(element2) || new this(element2, typeof config === "object" ? config : null);
  }
  static get VERSION() {
    return VERSION;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(name) {
    return `${name}${this.EVENT_KEY}`;
  }
};
const NAME$t = "button";
const CLASS_NAME_ACTIVE$5 = "active";
let Button$1 = class Button extends BaseComponent$1 {
  // Getters
  static get NAME() {
    return NAME$t;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(CLASS_NAME_ACTIVE$5));
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Button.getOrCreateInstance(this);
      if (config === "toggle") {
        data[config]();
      }
    });
  }
};
const mapComponentsData = (() => {
  const componentsData = [];
  return {
    set(componentName) {
      componentsData.push(componentName);
    },
    get(componentName) {
      return componentsData.includes(componentName);
    }
  };
})();
const InitializedComponents = {
  set(componentName) {
    mapComponentsData.set(componentName);
  },
  get(componentName) {
    return mapComponentsData.get(componentName);
  }
};
const isInitialized = (componentName) => {
  return InitializedComponents.get(componentName);
};
const bindCallbackEventsIfNeeded = (component) => {
  if (!isInitialized(component.NAME)) {
    const manualInit = true;
    initComponent(component, manualInit);
  }
};
const initComponent = (component, manualInit = false) => {
  if (!component || InitializedComponents.get(component.NAME)) {
    return;
  }
  InitializedComponents.set(component.NAME);
  const thisComponent = _defaultInitSelectors[component.NAME] || null;
  const isToggler = (thisComponent == null ? void 0 : thisComponent.isToggler) || false;
  defineJQueryPlugin(component);
  if (thisComponent == null ? void 0 : thisComponent.advanced) {
    thisComponent.advanced(component, thisComponent == null ? void 0 : thisComponent.selector);
    return;
  }
  if (isToggler) {
    thisComponent.callback(component, thisComponent == null ? void 0 : thisComponent.selector);
    return;
  }
  if (manualInit) {
    return;
  }
  SelectorEngine$1.find(thisComponent == null ? void 0 : thisComponent.selector).forEach((element2) => {
    let instance = component.getInstance(element2);
    if (!instance) {
      instance = new component(element2);
      if (thisComponent == null ? void 0 : thisComponent.onInit) {
        instance[thisComponent.onInit]();
      }
    }
  });
};
let _defaultInitSelectors;
class InitMDB {
  constructor(defaultInitSelectors2) {
    __publicField(this, "init", (components) => {
      components.forEach((component) => initComponent(component));
    });
    __publicField(this, "initMDB", (components, checkOtherImports = false) => {
      const componentList = Object.keys(_defaultInitSelectors).map((element2) => {
        const requireAutoInit = Boolean(
          document.querySelector(_defaultInitSelectors[element2].selector)
        );
        if (requireAutoInit) {
          const component = components[_defaultInitSelectors[element2].name];
          if (!component && !InitializedComponents.get(element2) && checkOtherImports) {
            console.warn(
              `Please import ${_defaultInitSelectors[element2].name} from "MDB" package and add it to a object parameter inside "initMDB" function`
            );
          }
          return component;
        }
        return null;
      });
      this.init(componentList);
    });
    _defaultInitSelectors = defaultInitSelectors2;
  }
}
const NAME$s = "button";
const DATA_KEY$g = `mdb.${NAME$s}`;
const EVENT_KEY$e = `.${DATA_KEY$g}`;
const EVENT_CLICK$2 = `click${EVENT_KEY$e}`;
const EVENT_TRANSITIONEND = "transitionend";
const EVENT_MOUSEENTER$2 = "mouseenter";
const EVENT_MOUSELEAVE$2 = "mouseleave";
const EVENT_HIDE$9 = `hide${EVENT_KEY$e}`;
const EVENT_HIDDEN$9 = `hidden${EVENT_KEY$e}`;
const EVENT_SHOW$9 = `show${EVENT_KEY$e}`;
const EVENT_SHOWN$9 = `shown${EVENT_KEY$e}`;
const CLASS_NAME_ACTIVE$4 = "active";
const CLASS_NAME_SHOWN = "shown";
const CLASS_NAME_FIXED_ACTION_BTN = "fixed-action-btn";
const SELECTOR_ACTION_BUTTON = ".fixed-action-btn:not(.smooth-scroll) > .btn-floating";
const SELECTOR_LIST_ELEMENT = "ul .btn";
const SELECTOR_LIST$1 = "ul";
class Button2 extends Button$1 {
  constructor(element2) {
    super(element2);
    this._fn = {};
    if (this._element) {
      Data$1.setData(this._element, DATA_KEY$g, this);
      this._init();
      Manipulator$1.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
      bindCallbackEventsIfNeeded(this.constructor);
    }
  }
  // Static
  static get NAME() {
    return NAME$s;
  }
  static jQueryInterface(config, options) {
    return this.each(function() {
      let data = Data$1.getData(this, DATA_KEY$g);
      const _config = typeof config === "object" && config;
      if (!data && /dispose/.test(config)) {
        return;
      }
      if (!data) {
        data = new Button2(this, _config);
      }
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](options);
      }
    });
  }
  // Getters
  get _actionButton() {
    return SelectorEngine$1.findOne(SELECTOR_ACTION_BUTTON, this._element);
  }
  get _buttonListElements() {
    return SelectorEngine$1.find(SELECTOR_LIST_ELEMENT, this._element);
  }
  get _buttonList() {
    return SelectorEngine$1.findOne(SELECTOR_LIST$1, this._element);
  }
  get _isTouchDevice() {
    return "ontouchstart" in document.documentElement;
  }
  // Public
  show() {
    if (Manipulator$1.hasClass(this._element, CLASS_NAME_FIXED_ACTION_BTN)) {
      EventHandler$1.off(this._buttonList, EVENT_TRANSITIONEND);
      EventHandler$1.trigger(this._element, EVENT_SHOW$9);
      this._bindListOpenTransitionEnd();
      Manipulator$1.addStyle(this._element, { height: `${this._fullContainerHeight}px` });
      this._toggleVisibility(true);
    }
  }
  hide() {
    if (Manipulator$1.hasClass(this._element, CLASS_NAME_FIXED_ACTION_BTN)) {
      EventHandler$1.off(this._buttonList, EVENT_TRANSITIONEND);
      EventHandler$1.trigger(this._element, EVENT_HIDE$9);
      this._bindListHideTransitionEnd();
      this._toggleVisibility(false);
    }
  }
  dispose() {
    if (Manipulator$1.hasClass(this._element, CLASS_NAME_FIXED_ACTION_BTN)) {
      EventHandler$1.off(this._actionButton, EVENT_CLICK$2);
      this._actionButton.removeEventListener(EVENT_MOUSEENTER$2, this._fn.mouseenter);
      this._element.removeEventListener(EVENT_MOUSELEAVE$2, this._fn.mouseleave);
    }
    Manipulator$1.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);
    super.dispose();
  }
  // Private
  _init() {
    if (Manipulator$1.hasClass(this._element, CLASS_NAME_FIXED_ACTION_BTN)) {
      this._saveInitialHeights();
      this._setInitialStyles();
      this._bindInitialEvents();
    }
  }
  _bindMouseEnter() {
    this._actionButton.addEventListener(
      EVENT_MOUSEENTER$2,
      // prettier-ignore
      this._fn.mouseenter = () => {
        if (!this._isTouchDevice) {
          this.show();
        }
      }
      // prettier-ignore
    );
  }
  _bindMouseLeave() {
    this._element.addEventListener(
      EVENT_MOUSELEAVE$2,
      // prettier-ignore
      this._fn.mouseleave = () => {
        this.hide();
      }
      // prettier-ignore
    );
  }
  _bindClick() {
    EventHandler$1.on(this._actionButton, EVENT_CLICK$2, () => {
      if (Manipulator$1.hasClass(this._element, CLASS_NAME_ACTIVE$4)) {
        this.hide();
      } else {
        this.show();
      }
    });
  }
  _bindListHideTransitionEnd() {
    EventHandler$1.on(this._buttonList, EVENT_TRANSITIONEND, (event) => {
      if (event.propertyName === "transform") {
        EventHandler$1.off(this._buttonList, EVENT_TRANSITIONEND);
        this._element.style.height = `${this._initialContainerHeight}px`;
        EventHandler$1.trigger(this._element, EVENT_HIDDEN$9);
      }
    });
  }
  _bindListOpenTransitionEnd() {
    EventHandler$1.on(this._buttonList, EVENT_TRANSITIONEND, (event) => {
      if (event.propertyName === "transform") {
        EventHandler$1.off(this._buttonList, EVENT_TRANSITIONEND);
        EventHandler$1.trigger(this._element, EVENT_SHOWN$9);
      }
    });
  }
  _toggleVisibility(isVisible2) {
    const action = isVisible2 ? "addClass" : "removeClass";
    const listTranslate = isVisible2 ? "translate(0)" : `translateY(${this._fullContainerHeight}px)`;
    Manipulator$1.addStyle(this._buttonList, { transform: listTranslate });
    if (this._buttonListElements) {
      this._buttonListElements.forEach((el) => Manipulator$1[action](el, CLASS_NAME_SHOWN));
    }
    Manipulator$1[action](this._element, CLASS_NAME_ACTIVE$4);
  }
  _getHeight(element2) {
    const computed = window.getComputedStyle(element2);
    const height = parseFloat(computed.getPropertyValue("height"));
    return height;
  }
  _saveInitialHeights() {
    this._initialContainerHeight = this._getHeight(this._element);
    this._initialListHeight = this._getHeight(this._buttonList);
    this._fullContainerHeight = this._initialContainerHeight + this._initialListHeight;
  }
  _bindInitialEvents() {
    this._bindClick();
    this._bindMouseEnter();
    this._bindMouseLeave();
  }
  _setInitialStyles() {
    this._buttonList.style.marginBottom = `${this._initialContainerHeight}px`;
    this._buttonList.style.transform = `translateY(${this._fullContainerHeight}px)`;
    this._element.style.height = `${this._initialContainerHeight}px`;
  }
}
const getSelector = (element2) => {
  let selector = element2.getAttribute("data-mdb-target");
  if (!selector || selector === "#") {
    let hrefAttribute = element2.getAttribute("href");
    if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) {
      return null;
    }
    if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) {
      hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
    }
    selector = hrefAttribute && hrefAttribute !== "#" ? parseSelector(hrefAttribute.trim()) : null;
  }
  return selector;
};
const SelectorEngine = {
  find(selector, element2 = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(element2, selector));
  },
  findOne(selector, element2 = document.documentElement) {
    return Element.prototype.querySelector.call(element2, selector);
  },
  children(element2, selector) {
    return [].concat(...element2.children).filter((child) => child.matches(selector));
  },
  parents(element2, selector) {
    const parents = [];
    let ancestor = element2.parentNode.closest(selector);
    while (ancestor) {
      parents.push(ancestor);
      ancestor = ancestor.parentNode.closest(selector);
    }
    return parents;
  },
  prev(element2, selector) {
    let previous = element2.previousElementSibling;
    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }
      previous = previous.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next(element2, selector) {
    let next = element2.nextElementSibling;
    while (next) {
      if (next.matches(selector)) {
        return [next];
      }
      next = next.nextElementSibling;
    }
    return [];
  },
  focusableChildren(element2) {
    const focusables = [
      "a",
      "button",
      "input",
      "textarea",
      "select",
      "details",
      "[tabindex]",
      '[contenteditable="true"]'
    ].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
    return this.find(focusables, element2).filter((el) => !isDisabled(el) && isVisible(el));
  },
  getSelectorFromElement(element2) {
    const selector = getSelector(element2);
    if (selector) {
      return SelectorEngine.findOne(selector) ? selector : null;
    }
    return null;
  },
  getElementFromSelector(element2) {
    const selector = getSelector(element2);
    return selector ? SelectorEngine.findOne(selector) : null;
  },
  getMultipleElementsFromSelector(element2) {
    const selector = getSelector(element2);
    return selector ? SelectorEngine.find(selector) : [];
  }
};
const NAME$r = "backdrop";
const CLASS_NAME_FADE$6 = "fade";
const CLASS_NAME_SHOW$9 = "show";
const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$r}`;
const Default$e = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: false,
  isVisible: true,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: "body"
  // give the choice to place backdrop under different elements
};
const DefaultType$e = {
  className: "string",
  clickCallback: "(function|null)",
  isAnimated: "boolean",
  isVisible: "boolean",
  rootElement: "(element|string)"
};
class Backdrop extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
    this._isAppended = false;
    this._element = null;
  }
  // Getters
  static get Default() {
    return Default$e;
  }
  static get DefaultType() {
    return DefaultType$e;
  }
  static get NAME() {
    return NAME$r;
  }
  // Public
  show(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._append();
    const element2 = this._getElement();
    if (this._config.isAnimated) {
      reflow(element2);
    }
    element2.classList.add(CLASS_NAME_SHOW$9);
    this._emulateAnimation(() => {
      execute(callback);
    });
  }
  hide(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._getElement().classList.remove(CLASS_NAME_SHOW$9);
    this._emulateAnimation(() => {
      this.dispose();
      execute(callback);
    });
  }
  dispose() {
    if (!this._isAppended) {
      return;
    }
    EventHandler.off(this._element, EVENT_MOUSEDOWN);
    this._element.remove();
    this._isAppended = false;
  }
  // Private
  _getElement() {
    if (!this._element) {
      const backdrop = document.createElement("div");
      backdrop.className = this._config.className;
      if (this._config.isAnimated) {
        backdrop.classList.add(CLASS_NAME_FADE$6);
      }
      this._element = backdrop;
    }
    return this._element;
  }
  _configAfterMerge(config) {
    config.rootElement = getElement(config.rootElement);
    return config;
  }
  _append() {
    if (this._isAppended) {
      return;
    }
    const element2 = this._getElement();
    this._config.rootElement.append(element2);
    EventHandler.on(element2, EVENT_MOUSEDOWN, () => {
      execute(this._config.clickCallback);
    });
    this._isAppended = true;
  }
  _emulateAnimation(callback) {
    executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
  }
}
const enableDismissTrigger = (component, method = "hide") => {
  const clickEvent = `click.dismiss${component.EVENT_KEY}`;
  const name = component.NAME;
  EventHandler.on(document, clickEvent, `[data-mdb-dismiss="${name}"]`, function(event) {
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
    const instance = component.getOrCreateInstance(target);
    instance[method]();
  });
};
const NAME$q = "focustrap";
const DATA_KEY$f = "bs.focustrap";
const EVENT_KEY$d = `.${DATA_KEY$f}`;
const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$d}`;
const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$d}`;
const TAB_KEY$1 = "Tab";
const TAB_NAV_FORWARD = "forward";
const TAB_NAV_BACKWARD = "backward";
const Default$d = {
  autofocus: true,
  trapElement: null
  // The element to trap focus inside of
};
const DefaultType$d = {
  autofocus: "boolean",
  trapElement: "element"
};
class FocusTrap extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
    this._isActive = false;
    this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return Default$d;
  }
  static get DefaultType() {
    return DefaultType$d;
  }
  static get NAME() {
    return NAME$q;
  }
  // Public
  activate() {
    if (this._isActive) {
      return;
    }
    if (this._config.autofocus) {
      this._config.trapElement.focus();
    }
    EventHandler.off(document, EVENT_KEY$d);
    EventHandler.on(document, EVENT_FOCUSIN$2, (event) => this._handleFocusin(event));
    EventHandler.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
    this._isActive = true;
  }
  deactivate() {
    if (!this._isActive) {
      return;
    }
    this._isActive = false;
    EventHandler.off(document, EVENT_KEY$d);
  }
  // Private
  _handleFocusin(event) {
    const { trapElement } = this._config;
    if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
      return;
    }
    const elements = SelectorEngine.focusableChildren(trapElement);
    if (elements.length === 0) {
      trapElement.focus();
    } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
      elements[elements.length - 1].focus();
    } else {
      elements[0].focus();
    }
  }
  _handleKeydown(event) {
    if (event.key !== TAB_KEY$1) {
      return;
    }
    this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
  }
}
const SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
const SELECTOR_STICKY_CONTENT = ".sticky-top";
const PROPERTY_PADDING = "padding-right";
const PROPERTY_MARGIN = "margin-right";
class ScrollBarHelper {
  constructor() {
    this._element = document.body;
  }
  // Public
  getWidth() {
    const documentWidth = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - documentWidth);
  }
  hide() {
    const width = this.getWidth();
    this._disableOverFlow();
    this._setElementAttributes(
      this._element,
      PROPERTY_PADDING,
      (calculatedValue) => calculatedValue + width
    );
    this._setElementAttributes(
      SELECTOR_FIXED_CONTENT,
      PROPERTY_PADDING,
      (calculatedValue) => calculatedValue + width
    );
    this._setElementAttributes(
      SELECTOR_STICKY_CONTENT,
      PROPERTY_MARGIN,
      (calculatedValue) => calculatedValue - width
    );
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow");
    this._resetElementAttributes(this._element, PROPERTY_PADDING);
    this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
    this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
  // Private
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow");
    this._element.style.overflow = "hidden";
  }
  _setElementAttributes(selector, styleProperty, callback) {
    const scrollbarWidth = this.getWidth();
    const manipulationCallBack = (element2) => {
      if (element2 !== this._element && window.innerWidth > element2.clientWidth + scrollbarWidth) {
        return;
      }
      this._saveInitialAttribute(element2, styleProperty);
      const calculatedValue = window.getComputedStyle(element2).getPropertyValue(styleProperty);
      element2.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  _saveInitialAttribute(element2, styleProperty) {
    const actualValue = element2.style.getPropertyValue(styleProperty);
    if (actualValue) {
      Manipulator.setDataAttribute(element2, styleProperty, actualValue);
    }
  }
  _resetElementAttributes(selector, styleProperty) {
    const manipulationCallBack = (element2) => {
      const value = Manipulator.getDataAttribute(element2, styleProperty);
      if (value === null) {
        element2.style.removeProperty(styleProperty);
        return;
      }
      Manipulator.removeDataAttribute(element2, styleProperty);
      element2.style.setProperty(styleProperty, value);
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  _applyManipulationCallback(selector, callBack) {
    if (isElement$1(selector)) {
      callBack(selector);
      return;
    }
    for (const sel of SelectorEngine.find(selector, this._element)) {
      callBack(sel);
    }
  }
}
const NAME$p = "offcanvas";
const DATA_KEY$e = "bs.offcanvas";
const EVENT_KEY$c = `.${DATA_KEY$e}`;
const ESCAPE_KEY$2 = "Escape";
const CLASS_NAME_SHOW$8 = "show";
const CLASS_NAME_SHOWING$1 = "showing";
const CLASS_NAME_HIDING = "hiding";
const CLASS_NAME_BACKDROP = "offcanvas-backdrop";
const EVENT_SHOW$8 = `show${EVENT_KEY$c}`;
const EVENT_SHOWN$8 = `shown${EVENT_KEY$c}`;
const EVENT_HIDE$8 = `hide${EVENT_KEY$c}`;
const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$c}`;
const EVENT_HIDDEN$8 = `hidden${EVENT_KEY$c}`;
const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$c}`;
const Default$c = {
  backdrop: true,
  keyboard: true,
  scroll: false
};
const DefaultType$c = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
class Offcanvas extends BaseComponent$1 {
  constructor(element2, config) {
    super(element2, config);
    this._isShown = false;
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Default$c;
  }
  static get DefaultType() {
    return DefaultType$c;
  }
  static get NAME() {
    return NAME$p;
  }
  // Public
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$8, { relatedTarget });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    this._backdrop.show();
    if (!this._config.scroll) {
      new ScrollBarHelper().hide();
    }
    this._element.setAttribute("aria-modal", true);
    this._element.setAttribute("role", "dialog");
    this._element.classList.add(CLASS_NAME_SHOWING$1);
    const completeCallBack = () => {
      if (!this._config.scroll || this._config.backdrop) {
        this._focustrap.activate();
      }
      this._element.classList.add(CLASS_NAME_SHOW$8);
      this._element.classList.remove(CLASS_NAME_SHOWING$1);
      EventHandler.trigger(this._element, EVENT_SHOWN$8, { relatedTarget });
    };
    this._queueCallback(completeCallBack, this._element, true);
  }
  hide() {
    if (!this._isShown) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$8);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._focustrap.deactivate();
    this._element.blur();
    this._isShown = false;
    this._element.classList.add(CLASS_NAME_HIDING);
    this._backdrop.hide();
    const completeCallback = () => {
      this._element.classList.remove(CLASS_NAME_SHOW$8, CLASS_NAME_HIDING);
      this._element.removeAttribute("aria-modal");
      this._element.removeAttribute("role");
      if (!this._config.scroll) {
        new ScrollBarHelper().reset();
      }
      EventHandler.trigger(this._element, EVENT_HIDDEN$8);
    };
    this._queueCallback(completeCallback, this._element, true);
  }
  dispose() {
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }
  // Private
  _initializeBackDrop() {
    const clickCallback = () => {
      if (this._config.backdrop === "static") {
        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
        return;
      }
      this.hide();
    };
    const isVisible2 = Boolean(this._config.backdrop);
    return new Backdrop({
      className: CLASS_NAME_BACKDROP,
      isVisible: isVisible2,
      isAnimated: true,
      rootElement: this._element.parentNode,
      clickCallback: isVisible2 ? clickCallback : null
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, (event) => {
      if (event.key !== ESCAPE_KEY$2) {
        return;
      }
      if (this._config.keyboard) {
        this.hide();
        return;
      }
      EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
    });
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Offcanvas.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
}
const NAME$o = "alert";
const DATA_KEY$d = "bs.alert";
const EVENT_KEY$b = `.${DATA_KEY$d}`;
const EVENT_CLOSE = `close${EVENT_KEY$b}`;
const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
const CLASS_NAME_FADE$5 = "fade";
const CLASS_NAME_SHOW$7 = "show";
let Alert$1 = class Alert extends BaseComponent$1 {
  // Getters
  static get NAME() {
    return NAME$o;
  }
  // Public
  close() {
    const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
    if (closeEvent.defaultPrevented) {
      return;
    }
    this._element.classList.remove(CLASS_NAME_SHOW$7);
    const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
    this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
  }
  // Private
  _destroyElement() {
    this._element.remove();
    EventHandler.trigger(this._element, EVENT_CLOSED);
    this.dispose();
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Alert.getOrCreateInstance(this);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
};
const NAME$n = "alert";
const EVENT_CLOSE_BS = "close.bs.alert";
const EVENT_CLOSED_BS = "closed.bs.alert";
const EXTENDED_EVENTS$6 = [{ name: "close" }, { name: "closed" }];
class Alert2 extends Alert$1 {
  constructor(element2, data = {}) {
    super(element2, data);
    this._init();
    Manipulator$1.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }
  dispose() {
    EventHandler$1.off(this._element, EVENT_CLOSE_BS);
    EventHandler$1.off(this._element, EVENT_CLOSED_BS);
    Manipulator$1.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);
    super.dispose();
  }
  // Getters
  static get NAME() {
    return NAME$n;
  }
  // Private
  _init() {
    this._bindMdbEvents();
  }
  _bindMdbEvents() {
    EventHandler$1.extend(this._element, EXTENDED_EVENTS$6, NAME$n);
  }
}
const NAME$m = "swipe";
const EVENT_KEY$a = ".bs.swipe";
const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$a}`;
const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$a}`;
const EVENT_TOUCHEND = `touchend${EVENT_KEY$a}`;
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$a}`;
const EVENT_POINTERUP = `pointerup${EVENT_KEY$a}`;
const POINTER_TYPE_TOUCH = "touch";
const POINTER_TYPE_PEN = "pen";
const CLASS_NAME_POINTER_EVENT = "pointer-event";
const SWIPE_THRESHOLD = 40;
const Default$b = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
};
const DefaultType$b = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class Swipe extends Config {
  constructor(element2, config) {
    super();
    this._element = element2;
    if (!element2 || !Swipe.isSupported()) {
      return;
    }
    this._config = this._getConfig(config);
    this._deltaX = 0;
    this._supportPointerEvents = Boolean(window.PointerEvent);
    this._initEvents();
  }
  // Getters
  static get Default() {
    return Default$b;
  }
  static get DefaultType() {
    return DefaultType$b;
  }
  static get NAME() {
    return NAME$m;
  }
  // Public
  dispose() {
    EventHandler.off(this._element, EVENT_KEY$a);
  }
  // Private
  _start(event) {
    if (!this._supportPointerEvents) {
      this._deltaX = event.touches[0].clientX;
      return;
    }
    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX;
    }
  }
  _end(event) {
    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX - this._deltaX;
    }
    this._handleSwipe();
    execute(this._config.endCallback);
  }
  _move(event) {
    this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const absDeltaX = Math.abs(this._deltaX);
    if (absDeltaX <= SWIPE_THRESHOLD) {
      return;
    }
    const direction = absDeltaX / this._deltaX;
    this._deltaX = 0;
    if (!direction) {
      return;
    }
    execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    if (this._supportPointerEvents) {
      EventHandler.on(this._element, EVENT_POINTERDOWN, (event) => this._start(event));
      EventHandler.on(this._element, EVENT_POINTERUP, (event) => this._end(event));
      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
    } else {
      EventHandler.on(this._element, EVENT_TOUCHSTART, (event) => this._start(event));
      EventHandler.on(this._element, EVENT_TOUCHMOVE, (event) => this._move(event));
      EventHandler.on(this._element, EVENT_TOUCHEND, (event) => this._end(event));
    }
  }
  _eventIsPointerPenTouch(event) {
    return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const NAME$l = "carousel";
const DATA_KEY$c = "bs.carousel";
const EVENT_KEY$9 = `.${DATA_KEY$c}`;
const ARROW_LEFT_KEY$1 = "ArrowLeft";
const ARROW_RIGHT_KEY$1 = "ArrowRight";
const TOUCHEVENT_COMPAT_WAIT = 500;
const ORDER_NEXT = "next";
const ORDER_PREV = "prev";
const DIRECTION_LEFT = "left";
const DIRECTION_RIGHT = "right";
const EVENT_SLIDE = `slide${EVENT_KEY$9}`;
const EVENT_SLID = `slid${EVENT_KEY$9}`;
const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$9}`;
const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$9}`;
const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$9}`;
const EVENT_DRAG_START = `dragstart${EVENT_KEY$9}`;
const CLASS_NAME_CAROUSEL = "carousel";
const CLASS_NAME_ACTIVE$3 = "active";
const CLASS_NAME_SLIDE = "slide";
const CLASS_NAME_END = "carousel-item-end";
const CLASS_NAME_START = "carousel-item-start";
const CLASS_NAME_NEXT = "carousel-item-next";
const CLASS_NAME_PREV = "carousel-item-prev";
const SELECTOR_ACTIVE$1 = ".active";
const SELECTOR_ITEM = ".carousel-item";
const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE$1 + SELECTOR_ITEM;
const SELECTOR_ITEM_IMG = ".carousel-item img";
const SELECTOR_INDICATORS = ".carousel-indicators";
const KEY_TO_DIRECTION = {
  [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
  [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
};
const Default$a = {
  interval: 5e3,
  keyboard: true,
  pause: "hover",
  ride: false,
  touch: true,
  wrap: true
};
const DefaultType$a = {
  interval: "(number|boolean)",
  // TODO:v6 remove boolean support
  keyboard: "boolean",
  pause: "(string|boolean)",
  ride: "(boolean|string)",
  touch: "boolean",
  wrap: "boolean"
};
let Carousel$1 = class Carousel extends BaseComponent$1 {
  constructor(element2, config) {
    super(element2, config);
    this._interval = null;
    this._activeElement = null;
    this._isSliding = false;
    this.touchTimeout = null;
    this._swipeHelper = null;
    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
    this._addEventListeners();
    if (this._config.ride === CLASS_NAME_CAROUSEL) {
      this.cycle();
    }
  }
  // Getters
  static get Default() {
    return Default$a;
  }
  static get DefaultType() {
    return DefaultType$a;
  }
  static get NAME() {
    return NAME$l;
  }
  // Public
  next() {
    this._slide(ORDER_NEXT);
  }
  nextWhenVisible() {
    if (!document.hidden && isVisible(this._element)) {
      this.next();
    }
  }
  prev() {
    this._slide(ORDER_PREV);
  }
  pause() {
    if (this._isSliding) {
      triggerTransitionEnd(this._element);
    }
    this._clearInterval();
  }
  cycle() {
    this._clearInterval();
    this._updateInterval();
    this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (!this._config.ride) {
      return;
    }
    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
      return;
    }
    this.cycle();
  }
  to(index) {
    const items = this._getItems();
    if (index > items.length - 1 || index < 0) {
      return;
    }
    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
      return;
    }
    const activeIndex = this._getItemIndex(this._getActive());
    if (activeIndex === index) {
      return;
    }
    const order2 = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
    this._slide(order2, items[index]);
  }
  dispose() {
    if (this._swipeHelper) {
      this._swipeHelper.dispose();
    }
    super.dispose();
  }
  // Private
  _configAfterMerge(config) {
    config.defaultInterval = config.interval;
    return config;
  }
  _addEventListeners() {
    if (this._config.keyboard) {
      EventHandler.on(this._element, EVENT_KEYDOWN$1, (event) => this._keydown(event));
    }
    if (this._config.pause === "hover") {
      EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
      EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
    }
    if (this._config.touch && Swipe.isSupported()) {
      this._addTouchEventListeners();
    }
  }
  _addTouchEventListeners() {
    for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
      EventHandler.on(img, EVENT_DRAG_START, (event) => event.preventDefault());
    }
    const endCallBack = () => {
      if (this._config.pause !== "hover") {
        return;
      }
      this.pause();
      if (this.touchTimeout) {
        clearTimeout(this.touchTimeout);
      }
      this.touchTimeout = setTimeout(
        () => this._maybeEnableCycle(),
        TOUCHEVENT_COMPAT_WAIT + this._config.interval
      );
    };
    const swipeConfig = {
      leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
      rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
      endCallback: endCallBack
    };
    this._swipeHelper = new Swipe(this._element, swipeConfig);
  }
  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return;
    }
    const direction = KEY_TO_DIRECTION[event.key];
    if (direction) {
      event.preventDefault();
      this._slide(this._directionToOrder(direction));
    }
  }
  _getItemIndex(element2) {
    return this._getItems().indexOf(element2);
  }
  _setActiveIndicatorElement(index) {
    if (!this._indicatorsElement) {
      return;
    }
    const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
    activeIndicator.classList.remove(CLASS_NAME_ACTIVE$3);
    activeIndicator.removeAttribute("aria-current");
    const newActiveIndicator = SelectorEngine.findOne(
      `[data-mdb-slide-to="${index}"]`,
      this._indicatorsElement
    );
    if (newActiveIndicator) {
      newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$3);
      newActiveIndicator.setAttribute("aria-current", "true");
    }
  }
  _updateInterval() {
    const element2 = this._activeElement || this._getActive();
    if (!element2) {
      return;
    }
    const elementInterval = Number.parseInt(element2.getAttribute("data-mdb-interval"), 10);
    this._config.interval = elementInterval || this._config.defaultInterval;
  }
  _slide(order2, element2 = null) {
    if (this._isSliding) {
      return;
    }
    const activeElement = this._getActive();
    const isNext = order2 === ORDER_NEXT;
    const nextElement = element2 || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
    if (nextElement === activeElement) {
      return;
    }
    const nextElementIndex = this._getItemIndex(nextElement);
    const triggerEvent = (eventName) => {
      return EventHandler.trigger(this._element, eventName, {
        relatedTarget: nextElement,
        direction: this._orderToDirection(order2),
        from: this._getItemIndex(activeElement),
        to: nextElementIndex
      });
    };
    const slideEvent = triggerEvent(EVENT_SLIDE);
    if (slideEvent.defaultPrevented) {
      return;
    }
    if (!activeElement || !nextElement) {
      return;
    }
    const isCycling = Boolean(this._interval);
    this.pause();
    this._isSliding = true;
    this._setActiveIndicatorElement(nextElementIndex);
    this._activeElement = nextElement;
    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
    nextElement.classList.add(orderClassName);
    reflow(nextElement);
    activeElement.classList.add(directionalClassName);
    nextElement.classList.add(directionalClassName);
    const completeCallBack = () => {
      nextElement.classList.remove(directionalClassName, orderClassName);
      nextElement.classList.add(CLASS_NAME_ACTIVE$3);
      activeElement.classList.remove(CLASS_NAME_ACTIVE$3, orderClassName, directionalClassName);
      this._isSliding = false;
      triggerEvent(EVENT_SLID);
    };
    this._queueCallback(completeCallBack, activeElement, this._isAnimated());
    if (isCycling) {
      this.cycle();
    }
  }
  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_SLIDE);
  }
  _getActive() {
    return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
  }
  _getItems() {
    return SelectorEngine.find(SELECTOR_ITEM, this._element);
  }
  _clearInterval() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }
  _directionToOrder(direction) {
    if (isRTL()) {
      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
    }
    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
  }
  _orderToDirection(order2) {
    if (isRTL()) {
      return order2 === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return order2 === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Carousel.getOrCreateInstance(this, config);
      if (typeof config === "number") {
        data.to(config);
        return;
      }
      if (typeof config === "string") {
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
};
const NAME$k = "carousel";
const EVENT_SLIDE_BS = "slide.bs.carousel";
const EVENT_SLID_BS = "slid.bs.carousel";
const EXTENDED_EVENTS$5 = [
  { name: "slide", parametersToCopy: ["relatedTarget", "direction", "from", "to"] },
  { name: "slid", parametersToCopy: ["relatedTarget", "direction", "from", "to"] }
];
class Carousel2 extends Carousel$1 {
  constructor(element2, data) {
    super(element2, data);
    this._init();
    Manipulator$1.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }
  dispose() {
    EventHandler$1.off(this._element, EVENT_SLIDE_BS);
    EventHandler$1.off(this._element, EVENT_SLID_BS);
    Manipulator$1.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);
    super.dispose();
  }
  // Getters
  static get NAME() {
    return NAME$k;
  }
  // Private
  _init() {
    this._bindMdbEvents();
  }
  _bindMdbEvents() {
    EventHandler$1.extend(this._element, EXTENDED_EVENTS$5, NAME$k);
  }
}
const NAME$j = "modal";
const DATA_KEY$b = "bs.modal";
const EVENT_KEY$8 = `.${DATA_KEY$b}`;
const ESCAPE_KEY$1 = "Escape";
const EVENT_HIDE$7 = `hide${EVENT_KEY$8}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$8}`;
const EVENT_HIDDEN$7 = `hidden${EVENT_KEY$8}`;
const EVENT_SHOW$7 = `show${EVENT_KEY$8}`;
const EVENT_SHOWN$7 = `shown${EVENT_KEY$8}`;
const EVENT_RESIZE = `resize${EVENT_KEY$8}`;
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$8}`;
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$8}`;
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$8}`;
const CLASS_NAME_OPEN = "modal-open";
const CLASS_NAME_FADE$4 = "fade";
const CLASS_NAME_SHOW$6 = "show";
const CLASS_NAME_STATIC = "modal-static";
const SELECTOR_DIALOG = ".modal-dialog";
const SELECTOR_MODAL_BODY = ".modal-body";
const Default$9 = {
  backdrop: true,
  focus: true,
  keyboard: true
};
const DefaultType$9 = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
let Modal$1 = class Modal extends BaseComponent$1 {
  constructor(element2, config) {
    super(element2, config);
    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._isShown = false;
    this._isTransitioning = false;
    this._scrollBar = new ScrollBarHelper();
    this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Default$9;
  }
  static get DefaultType() {
    return DefaultType$9;
  }
  static get NAME() {
    return NAME$j;
  }
  // Public
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown || this._isTransitioning) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$7, {
      relatedTarget
    });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    this._isTransitioning = true;
    this._scrollBar.hide();
    document.body.classList.add(CLASS_NAME_OPEN);
    this._adjustDialog();
    this._backdrop.show(() => this._showElement(relatedTarget));
  }
  hide() {
    if (!this._isShown || this._isTransitioning) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$7);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._isShown = false;
    this._isTransitioning = true;
    this._focustrap.deactivate();
    this._element.classList.remove(CLASS_NAME_SHOW$6);
    this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
  }
  dispose() {
    EventHandler.off(window, EVENT_KEY$8);
    EventHandler.off(this._dialog, EVENT_KEY$8);
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new Backdrop({
      isVisible: Boolean(this._config.backdrop) && Boolean(!this._config.modalNonInvasive),
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _showElement(relatedTarget) {
    if (!document.body.contains(this._element)) {
      document.body.append(this._element);
    }
    this._element.style.display = "block";
    this._element.removeAttribute("aria-hidden");
    this._element.setAttribute("aria-modal", true);
    this._element.setAttribute("role", "dialog");
    this._element.scrollTop = 0;
    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
    if (modalBody) {
      modalBody.scrollTop = 0;
    }
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOW$6);
    const transitionComplete = () => {
      if (this._config.focus) {
        this._focustrap.activate();
      }
      this._isTransitioning = false;
      EventHandler.trigger(this._element, EVENT_SHOWN$7, {
        relatedTarget
      });
    };
    this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
      if (event.key !== ESCAPE_KEY$1) {
        return;
      }
      if (this._config.keyboard) {
        this.hide();
        return;
      }
      this._triggerBackdropTransition();
    });
    EventHandler.on(window, EVENT_RESIZE, () => {
      if (this._isShown && !this._isTransitioning) {
        this._adjustDialog();
      }
    });
    EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, (event) => {
      EventHandler.one(this._element, EVENT_CLICK_DISMISS, (event2) => {
        if (this._element !== event.target || this._element !== event2.target) {
          return;
        }
        if (this._config.backdrop === "static") {
          this._triggerBackdropTransition();
          return;
        }
        if (this._config.backdrop) {
          this.hide();
        }
      });
    });
  }
  _hideModal() {
    this._element.style.display = "none";
    this._element.setAttribute("aria-hidden", true);
    this._element.removeAttribute("aria-modal");
    this._element.removeAttribute("role");
    this._isTransitioning = false;
    this._backdrop.hide(() => {
      document.body.classList.remove(CLASS_NAME_OPEN);
      this._resetAdjustments();
      this._scrollBar.reset();
      EventHandler.trigger(this._element, EVENT_HIDDEN$7);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_FADE$4);
  }
  _triggerBackdropTransition() {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const initialOverflowY = this._element.style.overflowY;
    if (initialOverflowY === "hidden" || this._element.classList.contains(CLASS_NAME_STATIC)) {
      return;
    }
    if (!isModalOverflowing) {
      this._element.style.overflowY = "hidden";
    }
    this._element.classList.add(CLASS_NAME_STATIC);
    this._queueCallback(() => {
      this._element.classList.remove(CLASS_NAME_STATIC);
      this._queueCallback(() => {
        this._element.style.overflowY = initialOverflowY;
      }, this._dialog);
    }, this._dialog);
    this._element.focus();
  }
  /**
   * The following methods are used to handle overflowing modals
   */
  _adjustDialog() {
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const scrollbarWidth = this._scrollBar.getWidth();
    const isBodyOverflowing = scrollbarWidth > 0;
    if (isBodyOverflowing && !isModalOverflowing) {
      const property = isRTL() ? "paddingLeft" : "paddingRight";
      this._element.style[property] = `${scrollbarWidth}px`;
    }
    if (!isBodyOverflowing && isModalOverflowing) {
      const property = isRTL() ? "paddingRight" : "paddingLeft";
      this._element.style[property] = `${scrollbarWidth}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "";
    this._element.style.paddingRight = "";
  }
  // Static
  static jQueryInterface(config, relatedTarget) {
    return this.each(function() {
      const data = Modal.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](relatedTarget);
    });
  }
};
const NAME$i = "modal";
const EVENT_HIDE_BS$5 = "hide.bs.modal";
const EVENT_HIDE_PREVENTED_BS = "hidePrevented.bs.modal";
const EVENT_HIDDEN_BS$5 = "hidden.bs.modal";
const EVENT_SHOW_BS$5 = "show.bs.modal";
const EVENT_SHOWN_BS$5 = "shown.bs.modal";
const EXTENDED_EVENTS$4 = [
  { name: "show", parametersToCopy: ["relatedTarget"] },
  { name: "shown", parametersToCopy: ["relatedTarget"] },
  { name: "hide" },
  { name: "hidePrevented" },
  { name: "hidden" }
];
class Modal2 extends Modal$1 {
  constructor(element2, data) {
    super(element2, data);
    this._init();
    Manipulator$1.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }
  dispose() {
    EventHandler$1.off(this._element, EVENT_SHOW_BS$5);
    EventHandler$1.off(this._element, EVENT_SHOWN_BS$5);
    EventHandler$1.off(this._element, EVENT_HIDE_BS$5);
    EventHandler$1.off(this._element, EVENT_HIDDEN_BS$5);
    EventHandler$1.off(this._element, EVENT_HIDE_PREVENTED_BS);
    Manipulator$1.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);
    super.dispose();
  }
  // Getters
  static get NAME() {
    return NAME$i;
  }
  // Private
  _init() {
    this._bindMdbEvents();
  }
  _bindMdbEvents() {
    EventHandler$1.extend(this._element, EXTENDED_EVENTS$4, NAME$i);
  }
}
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getNodeName(element2) {
  return element2 ? (element2.nodeName || "").toLowerCase() : null;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element2 = state.elements[name];
    if (!isHTMLElement(element2) || !getNodeName(element2)) {
      return;
    }
    Object.assign(element2.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element2.removeAttribute(name2);
      } else {
        element2.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element2 = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element2) || !getNodeName(element2)) {
        return;
      }
      Object.assign(element2.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element2.removeAttribute(attribute);
      });
    });
  };
}
const applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect$2,
  requires: ["computeStyles"]
};
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var max = Math.max;
var min = Math.min;
var round = Math.round;
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function getBoundingClientRect(element2, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element2.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element2)) {
    scaleX = element2.offsetWidth > 0 ? round(clientRect.width) / element2.offsetWidth || 1 : 1;
    scaleY = element2.offsetHeight > 0 ? round(clientRect.height) / element2.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element2) ? getWindow(element2) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}
function getLayoutRect(element2) {
  var clientRect = getBoundingClientRect(element2);
  var width = element2.offsetWidth;
  var height = element2.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element2.offsetLeft,
    y: element2.offsetTop,
    width,
    height
  };
}
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getComputedStyle$1(element2) {
  return getWindow(element2).getComputedStyle(element2);
}
function isTableElement(element2) {
  return ["table", "td", "th"].indexOf(getNodeName(element2)) >= 0;
}
function getDocumentElement(element2) {
  return ((isElement(element2) ? element2.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element2.document
  )) || window.document).documentElement;
}
function getParentNode(element2) {
  if (getNodeName(element2) === "html") {
    return element2;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element2.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element2.parentNode || // DOM Element detected
    (isShadowRoot(element2) ? element2.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element2)
  );
}
function getTrueOffsetParent(element2) {
  if (!isHTMLElement(element2) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle$1(element2).position === "fixed") {
    return null;
  }
  return element2.offsetParent;
}
function getContainingBlock(element2) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element2)) {
    var elementCss = getComputedStyle$1(element2);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element2);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$1(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element2) {
  var window2 = getWindow(element2);
  var offsetParent = getTrueOffsetParent(element2);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element2) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect$1(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
const arrow$1 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect$1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x, y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle$1(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }, getWindow(popper2)) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
const computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
const eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash$1[matched];
  });
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash[matched];
  });
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element2) {
  return getBoundingClientRect(getDocumentElement(element2)).left + getWindowScroll(element2).scrollLeft;
}
function getViewportRect(element2, strategy) {
  var win = getWindow(element2);
  var html = getDocumentElement(element2);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element2),
    y
  };
}
function getDocumentRect(element2) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element2);
  var winScroll = getWindowScroll(element2);
  var body = (_element$ownerDocumen = element2.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element2);
  var y = -winScroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function isScrollParent(element2) {
  var _getComputedStyle = getComputedStyle$1(element2), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element2, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element2);
  var isBody = scrollParent === ((_element$ownerDocumen = element2.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element2, strategy) {
  var rect = getBoundingClientRect(element2, false, strategy === "fixed");
  rect.top = rect.top + element2.clientTop;
  rect.left = rect.left + element2.clientLeft;
  rect.bottom = rect.top + element2.clientHeight;
  rect.right = rect.left + element2.clientWidth;
  rect.width = element2.clientWidth;
  rect.height = element2.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element2, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element2, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element2)));
}
function getClippingParents(element2) {
  var clippingParents2 = listScrollParents(getParentNode(element2));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle$1(element2).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element2) ? getOffsetParent(element2) : element2;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element2, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element2) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element2, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element2, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element2 = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element2.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element2.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element2.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element2.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element2[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element2[len] / 2);
        break;
    }
  }
  return offsets;
}
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element2 = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element2) ? element2 : element2.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
const flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
const hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
const offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
const popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min$1 = offset2 + overflow[mainSide];
    var max$1 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
const preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element2) {
  return {
    scrollLeft: element2.scrollLeft,
    scrollTop: element2.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function isElementScaled(element2) {
  var rect = element2.getBoundingClientRect();
  var scaleX = round(rect.width) / element2.offsetWidth || 1;
  var scaleY = round(rect.height) / element2.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element2) {
    return !(element2 && typeof element2.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect2 = _ref.effect;
        if (typeof effect2 === "function") {
          var cleanupFn = effect2({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper$2 = /* @__PURE__ */ popperGenerator();
var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
var createPopper$1 = /* @__PURE__ */ popperGenerator({
  defaultModifiers: defaultModifiers$1
});
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
const Popper = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain,
  afterRead,
  afterWrite,
  applyStyles: applyStyles$1,
  arrow: arrow$1,
  auto,
  basePlacements,
  beforeMain,
  beforeRead,
  beforeWrite,
  bottom,
  clippingParents,
  computeStyles: computeStyles$1,
  createPopper,
  createPopperBase: createPopper$2,
  createPopperLite: createPopper$1,
  detectOverflow,
  end,
  eventListeners,
  flip: flip$1,
  hide: hide$1,
  left,
  main,
  modifierPhases,
  offset: offset$1,
  placements,
  popper,
  popperGenerator,
  popperOffsets: popperOffsets$1,
  preventOverflow: preventOverflow$1,
  read,
  reference,
  right,
  start,
  top,
  variationPlacements,
  viewport,
  write
}, Symbol.toStringTag, { value: "Module" }));
const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
const DefaultAllowlist = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
  a: ["target", "href", "title", "rel"],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ["src", "srcset", "alt", "title", "width", "height"],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};
const uriAttributes = /* @__PURE__ */ new Set([
  "background",
  "cite",
  "href",
  "itemtype",
  "longdesc",
  "poster",
  "src",
  "xlink:href"
]);
const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
const allowedAttribute = (attribute, allowedAttributeList) => {
  const attributeName = attribute.nodeName.toLowerCase();
  if (allowedAttributeList.includes(attributeName)) {
    if (uriAttributes.has(attributeName)) {
      return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
    }
    return true;
  }
  return allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp).some((regex) => regex.test(attributeName));
};
function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
  if (!unsafeHtml.length) {
    return unsafeHtml;
  }
  if (sanitizeFunction && typeof sanitizeFunction === "function") {
    return sanitizeFunction(unsafeHtml);
  }
  const domParser = new window.DOMParser();
  const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
  const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
  for (const element2 of elements) {
    const elementName = element2.nodeName.toLowerCase();
    if (!Object.keys(allowList).includes(elementName)) {
      element2.remove();
      continue;
    }
    const attributeList = [].concat(...element2.attributes);
    const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
    for (const attribute of attributeList) {
      if (!allowedAttribute(attribute, allowedAttributes)) {
        element2.removeAttribute(attribute.nodeName);
      }
    }
  }
  return createdDocument.body.innerHTML;
}
const NAME$h = "TemplateFactory";
const Default$8 = {
  allowList: DefaultAllowlist,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: false,
  sanitize: true,
  sanitizeFn: null,
  template: "<div></div>"
};
const DefaultType$8 = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
};
const DefaultContentType = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
class TemplateFactory extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
  }
  // Getters
  static get Default() {
    return Default$8;
  }
  static get DefaultType() {
    return DefaultType$8;
  }
  static get NAME() {
    return NAME$h;
  }
  // Public
  getContent() {
    return Object.values(this._config.content).map((config) => this._resolvePossibleFunction(config)).filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(content) {
    this._checkContent(content);
    this._config.content = { ...this._config.content, ...content };
    return this;
  }
  toHtml() {
    const templateWrapper = document.createElement("div");
    templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
    for (const [selector, text] of Object.entries(this._config.content)) {
      this._setContent(templateWrapper, text, selector);
    }
    const template = templateWrapper.children[0];
    const extraClass = this._resolvePossibleFunction(this._config.extraClass);
    if (extraClass) {
      template.classList.add(...extraClass.split(" "));
    }
    return template;
  }
  // Private
  _typeCheckConfig(config) {
    super._typeCheckConfig(config);
    this._checkContent(config.content);
  }
  _checkContent(arg) {
    for (const [selector, content] of Object.entries(arg)) {
      super._typeCheckConfig({ selector, entry: content }, DefaultContentType);
    }
  }
  _setContent(template, content, selector) {
    const templateElement = SelectorEngine.findOne(selector, template);
    if (!templateElement) {
      return;
    }
    content = this._resolvePossibleFunction(content);
    if (!content) {
      templateElement.remove();
      return;
    }
    if (isElement$1(content)) {
      this._putElementInTemplate(getElement(content), templateElement);
      return;
    }
    if (this._config.html) {
      templateElement.innerHTML = this._maybeSanitize(content);
      return;
    }
    templateElement.textContent = content;
  }
  _maybeSanitize(arg) {
    return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
  }
  _resolvePossibleFunction(arg) {
    return execute(arg, [this]);
  }
  _putElementInTemplate(element2, templateElement) {
    if (this._config.html) {
      templateElement.innerHTML = "";
      templateElement.append(element2);
      return;
    }
    templateElement.textContent = element2.textContent;
  }
}
const NAME$g = "tooltip";
const DISALLOWED_ATTRIBUTES = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]);
const CLASS_NAME_FADE$3 = "fade";
const CLASS_NAME_MODAL = "modal";
const CLASS_NAME_SHOW$5 = "show";
const SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
const EVENT_MODAL_HIDE = "hide.bs.modal";
const TRIGGER_HOVER = "hover";
const TRIGGER_FOCUS = "focus";
const TRIGGER_CLICK = "click";
const TRIGGER_MANUAL = "manual";
const EVENT_HIDE$6 = "hide";
const EVENT_HIDDEN$6 = "hidden";
const EVENT_SHOW$6 = "show";
const EVENT_SHOWN$6 = "shown";
const EVENT_INSERTED = "inserted";
const EVENT_CLICK$1 = "click";
const EVENT_FOCUSIN$1 = "focusin";
const EVENT_FOCUSOUT$1 = "focusout";
const EVENT_MOUSEENTER = "mouseenter";
const EVENT_MOUSELEAVE = "mouseleave";
const AttachmentMap = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: isRTL() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: isRTL() ? "right" : "left"
};
const Default$7 = {
  allowList: DefaultAllowlist,
  animation: true,
  boundary: "clippingParents",
  container: false,
  customClass: "",
  delay: 0,
  fallbackPlacements: ["top", "right", "bottom", "left"],
  html: false,
  offset: [0, 6],
  placement: "top",
  popperConfig: null,
  sanitize: true,
  sanitizeFn: null,
  selector: false,
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  title: "",
  trigger: "hover focus"
};
const DefaultType$7 = {
  allowList: "object",
  animation: "boolean",
  boundary: "(string|element)",
  container: "(string|element|boolean)",
  customClass: "(string|function)",
  delay: "(number|object)",
  fallbackPlacements: "array",
  html: "boolean",
  offset: "(array|string|function)",
  placement: "(string|function)",
  popperConfig: "(null|object|function)",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  selector: "(string|boolean)",
  template: "string",
  title: "(string|element|function)",
  trigger: "string"
};
let Tooltip$1 = class Tooltip extends BaseComponent$1 {
  constructor(element2, config) {
    if (typeof Popper === "undefined") {
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    }
    super(element2, config);
    this._isEnabled = true;
    this._timeout = 0;
    this._isHovered = null;
    this._activeTrigger = {};
    this._popper = null;
    this._templateFactory = null;
    this._newContent = null;
    this.tip = null;
    this._setListeners();
    if (!this._config.selector) {
      this._fixTitle();
    }
  }
  // Getters
  static get Default() {
    return Default$7;
  }
  static get DefaultType() {
    return DefaultType$7;
  }
  static get NAME() {
    return NAME$g;
  }
  // Public
  enable() {
    this._isEnabled = true;
  }
  disable() {
    this._isEnabled = false;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (!this._isEnabled) {
      return;
    }
    this._activeTrigger.click = !this._activeTrigger.click;
    if (this._isShown()) {
      this._leave();
      return;
    }
    this._enter();
  }
  dispose() {
    clearTimeout(this._timeout);
    EventHandler.off(
      this._element.closest(SELECTOR_MODAL),
      EVENT_MODAL_HIDE,
      this._hideModalHandler
    );
    if (this._element.getAttribute("data-mdb-original-title")) {
      this._element.setAttribute("title", this._element.getAttribute("data-mdb-original-title"));
    }
    this._disposePopper();
    super.dispose();
  }
  show() {
    if (this._element.style.display === "none") {
      throw new Error("Please use show on visible elements");
    }
    if (!(this._isWithContent() && this._isEnabled)) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$6));
    const shadowRoot = findShadowRoot(this._element);
    const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(
      this._element
    );
    if (showEvent.defaultPrevented || !isInTheDom) {
      return;
    }
    this._disposePopper();
    const tip = this._getTipElement();
    this._element.setAttribute("aria-describedby", tip.getAttribute("id"));
    const { container } = this._config;
    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
      container.append(tip);
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
    }
    this._popper = this._createPopper(tip);
    tip.classList.add(CLASS_NAME_SHOW$5);
    if ("ontouchstart" in document.documentElement) {
      for (const element2 of [].concat(...document.body.children)) {
        EventHandler.on(element2, "mouseover", noop);
      }
    }
    const complete = () => {
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$6));
      if (this._isHovered === false) {
        this._leave();
      }
      this._isHovered = false;
    };
    this._queueCallback(complete, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown()) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$6));
    if (hideEvent.defaultPrevented) {
      return;
    }
    const tip = this._getTipElement();
    tip.classList.remove(CLASS_NAME_SHOW$5);
    if ("ontouchstart" in document.documentElement) {
      for (const element2 of [].concat(...document.body.children)) {
        EventHandler.off(element2, "mouseover", noop);
      }
    }
    this._activeTrigger[TRIGGER_CLICK] = false;
    this._activeTrigger[TRIGGER_FOCUS] = false;
    this._activeTrigger[TRIGGER_HOVER] = false;
    this._isHovered = null;
    const complete = () => {
      if (this._isWithActiveTrigger()) {
        return;
      }
      if (!this._isHovered) {
        this._disposePopper();
      }
      this._element.removeAttribute("aria-describedby");
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$6));
    };
    this._queueCallback(complete, this.tip, this._isAnimated());
  }
  update() {
    if (this._popper) {
      this._popper.update();
    }
  }
  // Protected
  _isWithContent() {
    return Boolean(this._getTitle());
  }
  _getTipElement() {
    if (!this.tip) {
      this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
    }
    return this.tip;
  }
  _createTipElement(content) {
    const tip = this._getTemplateFactory(content).toHtml();
    if (!tip) {
      return null;
    }
    tip.classList.remove(CLASS_NAME_FADE$3, CLASS_NAME_SHOW$5);
    tip.classList.add(`bs-${this.constructor.NAME}-auto`);
    const tipId = getUID(this.constructor.NAME).toString();
    tip.setAttribute("id", tipId);
    if (this._isAnimated()) {
      tip.classList.add(CLASS_NAME_FADE$3);
    }
    return tip;
  }
  setContent(content) {
    this._newContent = content;
    if (this._isShown()) {
      this._disposePopper();
      this.show();
    }
  }
  _getTemplateFactory(content) {
    if (this._templateFactory) {
      this._templateFactory.changeContent(content);
    } else {
      this._templateFactory = new TemplateFactory({
        ...this._config,
        // the `content` var has to be after `this._config`
        // to override config.content in case of popover
        content,
        extraClass: this._resolvePossibleFunction(this._config.customClass)
      });
    }
    return this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [SELECTOR_TOOLTIP_INNER]: this._getTitle()
    };
  }
  _getTitle() {
    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-mdb-original-title");
  }
  // Private
  _initializeOnDelegatedTarget(event) {
    return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
  }
  _isAnimated() {
    return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$3);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$5);
  }
  _createPopper(tip) {
    const placement = execute(this._config.placement, [this, tip, this._element]);
    const attachment = AttachmentMap[placement.toUpperCase()];
    return createPopper(this._element, tip, this._getPopperConfig(attachment));
  }
  _getOffset() {
    const { offset: offset2 } = this._config;
    if (typeof offset2 === "string") {
      return offset2.split(",").map((value) => Number.parseInt(value, 10));
    }
    if (typeof offset2 === "function") {
      return (popperData) => offset2(popperData, this._element);
    }
    return offset2;
  }
  _resolvePossibleFunction(arg) {
    return execute(arg, [this._element]);
  }
  _getPopperConfig(attachment) {
    const defaultBsPopperConfig = {
      placement: attachment,
      modifiers: [
        {
          name: "flip",
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        },
        {
          name: "offset",
          options: {
            offset: this._getOffset()
          }
        },
        {
          name: "preventOverflow",
          options: {
            boundary: this._config.boundary
          }
        },
        {
          name: "arrow",
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        },
        {
          name: "preSetPlacement",
          enabled: true,
          phase: "beforeMain",
          fn: (data) => {
            this._getTipElement().setAttribute("data-popper-placement", data.state.placement);
          }
        }
      ]
    };
    return {
      ...defaultBsPopperConfig,
      ...execute(this._config.popperConfig, [defaultBsPopperConfig])
    };
  }
  _setListeners() {
    const triggers = this._config.trigger.split(" ");
    for (const trigger of triggers) {
      if (trigger === "click") {
        EventHandler.on(
          this._element,
          this.constructor.eventName(EVENT_CLICK$1),
          this._config.selector,
          (event) => {
            const context = this._initializeOnDelegatedTarget(event);
            context.toggle();
          }
        );
      } else if (trigger !== TRIGGER_MANUAL) {
        const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
        const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
        EventHandler.on(this._element, eventIn, this._config.selector, (event) => {
          const context = this._initializeOnDelegatedTarget(event);
          context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
          context._enter();
        });
        EventHandler.on(this._element, eventOut, this._config.selector, (event) => {
          const context = this._initializeOnDelegatedTarget(event);
          context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
          context._leave();
        });
      }
    }
    this._hideModalHandler = () => {
      if (this._element) {
        this.hide();
      }
    };
    EventHandler.on(
      this._element.closest(SELECTOR_MODAL),
      EVENT_MODAL_HIDE,
      this._hideModalHandler
    );
  }
  _fixTitle() {
    const title = this._element.getAttribute("title");
    if (!title) {
      return;
    }
    if (!this._element.getAttribute("aria-label") && !this._element.textContent.trim()) {
      this._element.setAttribute("aria-label", title);
    }
    this._element.setAttribute("data-mdb-original-title", title);
    this._element.removeAttribute("title");
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = true;
      return;
    }
    this._isHovered = true;
    this._setTimeout(() => {
      if (this._isHovered) {
        this.show();
      }
    }, this._config.delay.show);
  }
  _leave() {
    if (this._isWithActiveTrigger()) {
      return;
    }
    this._isHovered = false;
    this._setTimeout(() => {
      if (!this._isHovered) {
        this.hide();
      }
    }, this._config.delay.hide);
  }
  _setTimeout(handler, timeout) {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(handler, timeout);
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(true);
  }
  _getConfig(config) {
    const dataAttributes = Manipulator.getDataAttributes(this._element);
    for (const dataAttribute of Object.keys(dataAttributes)) {
      if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
        delete dataAttributes[dataAttribute];
      }
    }
    config = {
      ...dataAttributes,
      ...typeof config === "object" && config ? config : {}
    };
    config = this._mergeConfigObj(config);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }
  _configAfterMerge(config) {
    config.container = config.container === false ? document.body : getElement(config.container);
    if (typeof config.delay === "number") {
      config.delay = {
        show: config.delay,
        hide: config.delay
      };
    }
    if (typeof config.title === "number") {
      config.title = config.title.toString();
    }
    if (typeof config.content === "number") {
      config.content = config.content.toString();
    }
    return config;
  }
  _getDelegateConfig() {
    const config = {};
    for (const [key, value] of Object.entries(this._config)) {
      if (this.constructor.Default[key] !== value) {
        config[key] = value;
      }
    }
    config.selector = false;
    config.trigger = "manual";
    return config;
  }
  _disposePopper() {
    if (this._popper) {
      this._popper.destroy();
      this._popper = null;
    }
    if (this.tip) {
      this.tip.remove();
      this.tip = null;
    }
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Tooltip.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
};
const NAME$f = "popover";
const SELECTOR_TITLE = ".popover-header";
const SELECTOR_CONTENT = ".popover-body";
const Default$6 = {
  ...Tooltip$1.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
};
const DefaultType$6 = {
  ...Tooltip$1.DefaultType,
  content: "(null|string|element|function)"
};
let Popover$1 = class Popover extends Tooltip$1 {
  // Getters
  static get Default() {
    return Default$6;
  }
  static get DefaultType() {
    return DefaultType$6;
  }
  static get NAME() {
    return NAME$f;
  }
  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  // Private
  _getContentForTemplate() {
    return {
      [SELECTOR_TITLE]: this._getTitle(),
      [SELECTOR_CONTENT]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Popover.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
};
const NAME$e = "popover";
const EVENT_SHOW_BS$4 = "show.bs.popover";
const EVENT_SHOWN_BS$4 = "shown.bs.popover";
const EVENT_HIDE_BS$4 = "hide.bs.popover";
const EVENT_HIDDEN_BS$4 = "hidden.bs.popover";
const EVENT_INSERTED_BS$1 = "inserted.bs.popover";
const EXTENDED_EVENTS$3 = [
  { name: "show" },
  { name: "shown" },
  { name: "hide" },
  { name: "hidden" },
  { name: "inserted" }
];
class Popover2 extends Popover$1 {
  constructor(element2, data) {
    super(element2, data);
    this._init();
    Manipulator$1.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }
  dispose() {
    EventHandler$1.off(this.element, EVENT_SHOW_BS$4);
    EventHandler$1.off(this.element, EVENT_SHOWN_BS$4);
    EventHandler$1.off(this.element, EVENT_HIDE_BS$4);
    EventHandler$1.off(this.element, EVENT_HIDDEN_BS$4);
    EventHandler$1.off(this.element, EVENT_INSERTED_BS$1);
    Manipulator$1.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);
    super.dispose();
  }
  // Getters
  static get NAME() {
    return NAME$e;
  }
  // Private
  _init() {
    this._bindMdbEvents();
  }
  _bindMdbEvents() {
    EventHandler$1.extend(this._element, EXTENDED_EVENTS$3, NAME$e);
  }
}
const NAME$d = "scrollspy";
const DATA_KEY$a = "bs.scrollspy";
const EVENT_KEY$7 = `.${DATA_KEY$a}`;
const EVENT_ACTIVATE$1 = `activate${EVENT_KEY$7}`;
const EVENT_CLICK = `click${EVENT_KEY$7}`;
const CLASS_NAME_DROPDOWN_ITEM = "dropdown-item";
const CLASS_NAME_ACTIVE$2 = "active";
const SELECTOR_TARGET_LINKS = "[href]";
const SELECTOR_NAV_LIST_GROUP = ".nav, .list-group";
const SELECTOR_NAV_LINKS = ".nav-link";
const SELECTOR_NAV_ITEMS = ".nav-item";
const SELECTOR_LIST_ITEMS = ".list-group-item";
const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
const SELECTOR_DROPDOWN = ".dropdown";
const SELECTOR_DROPDOWN_TOGGLE$1 = ".dropdown-toggle";
const Default$5 = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "0px 0px -25%",
  smoothScroll: false,
  target: null,
  threshold: [0.1, 0.5, 1]
};
const DefaultType$5 = {
  offset: "(number|null)",
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "string",
  smoothScroll: "boolean",
  target: "element",
  threshold: "array"
};
let ScrollSpy$1 = class ScrollSpy extends BaseComponent$1 {
  constructor(element2, config) {
    super(element2, config);
    if (!this._config.target) {
      return;
    }
    this._targetLinks = /* @__PURE__ */ new Map();
    this._observableSections = /* @__PURE__ */ new Map();
    this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element;
    this._activeTarget = null;
    this._observer = null;
    this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    };
    this.refresh();
  }
  // Getters
  static get Default() {
    return Default$5;
  }
  static get DefaultType() {
    return DefaultType$5;
  }
  static get NAME() {
    return NAME$d;
  }
  // Public
  refresh() {
    this._initializeTargetsAndObservables();
    this._maybeEnableSmoothScroll();
    if (this._observer) {
      this._observer.disconnect();
    } else {
      this._observer = this._getNewObserver();
    }
    for (const section of this._observableSections.values()) {
      this._observer.observe(section);
    }
  }
  dispose() {
    if (this._observer) {
      this._observer.disconnect();
    }
    super.dispose();
  }
  // Private
  _configAfterMerge(config) {
    config.target = getElement(config.target) || document.body;
    config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
    if (typeof config.threshold === "string") {
      config.threshold = config.threshold.split(",").map((value) => Number.parseFloat(value));
    }
    return config;
  }
  _maybeEnableSmoothScroll() {
    if (!this._config.smoothScroll) {
      return;
    }
    EventHandler.off(this._config.target, EVENT_CLICK);
    EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, (event) => {
      const observableSection = this._observableSections.get(event.target.hash);
      if (observableSection) {
        event.preventDefault();
        const root = this._rootElement || window;
        const height = observableSection.offsetTop - this._element.offsetTop;
        if (root.scrollTo) {
          root.scrollTo({ top: height, behavior: "smooth" });
          return;
        }
        root.scrollTop = height;
      }
    });
  }
  _getNewObserver() {
    const options = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin
    };
    return new IntersectionObserver((entries) => this._observerCallback(entries), options);
  }
  // The logic of selection
  _observerCallback(entries) {
    const targetElement = (entry) => this._targetLinks.get(`#${entry.target.id}`);
    const activate = (entry) => {
      this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
      this._process(targetElement(entry));
    };
    const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
    const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = parentScrollTop;
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        this._activeTarget = null;
        this._clearActiveClass(targetElement(entry));
        continue;
      }
      const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (userScrollsDown && entryIsLowerThanPrevious) {
        activate(entry);
        if (!parentScrollTop) {
          return;
        }
        continue;
      }
      if (!userScrollsDown && !entryIsLowerThanPrevious) {
        activate(entry);
      }
    }
  }
  _initializeTargetsAndObservables() {
    this._targetLinks = /* @__PURE__ */ new Map();
    this._observableSections = /* @__PURE__ */ new Map();
    const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
    for (const anchor of targetLinks) {
      if (!anchor.hash || isDisabled(anchor)) {
        continue;
      }
      const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);
      if (isVisible(observableSection)) {
        this._targetLinks.set(decodeURI(anchor.hash), anchor);
        this._observableSections.set(anchor.hash, observableSection);
      }
    }
  }
  _process(target) {
    if (this._activeTarget === target) {
      return;
    }
    this._clearActiveClass(this._config.target);
    this._activeTarget = target;
    target.classList.add(CLASS_NAME_ACTIVE$2);
    this._activateParents(target);
    EventHandler.trigger(this._element, EVENT_ACTIVATE$1, { relatedTarget: target });
  }
  _activateParents(target) {
    if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
      SelectorEngine.findOne(
        SELECTOR_DROPDOWN_TOGGLE$1,
        target.closest(SELECTOR_DROPDOWN)
      ).classList.add(CLASS_NAME_ACTIVE$2);
      return;
    }
    for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
      for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
        item.classList.add(CLASS_NAME_ACTIVE$2);
      }
    }
  }
  _clearActiveClass(parent) {
    parent.classList.remove(CLASS_NAME_ACTIVE$2);
    const activeNodes = SelectorEngine.find(
      `${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$2}`,
      parent
    );
    for (const node of activeNodes) {
      node.classList.remove(CLASS_NAME_ACTIVE$2);
    }
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = ScrollSpy.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
};
const NAME$c = "scrollspy";
const DATA_KEY$9 = `mdb.${NAME$c}`;
const EVENT_KEY$6 = `.${DATA_KEY$9}`;
const EVENT_ACTIVATE_BS = "activate.bs.scrollspy";
const EVENT_ACTIVATE = `activate${EVENT_KEY$6}`;
const CLASS_COLLAPSIBLE = "collapsible-scrollspy";
const CLASS_ACTIVE = "active";
const SELECTOR_LIST = "ul";
const SELECTOR_ACTIVE = `.${CLASS_ACTIVE}`;
const SELECTOR_COLLAPSIBLE_SCROLLSPY = `.${CLASS_COLLAPSIBLE}`;
class ScrollSpy2 extends ScrollSpy$1 {
  constructor(element2, data) {
    super(element2, data);
    this._collapsibles = [];
    this._init();
    Manipulator$1.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }
  dispose() {
    EventHandler$1.off(this._scrollElement, EVENT_ACTIVATE_BS);
    Manipulator$1.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);
    super.dispose();
  }
  // Getters
  static get NAME() {
    return NAME$c;
  }
  // Private
  _init() {
    this._bindActivateEvent();
    this._getCollapsibles();
    if (this._collapsibles.length === 0) {
      return;
    }
    this._showSubsection();
    this._hideSubsection();
  }
  _getHeight(element2) {
    return element2.offsetHeight;
  }
  _hide(target) {
    const itemsToHide = SelectorEngine$1.findOne(SELECTOR_LIST, target.parentNode);
    itemsToHide.style.overflow = "hidden";
    itemsToHide.style.height = `${0}px`;
  }
  _show(target, destinedHeight) {
    target.style.height = destinedHeight;
  }
  _getCollapsibles() {
    const collapsibleElements = SelectorEngine$1.find(SELECTOR_COLLAPSIBLE_SCROLLSPY);
    if (!collapsibleElements) {
      return;
    }
    collapsibleElements.forEach((collapsibleElement) => {
      const listParent = collapsibleElement.parentNode;
      const list = SelectorEngine$1.findOne(SELECTOR_LIST, listParent);
      const listHeight = list.offsetHeight;
      this._collapsibles.push({
        element: list,
        relatedTarget: collapsibleElement.getAttribute("href"),
        height: `${listHeight}px`
      });
    });
  }
  _showSubsection() {
    const activeElements = SelectorEngine$1.find(SELECTOR_ACTIVE);
    const actives = activeElements.filter((active) => {
      return Manipulator$1.hasClass(active, CLASS_COLLAPSIBLE);
    });
    actives.forEach((active) => {
      const list = SelectorEngine$1.findOne(SELECTOR_LIST, active.parentNode);
      const height = this._collapsibles.find((collapsible) => {
        return collapsible.relatedTarget = active.getAttribute("href");
      }).height;
      this._show(list, height);
    });
  }
  _hideSubsection() {
    const unactives = SelectorEngine$1.find(SELECTOR_COLLAPSIBLE_SCROLLSPY).filter((collapsible) => {
      return Manipulator$1.hasClass(collapsible, "active") === false;
    });
    unactives.forEach((unactive) => {
      this._hide(unactive);
    });
  }
  _bindActivateEvent() {
    EventHandler$1.on(this._element, EVENT_ACTIVATE_BS, (e) => {
      this._showSubsection();
      this._hideSubsection();
      EventHandler$1.trigger(this._element, EVENT_ACTIVATE, {
        relatedTarget: e.relatedTarget
      });
    });
  }
}
const NAME$b = "tab";
const DATA_KEY$8 = "bs.tab";
const EVENT_KEY$5 = `.${DATA_KEY$8}`;
const EVENT_HIDE$5 = `hide${EVENT_KEY$5}`;
const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$5}`;
const EVENT_SHOW$5 = `show${EVENT_KEY$5}`;
const EVENT_SHOWN$5 = `shown${EVENT_KEY$5}`;
const EVENT_KEYDOWN = `keydown${EVENT_KEY$5}`;
const ARROW_LEFT_KEY = "ArrowLeft";
const ARROW_RIGHT_KEY = "ArrowRight";
const ARROW_UP_KEY$1 = "ArrowUp";
const ARROW_DOWN_KEY$1 = "ArrowDown";
const HOME_KEY = "Home";
const END_KEY = "End";
const CLASS_NAME_ACTIVE$1 = "active";
const CLASS_NAME_FADE$2 = "fade";
const CLASS_NAME_SHOW$4 = "show";
const CLASS_DROPDOWN = "dropdown";
const SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
const SELECTOR_DROPDOWN_MENU = ".dropdown-menu";
const NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
const SELECTOR_OUTER = ".nav-item, .list-group-item";
const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
const SELECTOR_DATA_TOGGLE$2 = "[data-mdb-tab-initialized]";
const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE$2}`;
let Tab$1 = class Tab extends BaseComponent$1 {
  constructor(element2) {
    super(element2);
    this._parent = this._element.closest(SELECTOR_TAB_PANEL);
    if (!this._parent) {
      return;
    }
    this._setInitialAttributes(this._parent, this._getChildren());
    EventHandler.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
  }
  // Getters
  static get NAME() {
    return NAME$b;
  }
  // Public
  show() {
    const innerElem = this._element;
    if (this._elemIsActive(innerElem)) {
      return;
    }
    const active = this._getActiveElem();
    const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$5, { relatedTarget: innerElem }) : null;
    const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$5, { relatedTarget: active });
    if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
      return;
    }
    this._deactivate(active, innerElem);
    this._activate(innerElem, active);
  }
  // Private
  _activate(element2, relatedElem) {
    if (!element2) {
      return;
    }
    element2.classList.add(CLASS_NAME_ACTIVE$1);
    this._activate(SelectorEngine.getElementFromSelector(element2));
    const complete = () => {
      if (element2.getAttribute("role") !== "tab") {
        element2.classList.add(CLASS_NAME_SHOW$4);
        return;
      }
      element2.removeAttribute("tabindex");
      element2.setAttribute("aria-selected", true);
      this._toggleDropDown(element2, true);
      EventHandler.trigger(element2, EVENT_SHOWN$5, {
        relatedTarget: relatedElem
      });
    };
    this._queueCallback(complete, element2, element2.classList.contains(CLASS_NAME_FADE$2));
  }
  _deactivate(element2, relatedElem) {
    if (!element2) {
      return;
    }
    element2.classList.remove(CLASS_NAME_ACTIVE$1);
    element2.blur();
    this._deactivate(SelectorEngine.getElementFromSelector(element2));
    const complete = () => {
      if (element2.getAttribute("role") !== "tab") {
        element2.classList.remove(CLASS_NAME_SHOW$4);
        return;
      }
      element2.setAttribute("aria-selected", false);
      element2.setAttribute("tabindex", "-1");
      this._toggleDropDown(element2, false);
      EventHandler.trigger(element2, EVENT_HIDDEN$5, { relatedTarget: relatedElem });
    };
    this._queueCallback(complete, element2, element2.classList.contains(CLASS_NAME_FADE$2));
  }
  _keydown(event) {
    if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY$1, ARROW_DOWN_KEY$1, HOME_KEY, END_KEY].includes(
      event.key
    )) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    const children = this._getChildren().filter((element2) => !isDisabled(element2));
    let nextActiveElement;
    if ([HOME_KEY, END_KEY].includes(event.key)) {
      nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
    } else {
      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY$1].includes(event.key);
      nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
    }
    if (nextActiveElement) {
      nextActiveElement.focus({ preventScroll: true });
      Tab.getOrCreateInstance(nextActiveElement).show();
    }
  }
  _getChildren() {
    return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find((child) => this._elemIsActive(child)) || null;
  }
  _setInitialAttributes(parent, children) {
    this._setAttributeIfNotExists(parent, "role", "tablist");
    for (const child of children) {
      this._setInitialAttributesOnChild(child);
    }
  }
  _setInitialAttributesOnChild(child) {
    child = this._getInnerElement(child);
    const isActive = this._elemIsActive(child);
    const outerElem = this._getOuterElement(child);
    child.setAttribute("aria-selected", isActive);
    if (outerElem !== child) {
      this._setAttributeIfNotExists(outerElem, "role", "presentation");
    }
    if (!isActive) {
      child.setAttribute("tabindex", "-1");
    }
    this._setAttributeIfNotExists(child, "role", "tab");
    this._setInitialAttributesOnTargetPanel(child);
  }
  _setInitialAttributesOnTargetPanel(child) {
    const target = SelectorEngine.getElementFromSelector(child);
    if (!target) {
      return;
    }
    this._setAttributeIfNotExists(target, "role", "tabpanel");
    if (child.id) {
      this._setAttributeIfNotExists(target, "aria-labelledby", `${child.id}`);
    }
  }
  _toggleDropDown(element2, open) {
    const outerElem = this._getOuterElement(element2);
    if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
      return;
    }
    const toggle = (selector, className) => {
      const element3 = SelectorEngine.findOne(selector, outerElem);
      if (element3) {
        element3.classList.toggle(className, open);
      }
    };
    toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE$1);
    toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$4);
    outerElem.setAttribute("aria-expanded", open);
  }
  _setAttributeIfNotExists(element2, attribute, value) {
    if (!element2.hasAttribute(attribute)) {
      element2.setAttribute(attribute, value);
    }
  }
  _elemIsActive(elem) {
    return elem.classList.contains(CLASS_NAME_ACTIVE$1);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(elem) {
    return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(elem) {
    return elem.closest(SELECTOR_OUTER) || elem;
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Tab.getOrCreateInstance(this);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
};
const NAME$a = "tab";
const DATA_KEY$7 = `mdb.${NAME$a}`;
const EVENT_KEY$4 = `.${DATA_KEY$7}`;
const EVENT_SHOW_BS$3 = "show.bs.tab";
const EVENT_SHOWN_BS$3 = "shown.bs.tab";
const EVENT_HIDE_BS$3 = "hide.bs.tab";
const EVENT_HIDDEN_BS$3 = "hidden.bs.tab";
const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
const CLASS_NAME_ACTIVE = "active";
const CLASS_NAME_FADE$1 = "fade";
const CLASS_NAME_SHOW$3 = "show";
class Tab2 extends Tab$1 {
  constructor(element2) {
    super(element2);
    Manipulator$1.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }
  dispose() {
    EventHandler$1.off(this._element, EVENT_SHOW_BS$3);
    EventHandler$1.off(this._element, EVENT_SHOWN_BS$3);
    Manipulator$1.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);
    super.dispose();
  }
  // Getters
  static get NAME() {
    return NAME$a;
  }
  // Override
  show() {
    const innerElem = this._element;
    if (this._elemIsActive(innerElem)) {
      return;
    }
    const active = this._getActiveElem();
    let hideEvent = null;
    let hideEventMdb = null;
    if (active) {
      hideEvent = EventHandler$1.trigger(active, EVENT_HIDE_BS$3, { relatedTarget: innerElem });
      hideEventMdb = EventHandler$1.trigger(active, EVENT_HIDE$4, { relatedTarget: innerElem });
    }
    const showEvent = EventHandler$1.trigger(innerElem, EVENT_SHOW_BS$3, { relatedTarget: active });
    const showEventMdb = EventHandler$1.trigger(innerElem, EVENT_SHOW$4, { relatedTarget: active });
    if (showEvent.defaultPrevented || showEventMdb.defaultPrevented || hideEvent && hideEvent.defaultPrevented || hideEventMdb && hideEventMdb.defaultPrevented) {
      return;
    }
    this._deactivate(active, innerElem);
    this._activate(innerElem, active);
  }
  _activate(element2, relatedElem) {
    if (!element2) {
      return;
    }
    element2.classList.add(CLASS_NAME_ACTIVE);
    this._activate(getElementFromSelector(element2));
    const complete = () => {
      if (element2.getAttribute("role") !== "tab") {
        element2.classList.add(CLASS_NAME_SHOW$3);
        return;
      }
      element2.focus();
      element2.removeAttribute("tabindex");
      element2.setAttribute("aria-selected", true);
      this._toggleDropDown(element2, true);
      EventHandler$1.trigger(element2, EVENT_SHOWN_BS$3, {
        relatedTarget: relatedElem
      });
      EventHandler$1.trigger(element2, EVENT_SHOWN$4, {
        relatedTarget: relatedElem
      });
    };
    this._queueCallback(complete, element2, element2.classList.contains(CLASS_NAME_FADE$1));
  }
  _deactivate(element2, relatedElem) {
    if (!element2) {
      return;
    }
    element2.classList.remove(CLASS_NAME_ACTIVE);
    element2.blur();
    this._deactivate(getElementFromSelector(element2));
    const complete = () => {
      if (element2.getAttribute("role") !== "tab") {
        element2.classList.remove(CLASS_NAME_SHOW$3);
        return;
      }
      element2.setAttribute("aria-selected", false);
      element2.setAttribute("tabindex", "-1");
      this._toggleDropDown(element2, false);
      EventHandler$1.trigger(element2, EVENT_HIDDEN_BS$3, { relatedTarget: relatedElem });
      EventHandler$1.trigger(element2, EVENT_HIDDEN$4, { relatedTarget: relatedElem });
    };
    this._queueCallback(complete, element2, element2.classList.contains(CLASS_NAME_FADE$1));
  }
}
const NAME$9 = "tooltip";
const EVENT_HIDE_BS$2 = "hide.bs.tooltip";
const EVENT_HIDDEN_BS$2 = "hidden.bs.tooltip";
const EVENT_SHOW_BS$2 = "show.bs.tooltip";
const EVENT_SHOWN_BS$2 = "shown.bs.tooltip";
const EVENT_INSERTED_BS = "inserted.bs.tooltip";
const EXTENDED_EVENTS$2 = [
  { name: "show" },
  { name: "shown" },
  { name: "hide" },
  { name: "hidden" },
  { name: "inserted" }
];
class Tooltip2 extends Tooltip$1 {
  constructor(element2, data) {
    super(element2, data);
    this._init();
    Manipulator$1.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }
  dispose() {
    EventHandler$1.off(this._element, EVENT_SHOW_BS$2);
    EventHandler$1.off(this._element, EVENT_SHOWN_BS$2);
    EventHandler$1.off(this._element, EVENT_HIDE_BS$2);
    EventHandler$1.off(this._element, EVENT_HIDDEN_BS$2);
    EventHandler$1.off(this._element, EVENT_INSERTED_BS);
    Manipulator$1.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);
    super.dispose();
  }
  // Getters
  static get NAME() {
    return NAME$9;
  }
  // Private
  _init() {
    this._bindMdbEvents();
  }
  _bindMdbEvents() {
    EventHandler$1.extend(this._element, EXTENDED_EVENTS$2, NAME$9);
  }
}
const NAME$8 = "toast";
const DATA_KEY$6 = "bs.toast";
const EVENT_KEY$3 = `.${DATA_KEY$6}`;
const EVENT_MOUSEOVER = `mouseover${EVENT_KEY$3}`;
const EVENT_MOUSEOUT = `mouseout${EVENT_KEY$3}`;
const EVENT_FOCUSIN = `focusin${EVENT_KEY$3}`;
const EVENT_FOCUSOUT = `focusout${EVENT_KEY$3}`;
const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
const CLASS_NAME_FADE = "fade";
const CLASS_NAME_HIDE = "hide";
const CLASS_NAME_SHOW$2 = "show";
const CLASS_NAME_SHOWING = "showing";
const DefaultType$4 = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
};
const Default$4 = {
  animation: true,
  autohide: true,
  delay: 5e3
};
let Toast$1 = class Toast extends BaseComponent$1 {
  constructor(element2, config) {
    super(element2, config);
    this._timeout = null;
    this._hasMouseInteraction = false;
    this._hasKeyboardInteraction = false;
    this._setListeners();
  }
  // Getters
  static get Default() {
    return Default$4;
  }
  static get DefaultType() {
    return DefaultType$4;
  }
  static get NAME() {
    return NAME$8;
  }
  // Public
  show() {
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3);
    if (showEvent.defaultPrevented) {
      return;
    }
    this._clearTimeout();
    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE);
    }
    const complete = () => {
      this._element.classList.remove(CLASS_NAME_SHOWING);
      EventHandler.trigger(this._element, EVENT_SHOWN$3);
      this._maybeScheduleHide();
    };
    this._element.classList.remove(CLASS_NAME_HIDE);
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOW$2, CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown()) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const complete = () => {
      this._element.classList.add(CLASS_NAME_HIDE);
      this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW$2);
      EventHandler.trigger(this._element, EVENT_HIDDEN$3);
    };
    this._element.classList.add(CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout();
    if (this.isShown()) {
      this._element.classList.remove(CLASS_NAME_SHOW$2);
    }
    super.dispose();
  }
  isShown() {
    return this._element.classList.contains(CLASS_NAME_SHOW$2);
  }
  // Private
  _maybeScheduleHide() {
    if (!this._config.autohide) {
      return;
    }
    if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
      return;
    }
    this._timeout = setTimeout(() => {
      this.hide();
    }, this._config.delay);
  }
  _onInteraction(event, isInteracting) {
    switch (event.type) {
      case "mouseover":
      case "mouseout": {
        this._hasMouseInteraction = isInteracting;
        break;
      }
      case "focusin":
      case "focusout": {
        this._hasKeyboardInteraction = isInteracting;
        break;
      }
    }
    if (isInteracting) {
      this._clearTimeout();
      return;
    }
    const nextElement = event.relatedTarget;
    if (this._element === nextElement || this._element.contains(nextElement)) {
      return;
    }
    this._maybeScheduleHide();
  }
  _setListeners() {
    EventHandler.on(this._element, EVENT_MOUSEOVER, (event) => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_MOUSEOUT, (event) => this._onInteraction(event, false));
    EventHandler.on(this._element, EVENT_FOCUSIN, (event) => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_FOCUSOUT, (event) => this._onInteraction(event, false));
  }
  _clearTimeout() {
    clearTimeout(this._timeout);
    this._timeout = null;
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Toast.getOrCreateInstance(this, config);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      }
    });
  }
};
const NAME$7 = "toast";
const EVENT_SHOW_BS$1 = "show.bs.toast";
const EVENT_SHOWN_BS$1 = "shown.bs.toast";
const EVENT_HIDE_BS$1 = "hide.bs.toast";
const EVENT_HIDDEN_BS$1 = "hidden.bs.toast";
const EXTENDED_EVENTS$1 = [{ name: "show" }, { name: "shown" }, { name: "hide" }, { name: "hidden" }];
class Toast2 extends Toast$1 {
  constructor(element2, data) {
    super(element2, data);
    this._init();
    Manipulator$1.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }
  dispose() {
    EventHandler$1.off(this._element, EVENT_SHOW_BS$1);
    EventHandler$1.off(this._element, EVENT_SHOWN_BS$1);
    EventHandler$1.off(this._element, EVENT_HIDE_BS$1);
    EventHandler$1.off(this._element, EVENT_HIDDEN_BS$1);
    Manipulator$1.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);
    super.dispose();
  }
  // Getters
  static get NAME() {
    return NAME$7;
  }
  // Private
  _init() {
    this._bindMdbEvents();
  }
  _bindMdbEvents() {
    EventHandler$1.extend(this._element, EXTENDED_EVENTS$1, NAME$7);
  }
}
(() => {
  var e = { 454: (e2, t2, n2) => {
    n2.d(t2, { Z: () => a });
    var r = n2(645), o = n2.n(r)()(function(e3) {
      return e3[1];
    });
    o.push([e2.id, "INPUT:-webkit-autofill,SELECT:-webkit-autofill,TEXTAREA:-webkit-autofill{animation-name:onautofillstart}INPUT:not(:-webkit-autofill),SELECT:not(:-webkit-autofill),TEXTAREA:not(:-webkit-autofill){animation-name:onautofillcancel}@keyframes onautofillstart{}@keyframes onautofillcancel{}", ""]);
    const a = o;
  }, 645: (e2) => {
    e2.exports = function(e3) {
      var t2 = [];
      return t2.toString = function() {
        return this.map(function(t3) {
          var n2 = e3(t3);
          return t3[2] ? "@media ".concat(t3[2], " {").concat(n2, "}") : n2;
        }).join("");
      }, t2.i = function(e4, n2, r) {
        "string" == typeof e4 && (e4 = [[null, e4, ""]]);
        var o = {};
        if (r)
          for (var a = 0; a < this.length; a++) {
            var i = this[a][0];
            null != i && (o[i] = true);
          }
        for (var u = 0; u < e4.length; u++) {
          var c = [].concat(e4[u]);
          r && o[c[0]] || (n2 && (c[2] ? c[2] = "".concat(n2, " and ").concat(c[2]) : c[2] = n2), t2.push(c));
        }
      }, t2;
    };
  }, 810: () => {
    !function() {
      if ("undefined" != typeof window)
        try {
          var e2 = new window.CustomEvent("test", { cancelable: true });
          if (e2.preventDefault(), true !== e2.defaultPrevented)
            throw new Error("Could not prevent default");
        } catch (e3) {
          var t2 = function(e4, t3) {
            var n2, r;
            return (t3 = t3 || {}).bubbles = !!t3.bubbles, t3.cancelable = !!t3.cancelable, (n2 = document.createEvent("CustomEvent")).initCustomEvent(e4, t3.bubbles, t3.cancelable, t3.detail), r = n2.preventDefault, n2.preventDefault = function() {
              r.call(this);
              try {
                Object.defineProperty(this, "defaultPrevented", { get: function() {
                  return true;
                } });
              } catch (e5) {
                this.defaultPrevented = true;
              }
            }, n2;
          };
          t2.prototype = window.Event.prototype, window.CustomEvent = t2;
        }
    }();
  }, 379: (e2, t2, n2) => {
    var r, o = function() {
      var e3 = {};
      return function(t3) {
        if (void 0 === e3[t3]) {
          var n3 = document.querySelector(t3);
          if (window.HTMLIFrameElement && n3 instanceof window.HTMLIFrameElement)
            try {
              n3 = n3.contentDocument.head;
            } catch (e4) {
              n3 = null;
            }
          e3[t3] = n3;
        }
        return e3[t3];
      };
    }(), a = [];
    function i(e3) {
      for (var t3 = -1, n3 = 0; n3 < a.length; n3++)
        if (a[n3].identifier === e3) {
          t3 = n3;
          break;
        }
      return t3;
    }
    function u(e3, t3) {
      for (var n3 = {}, r2 = [], o2 = 0; o2 < e3.length; o2++) {
        var u2 = e3[o2], c2 = t3.base ? u2[0] + t3.base : u2[0], l2 = n3[c2] || 0, s2 = "".concat(c2, " ").concat(l2);
        n3[c2] = l2 + 1;
        var d2 = i(s2), f2 = { css: u2[1], media: u2[2], sourceMap: u2[3] };
        -1 !== d2 ? (a[d2].references++, a[d2].updater(f2)) : a.push({ identifier: s2, updater: m(f2, t3), references: 1 }), r2.push(s2);
      }
      return r2;
    }
    function c(e3) {
      var t3 = document.createElement("style"), r2 = e3.attributes || {};
      if (void 0 === r2.nonce) {
        var a2 = n2.nc;
        a2 && (r2.nonce = a2);
      }
      if (Object.keys(r2).forEach(function(e4) {
        t3.setAttribute(e4, r2[e4]);
      }), "function" == typeof e3.insert)
        e3.insert(t3);
      else {
        var i2 = o(e3.insert || "head");
        if (!i2)
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
        i2.appendChild(t3);
      }
      return t3;
    }
    var l, s = (l = [], function(e3, t3) {
      return l[e3] = t3, l.filter(Boolean).join("\n");
    });
    function d(e3, t3, n3, r2) {
      var o2 = n3 ? "" : r2.media ? "@media ".concat(r2.media, " {").concat(r2.css, "}") : r2.css;
      if (e3.styleSheet)
        e3.styleSheet.cssText = s(t3, o2);
      else {
        var a2 = document.createTextNode(o2), i2 = e3.childNodes;
        i2[t3] && e3.removeChild(i2[t3]), i2.length ? e3.insertBefore(a2, i2[t3]) : e3.appendChild(a2);
      }
    }
    function f(e3, t3, n3) {
      var r2 = n3.css, o2 = n3.media, a2 = n3.sourceMap;
      if (o2 ? e3.setAttribute("media", o2) : e3.removeAttribute("media"), a2 && "undefined" != typeof btoa && (r2 += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a2)))), " */")), e3.styleSheet)
        e3.styleSheet.cssText = r2;
      else {
        for (; e3.firstChild; )
          e3.removeChild(e3.firstChild);
        e3.appendChild(document.createTextNode(r2));
      }
    }
    var v = null, p = 0;
    function m(e3, t3) {
      var n3, r2, o2;
      if (t3.singleton) {
        var a2 = p++;
        n3 = v || (v = c(t3)), r2 = d.bind(null, n3, a2, false), o2 = d.bind(null, n3, a2, true);
      } else
        n3 = c(t3), r2 = f.bind(null, n3, t3), o2 = function() {
          !function(e4) {
            if (null === e4.parentNode)
              return false;
            e4.parentNode.removeChild(e4);
          }(n3);
        };
      return r2(e3), function(t4) {
        if (t4) {
          if (t4.css === e3.css && t4.media === e3.media && t4.sourceMap === e3.sourceMap)
            return;
          r2(e3 = t4);
        } else
          o2();
      };
    }
    e2.exports = function(e3, t3) {
      (t3 = t3 || {}).singleton || "boolean" == typeof t3.singleton || (t3.singleton = (void 0 === r && (r = Boolean(window && document && document.all && !window.atob)), r));
      var n3 = u(e3 = e3 || [], t3);
      return function(e4) {
        if (e4 = e4 || [], "[object Array]" === Object.prototype.toString.call(e4)) {
          for (var r2 = 0; r2 < n3.length; r2++) {
            var o2 = i(n3[r2]);
            a[o2].references--;
          }
          for (var c2 = u(e4, t3), l2 = 0; l2 < n3.length; l2++) {
            var s2 = i(n3[l2]);
            0 === a[s2].references && (a[s2].updater(), a.splice(s2, 1));
          }
          n3 = c2;
        }
      };
    };
  } }, t = {};
  function n(r) {
    var o = t[r];
    if (void 0 !== o)
      return o.exports;
    var a = t[r] = { id: r, exports: {} };
    return e[r](a, a.exports, n), a.exports;
  }
  n.n = (e2) => {
    var t2 = e2 && e2.__esModule ? () => e2.default : () => e2;
    return n.d(t2, { a: t2 }), t2;
  }, n.d = (e2, t2) => {
    for (var r in t2)
      n.o(t2, r) && !n.o(e2, r) && Object.defineProperty(e2, r, { enumerable: true, get: t2[r] });
  }, n.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), (() => {
    var e2 = n(379), t2 = n.n(e2), r = n(454);
    function o(e3) {
      if (!e3.hasAttribute("autocompleted")) {
        e3.setAttribute("autocompleted", "");
        var t3 = new window.CustomEvent("onautocomplete", { bubbles: true, cancelable: true, detail: null });
        e3.dispatchEvent(t3) || (e3.value = "");
      }
    }
    function a(e3) {
      e3.hasAttribute("autocompleted") && (e3.removeAttribute("autocompleted"), e3.dispatchEvent(new window.CustomEvent("onautocomplete", { bubbles: true, cancelable: false, detail: null })));
    }
    t2()(r.Z, { insert: "head", singleton: false }), r.Z.locals, n(810), document.addEventListener("animationstart", function(e3) {
      "onautofillstart" === e3.animationName ? o(e3.target) : a(e3.target);
    }, true), document.addEventListener("input", function(e3) {
      "insertReplacementText" !== e3.inputType && "data" in e3 ? a(e3.target) : o(e3.target);
    }, true);
  })();
})();
class BaseComponent2 {
  constructor(element2) {
    element2 = getElement$1(element2);
    if (!element2) {
      return;
    }
    this._element = element2;
    Data$1.setData(this._element, this.constructor.DATA_KEY, this);
  }
  dispose() {
    Data$1.removeData(this._element, this.constructor.DATA_KEY);
    EventHandler$1.off(this._element, this.constructor.EVENT_KEY);
    Object.getOwnPropertyNames(this).forEach((propertyName) => {
      this[propertyName] = null;
    });
  }
  /** Static */
  static getInstance(element2) {
    return Data$1.getData(getElement$1(element2), this.DATA_KEY);
  }
  static getOrCreateInstance(element2, config = {}) {
    return this.getInstance(element2) || new this(element2, typeof config === "object" ? config : null);
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  static get DATA_KEY() {
    return `mdb.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
}
const NAME$6 = "input";
const DATA_KEY$5 = "mdb.input";
const CLASSNAME_ACTIVE$1 = "active";
const CLASSNAME_NOTCH = "form-notch";
const CLASSNAME_NOTCH_LEADING = "form-notch-leading";
const CLASSNAME_NOTCH_MIDDLE = "form-notch-middle";
const CLASSNAME_NOTCH_TRAILING = "form-notch-trailing";
const CLASSNAME_PLACEHOLDER_ACTIVE = "placeholder-active";
const CLASSNAME_HELPER = "form-helper";
const CLASSNAME_COUNTER = "form-counter";
const SELECTOR_NOTCH = `.${CLASSNAME_NOTCH}`;
const SELECTOR_NOTCH_LEADING = `.${CLASSNAME_NOTCH_LEADING}`;
const SELECTOR_NOTCH_MIDDLE = `.${CLASSNAME_NOTCH_MIDDLE}`;
const SELECTOR_HELPER = `.${CLASSNAME_HELPER}`;
class Input extends BaseComponent2 {
  constructor(element2) {
    super(element2);
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
      Manipulator$1.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
      bindCallbackEventsIfNeeded(this.constructor);
    }
  }
  // Getters
  static get NAME() {
    return NAME$6;
  }
  get input() {
    const inputElement = SelectorEngine$1.findOne("input", this._element) || SelectorEngine$1.findOne("textarea", this._element);
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
    Manipulator$1.addClass(this.input, CLASSNAME_ACTIVE$1);
  }
  forceInactive() {
    Manipulator$1.removeClass(this.input, CLASSNAME_ACTIVE$1);
  }
  dispose() {
    this._removeBorder();
    Manipulator$1.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);
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
    this._label = SelectorEngine$1.findOne("label", this._element);
    if (this._label === null) {
      this._showPlaceholder();
    } else {
      this._getLabelWidth();
      this._getLabelPositionInInputGroup();
      this._toggleDefaultDatePlaceholder();
    }
  }
  _getHelper() {
    this._helper = SelectorEngine$1.findOne(SELECTOR_HELPER, this._element);
  }
  _getCounter() {
    this._counter = Manipulator$1.getDataAttribute(this.input, "showcounter");
    if (this._counter) {
      this._maxLength = this.input.maxLength;
      this._showCounter();
    }
  }
  _showCounter() {
    const counters = SelectorEngine$1.find(".form-counter", this._element);
    if (counters.length > 0) {
      return;
    }
    this._counterElement = document.createElement("div");
    Manipulator$1.addClass(this._counterElement, CLASSNAME_COUNTER);
    const actualLength = this.input.value.length;
    this._counterElement.innerHTML = `${actualLength} / ${this._maxLength}`;
    this._helper.appendChild(this._counterElement);
    this._bindCounter();
  }
  _bindCounter() {
    EventHandler$1.on(this.input, "input", () => {
      const actualLength = this.input.value.length;
      this._counterElement.innerHTML = `${actualLength} / ${this._maxLength}`;
    });
  }
  _toggleDefaultDatePlaceholder(input = this.input) {
    const isTypeDate = input.getAttribute("type") === "date";
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
    Manipulator$1.addClass(this.input, CLASSNAME_PLACEHOLDER_ACTIVE);
  }
  _getNotchData() {
    this._notchMiddle = SelectorEngine$1.findOne(SELECTOR_NOTCH_MIDDLE, this._element);
    this._notchLeading = SelectorEngine$1.findOne(SELECTOR_NOTCH_LEADING, this._element);
  }
  _getLabelWidth() {
    this._labelWidth = this._label.clientWidth * 0.8 + 8;
  }
  _getLabelPositionInInputGroup() {
    this._labelMarginLeft = 0;
    if (!this._element.classList.contains("input-group"))
      return;
    const input = this.input;
    const prefix = SelectorEngine$1.prev(input, ".input-group-text")[0];
    if (prefix === void 0) {
      this._labelMarginLeft = 0;
    } else {
      this._labelMarginLeft = prefix.offsetWidth - 1;
    }
  }
  _applyDivs() {
    const allNotchWrappers = SelectorEngine$1.find(SELECTOR_NOTCH, this._element);
    const notchWrapper = element("div");
    Manipulator$1.addClass(notchWrapper, CLASSNAME_NOTCH);
    this._notchLeading = element("div");
    Manipulator$1.addClass(this._notchLeading, CLASSNAME_NOTCH_LEADING);
    this._notchMiddle = element("div");
    Manipulator$1.addClass(this._notchMiddle, CLASSNAME_NOTCH_MIDDLE);
    this._notchTrailing = element("div");
    Manipulator$1.addClass(this._notchTrailing, CLASSNAME_NOTCH_TRAILING);
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
    if (this._label === null)
      return;
    this._label.style.marginLeft = `${this._labelMarginLeft}px`;
  }
  _removeBorder() {
    const border = SelectorEngine$1.findOne(SELECTOR_NOTCH, this._element);
    if (border)
      border.remove();
  }
  _activate(event) {
    onDOMContentLoaded(() => {
      this._getElements(event);
      const input = event ? event.target : this.input;
      if (input.value !== "") {
        Manipulator$1.addClass(input, CLASSNAME_ACTIVE$1);
      }
      this._toggleDefaultDatePlaceholder(input);
    });
  }
  _getElements(event) {
    if (event) {
      this._element = event.target.parentNode;
      this._label = SelectorEngine$1.findOne("label", this._element);
    }
    if (event && this._label) {
      const prevLabelWidth = this._labelWidth;
      this._getLabelData();
      if (prevLabelWidth !== this._labelWidth) {
        this._notchMiddle = SelectorEngine$1.findOne(".form-notch-middle", event.target.parentNode);
        this._notchLeading = SelectorEngine$1.findOne(
          SELECTOR_NOTCH_LEADING,
          event.target.parentNode
        );
        this._applyNotch();
      }
    }
  }
  _deactivate(event) {
    const input = event ? event.target : this.input;
    if (input.value === "") {
      input.classList.remove(CLASSNAME_ACTIVE$1);
    }
    this._toggleDefaultDatePlaceholder(input);
  }
  static activate(instance) {
    return function(event) {
      instance._activate(event);
    };
  }
  static deactivate(instance) {
    return function(event) {
      instance._deactivate(event);
    };
  }
  static jQueryInterface(config, options) {
    return this.each(function() {
      let data = Data$1.getData(this, DATA_KEY$5);
      const _config = typeof config === "object" && config;
      if (!data && /dispose/.test(config)) {
        return;
      }
      if (!data) {
        data = new Input(this, _config);
      }
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](options);
      }
    });
  }
}
const NAME$5 = "collapse";
const DATA_KEY$4 = "bs.collapse";
const EVENT_KEY$2 = `.${DATA_KEY$4}`;
const EVENT_SHOW$2 = `show${EVENT_KEY$2}`;
const EVENT_SHOWN$2 = `shown${EVENT_KEY$2}`;
const EVENT_HIDE$2 = `hide${EVENT_KEY$2}`;
const EVENT_HIDDEN$2 = `hidden${EVENT_KEY$2}`;
const CLASS_NAME_SHOW$1 = "show";
const CLASS_NAME_COLLAPSE = "collapse";
const CLASS_NAME_COLLAPSING = "collapsing";
const CLASS_NAME_COLLAPSED = "collapsed";
const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
const CLASS_NAME_HORIZONTAL = "collapse-horizontal";
const WIDTH = "width";
const HEIGHT = "height";
const SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
const SELECTOR_DATA_TOGGLE$1 = "[data-mdb-collapse-init]";
const Default$3 = {
  parent: null,
  toggle: true
};
const DefaultType$3 = {
  parent: "(null|element)",
  toggle: "boolean"
};
let Collapse$1 = class Collapse extends BaseComponent$1 {
  constructor(element2, config) {
    super(element2, config);
    this._isTransitioning = false;
    this._triggerArray = [];
    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1);
    for (const elem of toggleList) {
      const selector = SelectorEngine.getSelectorFromElement(elem);
      const filterElement = SelectorEngine.find(selector).filter(
        (foundElement) => foundElement === this._element
      );
      if (selector !== null && filterElement.length) {
        this._triggerArray.push(elem);
      }
    }
    this._initializeChildren();
    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
    }
    if (this._config.toggle) {
      this.toggle();
    }
  }
  // Getters
  static get Default() {
    return Default$3;
  }
  static get DefaultType() {
    return DefaultType$3;
  }
  static get NAME() {
    return NAME$5;
  }
  // Public
  toggle() {
    if (this._isShown()) {
      this.hide();
    } else {
      this.show();
    }
  }
  show() {
    if (this._isTransitioning || this._isShown()) {
      return;
    }
    let activeChildren = [];
    if (this._config.parent) {
      activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter((element2) => element2 !== this._element).map((element2) => Collapse.getOrCreateInstance(element2, { toggle: false }));
    }
    if (activeChildren.length && activeChildren[0]._isTransitioning) {
      return;
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$2);
    if (startEvent.defaultPrevented) {
      return;
    }
    for (const activeInstance of activeChildren) {
      activeInstance.hide();
    }
    const dimension = this._getDimension();
    this._element.classList.remove(CLASS_NAME_COLLAPSE);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.style[dimension] = 0;
    this._addAriaAndCollapsedClass(this._triggerArray, true);
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$1);
      this._element.style[dimension] = "";
      EventHandler.trigger(this._element, EVENT_SHOWN$2);
    };
    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    const scrollSize = `scroll${capitalizedDimension}`;
    this._queueCallback(complete, this._element, true);
    this._element.style[dimension] = `${this._element[scrollSize]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown()) {
      return;
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);
    if (startEvent.defaultPrevented) {
      return;
    }
    const dimension = this._getDimension();
    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$1);
    for (const trigger of this._triggerArray) {
      const element2 = SelectorEngine.getElementFromSelector(trigger);
      if (element2 && !this._isShown(element2)) {
        this._addAriaAndCollapsedClass([trigger], false);
      }
    }
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE);
      EventHandler.trigger(this._element, EVENT_HIDDEN$2);
    };
    this._element.style[dimension] = "";
    this._queueCallback(complete, this._element, true);
  }
  _isShown(element2 = this._element) {
    return element2.classList.contains(CLASS_NAME_SHOW$1);
  }
  // Private
  _configAfterMerge(config) {
    config.toggle = Boolean(config.toggle);
    config.parent = getElement(config.parent);
    return config;
  }
  _getDimension() {
    return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
  }
  _initializeChildren() {
    if (!this._config.parent) {
      return;
    }
    const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$1);
    for (const element2 of children) {
      const selected = SelectorEngine.getElementFromSelector(element2);
      if (selected) {
        this._addAriaAndCollapsedClass([element2], this._isShown(selected));
      }
    }
  }
  _getFirstLevelChildren(selector) {
    const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
    return SelectorEngine.find(selector, this._config.parent).filter(
      (element2) => !children.includes(element2)
    );
  }
  _addAriaAndCollapsedClass(triggerArray, isOpen) {
    if (!triggerArray.length) {
      return;
    }
    for (const element2 of triggerArray) {
      element2.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
      element2.setAttribute("aria-expanded", isOpen);
    }
  }
  // Static
  static jQueryInterface(config) {
    const _config = {};
    if (typeof config === "string" && /show|hide/.test(config)) {
      _config.toggle = false;
    }
    return this.each(function() {
      const data = Collapse.getOrCreateInstance(this, _config);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
};
const NAME$4 = "collapse";
const EVENT_SHOW_BS = "show.bs.collapse";
const EVENT_SHOWN_BS = "shown.bs.collapse";
const EVENT_HIDE_BS = "hide.bs.collapse";
const EVENT_HIDDEN_BS = "hidden.bs.collapse";
const EXTENDED_EVENTS = [{ name: "show" }, { name: "shown" }, { name: "hide" }, { name: "hidden" }];
class Collapse2 extends Collapse$1 {
  constructor(element2, data = {}) {
    super(element2, data);
    this._init();
    Manipulator$1.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }
  dispose() {
    EventHandler$1.off(this._element, EVENT_SHOW_BS);
    EventHandler$1.off(this._element, EVENT_SHOWN_BS);
    EventHandler$1.off(this._element, EVENT_HIDE_BS);
    EventHandler$1.off(this._element, EVENT_HIDDEN_BS);
    Manipulator$1.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);
    super.dispose();
  }
  // Getters
  static get NAME() {
    return NAME$4;
  }
  // Private
  _init() {
    this._bindMdbEvents();
  }
  _bindMdbEvents() {
    EventHandler$1.extend(this._element, EXTENDED_EVENTS, NAME$4);
  }
}
const NAME$3 = "dropdown";
const DATA_KEY$3 = "bs.dropdown";
const EVENT_KEY$1 = `.${DATA_KEY$3}`;
const ESCAPE_KEY = "Escape";
const TAB_KEY = "Tab";
const ARROW_UP_KEY = "ArrowUp";
const ARROW_DOWN_KEY = "ArrowDown";
const RIGHT_MOUSE_BUTTON = 2;
const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
const CLASS_NAME_SHOW = "show";
const CLASS_NAME_DROPUP = "dropup";
const CLASS_NAME_DROPEND = "dropend";
const CLASS_NAME_DROPSTART = "dropstart";
const CLASS_NAME_DROPUP_CENTER = "dropup-center";
const CLASS_NAME_DROPDOWN_CENTER = "dropdown-center";
const SELECTOR_DATA_TOGGLE = "[data-mdb-dropdown-initialized]:not(.disabled):not(:disabled)";
const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE}.${CLASS_NAME_SHOW}`;
const SELECTOR_MENU = ".dropdown-menu";
const SELECTOR_NAVBAR = ".navbar";
const SELECTOR_NAVBAR_NAV = ".navbar-nav";
const SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
const PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
const PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
const PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
const PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
const PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
const PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
const PLACEMENT_TOPCENTER = "top";
const PLACEMENT_BOTTOMCENTER = "bottom";
const Default$2 = {
  autoClose: true,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
};
const DefaultType$2 = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
let Dropdown$1 = class Dropdown extends BaseComponent$1 {
  constructor(element2, config) {
    super(element2, config);
    this._popper = null;
    this._parent = this._element.parentNode;
    this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
    this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return Default$2;
  }
  static get DefaultType() {
    return DefaultType$2;
  }
  static get NAME() {
    return NAME$3;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (isDisabled(this._element) || this._isShown()) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, relatedTarget);
    if (showEvent.defaultPrevented) {
      return;
    }
    this._createPopper();
    if ("ontouchstart" in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
      for (const element2 of [].concat(...document.body.children)) {
        EventHandler.on(element2, "mouseover", noop);
      }
    }
    this._element.focus();
    this._element.setAttribute("aria-expanded", true);
    this._menu.classList.add(CLASS_NAME_SHOW);
    this._element.classList.add(CLASS_NAME_SHOW);
    EventHandler.trigger(this._element, EVENT_SHOWN$1, relatedTarget);
  }
  hide() {
    if (isDisabled(this._element) || !this._isShown()) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    this._completeHide(relatedTarget);
  }
  dispose() {
    if (this._popper) {
      this._popper.destroy();
    }
    super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar();
    if (this._popper) {
      this._popper.update();
    }
  }
  // Private
  _completeHide(relatedTarget) {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$1, relatedTarget);
    if (hideEvent.defaultPrevented) {
      return;
    }
    if ("ontouchstart" in document.documentElement) {
      for (const element2 of [].concat(...document.body.children)) {
        EventHandler.off(element2, "mouseover", noop);
      }
    }
    if (this._popper) {
      this._popper.destroy();
    }
    this._menu.classList.remove(CLASS_NAME_SHOW);
    this._element.classList.remove(CLASS_NAME_SHOW);
    this._element.setAttribute("aria-expanded", "false");
    Manipulator.removeDataAttribute(this._menu, "popper");
    EventHandler.trigger(this._element, EVENT_HIDDEN$1, relatedTarget);
  }
  _getConfig(config) {
    config = super._getConfig(config);
    if (typeof config.reference === "object" && !isElement$1(config.reference) && typeof config.reference.getBoundingClientRect !== "function") {
      throw new TypeError(
        `${NAME$3.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
      );
    }
    return config;
  }
  _createPopper() {
    if (typeof Popper === "undefined") {
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    }
    let referenceElement = this._element;
    if (this._config.reference === "parent") {
      referenceElement = this._parent;
    } else if (isElement$1(this._config.reference)) {
      referenceElement = getElement(this._config.reference);
    } else if (typeof this._config.reference === "object") {
      referenceElement = this._config.reference;
    }
    const popperConfig = this._getPopperConfig();
    this._popper = createPopper(referenceElement, this._menu, popperConfig);
  }
  _isShown() {
    return this._menu.classList.contains(CLASS_NAME_SHOW);
  }
  _getPlacement() {
    const parentDropdown = this._parent;
    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
      return PLACEMENT_RIGHT;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
      return PLACEMENT_LEFT;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
      return PLACEMENT_TOPCENTER;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
      return PLACEMENT_BOTTOMCENTER;
    }
    const isEnd = getComputedStyle(this._menu).getPropertyValue("--mdb-position").trim() === "end";
    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
    }
    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
  }
  _detectNavbar() {
    return this._element.closest(SELECTOR_NAVBAR) !== null;
  }
  _getOffset() {
    const { offset: offset2 } = this._config;
    if (typeof offset2 === "string") {
      return offset2.split(",").map((value) => Number.parseInt(value, 10));
    }
    if (typeof offset2 === "function") {
      return (popperData) => offset2(popperData, this._element);
    }
    return offset2;
  }
  _getPopperConfig() {
    const defaultBsPopperConfig = {
      placement: this._getPlacement(),
      modifiers: [
        {
          name: "preventOverflow",
          options: {
            boundary: this._config.boundary
          }
        },
        {
          name: "offset",
          options: {
            offset: this._getOffset()
          }
        }
      ]
    };
    if (this._inNavbar || this._config.display === "static") {
      Manipulator.setDataAttribute(this._menu, "popper", "static");
      defaultBsPopperConfig.modifiers = [
        {
          name: "applyStyles",
          enabled: false
        }
      ];
    }
    return {
      ...defaultBsPopperConfig,
      ...execute(this._config.popperConfig, [defaultBsPopperConfig])
    };
  }
  _selectMenuItem({ key, target }) {
    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(
      (element2) => isVisible(element2)
    );
    if (!items.length) {
      return;
    }
    getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Dropdown.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
  static clearMenus(event) {
    if (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY) {
      return;
    }
    const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
    for (const toggle of openToggles) {
      const context = Dropdown.getInstance(toggle);
      if (!context || context._config.autoClose === false) {
        continue;
      }
      const composedPath = event.composedPath();
      const isMenuTarget = composedPath.includes(context._menu);
      if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) {
        continue;
      }
      if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
        continue;
      }
      const relatedTarget = { relatedTarget: context._element };
      if (event.type === "click") {
        relatedTarget.clickEvent = event;
      }
      context._completeHide(relatedTarget);
    }
  }
  static dataApiKeydownHandler(event) {
    const isInput = /input|textarea/i.test(event.target.tagName);
    const isEscapeEvent = event.key === ESCAPE_KEY;
    const isUpOrDownEvent = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key);
    if (!isUpOrDownEvent && !isEscapeEvent) {
      return;
    }
    if (isInput && !isEscapeEvent) {
      return;
    }
    event.preventDefault();
    const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE, event.delegateTarget.parentNode);
    const instance = Dropdown.getOrCreateInstance(getToggleButton);
    if (isUpOrDownEvent) {
      event.stopPropagation();
      instance.show();
      instance._selectMenuItem(event);
      return;
    }
    if (instance._isShown()) {
      event.stopPropagation();
      instance.hide();
      getToggleButton.focus();
    }
  }
};
const NAME$2 = "dropdown";
const DATA_KEY$2 = `mdb.${NAME$2}`;
const EVENT_KEY = `.${DATA_KEY$2}`;
const Default$1 = {
  offset: [0, 2],
  flip: true,
  boundary: "clippingParents",
  reference: "toggle",
  display: "dynamic",
  popperConfig: null,
  dropdownAnimation: "on"
};
const DefaultType$1 = {
  offset: "(array|string|function)",
  flip: "boolean",
  boundary: "(string|element)",
  reference: "(string|element|object)",
  display: "string",
  popperConfig: "(null|object|function)",
  dropdownAnimation: "string"
};
const EVENT_HIDE = "hide.bs.dropdown";
const EVENT_HIDDEN = "hidden.bs.dropdown";
const EVENT_SHOW = "show.bs.dropdown";
const EVENT_SHOWN = "shown.bs.dropdown";
const EVENT_HIDE_MDB = `hide${EVENT_KEY}`;
const EVENT_HIDDEN_MDB = `hidden${EVENT_KEY}`;
const EVENT_SHOW_MDB = `show${EVENT_KEY}`;
const EVENT_SHOWN_MDB = `shown${EVENT_KEY}`;
const ANIMATION_CLASS = "animation";
const ANIMATION_SHOW_CLASS = "fade-in";
const ANIMATION_HIDE_CLASS = "fade-out";
class Dropdown2 extends Dropdown$1 {
  constructor(element2, data) {
    super(element2, data);
    this._config = this._getConfig(data);
    this._menuStyle = "";
    this._popperPlacement = "";
    this._mdbPopperConfig = "";
    const isPrefersReducedMotionSet = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (this._config.dropdownAnimation === "on" && !isPrefersReducedMotionSet) {
      this._init();
    }
    Manipulator$1.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
    bindCallbackEventsIfNeeded(this.constructor);
  }
  dispose() {
    EventHandler$1.off(this._element, EVENT_SHOW);
    EventHandler$1.off(this._parent, EVENT_SHOWN);
    EventHandler$1.off(this._parent, EVENT_HIDE);
    EventHandler$1.off(this._parent, EVENT_HIDDEN);
    Manipulator$1.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);
    super.dispose();
  }
  // Getters
  static get NAME() {
    return NAME$2;
  }
  // Private
  _init() {
    this._bindShowEvent();
    this._bindShownEvent();
    this._bindHideEvent();
    this._bindHiddenEvent();
  }
  _getConfig(options) {
    const config = {
      ...Default$1,
      ...Manipulator$1.getDataAttributes(this._element),
      ...options
    };
    typeCheckConfig(NAME$2, config, DefaultType$1);
    return config;
  }
  _getOffset() {
    const { offset: offset2 } = this._config;
    if (typeof offset2 === "string") {
      return offset2.split(",").map((val) => Number.parseInt(val, 10));
    }
    if (typeof offset2 === "function") {
      return (popperData) => offset2(popperData, this._element);
    }
    return offset2;
  }
  _getPopperConfig() {
    const popperConfig = {
      placement: this._getPlacement(),
      modifiers: [
        {
          name: "preventOverflow",
          options: {
            altBoundary: this._config.flip,
            boundary: this._config.boundary
          }
        },
        {
          name: "offset",
          options: {
            offset: this._getOffset()
          }
        }
      ]
    };
    if (this._config.display === "static") {
      Manipulator$1.setDataAttribute(this._menu, "popper", "static");
      popperConfig.modifiers = [
        {
          name: "applyStyles",
          enabled: false
        }
      ];
    }
    return {
      ...popperConfig,
      /* eslint no-extra-parens: "off" */
      ...typeof this._config.popperConfig === "function" ? this._config.popperConfig(popperConfig) : this._config.popperConfig
    };
  }
  _bindShowEvent() {
    EventHandler$1.on(this._element, EVENT_SHOW, (e) => {
      const showEvent = EventHandler$1.trigger(this._element, EVENT_SHOW_MDB, {
        relatedTarget: e.relatedTarget
      });
      if (showEvent.defaultPrevented) {
        e.preventDefault();
        return;
      }
      this._dropdownAnimationStart("show");
    });
  }
  _bindShownEvent() {
    EventHandler$1.on(this._parent, EVENT_SHOWN, (e) => {
      const shownEvent = EventHandler$1.trigger(this._parent, EVENT_SHOWN_MDB, {
        relatedTarget: e.relatedTarget
      });
      if (shownEvent.defaultPrevented) {
        e.preventDefault();
        return;
      }
    });
  }
  _bindHideEvent() {
    EventHandler$1.on(this._parent, EVENT_HIDE, (e) => {
      const hideEvent = EventHandler$1.trigger(this._parent, EVENT_HIDE_MDB, {
        relatedTarget: e.relatedTarget
      });
      if (hideEvent.defaultPrevented) {
        e.preventDefault();
        return;
      }
      this._menuStyle = this._menu.style.cssText;
      this._popperPlacement = this._menu.getAttribute("data-popper-placement");
      this._mdbPopperConfig = this._menu.getAttribute("data-mdb-popper");
    });
  }
  _bindHiddenEvent() {
    EventHandler$1.on(this._parent, EVENT_HIDDEN, (e) => {
      const hiddenEvent = EventHandler$1.trigger(this._parent, EVENT_HIDDEN_MDB, {
        relatedTarget: e.relatedTarget
      });
      if (hiddenEvent.defaultPrevented) {
        e.preventDefault();
        return;
      }
      if (this._config.display !== "static" && this._menuStyle !== "") {
        this._menu.style.cssText = this._menuStyle;
      }
      this._menu.setAttribute("data-popper-placement", this._popperPlacement);
      this._menu.setAttribute("data-mdb-popper", this._mdbPopperConfig);
      this._dropdownAnimationStart("hide");
    });
  }
  _dropdownAnimationStart(action) {
    switch (action) {
      case "show":
        this._menu.classList.add(ANIMATION_CLASS, ANIMATION_SHOW_CLASS);
        this._menu.classList.remove(ANIMATION_HIDE_CLASS);
        break;
      default:
        this._menu.classList.add(ANIMATION_CLASS, ANIMATION_HIDE_CLASS);
        this._menu.classList.remove(ANIMATION_SHOW_CLASS);
        break;
    }
    this._bindAnimationEnd();
  }
  _bindAnimationEnd() {
    EventHandler$1.one(this._menu, "animationend", () => {
      this._menu.classList.remove(ANIMATION_CLASS, ANIMATION_HIDE_CLASS, ANIMATION_SHOW_CLASS);
    });
  }
}
const NAME$1 = "ripple";
const DATA_KEY$1 = "mdb.ripple";
const CLASSNAME_RIPPLE = "ripple-surface";
const CLASSNAME_RIPPLE_WAVE = "ripple-wave";
const CLASSNAME_RIPPLE_WRAPPER = "input-wrapper";
const SELECTOR_BTN = ".btn";
const SELECTOR_COMPONENT = [SELECTOR_BTN, `[data-mdb-${NAME$1}-init]`];
const CLASSNAME_UNBOUND = "ripple-surface-unbound";
const GRADIENT = "rgba({{color}}, 0.2) 0, rgba({{color}}, 0.3) 40%, rgba({{color}}, 0.4) 50%, rgba({{color}}, 0.5) 60%, rgba({{color}}, 0) 70%";
const DEFAULT_RIPPLE_COLOR = [0, 0, 0];
const BOOTSTRAP_COLORS = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark"
];
const TRANSITION_BREAK_OPACITY = 0.5;
const Default = {
  rippleCentered: false,
  rippleColor: "",
  rippleDuration: "500ms",
  rippleRadius: 0,
  rippleUnbound: false
};
const DefaultType = {
  rippleCentered: "boolean",
  rippleColor: "string",
  rippleDuration: "string",
  rippleRadius: "number",
  rippleUnbound: "boolean"
};
class Ripple extends BaseComponent2 {
  constructor(element2, options) {
    super(element2);
    this._options = this._getConfig(options);
    if (this._element) {
      Manipulator$1.addClass(this._element, CLASSNAME_RIPPLE);
      Manipulator$1.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
      bindCallbackEventsIfNeeded(this.constructor);
    }
    this._clickHandler = this._createRipple.bind(this);
    this._rippleTimer = null;
    this._isMinWidthSet = false;
    this._rippleInSpan = false;
    this.init();
  }
  // Getters
  static get NAME() {
    return NAME$1;
  }
  // Public
  init() {
    this._addClickEvent(this._element);
  }
  dispose() {
    EventHandler$1.off(this._element, "mousedown", this._clickHandler);
    Manipulator$1.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);
    super.dispose();
  }
  // Private
  _autoInit(event) {
    SELECTOR_COMPONENT.forEach((selector) => {
      const target = SelectorEngine$1.closest(event.target, selector);
      if (target) {
        this._element = SelectorEngine$1.closest(event.target, selector);
      }
    });
    const dataAttributes = Manipulator$1.getDataAttributes(this._element);
    if (this._element.classList.contains("btn") && dataAttributes.rippleInit === false) {
      return;
    }
    this._options = this._getConfig();
    if (this._element.tagName.toLowerCase() === "input") {
      const parent = this._element.parentNode;
      this._rippleInSpan = true;
      if (parent.tagName.toLowerCase() === "span" && parent.classList.contains(CLASSNAME_RIPPLE)) {
        this._element = parent;
      } else {
        const shadow = getComputedStyle(this._element).boxShadow;
        const btn = this._element;
        const wrapper = document.createElement("span");
        if (btn.classList.contains("btn-block")) {
          wrapper.style.display = "block";
        }
        EventHandler$1.one(wrapper, "mouseup", (e) => {
          if (e.button === 0) {
            btn.click();
          }
        });
        wrapper.classList.add(CLASSNAME_RIPPLE, CLASSNAME_RIPPLE_WRAPPER);
        Manipulator$1.addStyle(wrapper, {
          border: 0,
          "box-shadow": shadow
        });
        parent.replaceChild(wrapper, this._element);
        wrapper.appendChild(this._element);
        this._element = wrapper;
      }
      this._element.focus();
    }
    if (!this._element.style.minWidth) {
      Manipulator$1.style(this._element, { "min-width": `${getComputedStyle(this._element).width}` });
      this._isMinWidthSet = true;
    }
    Manipulator$1.addClass(this._element, CLASSNAME_RIPPLE);
    this._createRipple(event);
  }
  _addClickEvent(target) {
    EventHandler$1.on(target, "mousedown", this._clickHandler);
  }
  _getEventLayer(event) {
    const x = Math.round(event.clientX - event.target.getBoundingClientRect().x);
    const y = Math.round(event.clientY - event.target.getBoundingClientRect().y);
    return { layerX: x, layerY: y };
  }
  _createRipple(event) {
    if (this._element === null) {
      return;
    }
    if (!Manipulator$1.hasClass(this._element, CLASSNAME_RIPPLE)) {
      Manipulator$1.addClass(this._element, CLASSNAME_RIPPLE);
    }
    const { layerX, layerY } = this._getEventLayer(event);
    const offsetX = layerX;
    const offsetY = layerY;
    const height = this._element.offsetHeight;
    const width = this._element.offsetWidth;
    const duration = this._durationToMsNumber(this._options.rippleDuration);
    const diameterOptions = {
      offsetX: this._options.rippleCentered ? height / 2 : offsetX,
      offsetY: this._options.rippleCentered ? width / 2 : offsetY,
      height,
      width
    };
    const diameter = this._getDiameter(diameterOptions);
    const radiusValue = this._options.rippleRadius || diameter / 2;
    const opacity = {
      delay: duration * TRANSITION_BREAK_OPACITY,
      duration: duration - duration * TRANSITION_BREAK_OPACITY
    };
    const styles = {
      left: this._options.rippleCentered ? `${width / 2 - radiusValue}px` : `${offsetX - radiusValue}px`,
      top: this._options.rippleCentered ? `${height / 2 - radiusValue}px` : `${offsetY - radiusValue}px`,
      height: `${this._options.rippleRadius * 2 || diameter}px`,
      width: `${this._options.rippleRadius * 2 || diameter}px`,
      transitionDelay: `0s, ${opacity.delay}ms`,
      transitionDuration: `${duration}ms, ${opacity.duration}ms`
    };
    const rippleHTML = element("div");
    this._createHTMLRipple({ wrapper: this._element, ripple: rippleHTML, styles });
    this._removeHTMLRipple({ ripple: rippleHTML, duration });
  }
  _createHTMLRipple({ wrapper, ripple, styles }) {
    Object.keys(styles).forEach((property) => ripple.style[property] = styles[property]);
    ripple.classList.add(CLASSNAME_RIPPLE_WAVE);
    if (this._options.rippleColor !== "") {
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
          SelectorEngine$1.find(`.${CLASSNAME_RIPPLE_WAVE}`, this._element).forEach((rippleEl) => {
            rippleEl.remove();
          });
          if (this._isMinWidthSet) {
            Manipulator$1.style(this._element, { "min-width": "" });
            this._isMinWidthSet = false;
          }
          if (this._rippleInSpan && this._element.classList.contains(CLASSNAME_RIPPLE_WRAPPER)) {
            this._removeWrapperSpan();
          } else {
            Manipulator$1.removeClass(this._element, CLASSNAME_RIPPLE);
          }
        }
      }
    }, duration);
  }
  _removeWrapperSpan() {
    const child = this._element.firstChild;
    this._element.replaceWith(child);
    this._element = child;
    this._element.focus();
    this._rippleInSpan = false;
  }
  _durationToMsNumber(time) {
    return Number(time.replace("ms", "").replace("s", "000"));
  }
  _getConfig(config = {}) {
    const dataAttributes = Manipulator$1.getDataAttributes(this._element);
    config = {
      ...Default,
      ...dataAttributes,
      ...config
    };
    typeCheckConfig(NAME$1, config, DefaultType);
    return config;
  }
  _getDiameter({ offsetX, offsetY, height, width }) {
    const top2 = offsetY <= height / 2;
    const left2 = offsetX <= width / 2;
    const pythagorean = (sideA, sideB) => Math.sqrt(sideA ** 2 + sideB ** 2);
    const positionCenter = offsetY === height / 2 && offsetX === width / 2;
    const quadrant = {
      first: top2 === true && left2 === false,
      second: top2 === true && left2 === true,
      third: top2 === false && left2 === true,
      fourth: top2 === false && left2 === false
    };
    const getCorner = {
      topLeft: pythagorean(offsetX, offsetY),
      topRight: pythagorean(width - offsetX, offsetY),
      bottomLeft: pythagorean(offsetX, height - offsetY),
      bottomRight: pythagorean(width - offsetX, height - offsetY)
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
    const FIX_ADD_RIPPLE_EFFECT = 50;
    parent.appendChild(target);
    setTimeout(() => {
      Manipulator$1.addClass(target, "active");
    }, FIX_ADD_RIPPLE_EFFECT);
  }
  _toggleUnbound(target) {
    if (this._options.rippleUnbound === true) {
      Manipulator$1.addClass(target, CLASSNAME_UNBOUND);
    } else {
      target.classList.remove(CLASSNAME_UNBOUND);
    }
  }
  _addColor(target, parent) {
    const IS_BOOTSTRAP_COLOR = BOOTSTRAP_COLORS.find(
      (color) => color === this._options.rippleColor.toLowerCase()
    );
    if (IS_BOOTSTRAP_COLOR) {
      Manipulator$1.addClass(
        parent,
        `${CLASSNAME_RIPPLE}-${this._options.rippleColor.toLowerCase()}`
      );
    } else {
      const rgbValue = this._colorToRGB(this._options.rippleColor).join(",");
      const gradientImage = GRADIENT.split("{{color}}").join(`${rgbValue}`);
      target.style.backgroundImage = `radial-gradient(circle, ${gradientImage})`;
    }
  }
  _removeOldColorClasses(target) {
    const REGEXP_CLASS_COLOR = new RegExp(`${CLASSNAME_RIPPLE}-[a-z]+`, "gi");
    const PARENT_CLASSS_COLOR = target.classList.value.match(REGEXP_CLASS_COLOR) || [];
    PARENT_CLASSS_COLOR.forEach((className) => {
      target.classList.remove(className);
    });
  }
  _colorToRGB(color) {
    function hexToRgb(color2) {
      const HEX_COLOR_LENGTH = 7;
      const IS_SHORT_HEX = color2.length < HEX_COLOR_LENGTH;
      if (IS_SHORT_HEX) {
        color2 = `#${color2[1]}${color2[1]}${color2[2]}${color2[2]}${color2[3]}${color2[3]}`;
      }
      return [
        parseInt(color2.substr(1, 2), 16),
        parseInt(color2.substr(3, 2), 16),
        parseInt(color2.substr(5, 2), 16)
      ];
    }
    function namedColorsToRgba(color2) {
      const tempElem = document.body.appendChild(document.createElement("fictum"));
      const flag = "rgb(1, 2, 3)";
      tempElem.style.color = flag;
      if (tempElem.style.color !== flag) {
        return DEFAULT_RIPPLE_COLOR;
      }
      tempElem.style.color = color2;
      if (tempElem.style.color === flag || tempElem.style.color === "") {
        return DEFAULT_RIPPLE_COLOR;
      }
      color2 = getComputedStyle(tempElem).color;
      document.body.removeChild(tempElem);
      return color2;
    }
    function rgbaToRgb(color2) {
      color2 = color2.match(/[.\d]+/g).map((a) => +Number(a));
      color2.length = 3;
      return color2;
    }
    if (color.toLowerCase() === "transparent") {
      return DEFAULT_RIPPLE_COLOR;
    }
    if (color[0] === "#") {
      return hexToRgb(color);
    }
    if (color.indexOf("rgb") === -1) {
      color = namedColorsToRgba(color);
    }
    if (color.indexOf("rgb") === 0) {
      return rgbaToRgb(color);
    }
    return DEFAULT_RIPPLE_COLOR;
  }
  // Static
  static autoInitial(instance) {
    return function(event) {
      instance._autoInit(event);
    };
  }
  static jQueryInterface(options) {
    return this.each(function() {
      const data = Data$1.getData(this, DATA_KEY$1);
      if (!data) {
        return new Ripple(this, options);
      }
      return null;
    });
  }
}
const NAME = "range";
const DATA_KEY = "mdb.range";
const CLASSNAME_THUMB = "thumb";
const CLASSNAME_ACTIVE = "thumb-active";
const CLASSNAME_THUMB_VALUE = "thumb-value";
const SELECTOR_THUMB_VALUE = `.${CLASSNAME_THUMB_VALUE}`;
const SELECTOR_THUMB = `.${CLASSNAME_THUMB}`;
class Range extends BaseComponent2 {
  constructor(element2) {
    super(element2);
    this._initiated = false;
    this._thumb = null;
    if (this._element) {
      this.init();
      Manipulator$1.setDataAttribute(this._element, `${this.constructor.NAME}-initialized`, true);
      bindCallbackEventsIfNeeded(this.constructor);
    }
  }
  // Getters
  static get NAME() {
    return NAME;
  }
  get rangeInput() {
    return SelectorEngine$1.findOne("input[type=range]", this._element);
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
    Manipulator$1.removeDataAttribute(this._element, `${this.constructor.NAME}-initialized`);
    super.dispose();
  }
  // Private
  _addThumb() {
    const RANGE_THUMB = element("span");
    Manipulator$1.addClass(RANGE_THUMB, CLASSNAME_THUMB);
    RANGE_THUMB.innerHTML = '<span class="thumb-value"></span>';
    this._element.append(RANGE_THUMB);
    this._thumb = SelectorEngine$1.findOne(SELECTOR_THUMB, this._element);
  }
  _handleEvents() {
    EventHandler$1.on(this.rangeInput, "mousedown", () => this._showThumb());
    EventHandler$1.on(this.rangeInput, "mouseup", () => this._hideThumb());
    EventHandler$1.on(this.rangeInput, "touchstart", () => this._showThumb());
    EventHandler$1.on(this.rangeInput, "touchend", () => this._hideThumb());
    EventHandler$1.on(this.rangeInput, "input", () => this._thumbUpdate());
  }
  _disposeEvents() {
    EventHandler$1.off(this.rangeInput, "mousedown");
    EventHandler$1.off(this.rangeInput, "mouseup");
    EventHandler$1.off(this.rangeInput, "touchstart");
    EventHandler$1.off(this.rangeInput, "touchend");
    EventHandler$1.off(this.rangeInput, "input");
  }
  _showThumb() {
    Manipulator$1.addClass(this._thumb, CLASSNAME_ACTIVE);
  }
  _hideThumb() {
    Manipulator$1.removeClass(this._thumb, CLASSNAME_ACTIVE);
  }
  _thumbUpdate() {
    const rangeInput = this.rangeInput;
    const inputValue = rangeInput.value;
    const minValue = rangeInput.min ? rangeInput.min : 0;
    const maxValue = rangeInput.max ? rangeInput.max : 100;
    const thumbValue = SelectorEngine$1.findOne(SELECTOR_THUMB_VALUE, this._thumb);
    thumbValue.textContent = inputValue;
    const newValue = Number((inputValue - minValue) * 100 / (maxValue - minValue));
    Manipulator$1.style(this._thumb, { left: `calc(${newValue}% + (${8 - newValue * 0.15}px))` });
  }
  // Static
  static jQueryInterface(config, options) {
    return this.each(function() {
      let data = Data$1.getData(this, DATA_KEY);
      const _config = typeof config === "object" && config;
      if (!data && /dispose/.test(config)) {
        return;
      }
      if (!data) {
        data = new Range(this, _config);
      }
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](options);
      }
    });
  }
}
const alertCallback = (component, initSelector) => {
  const Alert3 = component;
  enableDismissTrigger(Alert3, "close");
  SelectorEngine$1.find(initSelector).forEach((element2) => {
    return Alert3.getOrCreateInstance(element2);
  });
};
const buttonCallback = (component, initSelector) => {
  const Button3 = component;
  const EVENT_CLICK_DATA_API = `click.bs.${component.name}.data-api`;
  EventHandler$1.on(document, EVENT_CLICK_DATA_API, initSelector, (event) => {
    event.preventDefault();
    const button = event.target.closest(initSelector);
    const data = Button3.getOrCreateInstance(button);
    data.toggle();
  });
  SelectorEngine$1.find(initSelector).forEach((element2) => {
    return Button3.getOrCreateInstance(element2);
  });
};
const carouselCallback = (component, initSelector) => {
  const EVENT_CLICK_DATA_API = `click.bs.${component.name}.data-api`;
  const SELECTOR_DATA_SLIDE = "[data-mdb-slide], [data-mdb-slide-to]";
  const CLASS_NAME_CAROUSEL2 = "carousel";
  const Carousel3 = component;
  const EVENT_LOAD_DATA_API = `load.bs.${component.name}.data-api`;
  const SELECTOR_DATA_RIDE = initSelector;
  EventHandler$1.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, function(event) {
    const target = getElementFromSelector(this);
    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL2)) {
      return;
    }
    event.preventDefault();
    const carousel = Carousel3.getOrCreateInstance(target);
    const slideIndex = this.getAttribute("data-mdb-slide-to");
    if (slideIndex) {
      carousel.to(slideIndex);
      carousel._maybeEnableCycle();
      return;
    }
    if (Manipulator$1.getDataAttribute(this, "slide") === "next") {
      carousel.next();
      carousel._maybeEnableCycle();
      return;
    }
    carousel.prev();
    carousel._maybeEnableCycle();
  });
  EventHandler$1.on(window, EVENT_LOAD_DATA_API, () => {
    const carousels = SelectorEngine$1.find(SELECTOR_DATA_RIDE);
    carousels.forEach((carousel) => {
      Carousel3.getOrCreateInstance(carousel);
    });
  });
};
const collapseCallback = (component, initSelector) => {
  const EVENT_CLICK_DATA_API = `click.bs.${component.name}.data-api`;
  const SELECTOR_DATA_TOGGLE2 = initSelector;
  const Collapse3 = component;
  EventHandler$1.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE2, function(event) {
    if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
      event.preventDefault();
    }
    const selector = getSelectorFromElement(this);
    const selectorElements = SelectorEngine$1.find(selector);
    selectorElements.forEach((element2) => {
      Collapse3.getOrCreateInstance(element2, { toggle: false }).toggle();
    });
  });
  SelectorEngine$1.find(SELECTOR_DATA_TOGGLE2).forEach((el) => {
    const selector = getSelectorFromElement(el);
    const selectorElements = SelectorEngine$1.find(selector);
    selectorElements.forEach((element2) => {
      Collapse3.getOrCreateInstance(element2, { toggle: false });
    });
  });
};
const dropdownCallback = (component, initSelector) => {
  const EVENT_CLICK_DATA_API = `click.bs.${component.name}.data-api`;
  const EVENT_KEYDOWN_DATA_API = `keydown.bs.${component.name}.data-api`;
  const EVENT_KEYUP_DATA_API = `keyup.bs.${component.name}.data-api`;
  const SELECTOR_MENU2 = ".dropdown-menu";
  const SELECTOR_DATA_TOGGLE2 = `[data-mdb-${component.NAME}-initialized]`;
  const Dropdown3 = component;
  EventHandler$1.on(
    document,
    EVENT_KEYDOWN_DATA_API,
    SELECTOR_DATA_TOGGLE2,
    Dropdown3.dataApiKeydownHandler
  );
  EventHandler$1.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU2, Dropdown3.dataApiKeydownHandler);
  EventHandler$1.on(document, EVENT_CLICK_DATA_API, Dropdown3.clearMenus);
  EventHandler$1.on(document, EVENT_KEYUP_DATA_API, Dropdown3.clearMenus);
  EventHandler$1.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE2, function(event) {
    event.preventDefault();
    Dropdown3.getOrCreateInstance(this).toggle();
  });
  SelectorEngine$1.find(initSelector).forEach((el) => {
    Dropdown3.getOrCreateInstance(el);
  });
};
const inputCallback = (component, initSelector) => {
  const SELECTOR_DATA_INIT = initSelector;
  const SELECTOR_OUTLINE_INPUT = `${SELECTOR_DATA_INIT} input`;
  const SELECTOR_OUTLINE_TEXTAREA = `${SELECTOR_DATA_INIT} textarea`;
  const Input2 = component;
  EventHandler$1.on(document, "focus", SELECTOR_OUTLINE_INPUT, Input2.activate(new Input2()));
  EventHandler$1.on(document, "input", SELECTOR_OUTLINE_INPUT, Input2.activate(new Input2()));
  EventHandler$1.on(document, "blur", SELECTOR_OUTLINE_INPUT, Input2.deactivate(new Input2()));
  EventHandler$1.on(document, "focus", SELECTOR_OUTLINE_TEXTAREA, Input2.activate(new Input2()));
  EventHandler$1.on(document, "input", SELECTOR_OUTLINE_TEXTAREA, Input2.activate(new Input2()));
  EventHandler$1.on(document, "blur", SELECTOR_OUTLINE_TEXTAREA, Input2.deactivate(new Input2()));
  EventHandler$1.on(window, "shown.bs.modal", (e) => {
    SelectorEngine$1.find(SELECTOR_OUTLINE_INPUT, e.target).forEach((element2) => {
      const instance = Input2.getInstance(element2.parentNode);
      if (!instance) {
        return;
      }
      instance.update();
    });
    SelectorEngine$1.find(SELECTOR_OUTLINE_TEXTAREA, e.target).forEach((element2) => {
      const instance = Input2.getInstance(element2.parentNode);
      if (!instance) {
        return;
      }
      instance.update();
    });
  });
  EventHandler$1.on(window, "shown.bs.dropdown", (e) => {
    const target = e.target.parentNode.querySelector(".dropdown-menu");
    if (target) {
      SelectorEngine$1.find(SELECTOR_OUTLINE_INPUT, target).forEach((element2) => {
        const instance = Input2.getInstance(element2.parentNode);
        if (!instance) {
          return;
        }
        instance.update();
      });
      SelectorEngine$1.find(SELECTOR_OUTLINE_TEXTAREA, target).forEach((element2) => {
        const instance = Input2.getInstance(element2.parentNode);
        if (!instance) {
          return;
        }
        instance.update();
      });
    }
  });
  EventHandler$1.on(window, "shown.bs.tab", (e) => {
    let targetId;
    if (e.target.href) {
      targetId = e.target.href.split("#")[1];
    } else {
      targetId = Manipulator$1.getDataAttribute(e.target, "target").split("#")[1];
    }
    const target = SelectorEngine$1.findOne(`#${targetId}`);
    SelectorEngine$1.find(SELECTOR_OUTLINE_INPUT, target).forEach((element2) => {
      const instance = Input2.getInstance(element2.parentNode);
      if (!instance) {
        return;
      }
      instance.update();
    });
    SelectorEngine$1.find(SELECTOR_OUTLINE_TEXTAREA, target).forEach((element2) => {
      const instance = Input2.getInstance(element2.parentNode);
      if (!instance) {
        return;
      }
      instance.update();
    });
  });
  SelectorEngine$1.find(SELECTOR_DATA_INIT).map((element2) => new Input2(element2));
  EventHandler$1.on(window, "reset", (e) => {
    SelectorEngine$1.find(SELECTOR_OUTLINE_INPUT, e.target).forEach((element2) => {
      const instance = Input2.getInstance(element2.parentNode);
      if (!instance) {
        return;
      }
      instance.forceInactive();
    });
    SelectorEngine$1.find(SELECTOR_OUTLINE_TEXTAREA, e.target).forEach((element2) => {
      const instance = Input2.getInstance(element2.parentNode);
      if (!instance) {
        return;
      }
      instance.forceInactive();
    });
  });
  EventHandler$1.on(window, "onautocomplete", (e) => {
    const instance = Input2.getInstance(e.target.parentNode);
    if (!instance || !e.cancelable) {
      return;
    }
    instance.forceActive();
  });
};
const modalCallback = (component, initSelector) => {
  const EVENT_CLICK_DATA_API = `click.bs.${component.name}.data-api`;
  const OPEN_SELECTOR = ".modal.show";
  const Modal3 = component;
  const EVENT_SHOW2 = `show.bs.${component.name}`;
  const EVENT_HIDDEN2 = `hidden.bs.${component.name}`;
  EventHandler$1.on(document, EVENT_CLICK_DATA_API, initSelector, function(event) {
    const target = getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    EventHandler$1.one(target, EVENT_SHOW2, (showEvent) => {
      if (showEvent.defaultPrevented) {
        return;
      }
      EventHandler$1.one(target, EVENT_HIDDEN2, () => {
        if (isVisible$1(this)) {
          this.focus();
        }
      });
    });
    const alreadyOpenedModals = SelectorEngine$1.find(OPEN_SELECTOR);
    alreadyOpenedModals.forEach((modal) => {
      if (!modal.classList.contains("modal-non-invasive-show")) {
        Modal3.getInstance(modal).hide();
      }
    });
    const data = Modal3.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal3);
  SelectorEngine$1.find(initSelector).forEach((el) => {
    const selector = getSelectorFromElement(el);
    const selectorElement = SelectorEngine$1.findOne(selector);
    Modal3.getOrCreateInstance(selectorElement);
  });
};
const offcanvasCallback = (component, initSelector) => {
  const EVENT_CLICK_DATA_API = `click.bs.${component.name}.data-api`;
  const OPEN_SELECTOR = ".offcanvas.show";
  const Offcanvas2 = component;
  const EVENT_HIDDEN2 = `hidden.bs.${component.name}`;
  const EVENT_LOAD_DATA_API = `load.bs.${component.name}.data-api`;
  const EVENT_RESIZE2 = `resize.bs.${component.name}`;
  EventHandler$1.on(document, EVENT_CLICK_DATA_API, initSelector, function(event) {
    const target = getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled$1(this)) {
      return;
    }
    EventHandler$1.one(target, EVENT_HIDDEN2, () => {
      if (isVisible$1(this)) {
        this.focus();
      }
    });
    const alreadyOpen = SelectorEngine$1.findOne(OPEN_SELECTOR);
    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas2.getInstance(alreadyOpen).hide();
    }
    const data = Offcanvas2.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler$1.on(window, EVENT_LOAD_DATA_API, () => {
    SelectorEngine$1.find(OPEN_SELECTOR).forEach((selector) => {
      Offcanvas2.getOrCreateInstance(selector).show();
    });
  });
  EventHandler$1.on(window, EVENT_RESIZE2, () => {
    SelectorEngine$1.find("[aria-modal][class*=show][class*=offcanvas-]").forEach((element2) => {
      if (getComputedStyle(element2).position !== "fixed") {
        Offcanvas2.getOrCreateInstance(element2).hide();
      }
    });
  });
  enableDismissTrigger(Offcanvas2);
};
const scrollspyCallback = (component, initSelector) => {
  const EVENT_LOAD_DATA_API = `load.bs.${component.name}.data-api`;
  const ScrollSpy3 = component;
  EventHandler$1.on(window, EVENT_LOAD_DATA_API, () => {
    SelectorEngine$1.find(initSelector).forEach((el) => {
      ScrollSpy3.getOrCreateInstance(el);
    });
  });
};
const tabCallback = (component, initSelector) => {
  const EVENT_LOAD_DATA_API = `load.bs.${component.name}.data-api`;
  const EVENT_CLICK_DATA_API = `click.bs.${component.name}.data-api`;
  const CLASS_NAME_ACTIVE2 = "active";
  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE2}[data-mdb-tab-init], .${CLASS_NAME_ACTIVE2}[data-mdb-pill-init], .${CLASS_NAME_ACTIVE2}[data-mdb-toggle="list"]`;
  const Tab3 = component;
  EventHandler$1.on(document, EVENT_CLICK_DATA_API, initSelector, function(event) {
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled$1(this)) {
      return;
    }
    Tab3.getOrCreateInstance(this).show();
  });
  EventHandler$1.on(window, EVENT_LOAD_DATA_API, () => {
    SelectorEngine$1.find(SELECTOR_DATA_TOGGLE_ACTIVE).forEach((element2) => {
      Tab3.getOrCreateInstance(element2);
    });
  });
};
const toastCallback = (component, initSelector) => {
  const Toast3 = component;
  enableDismissTrigger(Toast3);
  SelectorEngine$1.find(initSelector).forEach((element2) => {
    return Toast3.getOrCreateInstance(element2);
  });
};
const rippleCallback = (component, initSelector) => {
  const Ripple2 = component;
  EventHandler$1.one(document, "mousedown", initSelector, Ripple2.autoInitial(new Ripple2()));
};
const defaultInitSelectors = {
  // Bootstrap Components
  alert: {
    name: "Alert",
    selector: "[data-mdb-alert-init]",
    isToggler: true,
    callback: alertCallback
  },
  button: {
    name: "Button",
    selector: "[data-mdb-button-init]",
    isToggler: true,
    callback: buttonCallback
  },
  carousel: {
    name: "Carousel",
    selector: "[data-mdb-carousel-init]",
    isToggler: true,
    callback: carouselCallback
  },
  collapse: {
    name: "Collapse",
    selector: "[data-mdb-collapse-init]",
    isToggler: true,
    callback: collapseCallback
  },
  dropdown: {
    name: "Dropdown",
    selector: "[data-mdb-dropdown-init]",
    isToggler: true,
    callback: dropdownCallback
  },
  modal: {
    name: "Modal",
    selector: "[data-mdb-modal-init]",
    isToggler: true,
    callback: modalCallback
  },
  offcanvas: {
    name: "Offcanvas",
    selector: "[data-mdb-offcanvas-init]",
    isToggler: true,
    callback: offcanvasCallback
  },
  scrollspy: {
    name: "ScrollSpy",
    selector: "[data-mdb-scrollspy-init]",
    isToggler: true,
    callback: scrollspyCallback
  },
  tab: {
    name: "Tab",
    selector: "[data-mdb-tab-init], [data-mdb-pill-init], [data-mdb-list-init]",
    isToggler: true,
    callback: tabCallback
  },
  toast: {
    name: "Toast",
    selector: "[data-mdb-toast-init]",
    isToggler: true,
    callback: toastCallback
  },
  tooltip: {
    name: "Tooltip",
    selector: "[data-mdb-tooltip-init]",
    isToggler: false
  },
  input: {
    name: "Input",
    selector: "[data-mdb-input-init]",
    isToggler: true,
    callback: inputCallback
  },
  range: {
    name: "Range",
    selector: "[data-mdb-range-init]",
    isToggler: false
  },
  ripple: {
    name: "Ripple",
    selector: "[data-mdb-ripple-init]",
    isToggler: true,
    callback: rippleCallback
  },
  popover: {
    name: "Popover",
    selector: "[data-mdb-popover-init]",
    isToggler: false,
    callback: rippleCallback
  }
};
const initMDBInstance = new InitMDB(defaultInitSelectors);
const initMDB = initMDBInstance.initMDB;
export {
  Alert2 as Alert,
  Button2 as Button,
  Carousel2 as Carousel,
  Collapse2 as Collapse,
  Dropdown2 as Dropdown,
  Input,
  Modal2 as Modal,
  Offcanvas,
  Popover2 as Popover,
  Range,
  Ripple,
  ScrollSpy2 as ScrollSpy,
  Tab2 as Tab,
  Toast2 as Toast,
  Tooltip2 as Tooltip,
  initMDB
};
//# sourceMappingURL=mdb.es.min.js.map
