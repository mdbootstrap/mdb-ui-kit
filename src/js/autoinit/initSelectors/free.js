import {
  alertCallback,
  dropdownCallback,
  offcanvasCallback,
  tabCallback,
  buttonCallback,
  modalCallback,
  rippleCallback,
  collapseCallback,
  carouselCallback,
  scrollspyCallback,
  toastCallback,
  inputCallback,
} from '../callbacks/free';

const defaultInitSelectors = {
  // Bootstrap Components
  alert: {
    name: 'Alert',
    selector: '[data-mdb-alert-init]',
    isToggler: true,
    callback: alertCallback,
  },
  button: {
    name: 'Button',
    selector: '[data-mdb-button-init]',
    isToggler: true,
    callback: buttonCallback,
  },
  carousel: {
    name: 'Carousel',
    selector: '[data-mdb-carousel-init]',
    isToggler: true,
    callback: carouselCallback,
  },
  collapse: {
    name: 'Collapse',
    selector: '[data-mdb-collapse-init]',
    isToggler: true,
    callback: collapseCallback,
  },
  dropdown: {
    name: 'Dropdown',
    selector: '[data-mdb-dropdown-init]',
    isToggler: true,
    callback: dropdownCallback,
  },
  modal: {
    name: 'Modal',
    selector: '[data-mdb-modal-init]',
    isToggler: true,
    callback: modalCallback,
  },
  offcanvas: {
    name: 'Offcanvas',
    selector: '[data-mdb-offcanvas-init]',
    isToggler: true,
    callback: offcanvasCallback,
  },
  scrollspy: {
    name: 'ScrollSpy',
    selector: '[data-mdb-scrollspy-init]',
    isToggler: true,
    callback: scrollspyCallback,
  },
  tab: {
    name: 'Tab',
    selector: '[data-mdb-tab-init], [data-mdb-pill-init], [data-mdb-list-init]',
    isToggler: true,
    callback: tabCallback,
  },
  toast: {
    name: 'Toast',
    selector: '[data-mdb-toast-init]',
    isToggler: true,
    callback: toastCallback,
  },
  tooltip: {
    name: 'Tooltip',
    selector: '[data-mdb-tooltip-init]',
    isToggler: false,
  },
  input: {
    name: 'Input',
    selector: '[data-mdb-input-init]',
    isToggler: true,
    callback: inputCallback,
  },
  range: {
    name: 'Range',
    selector: '[data-mdb-range-init]',
    isToggler: false,
  },
  ripple: {
    name: 'Ripple',
    selector: '[data-mdb-ripple-init]',
    isToggler: true,
    callback: rippleCallback,
  },
  popover: {
    name: 'Popover',
    selector: '[data-mdb-popover-init]',
    isToggler: false,
    callback: rippleCallback,
  },
};

export default defaultInitSelectors;
