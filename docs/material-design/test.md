---
layout: docs
title: Test
group: material-design
---

## Collapse method for mdb-btn-icon and field
{% example html %}
<div class="mdb-form-group mdb-collapse-inline pull-xs-right">
  <button class="btn mdb-btn-icon" for="search" data-toggle="collapse" data-target="#collapse-search" aria-expanded="false" aria-controls="collapse-search">
    <i class="material-icons">search</i>
  </button>  
  <span id="collapse-search" class="collapse">
    <input class="form-control" type="text" id="search" placeholder="Enter your query...">
  </span>
</div>

<script>
  // jquery not loaded yet due to the nature of this jekyll page rendering setup so this is more complicated than normally necessary!
  document.addEventListener("DOMContentLoaded", function(event) { 
    setTimeout(function(){
      // clear field value once closed
      $('#collapse-search').on('hidden.bs.collapse', function() {
        $('#search').val('')
      })
    }, 1);
  })
</script>
{% endexample %}


{% highlight js %}
  // clear field value once closed
  $(function() {
    $('#collapse-search').on('hidden.bs.collapse', function() {
      $('#search').val('')
    })
  });
{% endhighlight %}


## Collapse on the left
{% example html %}
<div class="mdb-form-group mdb-collapse-inline">
  <button class="btn mdb-btn-icon" for="search" data-toggle="collapse" data-target="#collapse-search2" aria-expanded="false" aria-controls="collapse-search2">
    <i class="material-icons">search</i>
  </button>  
  <span id="collapse-search2" class="collapse">
    <input class="form-control" type="text" id="search" placeholder="Enter your query...">
  </span>
</div>
{% endexample %}



## With label-placeholder
Perhaps this isn't worth doing, considering the context.  we need to override the top calc to determine where this goes, or perhaps we should switch to a bottom calc for everything?
{% example html %}
<div class="mdb-form-group mdb-collapse-inline pull-xs-right">
  <button class="btn mdb-btn-icon" for="search" data-toggle="collapse" data-target="#collapse-search3" aria-expanded="false" aria-controls="collapse-search3">
    <i class="material-icons">search</i>
  </button>  
  <span id="collapse-search3" class="collapse width">
    <label class="mdb-label-placeholder" for="search2">Enter your query...</label>
    <input class="form-control" type="text" id="search2">
  </span>
</div>
{% endexample %}
