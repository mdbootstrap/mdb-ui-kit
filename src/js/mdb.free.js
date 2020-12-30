// BOOTSTRAP CORE COMPONENTS
import Alert from './bootstrap/src/alert';
import Button from './bootstrap/src/button';
import Carousel from './bootstrap/src/carousel';
import Collapse from './bootstrap/src/collapse';
import Modal from './bootstrap/src/modal';
import Popover from './bootstrap/src/popover';
import ScrollSpy from './bootstrap/src/scrollspy';
import Tab from './bootstrap/src/tab';
import Toast from './bootstrap/src/toast';
import Tooltip from './bootstrap/src/tooltip';

// MDB FREE COMPONENTS
import Input from './free/input';
import Dropdown from './free/dropdown';
import Treeview from './free/treeview';
import Ripple from './free/ripple';

// AUTO INIT
const tooltips = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
const popovers = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
if (tooltips.length > 0) tooltips.map((tooltip) => new Tooltip(tooltip));
if (popovers.length > 0) popovers.map((popover) => new Popover(popover));

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
