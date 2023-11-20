import EventHandler from '../../mdb/dom/event-handler';
import SelectorEngine from '../../mdb/dom/selector-engine';
import { getElementFromSelector, isVisible, getSelectorFromElement } from '../../mdb/util';
import { enableDismissTrigger } from '../../bootstrap/mdb-prefix/util/component-functions';
import {
  buttonCallback,
  carouselCallback,
  collapseCallback,
  dropdownCallback,
  offcanvasCallback,
  scrollspyCallback,
  tabCallback,
} from './free';

const alertCallback = (component, initSelector) => {
  const Alert = component;

  enableDismissTrigger(Alert, 'close');
  // MDB init
  SelectorEngine.find(initSelector).forEach((element) => {
    return Alert.getOrCreateInstance(element);
  });
};

const lightboxCallback = (component, initSelector) => {
  const EVENT_CLICK_DATA_API = `click.mdb.${component.name}.data-api`;
  const SELECTOR_DATA_INIT = initSelector;
  const SELECTOR_TOGGLE = `${SELECTOR_DATA_INIT} img:not(.lightbox-disabled)`;
  const Lightbox = component;

  SelectorEngine.find(SELECTOR_DATA_INIT).forEach((el) => new Lightbox(el));
  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_TOGGLE, Lightbox.toggle());
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

const sidenavCallback = (component, initSelector) => {
  const SELECTOR_DATA_INIT = initSelector;
  const SELECTOR_TOGGLE = '[data-mdb-toggle="sidenav"]';
  const Sidenav = component;

  EventHandler.on(document, 'click', SELECTOR_TOGGLE, Sidenav.toggleSidenav());

  SelectorEngine.find(SELECTOR_DATA_INIT).forEach((sidenav) => {
    return Sidenav.getOrCreateInstance(sidenav);
  });
};

const toastCallback = (component, initSelector) => {
  const SELECTOR_DATA_INIT = initSelector;
  const Toast = component;

  enableDismissTrigger(Toast);

  SelectorEngine.find(SELECTOR_DATA_INIT).forEach((toast) => {
    return Toast.getOrCreateInstance(toast);
  });
};

export {
  alertCallback,
  lightboxCallback,
  buttonCallback,
  carouselCallback,
  collapseCallback,
  dropdownCallback,
  modalCallback,
  offcanvasCallback,
  scrollspyCallback,
  sidenavCallback,
  tabCallback,
  toastCallback,
};
