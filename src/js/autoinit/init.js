import SelectorEngine from '../mdb/dom/selector-engine';
import { defineJQueryPlugin } from '../mdb/util/index';

const mapComponentsData = (() => {
  const componentsData = [];
  return {
    set(componentName) {
      componentsData.push(componentName);
    },
    get(componentName) {
      return componentsData.includes(componentName);
    },
  };
})();

export const InitializedComponents = {
  set(componentName) {
    mapComponentsData.set(componentName);
  },
  get(componentName) {
    return mapComponentsData.get(componentName);
  },
};

const isInitialized = (componentName) => {
  return InitializedComponents.get(componentName);
};

export const bindCallbackEventsIfNeeded = (component) => {
  if (!isInitialized(component.NAME)) {
    const manualInit = true;
    initComponent(component, manualInit);
  }
};

const initComponent = (component, manualInit = false) => {
  if (!component || InitializedComponents.get(component.NAME)) {
    return;
  }

  if (!manualInit) {
    InitializedComponents.set(component.NAME);
  }

  const thisComponent = _defaultInitSelectors[component.NAME] || null;
  const isToggler = thisComponent?.isToggler || false;

  defineJQueryPlugin(component);
  if (thisComponent?.advanced) {
    thisComponent.advanced(component, thisComponent?.selector);
    return;
  }

  if (isToggler) {
    thisComponent.callback(component, thisComponent?.selector);

    return;
  }

  if (manualInit) {
    return;
  }

  SelectorEngine.find(thisComponent?.selector).forEach((element) => {
    let instance = component.getInstance(element);
    if (!instance) {
      instance = new component(element); // eslint-disable-line
      if (thisComponent?.onInit) {
        instance[thisComponent.onInit]();
      }
    }
  });
};

let _defaultInitSelectors;
export class InitMDB {
  constructor(defaultInitSelectors) {
    _defaultInitSelectors = defaultInitSelectors;
  }

  init = (components) => {
    components.forEach((component) => initComponent(component));
  };

  initMDB = (components, checkOtherImports = false) => {
    const componentList = Object.keys(_defaultInitSelectors).map((element) => {
      const requireAutoInit = Boolean(
        document.querySelector(_defaultInitSelectors[element].selector)
      );

      if (requireAutoInit) {
        const component = components[_defaultInitSelectors[element].name];
        if (!component && !InitializedComponents.get(element) && checkOtherImports) {
          // eslint-disable-next-line no-console
          console.warn(
            `Please import ${_defaultInitSelectors[element].name} from "MDB" package and add it to a object parameter inside "initMDB" function`
          );
        }
        return component;
      }

      return null;
    });

    this.init(componentList);
  };
}
