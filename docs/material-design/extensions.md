---
layout: docs
title: Extensions
group: material-design
---

{% callout warning %}
## **Heads up! DON'T even think about using this!**
 
Development in progress, no promises this will work...ever...it may even simply be removed.
{% endcallout %}


## Select2

To use Select2, you must first include the appropriate `select2.js`.  See the [select2](https://github.com/select2/select2) project for more information

<!-- include master here for our samples -->
<script src="https://cdn.rawgit.com/select2/select2/master/dist/js/select2.full.js"> </script>

### Single select

<form>
  <div class="form-group">
    <label for="select-bmd" class="bmd-label-floating">Example BMD select</label>
    <select class="form-control" id="select-bmd">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
</form>

{% example html %}
<form>
  <div class="form-group">
    <label for="single-select2" class="bmd-label-floating">Example select2</label>
    <select class="form-control" id="single-select2">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
</form>

<script>
  $(function() {
    var $eventSelect = $('#single-select2')
    $eventSelect.on("select2:open", function (e) { log("select2:open", e); });
    $eventSelect.on("select2:close", function (e) { log("select2:close", e); });
    $eventSelect.on("select2:select", function (e) { log("select2:select", e); });
    $eventSelect.on("select2:unselect", function (e) { log("select2:unselect", e); });
     
    $eventSelect.on("change", function (e) { log("change"); });
     
    function log (name, evt) {
      if (!evt) {
        var args = "{}";
      } else {
        var args = JSON.stringify(evt.params, function (key, value) {
          if (value && value.nodeName) return "[DOM node]";
          if (value instanceof $.Event) return "[$.Event]";
          return value;
        });
      }
      console.debug(name + " -> ", args)      
    }  
  
  
    $('#single-select2').select2()
  })
</script>  
{% endexample %}
