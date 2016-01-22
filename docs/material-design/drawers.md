---
layout: docs
title: Drawers
group: material-design
---

The Material Design for Bootstrap `Drawer` provides a markup structure and plugin that allows you to display content on the bounds of any `position: relative` containing element.  Drawers are commonly referred to as a side nav or offcanvas nav.  The MDB implementation allows for positioning top, left, bottom, right, as well as two styles including push (default) as well as overlay.  Both the drawer position and style can be set statically or responsively with the provided classes.  

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Overview 

### Templates and examples

The following examples provide a good starting point:

- [Drawer template]({{ site.baseurl }}/examples/dashboard/) is a basic fully responsive template.
- [Dashboard example]({{ site.baseurl }}/examples/dashboard/) is a comprehensive fully responsive demonstration.

### Behavior

The default behavior for any drawer is to be _out_ of the frame of view.  It can be set _in_ the frame of view either by using using one or the gridpoint responsive classes such as `mdb-drawer-in-lg-up`, or by using `mdb-drawer-in`.   Any drawer, be it responsive or statically set to _in_ can be _forced_ out by using `mdb-drawer-out`.

### Markup

In order to use the drawer component, MDB has created the following flex based layout structure:

{% highlight html %}
<div class="mdb-layout-container">
  <header class="mdb-layout-header"> </header>
  <div class="mdb-layout-drawer"> </div>
  <main class="mdb-layout-content"> </main>
</div>
{% endhighlight %}

## Styles

### Push

The default behavior is for content to be pushed.
{% example html id=drawer-s1 %}
<div class="mdb-layout-container mdb-drawer-f-l">
  <header class="mdb-layout-header">
    <div class="navbar navbar-light bg-faded">
      <button class="navbar-toggler" type="button" data-toggle="drawer" data-target="#dw-s1">
        <span class="sr-only">Toggle drawer</span>
        <i class="material-icons">menu</i>
      </button>
      <ul class="nav navbar-nav">
        <li class="nav-item">Title</li>
      </ul>
    </div>
  </header>
  <div id="dw-s1" class="mdb-layout-drawer">
    <header>
      <a class="navbar-brand">Title</a>
    </header>
    <ul class="list-group">
      <a class="list-group-item">Link 1</a>
      <a class="list-group-item">Link 2</a>
      <a class="list-group-item">Link 3</a>
    </ul>
  </div>
  <main class="mdb-layout-content">
    <div class="container">
      <p>Main content</p>
    </div>
  </main>
</div>
{% endexample %}

### Overlay
Optional behavior will overlay the drawer and provide a backdrop:
{% example html id=drawer-s2 %}
<div class="mdb-layout-container mdb-drawer-f-l mdb-drawer-overlay">
  <header class="mdb-layout-header">
    <div class="navbar navbar-light bg-faded">
      <button class="navbar-toggler" type="button" data-toggle="drawer" data-target="#dw-s2">
        <span class="sr-only">Toggle drawer</span>
        <i class="material-icons">menu</i>
      </button>
      <ul class="nav navbar-nav">
        <li class="nav-item">Title</li>
      </ul>
    </div>
  </header>
  <div id="dw-s2" class="mdb-layout-drawer">
    <header>
      <a class="navbar-brand">Title</a>
    </header>
    <ul class="list-group">
      <a class="list-group-item">Link 1</a>
      <a class="list-group-item">Link 2</a>
      <a class="list-group-item">Link 3</a>
    </ul>
  </div>
  <main class="mdb-layout-content">
    <div class="container">
      <p>Main content</p>
    </div>
  </main>
</div>
{% endexample %}

## Positions

### Classes

