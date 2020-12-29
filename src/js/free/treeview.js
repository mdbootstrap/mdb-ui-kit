import { element, getjQuery } from '../mdb/util/index';
import Data from '../mdb/dom/data';
import EventHandler from '../bootstrap/src/dom/event-handler';
import Manipulator from '../mdb/dom/manipulator';
import SelectorEngine from '../mdb/dom/selector-engine';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'treeview';
const DATA_KEY = 'mdb.treeview';
const CLASSNAME_TREEVIEW = 'treeview';
const SELECTOR_EXPAND = '[data-toggle="treeview"]';

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Treeview {
  constructor(element, data) {
    this._element = element;

    if (this._element) {
      this._data = data ? this._createHTMLNodes(data, element) : this._setData(element);
      Data.setData(element, DATA_KEY, this);
      Manipulator.addClass(this._element, CLASSNAME_TREEVIEW);

      this._constructTreeview(this._data);
    }
  }

  // Getters

  static get NAME() {
    return NAME;
  }

  // Public

  collapse() {
    const [, ...innerLists] = SelectorEngine.find('ul', this._element);
    innerLists.forEach((node) => (node.style.display = 'none'));
  }

  dispose() {
    Data.removeData(this._element, DATA_KEY);
    this._element = null;
  }

  // Private

  _toggleSubmenu(e) {
    e.stopPropagation();

    const li = e.target.nodeName === 'I' ? e.target.parentNode : e.target;

    const [ul] =
      li.nodeName === 'I'
        ? SelectorEngine.children(li.parentNode, 'ul')
        : SelectorEngine.children(li, 'ul');

    if (ul) {
      ul.style.display = window.getComputedStyle(ul).display === 'none' ? 'block' : 'none';
      this._toggleIcon(li);
    }
  }

  _toggleIcon(el, icon1 = 'fa-caret-down', icon2 = 'fa-caret-up') {
    const [i] = SelectorEngine.children(el, 'i');

    if (!i) return;

    const faClasses = [icon1, icon2];

    const [current, next] = i.classList.contains(icon1) ? faClasses : faClasses.reverse();

    i.classList.remove(current);
    i.classList.add(next);
  }

  _constructTreeview(data) {
    data.forEach((el) => {
      el.node.addEventListener('click', this._toggleSubmenu.bind(this));

      if (el.children && el.children.length > 0) {
        const arrow = element('i');
        arrow.classList = ['fas fa-caret-down'];
        el.node.appendChild(arrow);

        this._constructTreeview(el.children);
      }
    });
  }

  _setData(el) {
    const [list] = SelectorEngine.children(el, 'ul');

    if (!list) return [];

    return SelectorEngine.children(list, 'li').map((node) => {
      const children = this._setData(node);
      return {
        name: node.innerText ? node.innerText.split('\n')[0] : '',
        node,
        children,
      };
    });
  }

  _createHTMLNodes(data, parent) {
    const ul = element('ul');

    return data.map((item) => {
      const li = element('li');
      li.innerText = item.name;
      let children = item.children;

      if (children && children.length > 0) {
        children = this._createHTMLNodes(item.children, li);
      }

      ul.appendChild(li);
      parent.appendChild(ul);

      return {
        ...item,
        children,
        node: li,
      };
    });
  }

  static toggleSubmenu(instance) {
    return function (event) {
      instance._toggleSubmenu(event);
    };
  }

  static jQueryInterface(options) {
    return this.each(function () {
      const data = Data.getData(this, DATA_KEY);
      if (!data) {
        return new Treeview(this, options);
      }

      return null;
    });
  }

  static getInstance(element) {
    return Data.getData(element, DATA_KEY);
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation - auto initialization
 * ------------------------------------------------------------------------
 */

EventHandler.on(document, 'click', SELECTOR_EXPAND, Treeview.toggleSubmenu(new Treeview()));

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .treeview to jQuery only if jQuery is present
 */

const $ = getjQuery();

if ($) {
  const JQUERY_NO_CONFLICT = $.fn[NAME];
  $.fn[NAME] = Treeview.jQueryInterface;
  $.fn[NAME].Constructor = Treeview;
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Treeview.jQueryInterface;
  };
}

export default Treeview;
