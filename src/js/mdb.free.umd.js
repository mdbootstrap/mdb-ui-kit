// BOOTSTRAP CORE COMPONENTS
import Button from './free/button';
import Offcanvas from './bootstrap/mdb-prefix/offcanvas';
import Alert from './free/alert';
import Carousel from './free/carousel';
import Modal from './free/modal';
import Popover from './free/popover';
import ScrollSpy from './free/scrollspy';
import Tab from './free/tab';
import Tooltip from './free/tooltip';
import Toast from './free/toast';

// MDB FREE COMPONENTS
import Input from './free/input';
import Collapse from './free/collapse';
import Dropdown from './free/dropdown';
import Ripple from './free/ripple';
import Range from './free/range';
import initMDB from './autoinit/index.free';

const mdb = {
  Alert,
  Button,
  Carousel,
  Collapse,
  Offcanvas,
  Dropdown,
  Input,
  Modal,
  Popover,
  Ripple,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip,
  Range,
};

initMDB(mdb);

export {
  Alert,
  Button,
  Carousel,
  Collapse,
  Offcanvas,
  Dropdown,
  Input,
  Modal,
  Popover,
  Ripple,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip,
  Range,
  initMDB,
};