The following positioning marker classes should be placed on the `mdb-layout-container` element:  
<table>
  <thead>
    <tr>
      <th>Classes</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>.mdb-drawer-f-t</code>
      </td>
      <td>
        {% markdown %}Fixed top{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        <code>.mdb-drawer-f-r</code>
      </td>
      <td>
        {% markdown %}Fixed right{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        <code>.mdb-drawer-f-b</code>
      </td>
      <td>
        {% markdown %}Fixed bottom{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        <code>.mdb-drawer-f-l</code>
      </td>
      <td>
        {% markdown %}Fixed left{% endmarkdown %}
      </td>
    </tr>
  </tbody>
</table>


### Fixed left

{% example html id=drawer-p1 %}
<div class="mdb-layout-container mdb-drawer-f-l mdb-drawer-overlay">
  <header class="mdb-layout-header">
    <div class="navbar navbar-light bg-faded">
      <button class="navbar-toggler" type="button" data-toggle="drawer" data-target="#dw-p1">
        <span class="sr-only">Toggle drawer</span>
        <i class="material-icons">menu</i>
      </button>
      <ul class="nav navbar-nav">
        <li class="nav-item">Title</li>
      </ul>
    </div>
  </header>
  <div id="dw-p1" class="mdb-layout-drawer">
    <header>
      <a class="navbar-brand">Title</a>
    </header>
    <ul class="list-group">
      <a class="list-group-item">Link 1</a>
      <a class="list-group-item">Link 2</a>
      <a class="list-group-item">Link 3</a>
    </ul>
  </div>
  <main class="mdb-layout-content">
    <div class="container">
      <!-- main content -->
    </div>
  </main>
</div>
{% endexample %}

### Fixed right

{% example html id=drawer-p2 %}
<div class="mdb-layout-container mdb-drawer-f-r mdb-drawer-overlay">
  <header class="mdb-layout-header">
    <div class="navbar navbar-light bg-faded">
      <button class="navbar-toggler" type="button" data-toggle="drawer" data-target="#dw-p2">
        <span class="sr-only">Toggle drawer</span>
        <i class="material-icons">menu</i>
      </button>
      <ul class="nav navbar-nav">
        <li class="nav-item">Title</li>
      </ul>
    </div>
  </header>
  <div id="dw-p2" class="mdb-layout-drawer">
    <header>
      <a class="navbar-brand">Title</a>
    </header>
    <ul class="list-group">
      <a class="list-group-item">Link 1</a>
      <a class="list-group-item">Link 2</a>
      <a class="list-group-item">Link 3</a>
    </ul>
  </div>
  <main class="mdb-layout-content">
    <div class="container">
      <!-- main content -->
    </div>
  </main>
</div>
{% endexample %}

### Fixed top

{% example html id=drawer-p3 %}
<div class="mdb-layout-container mdb-drawer-f-t mdb-drawer-overlay">
  <header class="mdb-layout-header">
    <div class="navbar navbar-light bg-faded">
      <button class="navbar-toggler" type="button" data-toggle="drawer" data-target="#dw-p3">
        <span class="sr-only">Toggle drawer</span>
        <i class="material-icons">menu</i>
      </button>
      <ul class="nav navbar-nav">
        <li class="nav-item">Title</li>
      </ul>
    </div>
  </header>
  <div id="dw-p3" class="mdb-layout-drawer">
    <header>
      <a class="navbar-brand">Title</a>
    </header>
    <ul class="list-group">
      <a class="list-group-item">Link 1</a>
      <a class="list-group-item">Link 2</a>
      <a class="list-group-item">Link 3</a>
    </ul>
  </div>
  <main class="mdb-layout-content">
    <div class="container">
      <!-- main content -->
    </div>
  </main>
</div>
{% endexample %}

### Fixed bottom

{% example html id=drawer-p4 %}
<div class="mdb-layout-container mdb-drawer-f-b mdb-drawer-overlay">
  <header class="mdb-layout-header">
    <div class="navbar navbar-light bg-faded">
      <button class="navbar-toggler" type="button" data-toggle="drawer" data-target="#dw-p4">
        <span class="sr-only">Toggle drawer</span>
        <i class="material-icons">menu</i>
      </button>
      <ul class="nav navbar-nav">
        <li class="nav-item">Title</li>
      </ul>
    </div>
  </header>
  <div id="dw-p4" class="mdb-layout-drawer">
    <header>
      <a class="navbar-brand">Title</a>
    </header>
    <ul class="list-group">
      <a class="list-group-item">Link 1</a>
      <a class="list-group-item">Link 2</a>
      <a class="list-group-item">Link 3</a>
    </ul>
  </div>
  <main class="mdb-layout-content">
    <div class="container">
      <!-- main content -->
    </div>
  </main>
</div>
{% endexample %}

## Responsiveness vs Static

### Static
in
out
overlay

### Responsive in

### Responsive overlay


## Customization

## Variables

## Using mixins
