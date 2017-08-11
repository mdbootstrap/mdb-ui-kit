---
layout: docs
title: Labels
group: material-design
---

Below is a complete list of `<label>` class options supported by Material Design for Bootstrap:

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
        <code>.bmd-label-static</code>
      </td>
      <td>
        {% markdown %}Statically positioned above the input{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        <code>.bmd-label-placeholder</code>
      </td>
      <td>
{% markdown %}
Renders a `<label>` as a placeholder

- _focused_: not visible after first keystroke
- _unfocused & empty_: placeholder
- _unfocused & filled_: not visible
- do not use the placeholder attribute with this option      
{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        <code>.bmd-label-floating</code>
      </td>
      <td>
{% markdown %}
Animated combination of placeholder and label: 

- _focused_: label animates from placeholder to static label
- _unfocused & empty_: placeholder
- _unfocused & filled_: renders the same as `.bmd-label-static`
{% endmarkdown %}
      </td>
    </tr>
  </tbody>
</table>

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Styles

{% example html %}
<form>
  <fieldset class="form-group">
    <label for="exampleInputEmail1" class="bmd-label-static">label-static</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="placeholder text">
    <span class="bmd-help">We'll never share your email with anyone else.</span>
  </fieldset>
  <fieldset class="form-group">
    <label for="exampleInputEmail1" class="bmd-label-floating">label-floating</label>
    <input type="email" class="form-control" id="exampleInputEmail1">
    <span class="bmd-help">We'll never share your email with anyone else.</span>
  </fieldset>
  <fieldset class="form-group">
    <label for="exampleInputEmail1" class="bmd-label-placeholder">label-placeholder</label>
    <input type="email" class="form-control" id="exampleInputEmail1">
    <span class="bmd-help">We'll never share your email with anyone else.</span>
  </fieldset>
</form>
{% endexample %}
