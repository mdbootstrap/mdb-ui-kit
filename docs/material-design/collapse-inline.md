---
layout: docs
title: Collapse inline
group: material-design
---

The Material Design for Bootstrap `CollapseInline` plugin allows you to toggle inline content on your pages with a bit of JavaScript and some classes. This plugin utilizes a handful of classes from the [Bootstrap collapse plugin]({{ site.baseurl }}/components/collapse/) for easy toggle behavior. Since most functionality and documentation (including a rich set of Javascript events) is already provided by the [Bootstrap collapse plugin]({{ site.baseurl }}/components/collapse/), the following will focus only on some samples utilizing the BMD `CollapseInline` component. 

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Classes

Below is a list of relevant classes options:
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
        <code>.bmd-collapse-inline</code>
      </td>
      <td>
        {% markdown %}Marker class. It is usually included on the `.bmd-form-group` if the collapse scenario has any inputs.{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        <code>.collapse</code>
      </td>
      <td>{% markdown %}A bootstrap class signifying the container element for markup that will be initially hidden, but expanded inline.{% endmarkdown %}
      </td>
    </tr>
  </tbody>
</table>

## Behavior

- On `shown.bs.collapse` (full visibility), the plugin will find the first `input` of any type and call `focus()`.
- On `blur` of the input element, the plugin will call `.collapse('hide')` to collapse the container.


## Example: Search field triggered by an icon button

Click the search icon below (on the right).  

{% example html %}
<div class="bmd-form-group bmd-collapse-inline pull-xs-right">
  <button class="btn bmd-btn-icon" for="search" data-toggle="collapse" data-target="#collapse-search" aria-expanded="false" aria-controls="collapse-search">
    <i class="material-icons">search</i>
  </button>  
  <span id="collapse-search" class="collapse">
    <input class="form-control" type="text" id="search" placeholder="Enter your query...">
  </span>
</div>
{% endexample %}

### Javascript event example

Behavior customization can be achieved by responding to the [collapse plugin's Javascript events]({{ site.baseurl }}/components/collapse/#events).
 
 
For example, the following code would clear the search input field after collapsing it:

{% highlight js %}
  // clear field value once closed
  $(function() {
    $('#collapse-search').on('hidden.bs.collapse', function() {
      $('#search').val('')
    })
  });
{% endhighlight %}
