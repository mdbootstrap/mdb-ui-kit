---
layout: docs
title: Menus
group: material-design
---

Bootstrap users know these as [dropdowns]({{ site.baseurl }}/components/dropdowns/), but these are also known as menus in the [Material Design specification](https://www.google.com/design/spec/components/menus.html#menus-specs).

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Styles

### Icon with buttons
{% example html %}
<div class="dropdown">
  <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="ex1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  <div class="dropdown-menu dropdown-menu-left" aria-labelledby="ex1">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item disabled" type="button">Another action</button>
    <button class="dropdown-item" type="button">Another action</button>
  </div>
</div>
{% endexample %}

### Icon with links
{% example html %}
<div class="btn-group">
  <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="ex2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>  
  <div class="dropdown-menu dropdown-menu-left" aria-labelledby="ex2">
    <a class="dropdown-item" href="#">Regular link</a>
    <a class="dropdown-item disabled" href="#">Disabled link</a>
    <a class="dropdown-item" href="#">Another link</a>
  </div>
</div>
{% endexample %}

### Small fab
{% example html %}
<div class="btn-group">
  <button class="btn bmd-btn-fab bmd-btn-fab-sm dropdown-toggle" type="button" id="ex3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  <div class="dropdown-menu  dropdown-menu-left" aria-labelledby="ex3">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
  </div>
</div>
{% endexample %}

### Default fab
{% example html %}
<div class="btn-group">
  <button class="btn bmd-btn-fab dropdown-toggle" type="button" id="ex4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  <div class="dropdown-menu dropdown-menu-left" aria-labelledby="ex4">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
  </div>
</div>

{% endexample %}

### Default button
{% example html %}
<div class="btn-group open">
  <button class="btn dropdown-toggle" type="button" id="buttonMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown
  </button>
  <div class="dropdown-menu" aria-labelledby="buttonMenu1">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>
{% endexample %}


## Alignment

### Lower left side
{% example html %}
<div class="btn-group open">
  <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="ll1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  <div class="dropdown-menu dropdown-menu-left" aria-labelledby="ll1">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
    <button class="dropdown-item disabled" type="button">Disabled action</button>
    <div class="dropdown-divider"> </div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>
{% endexample %}

### Lower right side

`dropdown` usage misaligned - see [upstream Bootstrap issue #18552](https://github.com/twbs/bootstrap/issues/18852#issuecomment-202524375).  Use `btn-group` instead until issue is resolved (next example).
{% example html %}
<div class="dropdown open pull-xs-right">
  <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="lr1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="lr1">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
    <button class="dropdown-item disabled" type="button">Disabled action</button>
    <div class="dropdown-divider"> </div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>
{% endexample %}


`btn-group` usage works fine in this alignment.
{% example html %}
<div class="btn-group open pull-xs-right">
  <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="lr2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="lr2">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
    <button class="dropdown-item disabled" type="button">Disabled action</button>
    <div class="dropdown-divider"> </div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>
{% endexample %}

## Widths

### Minimum width

{% example html %}
<div class="btn-group open pull-xs-right">
  <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="mw1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="mw1">
    <button class="dropdown-item" type="button">A</button>
    <button class="dropdown-item" type="button">B</button>
  </div>
</div>
{% endexample %}


### Maximum width

{% example html %}
<div class="btn-group open pull-xs-right">
  <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="mw2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="mw2">
    <button class="dropdown-item" type="button">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut malesuada elit. Proin tristique, lorem eu vehicula congue, lectus ipsum porta quam, eget rutrum sapien turpis et libero.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut malesuada elit. Proin tristique, lorem eu vehicula congue, lectus ipsum porta quam, eget rutrum sapien turpis et libero.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut malesuada elit. Proin tristique, lorem eu vehicula congue, lectus ipsum porta quam, eget rutrum sapien turpis et libero.</button>
    <button class="dropdown-item" type="button">Another action</button>
  </div>
</div>
{% endexample %}
