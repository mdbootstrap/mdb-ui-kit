---
layout: docs
title: List group
group: material-design
---

Material design list groups are specialized versions of their bootstrap counterparts, opting for the flexbox layout to achieve
the varieties specified. ([Specification](https://www.google.com/design/spec/components/lists.html#lists-specs))

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}


## Single line

### Text

{% example html %}
<ul class="mdb-list-group">
  <li class="mdb-list-group-item">Inbox</li>
  <a href="#" class="mdb-list-group-item">Link item</a>
  <button type="button" class="list-group-item">Button item</button>
  <a href="#" class="mdb-list-group-item disabled">Disabled item</a>
</ul>
{% endexample %}

### Icons and labels

{% example html %}
<ul class="mdb-list-group">
  <li class="mdb-list-group-item">
    <i class="material-icons">inbox</i>
    Icon left
  </li>
  <li class="mdb-list-group-item">
    <i class="material-icons">inbox</i>
    Icons left and right
    <i class="material-icons">face</i>
  </li>
  <li class="mdb-list-group-item">
    Icon right
    <i class="material-icons right">face</i>
  </li>
  <li class="mdb-list-group-item">
    Label pill to the right
    <span class="label label-default label-pill right">14</span>
  </li>  
</ul>
{% endexample %}



## Double line

###  Text

{% example html %}
<ul class="mdb-list-group">
  <li class="mdb-list-group-item">
    <div class="mdb-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Some text</p>
    </div>
  </li>
  <li class="mdb-list-group-item">
    <div class="mdb-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Some text</p>
    </div>
  </li>
  <li class="mdb-list-group-item">
    <div class="mdb-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Some text</p>
    </div>
  </li>  
</ul>
{% endexample %}

###  Icons and labels

{% example html %}
<ul class="mdb-list-group">
  <li class="mdb-list-group-item">
    <i class="material-icons">inbox</i>
    <div class="mdb-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Icon left</p>
    </div>
  </li>

  <li class="mdb-list-group-item">
    <i class="material-icons">inbox</i>
    <div class="mdb-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Icons left and right</p>
    </div>
    <i class="material-icons">face</i>
  </li>

  <li class="mdb-list-group-item">
    <div class="mdb-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Icon right</p>
    </div>
    <i class="material-icons right">face</i>
  </li>

  <li class="mdb-list-group-item">
    <div class="mdb-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Label pill to the right</p>
    </div>
    <span class="label label-default label-pill right">14</span>
  </li>
</ul>
{% endexample %}

