// BOOTSTRAP CORE COMPONENTS
import Alert from './bootstrap/src/alert';
import Button from './bootstrap/src/button';
import Carousel from './bootstrap/src/carousel';
import Collapse from './bootstrap/src/collapse';
import Modal from './bootstrap/src/modal';
import Popover from './bootstrap/src/popover';
import ScrollSpy from './bootstrap/src/scrollspy';
import Tab from './bootstrap/src/tab';
import Tooltip from './bootstrap/src/tooltip';
import Toast from './bootstrap/src/toast';

// MDB FREE COMPONENTS
import Input from './free/input';
import Dropdown from './free/dropdown';
import Treeview from './free/treeview';
import Ripple from './free/ripple';

// AUTO INIT
[...document.querySelectorAll('[data-toggle="tooltip"]')].map((tooltip) => new Tooltip(tooltip));
[...document.querySelectorAll('[data-toggle="popover"]')].map((popover) => new Popover(popover));
[...document.querySelectorAll('.toast')].map((toast) => new Toast(toast));

export {
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Input,
  Modal,
  Popover,
  Ripple,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip,
  Treeview,
};
