---
layout: docs
title: Labels
group: material-design
---

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Styles

{% example html %}
<form>
  <fieldset class="form-group">
    <label for="exampleInputEmail1" class="mdb-label-static">label-static</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="placeholder text">
    <span class="mdb-help">We'll never share your email with anyone else.</span>
  </fieldset>
  <fieldset class="form-group">
    <label for="exampleInputEmail1" class="mdb-label-floating">label-floating</label>
    <input type="email" class="form-control" id="exampleInputEmail1">
    <span class="mdb-help">We'll never share your email with anyone else.</span>
  </fieldset>
  <fieldset class="form-group">
    <label for="exampleInputEmail1" class="mdb-label-placeholder">label-placeholder</label>
    <input type="email" class="form-control" id="exampleInputEmail1">
    <span class="mdb-help">We'll never share your email with anyone else.</span>
  </fieldset>
</form>
{% endexample %}
