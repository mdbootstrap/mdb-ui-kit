---
layout: docs
title: List group
group: material-design
---

Material design list groups are specialized versions of their bootstrap counterparts, opting for the flexbox layout to achieve
the varieties specified. ([Specification](https://www.google.com/design/spec/components/lists.html#lists-specs))

The material classes introduced are:

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
        {% markdown %}`.mdb-list-group-item`{% endmarkdown %}
      </td>
      <td class="text-nowrap">
        {% markdown %}`.list-group-item`{% endmarkdown %}
      </td>
      <td>
        {% markdown %}Flexbox layout, including conveniences for icon and label layout.{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        {% markdown %}`.mdb-list-group-col`{% endmarkdown %}
      </td>
      <td class="text-nowrap">
        {% markdown %}None{% endmarkdown %}
      </td>
      <td>
        {% markdown %}Flexbox column - additional class to use within a `.list-group-item` for layout, such as a multi-line content section.{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        {% markdown %}`.right`{% endmarkdown %}
      </td>
      <td class="text-nowrap">
        {% markdown %}None{% endmarkdown %}
      </td>
      <td>
        {% markdown %}Flex layout marker - additional class needed when only one icon/label is present and it should be right aligned.  Only valid as a child of `.mdb-list-group-item`{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        {% markdown %}`.mdb-list-group-sm`{% endmarkdown %}
      </td>
      <td class="text-nowrap">
        {% markdown %}None{% endmarkdown %}
      </td>
      <td>
        {% markdown %}Use on `.mdb-list-group` for the dense list display{% endmarkdown %}
      </td>
    </tr>

  </tbody>
</table>

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}


## Single line

### Text

{% example html %}
<ul class="list-group">
  <li class="mdb-list-group-item">Inbox</li>
  <a href="#" class="mdb-list-group-item">Link item</a>
  <button type="button" class="mdb-list-group-item">Button item</button>
  <a href="#" class="mdb-list-group-item disabled">Disabled item</a>
</ul>
{% endexample %}

### Dense

{% example html %}
<ul class="list-group mdb-list-group-sm">
  <li class="mdb-list-group-item">Inbox</li>
  <a href="#" class="mdb-list-group-item">Link item</a>
  <button type="button" class="mdb-list-group-item">Button item</button>
  <a href="#" class="mdb-list-group-item disabled">Disabled item</a>
</ul>
{% endexample %}

### Icons and labels

{% example html %}
<ul class="list-group">
  <li class="mdb-list-group-item">
    <i class="material-icons">inbox</i>
    Icon left
  </li>
  <li class="mdb-list-group-item">
    <span class="label label-default label-pill">14</span>
    Label pill left
  </li>  
  
  <li class="mdb-list-group-item">
    <i class="material-icons">inbox</i>
    Icons left and right
    <i class="material-icons">face</i>
  </li>
  <li class="mdb-list-group-item">
    <span class="label label-default label-pill">14</span>
    Label pill left and right
    <span class="label label-default label-pill">14</span>
  </li>  

  <li class="mdb-list-group-item">
    Icon <code>.right</code>
    <i class="material-icons right">face</i>
  </li>
  <li class="mdb-list-group-item">
    Label pill <code>.right</code>
    <span class="label label-default label-pill right">14</span>
  </li>  
  
  <li class="mdb-list-group-item">
    <span class="label label-default label-pill">14</span>
    Label pill and icon
    <i class="material-icons">inbox</i>
  </li>  
  <li class="mdb-list-group-item">
    <i class="material-icons">inbox</i>
    Icon and label pill
    <span class="label label-default label-pill">14</span>
  </li>  
</ul>
{% endexample %}



## Double line

###  Text

{% example html %}
<ul class="list-group">
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

###  Dense

{% example html %}
<ul class="list-group mdb-list-group-sm">
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
<ul class="list-group">
  <li class="mdb-list-group-item">
    <i class="material-icons">inbox</i>
    <div class="mdb-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Icon left</p>
    </div>
  </li>

  <li class="mdb-list-group-item">
    <span class="label label-default label-pill">14</span>
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

## Three line

###  Text

{% example html %}
<ul class="list-group">
  <li class="mdb-list-group-item">
    <div class="mdb-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">This disallows more than two lines.  Hopefully an ellipsis ends this text.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut malesuada elit. Proin tristique, lorem eu vehicula congue, lectus ipsum porta quam, eget rutrum sapien turpis et libero.</p>
    </div>
  </li>
  <li class="mdb-list-group-item">
    <div class="mdb-list-group-col">
      <p class="list-group-item-heading">List group item heading</p>
      <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut malesuada elit. Proin tristique, lorem eu vehicula congue, lectus ipsum porta quam, eget rutrum sapien turpis et libero.</p>
    </div>
  </li>
</ul>
{% endexample %}

