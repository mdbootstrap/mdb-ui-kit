---
layout: docs
title: Test
group: material-design
---

## Switches

{% example html %}
<form>
  <div class="switch">
    <label>
      Wi-Fi
      <input type="checkbox" checked>
    </label>
  </div>
  <div class="switch">
    <label>
      Bluetooth
      <input type="checkbox">
    </label>
  </div>
</form>
{% endexample %}

## Radios

{% example html %}
<form>
  <div class="radio">
    <label>
      <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
      Option one is this and that&mdash;be sure to include why it's great
    </label>
  </div>
  <div class="radio">
    <label>
      <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
      Option two can be something else and selecting it will deselect option one
    </label>
  </div>
  <div class="radio disabled">
    <label>
      <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
      Option three is disabled
    </label>
  </div>
  
  <label class="radio-inline">
    <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 1
  </label>
  <label class="radio-inline">
    <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 2
  </label>
  <label class="radio-inline">
    <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> 3
  </label>   
</form>
{% endexample %}

## Checkboxes 

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
      Option one is this and that&mdash;be sure to include why it's great
    </label>
  </div>
  <div class="checkbox disabled">
    <label>
      <input type="checkbox" value="" disabled>
      Option two is disabled
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
