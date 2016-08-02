---
layout: docs
title: List groups
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
<ul class="list-group">
  <li class="list-group-item">Text only</li>
  <a href="#" class="list-group-item">Link item</a>
  <button type="button" class="list-group-item">Button item</button>
  <a href="#" class="list-group-item active">Active link item</a>
  <a href="#" class="list-group-item disabled">Disabled item</a>
</ul>
{% endexample %}

### Dense

{% example html %}
<ul class="list-group bmd-list-group-sm">
  <li class="list-group-item">Text</li>
  <a href="#" class="list-group-item">Link item</a>
  <button type="button" class="list-group-item">Button item</button>
  <a href="#" class="list-group-item active">Active link item</a>
  <a href="#" class="list-group-item disabled">Disabled item</a>
</ul>
{% endexample %}

### Icons and labels

{% example html %}
<ul class="list-group">
  <a class="list-group-item">
    <i class="material-icons">inbox</i>
    Icon left
  </a>
  <a class="list-group-item">
    <span class="label label-default label-pill">14</span>
    Label pill left
  </a>  
  
  <a class="list-group-item">
    <i class="material-icons">inbox</i>
    Icons left and right
    <i class="material-icons">face</i>
  </a>
  <a class="list-group-item">
    <span class="label label-default label-pill">14</span>
    Label pill left and right
    <span class="label label-default label-pill">14</span>
  </a>  

  <a class="list-group-item">
    Icon right
    <i class="material-icons pull-xs-right">face</i>
  </a>
  <a class="list-group-item">
    Label pill right
    <span class="label label-default label-pill pull-xs-right">14</span>
  </a>  
  
  <a class="list-group-item">
    <span class="label label-default label-pill">14</span>
    Label pill and icon
    <i class="material-icons">inbox</i>
  </a>  
  <a class="list-group-item">
    <i class="material-icons">inbox</i>
    Icon and label pill
    <span class="label label-default label-pill">14</span>
  </a>  
</ul>
{% endexample %}



## Double line

###  Text

{% example html %}
<ul class="list-group">
  <a class="list-group-item">
    <div class="bmd-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Some text</p>
    </div>
  </a>
  <a class="list-group-item">
    <div class="bmd-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Some text</p>
    </div>
  </a>
  <a class="list-group-item">
    <div class="bmd-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Some text</p>
    </div>
  </a>  
</ul>
{% endexample %}

###  Dense

{% example html %}
<ul class="list-group bmd-list-group-sm">
  <a class="list-group-item">
    <div class="bmd-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Some text</p>
    </div>
  </a>
  <a class="list-group-item">
    <div class="bmd-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Some text</p>
    </div>
  </a>
  <a class="list-group-item">
    <div class="bmd-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Some text</p>
    </div>
  </a>  
</ul>
{% endexample %}

###  Icons and labels

{% example html %}
<ul class="list-group">
  <a class="list-group-item">
    <i class="material-icons">inbox</i>
    <div class="bmd-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Icon left</p>
    </div>
  </a>

  <a class="list-group-item">
    <span class="label label-default label-pill">14</span>
    <div class="bmd-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Icon left</p>
    </div>
  </a>

  <a class="list-group-item">
    <i class="material-icons">inbox</i>
    <div class="bmd-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Icons left and right</p>
    </div>
    <i class="material-icons">face</i>
  </a>

  <a class="list-group-item">
    <div class="bmd-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Icon right</p>
    </div>
    <i class="material-icons pull-xs-right">face</i>
  </a>

  <a class="list-group-item">
    <div class="bmd-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Label pill to the right</p>
    </div>
    <span class="label label-default label-pill pull-xs-right">14</span>
  </a>
</ul>
{% endexample %}

## Three line

###  Text

{% example html %}
<ul class="list-group">
  <a class="list-group-item">
    <div class="bmd-list-group-col">
      <p class="list-group-item-heading">Linked list group item heading</p>
      <p class="list-group-item-text">This disallows more than two lines.  Hopefully an ellipsis ends this text.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut malesuada elit. Proin tristique, lorem eu vehicula congue, lectus ipsum porta quam, eget rutrum sapien turpis et libero.</p>
    </div>
  </a>
  <li class="list-group-item">
    <div class="bmd-list-group-col">
      <p class="list-group-item-heading">Text list group item heading</p>
      <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut malesuada elit. Proin tristique, lorem eu vehicula congue, lectus ipsum porta quam, eget rutrum sapien turpis et libero.</p>
    </div>
  </li>
</ul>
{% endexample %}

## Classes

<table>
  <thead>
    <tr>
      <th>Classes</th>
      <th>BS Equivalent</th>
      <th>Differences</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>.list-group-item</code>
      </td>
      <td class="text-nowrap">
        <code>.list-group-item</code>
      </td>
      <td>
        {% markdown %}Flexbox layout, including conveniences for icon and label layout.{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        <code>.bmd-list-group-col</code>
      </td>
      <td class="text-nowrap">
        {% markdown %}None{% endmarkdown %}
      </td>
      <td>
        {% markdown %}Flexbox column - additional class to use within an `.list-group-item` for layout, such as a multi-line content section.{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        <code>.bmd-list-group-sm</code>
      </td>
      <td class="text-nowrap">
        {% markdown %}None{% endmarkdown %}
      </td>
      <td>
        {% markdown %}Use on `.bmd-list-group` for the dense list display{% endmarkdown %}
      </td>
    </tr>

  </tbody>
</table>


## Variables

See `variables/_list-group.scss` for a complete list of variables.  Key variables are below:

<table>
  <thead>
    <tr>
      <th>Variable</th>
      <th>Value</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>$list-group-bg</code>
      </td>
      <td>
        <code>inherit</code>
      </td>
      <td>
        {% markdown %}Original value was `#fff`, but it seemed that too often list-groups needed the background to be inherited from the underlying container.{% endmarkdown %}
      </td>
    </tr>
  </tbody>
</table>
