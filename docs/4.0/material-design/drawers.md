---
layout: docs
title: Drawers
group: material-design
---

The Material Design for Bootstrap `Drawer` provides a markup structure and plugin that allows you to display content on the bounds of any containing element.  Drawers are commonly referred to as a side nav or offcanvas nav.  The BMD implementation allows for positioning top, left, bottom, right, as well as two styles including push (default) as well as overlay.  Both the drawer position and style can be set statically or responsively with the provided classes.  

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Overview

### Templates and examples

The following examples provide a good starting point:

- [Drawer template]({{ site.baseurl }}/examples/drawer/) is a basic fully responsive template.
- [Dashboard example]({{ site.baseurl }}/examples/dashboard/) is a comprehensive fully responsive demonstration.

### Behavior

The default behavior for any drawer is to be _out_ of the frame of view.  It can be set _in_ the frame of view either by using using one of the gridpoint responsive classes such as `bmd-drawer-in-lg-up`, or by using `bmd-drawer-in`.   Any drawer, be it responsive or statically set to _in_ can be _forced_ out by using `bmd-drawer-out`.

### Markup

In order to use the drawer component you must use BMD's flex based layout structure.  If this layout structure is not a direct child of `<body>`, be sure that the containing element has set `position: relative` as this layout structure utilizes an outer element that is absolutely positioned in order to enable features such as content scrolling and sticky header.

{% highlight html %}
<div class="bmd-layout-container">
  <header class="bmd-layout-header"> </header>
  <div class="bmd-layout-drawer"> </div>
  <main class="bmd-layout-content"> </main>
</div>
{% endhighlight %}

### Toggle

A manual drawer toggle can be integrated with data attributes.  For responsive display or hiding, use the standard Bootstrap classes.  The following example will target a drawer with the id of `my-drawer`

{% highlight html %}
<button class="navbar-toggler hidden-lg-up" data-toggle="drawer" data-target="#my-drawer" type="button">
  <span class="sr-only">Toggle drawer</span>
  <i class="material-icons">menu</i>
</button>
{% endhighlight %}

## Styles

### Push

The default behavior is for content to be pushed.
{% example html id=drawer-s1 %}
<div class="bmd-layout-container bmd-drawer-f-l">
  <header class="bmd-layout-header">
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
  <div id="dw-s1" class="bmd-layout-drawer bg-faded">
    <header>
      <a class="navbar-brand">Title</a>
    </header>
    <ul class="list-group">
      <a class="list-group-item">Link 1</a>
      <a class="list-group-item">Link 2</a>
      <a class="list-group-item">Link 3</a>
    </ul>
  </div>
  <main class="bmd-layout-content">
    <div class="container">
      <p>Main content</p>
    </div>
  </main>
</div>
{% endexample %}

### Overlay
Optional behavior will overlay the drawer and provide a backdrop.  This can be marked with `bmd-drawer-overlay` to always overlay, or you can use a responsive class such as `bmd-drawer-overlay-md-down`.

{% example html id=drawer-s2 %}
<div class="bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay">
  <header class="bmd-layout-header">
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
  <div id="dw-s2" class="bmd-layout-drawer bg-faded">
    <header>
      <a class="navbar-brand">Title</a>
    </header>
    <ul class="list-group">
      <a class="list-group-item">Link 1</a>
      <a class="list-group-item">Link 2</a>
      <a class="list-group-item">Link 3</a>
    </ul>
  </div>
  <main class="bmd-layout-content">
    <div class="container">
      <p>Main content</p>
    </div>
  </main>
</div>
{% endexample %}

## Positions

