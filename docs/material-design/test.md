---
layout: docs
title: Test
group: material-design
---

## Example 

{% example html id=drawer-1 %}
<div class="form-group">
  <label for="exampleInputEmail1" class="bmd-label-floating">Email address</label>
  <input type="email" class="form-control" id="exampleInputEmail1">
  <span class="bmd-help">We'll never share your email with anyone else.</span>
</div>
  

<h2>normal</h2>
<div class="form-group has-success">
  <label class="form-control-label" for="inputSuccess1">Input with success</label>
  <input type="text" class="form-control form-control-success" id="inputSuccess1">
</div>
<div class="form-group has-warning">
  <label class="form-control-label" for="inputWarning1">Input with warning</label>
  <input type="text" class="form-control form-control-warning" id="inputWarning1">
</div>
<div class="form-group has-danger">
  <label class="form-control-label" for="inputDanger1">Input with danger</label>
  <input type="text" class="form-control form-control-danger" id="inputDanger1">
</div>


<h2>sm</h2>
<div class="bmd-form-group-sm form-group has-success">
  <label class="form-control-label" for="inputSuccess1">Input with success</label>
  <input type="text" class="form-control form-control-success" id="inputSuccess1">
</div>
<div class="bmd-form-group-sm form-group has-warning">
  <label class="form-control-label" for="inputWarning1">Input with warning</label>
  <input type="text" class="form-control form-control-warning" id="inputWarning1">
</div>
<div class="bmd-form-group-sm form-group has-danger">
  <label class="form-control-label" for="inputDanger1">Input with danger</label>
  <input type="text" class="form-control form-control-danger" id="inputDanger1">
</div>

<h2>lg</h2>
<div class="bmd-form-group-lg form-group has-success">
  <label class="form-control-label" for="inputSuccess1">Input with success</label>
  <input type="text" class="form-control form-control-success" id="inputSuccess1">
</div>
<div class="bmd-form-group-lg form-group has-warning">
  <label class="form-control-label" for="inputWarning1">Input with warning</label>
  <input type="text" class="form-control form-control-warning" id="inputWarning1">
</div>
<div class="bmd-form-group-lg form-group has-danger">
  <label class="form-control-label" for="inputDanger1">Input with danger</label>
  <input type="text" class="form-control form-control-danger" id="inputDanger1">
</div>

<fieldset class="form-group">
  <label for="exampleSelect1">Example select</label>
  <select class="form-control" id="exampleSelect1">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </select>
</fieldset>
<fieldset class="form-group">
  <label for="exampleSelect2">Example multiple select</label>
  <select multiple class="form-control" id="exampleSelect2">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </select>
</fieldset>



<div class="form-group">
  <label for="exampleInputEmail4" class="bmd-label-floating">Email address disabled</label>
  <input type="email" class="form-control" id="exampleInputEmail4" disabled>
</div>
<fieldset class="form-group" disabled>
  <label for="exampleInputEmail5" class="bmd-label-floating">Email address fieldset disabled</label>
  <input type="email" class="form-control" id="exampleInputEmail5">
</fieldset>

{% endexample %}
