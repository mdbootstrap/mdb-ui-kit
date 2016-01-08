---
layout: docs
title: Test
group: material-design
---

## Collapse method for mdb-btn-icon and field
{% example html %}
<div class="mdb-form-group mdb-collapse-inline pull-xs-right">
  <button class="btn mdb-btn-icon" for="search" data-toggle="collapse" data-target="#search-field" aria-expanded="false" aria-controls="search-field">
    <i class="material-icons">search</i>
  </button>  
  <span id="search-field" class="collapse width">
    <input class="form-control" type="text" id="search" placeholder="Enter your query...">
  </span>
</div>
{% endexample %}



## With label-placeholder
Perhaps this isn't worth doing, considering the context.  we need to override the top calc to determine where this goes, or perhaps we should switch to a bottom calc for everything?
{% example html %}
<div class="mdb-form-group mdb-collapse-inline pull-xs-right">
  <button class="btn mdb-btn-icon" for="search" data-toggle="collapse" data-target="#search-field2" aria-expanded="false" aria-controls="search-field2">
    <i class="material-icons">search</i>
  </button>  
  <span id="search-field2" class="collapse width">
    <label class="mdb-label-placeholder" for="search2">Enter your query...</label>
    <input class="form-control" type="text" id="search2">
  </span>
</div>
{% endexample %}