The following positioning marker classes should be placed on the `bmd-layout-container` element:  
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
        <code>.bmd-drawer-f-t</code>
      </td>
      <td>
        {% markdown %}Fixed top{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        <code>.bmd-drawer-f-r</code>
      </td>
      <td>
        {% markdown %}Fixed right{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        <code>.bmd-drawer-f-b</code>
      </td>
      <td>
        {% markdown %}Fixed bottom{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        <code>.bmd-drawer-f-l</code>
      </td>
      <td>
        {% markdown %}Fixed left{% endmarkdown %}
      </td>
    </tr>
  </tbody>
</table>


### Fixed left

{% example html id=drawer-p1 %}
<div class="bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay">
  <header class="bmd-layout-header">
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
  <div id="dw-p1" class="bmd-layout-drawer bg-faded">
    <header>
      <a class="navbar-brand">Title</a>
    </header>
    <ul class="list-group">
      <a class="list-group-item">Link 1</a>
      <a class="list-group-item">Link 2</a>
      <a class="list-group-item">Link 3</a>
    </ul>
  </div>
  <main class="bmd-layout-content">
    <div class="container">
      <!-- main content -->
    </div>
  </main>
</div>
{% endexample %}

### Fixed right

{% example html id=drawer-p2 %}
<div class="bmd-layout-container bmd-drawer-f-r bmd-drawer-overlay">
  <header class="bmd-layout-header">
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
  <div id="dw-p2" class="bmd-layout-drawer bg-faded">
    <header>
      <a class="navbar-brand">Title</a>
    </header>
    <ul class="list-group">
      <a class="list-group-item">Link 1</a>
      <a class="list-group-item">Link 2</a>
      <a class="list-group-item">Link 3</a>
    </ul>
  </div>
  <main class="bmd-layout-content">
    <div class="container">
      <!-- main content -->
    </div>
  </main>
</div>
{% endexample %}

### Fixed top

{% example html id=drawer-p3 %}
<div class="bmd-layout-container bmd-drawer-f-t bmd-drawer-overlay">
  <header class="bmd-layout-header">
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
  <div id="dw-p3" class="bmd-layout-drawer bg-faded">
    <header>
      <a class="navbar-brand">Title</a>
    </header>
    <ul class="list-group">
      <a class="list-group-item">Link 1</a>
      <a class="list-group-item">Link 2</a>
      <a class="list-group-item">Link 3</a>
    </ul>
  </div>
  <main class="bmd-layout-content">
    <div class="container">
      <!-- main content -->
    </div>
  </main>
</div>
{% endexample %}

### Fixed bottom

{% example html id=drawer-p4 %}
<div class="bmd-layout-container bmd-drawer-f-b bmd-drawer-overlay">
  <header class="bmd-layout-header">
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
  <div id="dw-p4" class="bmd-layout-drawer bg-faded">
    <header>
      <a class="navbar-brand">Title</a>
    </header>
    <ul class="list-group">
      <a class="list-group-item">Link 1</a>
      <a class="list-group-item">Link 2</a>
      <a class="list-group-item">Link 3</a>
    </ul>
  </div>
  <main class="bmd-layout-content">
    <div class="container">
      <!-- main content -->
    </div>
  </main>
</div>
{% endexample %}

## Customization

### Variables

Globally, you may alter the size of _x_ vs _y_ drawers with the following variables:

- `$bmd-drawer-x-size`
- `$bmd-drawer-y-size`


### Custom responsive drawer

The following will create _x_ drawers (left/right) at the size of 500px that will respond to both marker classes and grid-based responsive classes such as `bmd-drawer-in-lg-up`:
{% highlight scss %}
.kitchen-sink-drawer {
  $custom-size: 500px;
  @include bmd-drawer-x-out($custom-size);
  &:not(.bmd-drawer-out) {
    @each $breakpoint in map-keys($grid-breakpoints) {
      @include bmd-drawer-x-in-up($custom-size, $breakpoint);
    }
  }
}
{% endhighlight %}

### Custom static drawer

The following generates a custom drawer at the size of 500px that is _out_ by default and can be triggered _in_ with `bmd-drawer-in`.

{% highlight scss %}
.kitchen-sink-drawer-static {
  $custom-size: 500px;
  @include bmd-drawer-x-out($custom-size); // closed by default
  @include bmd-drawer-x-in($custom-size); // triggered with bmd-drawer-in
  @include bmd-drawer-x-overlay(); // overlay by default, no other classes necessary
}
{% endhighlight %}
