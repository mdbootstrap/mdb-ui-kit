import EventHandler from '../../mdb/dom/event-handler';
import SelectorEngine from '../../mdb/dom/selector-engine';
import Manipulator from '../../mdb/dom/manipulator';
import {
  isDisabled,
  getElementFromSelector,
  isVisible,
  getSelectorFromElement,
} from '../../mdb/util';
import { enableDismissTrigger } from '../../bootstrap/mdb-prefix/util/component-functions';

const alertCallback = (component, initSelector) => {
  const Alert = component;

  enableDismissTrigger(Alert, 'close');

  // MDB init
  SelectorEngine.find(initSelector).forEach((element) => {
    return Alert.getOrCreateInstance(element);
  });
};

const buttonCallback = (component, initSelector) => {
  const Button = component;
  const EVENT_CLICK_DATA_API = `click.bs.${component.name}.data-api`;

  // BS init
  EventHandler.on(document, EVENT_CLICK_DATA_API, initSelector, (event) => {
    event.preventDefault();

    const button = event.target.closest(initSelector);
    const data = Button.getOrCreateInstance(button);

    data.toggle();
  });

  // MDB init
  SelectorEngine.find(initSelector).forEach((element) => {
    return Button.getOrCreateInstance(element);
  });
};

const carouselCallback = (component, initSelector) => {
  const EVENT_CLICK_DATA_API = `click.bs.${component.name}.data-api`;
  const SELECTOR_DATA_SLIDE = '[data-mdb-slide], [data-mdb-slide-to]';
  const CLASS_NAME_CAROUSEL = 'carousel';
  const Carousel = component;
  const EVENT_LOAD_DATA_API = `load.bs.${component.name}.data-api`;
  const SELECTOR_DATA_RIDE = initSelector;

  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, function (event) {
    const target = getElementFromSelector(this);

    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }

    event.preventDefault();

    const carousel = Carousel.getOrCreateInstance(target);
    const slideIndex = this.getAttribute('data-mdb-slide-to');

    if (slideIndex) {
      carousel.to(slideIndex);
      carousel._maybeEnableCycle();
      return;
    }

    if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
      carousel.next();
      carousel._maybeEnableCycle();
      return;
    }

    carousel.prev();
    carousel._maybeEnableCycle();
  });

  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

    carousels.forEach((carousel) => {
      Carousel.getOrCreateInstance(carousel);
    });
  });
};

const collapseCallback = (component, initSelector) => {
  const EVENT_CLICK_DATA_API = `click.bs.${component.name}.data-api`;
  const SELECTOR_DATA_TOGGLE = initSelector;
  const Collapse = component;

  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (
      event.target.tagName === 'A' ||
      (event.delegateTarget && event.delegateTarget.tagName === 'A')
    ) {
      event.preventDefault();
    }

    const selector = getSelectorFromElement(this);
    const selectorElements = SelectorEngine.find(selector);

    selectorElements.forEach((element) => {
      Collapse.getOrCreateInstance(element, { toggle: false }).toggle();
    });
  });

  SelectorEngine.find(SELECTOR_DATA_TOGGLE).forEach((el) => {
    const selector = getSelectorFromElement(el);
    const selectorElements = SelectorEngine.find(selector);

    selectorElements.forEach((element) => {
      Collapse.getOrCreateInstance(element, { toggle: false });
    });
  });
};

const dropdownCallback = (component, initSelector) => {
  const EVENT_CLICK_DATA_API = `click.bs.${component.name}.data-api`;
  const EVENT_KEYDOWN_DATA_API = `keydown.bs.${component.name}.data-api`;
  const EVENT_KEYUP_DATA_API = `keyup.bs.${component.name}.data-api`;
  const SELECTOR_MENU = '.dropdown-menu';
  const SELECTOR_DATA_TOGGLE = `[data-mdb-${component.NAME}-initialized]`;
  const Dropdown = component;

  EventHandler.on(
    document,
    EVENT_KEYDOWN_DATA_API,
    SELECTOR_DATA_TOGGLE,
    Dropdown.dataApiKeydownHandler
  );
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });

  SelectorEngine.find(initSelector).forEach((el) => {
    Dropdown.getOrCreateInstance(el);
  });
};

