---
layout: docs
title: Snackbars
group: material-design
---

Snackbars and toasts can be created using the [SnackbarJS](https://github.com/FezVrasta/snackbarjs) plugin developed by us.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Include in the page

In order to make snackbars work, make sure to include `snackbar.min.js` before `bootstrap-material-design.iife.min.js`.

{% highlight html %}
<script src="{{ site.data.cdn.jquery }}"></script>
<script src="{{ site.data.cdn.tether }}"></script>
<script src="{{ site.data.cdn.snackbar }}"></script>
<script src="{{ site.data.cdn.js }}"></script>
<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="{{ site.data.cdn['ie10-viewport-bug-workaround'] }}"></script>
<script>
  $('body').bootstrapMaterialDesign();
</script>
{% endhighlight %}

{% callout info %}
**Heads up!** You don't need to include SnackbarJS CSS, it's already bundled in Bootstrap Material Design.
{% endcallout %}

## Examples

Click on the buttons below to spawn snackbars and toasts:

### Snackbar

{% example html %}
<button type="button" class="btn btn-secondary" data-toggle="snackbar" data-content="Free fried chicken here! <a href='https://example.org' class='btn btn-info'>Check it out</a>" data-html-allowed="true" data-timeout="0">
  Snackbar
</button>
{% endexample %}

### Toast

{% example html %}
<button type="button" class="btn btn-secondary" data-toggle="snackbar" data-style="toast" data-content="Fried chicken out of stock.">
  Toast
</button>
{% endexample %}

## Usage

The complete documentation of SnackbarJS is available visiting [its official GitHub repository](https://github.com/FezVrasta/snackbarjs).
