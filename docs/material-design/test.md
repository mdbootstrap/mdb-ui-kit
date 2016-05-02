---
layout: docs
title: Test
group: material-design
---

## Test
 
File browser 

{% example html %}
<div class="form-group">
  <label class="control-label" for="inputFile2">Static label</label>
  <input type="file" id="inputFile2" multiple>
  <input type="text" readonly class="form-control" placeholder="Browse2...">
</div>

<div class="form-group">
  <!--<label class="control-label" for="inputFile3">File</label>-->
  <input type="file" id="inputFile3" multiple>
  <input type="text" readonly class="form-control" placeholder="Placeholder only...">
</div>

<div class="form-group">
  <input type="file" id="inputFile4" multiple>

  <div class="input-group">
    <input type="text" readonly class="form-control" placeholder="Placeholder w/input-group...">
    <span class="input-group-btn input-group-sm">
      <button type="button" class="btn btn-fab btn-fab-mini">
        <i class="mdi-editor-attach-file"></i>
      </button>
    </span>
  </div>
</div>  

{% endexample %}
