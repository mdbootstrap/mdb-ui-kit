---
layout: docs
title: Buttons
group: material-design
---

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Flat

{% example html %}
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-link">Link</button>
<button type="button" class="btn"><code>btn</code> only</button>
<button type="button" class="btn active"><code>.active</code></button>
{% endexample %}

### Disabled

{% example html %}
<fieldset disabled>
  <button type="button" class="btn"><code>btn</code> only</button>
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-secondary">Secondary</button>
  <button type="button" class="btn btn-success">Success</button>
  <button type="button" class="btn btn-info">Info</button>
  <button type="button" class="btn btn-warning">Warning</button>
  <button type="button" class="btn btn-danger">Danger</button>
  <button type="button" class="btn btn-link">Link</button>
</fieldset>
{% endexample %}

## Raised

{% example html %}
<button type="button" class="btn btn-raised btn-primary">Primary</button>
<button type="button" class="btn btn-raised btn-secondary">Secondary</button>
<button type="button" class="btn btn-raised btn-success">Success</button>
<button type="button" class="btn btn-raised btn-info">Info</button>
<button type="button" class="btn btn-raised btn-warning">Warning</button>
<button type="button" class="btn btn-raised btn-danger">Danger</button>
<button type="button" class="btn btn-raised btn-link">Link</button>
<button type="button" class="btn btn-raised active"><code>.active</code></button>
{% endexample %}

### Disabled
{% example html %}
<fieldset disabled>
  <button type="button" class="btn btn-raised btn-secondary">Secondary</button>
  <button type="button" class="btn btn-raised btn-success">Success</button>
  <button type="button" class="btn btn-raised btn-primary">Primary</button>
  <button type="button" class="btn btn-raised btn-info">Info</button>
  <button type="button" class="btn btn-raised btn-warning">Warning</button>
  <button type="button" class="btn btn-raised btn-danger">Danger</button>
  <button type="button" class="btn btn-raised btn-link">Link</button>
</fieldset>
{% endexample %}

## Sizes
{% example html %}
<button type="button" class="btn btn-raised btn-lg">Large button</button>
<button type="button" class="btn btn-raised">Default button</button>
<button type="button" class="btn btn-raised btn-sm">Small button</button>
{% endexample %}

## Floating Action

{% example html %}
<button type="button" class="btn btn-primary bmd-btn-fab">
  <i class="material-icons">grade</i>
</button>
<button type="button" class="btn btn-secondary bmd-btn-fab">
  <i class="material-icons">grade</i>
</button>
<button type="button" class="btn btn-success bmd-btn-fab">
  <i class="material-icons">grade</i>
</button>
<button type="button" class="btn btn-info bmd-btn-fab">
  <i class="material-icons">grade</i>
</button>
<button type="button" class="btn btn-warning bmd-btn-fab">
  <i class="material-icons">grade</i>
</button>
<button type="button" class="btn btn-danger bmd-btn-fab">
  <i class="material-icons">grade</i>
</button>
<button type="button" class="btn btn-danger bmd-btn-fab active">
  <i class="material-icons">grade</i>
</button>
{% endexample %}

### Disabled
{% example html %}
<fieldset disabled>
  <button type="button" class="btn btn-primary bmd-btn-fab">
    <i class="material-icons">grade</i>
  </button>
  <button type="button" class="btn btn-secondary bmd-btn-fab">
    <i class="material-icons">grade</i>
  </button>
  <button type="button" class="btn btn-success bmd-btn-fab">
    <i class="material-icons">grade</i>
  </button>
  <button type="button" class="btn btn-info bmd-btn-fab">
    <i class="material-icons">grade</i>
  </button>
  <button type="button" class="btn btn-warning bmd-btn-fab">
    <i class="material-icons">grade</i>
  </button>
  <button type="button" class="btn btn-danger bmd-btn-fab">
    <i class="material-icons">grade</i>
  </button>
</fieldset>
{% endexample %}

### Sizes

Using `bmd-btn-fab-sm` on the button, or using `btn-group-sm` on the enclosing element of a `bmd-btn-fab` renders a small variation.

{% example html %}
<span class="btn-group-lg">
  <button type="button" class="btn btn-danger bmd-btn-fab">
    <i class="material-icons">grade</i>
  </button>
</span>
<button type="button" class="btn btn-danger bmd-btn-fab">
  <i class="material-icons">grade</i>
</button>
<button type="button" class="btn btn-danger bmd-btn-fab bmd-btn-fab-sm">
  <i class="material-icons">grade</i>
</button>
<span class="btn-group-sm">
  <button type="button" class="btn btn-danger bmd-btn-fab">
    <i class="material-icons">grade</i>
  </button>
</span>
{% endexample %}


## Icon 

{% example html %}
<button type="button" class="btn btn-primary bmd-btn-icon">
  <i class="material-icons">more_vert</i>
</button>
<button type="button" class="btn btn-secondary bmd-btn-icon">
  <i class="material-icons">more_vert</i>
</button>
<button type="button" class="btn btn-success bmd-btn-icon">
  <i class="material-icons">more_vert</i>
</button>
<button type="button" class="btn btn-info bmd-btn-icon">
  <i class="material-icons">more_vert</i>
</button>
<button type="button" class="btn btn-warning bmd-btn-icon">
  <i class="material-icons">more_vert</i>
</button>
<button type="button" class="btn btn-danger bmd-btn-icon">
  <i class="material-icons">more_vert</i>
</button>
<button type="button" class="btn btn-danger bmd-btn-icon active">
  <i class="material-icons">more_vert</i>
</button>
{% endexample %}

### Disabled
{% example html %}
<fieldset disabled>
  <button type="button" class="btn btn-primary bmd-btn-icon">
    <i class="material-icons">more_vert</i>
  </button>
  <button type="button" class="btn btn-secondary bmd-btn-icon">
    <i class="material-icons">more_vert</i>
  </button>
  <button type="button" class="btn btn-success bmd-btn-icon">
    <i class="material-icons">more_vert</i>
  </button>
  <button type="button" class="btn btn-info bmd-btn-icon">
    <i class="material-icons">more_vert</i>
  </button>
  <button type="button" class="btn btn-warning bmd-btn-icon">
    <i class="material-icons">more_vert</i>
  </button>
  <button type="button" class="btn btn-danger bmd-btn-icon">
    <i class="material-icons">more_vert</i>
  </button>
</fieldset>
{% endexample %}

### Sizes

Using `bmd-btn-icon-sm` on the button, or using `btn-group-sm` on the enclosing element of a `bmd-btn-icon` renders a small variation.

{% example html %}
<button type="button" class="btn bmd-btn-icon">
  <i class="material-icons">more_vert</i>
</button>
<button type="button" class="btn bmd-btn-icon bmd-btn-icon-sm">
  <i class="material-icons">more_vert</i>
</button>
<span class="btn-group-sm">
  <button type="button" class="btn bmd-btn-icon">
    <i class="material-icons">more_vert</i>
  </button>
</span>
{% endexample %}


