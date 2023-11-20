import {
  alertCallback,
  lightboxCallback,
  sidenavCallback,
  modalCallback,
  toastCallback,
} from '../callbacks/pro';
import * as freeSelectors from './free';
import chartsCallback from '../callbacks/charts';

const defaultInitSelectors = {
  ...freeSelectors.default,
  chart: {
    name: 'Chart',
    selector: '[data-mdb-chart-init]',
    isToggler: false,
    advanced: chartsCallback,
  },
  chips: {
    name: 'ChipsInput',
    selector: '[data-mdb-chips-input-init]',
    isToggler: false,
  },
  chip: {
    name: 'Chip',
    selector: '[data-mdb-chip-init]',
    isToggler: false,
    onInit: 'init',
  },
  datatable: {
    name: 'Datatable',
    selector: '[data-mdb-datatable-init]',
    isToggler: false,
  },
  datetimepicker: {
    name: 'Datetimepicker',
    selector: '[data-mdb-datetimepicker-init]',
    isToggler: false,
  },
  datepicker: {
    name: 'Datepicker',
    selector: '[data-mdb-datepicker-init]',
    isToggler: false,
  },
  loading: {
    name: 'Loading',
    selector: '[data-mdb-loading-init]',
    isToggler: false,
  },
  multiRangeSlider: {
    name: 'MultiRangeSlider',
    selector: '[data-mdb-multi-range-slider-init]',
    isToggler: false,
  },
  select: {
    name: 'Select',
    selector: '[data-mdb-select-init]',
    isToggler: false,
  },
  timepicker: {
    name: 'Timepicker',
    selector: '[data-mdb-timepicker-init]',
    isToggler: false,
  },
  touch: {
    name: 'Touch',
    selector: '[data-mdb-touch-init]',
    isToggler: false,
  },
  alert: {
    name: 'Alert',
    selector: '[data-mdb-alert-init]',
    isToggler: true,
    callback: alertCallback,
  },
  animation: {
    name: 'Animate',
    selector: '[data-mdb-animation-init]',
    isToggler: false,
    onInit: 'init',
  },
  clipboard: {
    name: 'Clipboard',
    selector: '[data-mdb-clipboard-init]',
    isToggler: false,
  },
  infiniteScroll: {
    name: 'InfiniteScroll',
    selector: '[data-mdb-infinite-scroll-init]',
    isToggler: false,
  },
  lazyLoad: {
    name: 'LazyLoad',
    selector: '[data-mdb-lazy-load-init]',
    isToggler: false,
  },
  lightbox: {
    name: 'Lightbox',
    selector: '[data-mdb-lightbox-init]',
    isToggler: true,
    callback: lightboxCallback,
  },
  modal: {
    name: 'Modal',
    selector: '[data-mdb-modal-init]',
    isToggler: true,
    callback: modalCallback,
  },
  navbar: {
    name: 'Navbar',
    selector: '[data-mdb-navbar-init]',
    isToggler: false,
  },
  perfectScrollbar: {
    name: 'PerfectScrollbar',
    selector: '[data-mdb-perfect-scrollbar-init]',
    isToggler: false,
  },
  popconfirm: {
    name: 'Popconfirm',
    selector: '[data-mdb-popconfirm-init]',
    isToggler: false,
  },
  rating: {
    name: 'Rating',
    selector: '[data-mdb-rating-init]',
    isToggler: false,
  },
  sidenav: {
    name: 'Sidenav',
    selector: '[data-mdb-sidenav-init]',
    isToggler: true,
    callback: sidenavCallback,
  },
  smoothScroll: {
    name: 'SmoothScroll',
    selector: '[data-mdb-smooth-scroll-init]',
    isToggler: false,
  },
  stepper: {
    name: 'Stepper',
    selector: '[data-mdb-stepper-init]',
    isToggler: false,
  },
  sticky: {
    name: 'Sticky',
    selector: '[data-mdb-sticky-init]',
    isToggler: false,
  },
  toast: {
    name: 'Toast',
    selector: '[data-mdb-toast-init]',
    isToggler: true,
    callback: toastCallback,
  },
};

export default defaultInitSelectors;
