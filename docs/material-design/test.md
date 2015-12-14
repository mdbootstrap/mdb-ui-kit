---
layout: docs
title: Test
group: material-design
---

{% example html %}
<form>  
  <div class="checkbox">
    <label>
      <input type="checkbox"> Check me out
    </label>
  </div>   
  <div class="checkbox">
    <label>
      <input type="checkbox" value="" checked>
      I'm selected because I seem like the safe choice
    </label>
  </div>
  <div class="checkbox disabled">
    <label>
      <input type="checkbox" value="" disabled>
      Option is disabled because it is scary
    </label>
  </div>    
  <label class="checkbox-inline">
    <input type="checkbox" id="inlineCheckbox1" value="option1"> 1
  </label>
  <label class="checkbox-inline">
    <input type="checkbox" id="inlineCheckbox2" value="option2"> 2
  </label>
  <label class="checkbox-inline">
    <input type="checkbox" id="inlineCheckbox3" value="option3"> 3
  </label>  
</form>
{% endexample %}