const inputCallback = (component, initSelector) => {
  const SELECTOR_DATA_INIT = initSelector;
  const SELECTOR_OUTLINE_INPUT = `${SELECTOR_DATA_INIT} input`;
  const SELECTOR_OUTLINE_TEXTAREA = `${SELECTOR_DATA_INIT} textarea`;
  const Input = component;

  EventHandler.on(document, 'focus', SELECTOR_OUTLINE_INPUT, Input.activate(new Input()));
  EventHandler.on(document, 'input', SELECTOR_OUTLINE_INPUT, Input.activate(new Input()));
  EventHandler.on(document, 'blur', SELECTOR_OUTLINE_INPUT, Input.deactivate(new Input()));

  EventHandler.on(document, 'focus', SELECTOR_OUTLINE_TEXTAREA, Input.activate(new Input()));
  EventHandler.on(document, 'input', SELECTOR_OUTLINE_TEXTAREA, Input.activate(new Input()));
  EventHandler.on(document, 'blur', SELECTOR_OUTLINE_TEXTAREA, Input.deactivate(new Input()));

  EventHandler.on(window, 'shown.bs.modal', (e) => {
    SelectorEngine.find(SELECTOR_OUTLINE_INPUT, e.target).forEach((element) => {
      const instance = Input.getInstance(element.parentNode);
      if (!instance) {
        return;
      }
      instance.update();
    });
    SelectorEngine.find(SELECTOR_OUTLINE_TEXTAREA, e.target).forEach((element) => {
      const instance = Input.getInstance(element.parentNode);
      if (!instance) {
        return;
      }
      instance.update();
    });
  });

  EventHandler.on(window, 'shown.bs.dropdown', (e) => {
    const target = e.target.parentNode.querySelector('.dropdown-menu');
    if (target) {
      SelectorEngine.find(SELECTOR_OUTLINE_INPUT, target).forEach((element) => {
        const instance = Input.getInstance(element.parentNode);
        if (!instance) {
          return;
        }
        instance.update();
      });
      SelectorEngine.find(SELECTOR_OUTLINE_TEXTAREA, target).forEach((element) => {
        const instance = Input.getInstance(element.parentNode);
        if (!instance) {
          return;
        }
        instance.update();
      });
    }
  });

  EventHandler.on(window, 'shown.bs.tab', (e) => {
    let targetId;

    if (e.target.href) {
      targetId = e.target.href.split('#')[1];
    } else {
      targetId = Manipulator.getDataAttribute(e.target, 'target').split('#')[1];
    }

    const target = SelectorEngine.findOne(`#${targetId}`);
    SelectorEngine.find(SELECTOR_OUTLINE_INPUT, target).forEach((element) => {
      const instance = Input.getInstance(element.parentNode);
      if (!instance) {
        return;
      }
      instance.update();
    });
    SelectorEngine.find(SELECTOR_OUTLINE_TEXTAREA, target).forEach((element) => {
      const instance = Input.getInstance(element.parentNode);
      if (!instance) {
        return;
      }
      instance.update();
    });
  });

  // auto-init
  SelectorEngine.find(SELECTOR_DATA_INIT).map((element) => new Input(element));

  // form reset handler
  EventHandler.on(window, 'reset', (e) => {
    SelectorEngine.find(SELECTOR_OUTLINE_INPUT, e.target).forEach((element) => {
      const instance = Input.getInstance(element.parentNode);
      if (!instance) {
        return;
      }
      instance.forceInactive();
    });
    SelectorEngine.find(SELECTOR_OUTLINE_TEXTAREA, e.target).forEach((element) => {
      const instance = Input.getInstance(element.parentNode);
      if (!instance) {
        return;
      }
      instance.forceInactive();
    });
  });

  // auto-fill
  EventHandler.on(window, 'onautocomplete', (e) => {
    const instance = Input.getInstance(e.target.parentNode);
    if (!instance || !e.cancelable) {
      return;
    }
    instance.forceActive();
  });
};

