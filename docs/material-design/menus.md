---
layout: docs
title: Menus
group: material-design
---

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

Bootstrap users know these as [dropdowns]({{ site.baseurl }}/components/dropdowns/), but these are also known as menus in the [Material Design specification](https://www.google.com/design/spec/components/menus.html#menus-specs).

## Styles

{% example html %}
<!-- icon -->
<div class="dropdown">
  <button class="btn mdb-btn-icon btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  An <code>.mdb-btn-icon</code>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
  </div>
</div>

<!-- fab-sm -->
<div class="dropdown">
  <button class="btn mdb-btn-fab mdb-btn-fab-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  An <code>.mdb-btn-fab-sm</code>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
  </div>
</div>

<!-- fab -->
<div class="dropdown">
  <button class="btn mdb-btn-fab btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  An <code>.mdb-btn-fab</code>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
  </div>
</div>
{% endexample %}


## Alignment

### Lower left side
{% example html %}
<div class="dropdown open">
  <button class="btn mdb-btn-icon btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
    <button class="dropdown-item" type="button disabled">Disabled action</button>
    <div class="dropdown-divider"> </div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>
{% endexample %}

### Lower right side
{% example html %}
<div class="dropdown open pull-xs-right">
  <button class="btn mdb-btn-icon btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
    <button class="dropdown-item" type="button disabled">Disabled action</button>
    <div class="dropdown-divider"> </div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>
{% endexample %}

### Top left side
{% example html %}
<div class="dropdown open">
  <button class="btn mdb-btn-icon btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  <div class="dropdown-menu dropdown-menu-top-left" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
    <button class="dropdown-item" type="button disabled">Disabled action</button>
    <div class="dropdown-divider"> </div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>
{% endexample %}

### Top right side
{% example html %}
<div class="dropdown open pull-xs-right">
  <button class="btn mdb-btn-icon btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  <div class="dropdown-menu dropdown-menu-top-right" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
    <button class="dropdown-item" type="button disabled">Disabled action</button>
    <div class="dropdown-divider"> </div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>
{% endexample %}



## Widths

### Minimum width

{% example html %}
<div class="dropdown open pull-xs-right">
  <button class="btn mdb-btn-icon btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button">A</button>
    <button class="dropdown-item" type="button">B</button>
  </div>
</div>
{% endexample %}


### Maximum width

{% example html %}
<div class="dropdown open pull-xs-right">
  <button class="btn mdb-btn-icon btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="material-icons">more_vert</i>
  </button>
  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut malesuada elit. Proin tristique, lorem eu vehicula congue, lectus ipsum porta quam, eget rutrum sapien turpis et libero.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut malesuada elit. Proin tristique, lorem eu vehicula congue, lectus ipsum porta quam, eget rutrum sapien turpis et libero.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut malesuada elit. Proin tristique, lorem eu vehicula congue, lectus ipsum porta quam, eget rutrum sapien turpis et libero.</button>
    <button class="dropdown-item" type="button">Another action</button>
  </div>
</div>
{% endexample %}