const modalCallback = (component, initSelector) => {
  const EVENT_CLICK_DATA_API = `click.bs.${component.name}.data-api`;
  const OPEN_SELECTOR = '.modal.show';
  const Modal = component;
  const EVENT_SHOW = `show.bs.${component.name}`;
  const EVENT_HIDDEN = `hidden.bs.${component.name}`;

  EventHandler.on(document, EVENT_CLICK_DATA_API, initSelector, function (event) {
    const target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    EventHandler.one(target, EVENT_SHOW, (showEvent) => {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      EventHandler.one(target, EVENT_HIDDEN, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    });

    // avoid conflict when clicking modal toggler while another one is open
    const alreadyOpenedModals = SelectorEngine.find(OPEN_SELECTOR);
    alreadyOpenedModals.forEach((modal) => {
      if (!modal.classList.contains('modal-non-invasive-show')) {
        Modal.getInstance(modal).hide();
      }
    });

    const data = Modal.getOrCreateInstance(target);

    data.toggle(this);
  });

  enableDismissTrigger(Modal);

  SelectorEngine.find(initSelector).forEach((el) => {
    const selector = getSelectorFromElement(el);
    const selectorElement = SelectorEngine.findOne(selector);

    Modal.getOrCreateInstance(selectorElement);
  });
};

const popoverCallback = (component, initSelector) => {
  const Popover = component;
  const SELECTOR_DATA_TOGGLE = initSelector;

  SelectorEngine.find(SELECTOR_DATA_TOGGLE).forEach((el) => {
    Popover.getOrCreateInstance(el);
  });
};

const offcanvasCallback = (component, initSelector) => {
  const EVENT_CLICK_DATA_API = `click.bs.${component.name}.data-api`;
  const OPEN_SELECTOR = '.offcanvas.show';
  const Offcanvas = component;
  const EVENT_HIDDEN = `hidden.bs.${component.name}`;
  const EVENT_LOAD_DATA_API = `load.bs.${component.name}.data-api`;
  const EVENT_RESIZE = `resize.bs.${component.name}`;

  EventHandler.on(document, EVENT_CLICK_DATA_API, initSelector, function (event) {
    const target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    EventHandler.one(target, EVENT_HIDDEN, () => {
      // focus on trigger when it is closed
      if (isVisible(this)) {
        this.focus();
      }
    });

    // avoid conflict when clicking a toggler of an offcanvas, while another is open
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas.getInstance(alreadyOpen).hide();
    }

    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });

  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    SelectorEngine.find(OPEN_SELECTOR).forEach((selector) => {
      Offcanvas.getOrCreateInstance(selector).show();
    });
  });

  EventHandler.on(window, EVENT_RESIZE, () => {
    SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]').forEach((element) => {
      if (getComputedStyle(element).position !== 'fixed') {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    });
  });

  enableDismissTrigger(Offcanvas);
};

const scrollspyCallback = (component, initSelector) => {
  const EVENT_LOAD_DATA_API = `load.bs.${component.name}.data-api`;
  const ScrollSpy = component;

  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    SelectorEngine.find(initSelector).forEach((el) => {
      ScrollSpy.getOrCreateInstance(el);
    });
  });
};

const tabCallback = (component, initSelector) => {
  const EVENT_LOAD_DATA_API = `load.bs.${component.name}.data-api`;
  const EVENT_CLICK_DATA_API = `click.bs.${component.name}.data-api`;
  const CLASS_NAME_ACTIVE = 'active';
  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-mdb-tab-init], .${CLASS_NAME_ACTIVE}[data-mdb-pill-init], .${CLASS_NAME_ACTIVE}[data-mdb-toggle="list"]`;
  const Tab = component;

  EventHandler.on(document, EVENT_CLICK_DATA_API, initSelector, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    Tab.getOrCreateInstance(this).show();
  });

  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE).forEach((element) => {
      Tab.getOrCreateInstance(element);
    });
  });
};

const toastCallback = (component, initSelector) => {
  const Toast = component;

  enableDismissTrigger(Toast);

  // MDB init
  SelectorEngine.find(initSelector).forEach((element) => {
    return Toast.getOrCreateInstance(element);
  });
};

const rippleCallback = (component, initSelector) => {
  const Ripple = component;

  EventHandler.one(document, 'mousedown', initSelector, Ripple.autoInitial(new Ripple()));
};

export {
  alertCallback,
  buttonCallback,
  carouselCallback,
  collapseCallback,
  dropdownCallback,
  inputCallback,
  modalCallback,
  offcanvasCallback,
  tabCallback,
  toastCallback,
  popoverCallback,
  rippleCallback,
  scrollspyCallback,
};
