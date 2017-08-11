---
layout: docs
title: Forms
group: material-design
---

Bootstrap provides several form control styles, layout options, and custom components for creating a wide variety of forms.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

Form controls flavored by Material Design for Bootstrap customizations such as `bmd-label-floating`.
{% example html %}
<form>
  <div class="form-group">
    <label for="exampleInputEmail1" class="bmd-label-floating">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1">
    <span class="bmd-help">We'll never share your email with anyone else.</span>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1" class="bmd-label-floating">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="form-group">
    <label for="exampleSelect1" class="bmd-label-floating">Example select</label>
    <select class="form-control" id="exampleSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleSelect2" class="bmd-label-floating">Example multiple select</label>
    <select multiple class="form-control" id="exampleSelect2">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleTextarea" class="bmd-label-floating">Example textarea</label>
    <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
  </div>
  <div class="form-group">
    <label for="exampleInputFile" class="bmd-label-floating">File input</label>
    <input type="file" class="form-control-file" id="exampleInputFile">
    <small class="text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
  </div>
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
  <div class="checkbox">
    <label>
      <input type="checkbox"> Check me out
    </label>
  </div>
  <button class="btn btn-default">Cancel</button>
  <button type="submit" class="btn btn-primary btn-raised">Submit</button>
</form>
{% endexample %}

## Classes

Below is a complete list of options supported by Material Design for Bootstrap and the classes that customize them. Additional documentation is available for each group.

<table>
  <thead>
    <tr>
      <th>Classes</th>
      <th>Used for</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>.bmd-form-group</code>
      </td>
      <td>
        Any group of form controls (e.g. combination of label/input).
      </td>
      <td>
        {% markdown %}This is automatically added by javascript, but if your code is templated, adding `.bmd-form-group` 
        to your form groups or otherwise your groups of controls can reduce rendering churn since the javascript will not
        add the class after the initial page rendering.  This can also demarcate complex label/input combinations inside the 
        same `.form-group`.{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        <code>.bmd-form-group-sm</code>
      </td>
      <td>
        {% markdown %}Added to the `.bmd-form-group`, this will render the combination label/input/help in the smaller variation.{% endmarkdown %}
      </td>
      <td>
        {% markdown %}{% endmarkdown %}
      </td>
    </tr>    
    <tr>
      <td>
        <code>.bmd-form-group-lg</code>
      </td>
      <td>
        {% markdown %}Added to the `.bmd-form-group`, this will render the combination label/input/help in the larger variation.{% endmarkdown %}
      </td>
      <td>
        {% markdown %}{% endmarkdown %}
      </td>
    </tr>     
    <tr>
      <td>
        <code>.bmd-help</code>
      </td>
      <td>
        Any help text
      </td>
      <td>
        {% markdown %}Mark any help text next to an input with `.bmd-help` to gain behaviors such as showing upon focus.{% endmarkdown %}
      </td>
    </tr>    
  </tbody>
</table>


## Form groups

The `.bmd-form-group` class is usually added to the `.form-group` element. Whereas the `.form-group` adds structure to forms by providing `margin-bottom` around a label and control pairing,
 the only purpose of the  `.bmd-form-group` is to demarcate Material Design behaviors for a combination of label/input.  Focus/hover styling for the label/input is determined based on the `.bmd-form-group`. 

The `.bmd-form-group` is added automatically by javascript through basic discovery of the outer demarcation of the component defined by the Bootstrap standard 
markup.  If your code is templated, you may want to add `.bmd-form-group` to the markup directly to prevent any rendering churn from the javascript determining 
and adding the class to the markup.  In custom situations, the javascript may not be able to properly resolve the location for the `.bmd-form-group`, so in rare or complex cases
you may need to wrap your markup in an `.bmd-form-group` to get appropriate focus/hover behavior.

{% example html %}
<form>
  <div class="form-group"> <!-- left unspecified, .bmd-form-group will be automatically added (inspect the code) -->
    <label for="formGroupExampleInput" class="bmd-label-floating">Example label</label>
    <input type="text" class="form-control" id="formGroupExampleInput">
  </div>
  <div class="form-group bmd-form-group"> <!-- manually specified --> 
    <label for="formGroupExampleInput2" class="bmd-label-floating">Another label</label>
    <input type="text" class="form-control" id="formGroupExampleInput2">
  </div>
</form>
{% endexample %}

## Inline forms

Use the `.form-inline` class to to display a series of labels, form controls, and buttons on a single horizontal row. Form controls within inline forms behave differently:

- Controls are `display: inline-block` to provide alignment control via `vertical-align` and `margin`.
- Controls receive `width: auto` to override the Bootstrap default `width: 100%`.
- Controls **only appear inline in viewports that are at least 768px wide** to account for narrow viewports on mobile devices.

Because of this, you may need to manually address the width and alignment of individual form controls. Lastly, as shown below, you should always include a `<label>` with each form control.

### Visible labels

{% example html %}
<form class="form-inline">
  <div class="form-group">
    <label for="exampleInputName2" class="bmd-label-floating">Name</label>
    <input type="text" class="form-control" id="exampleInputName2">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail2" class="bmd-label-floating">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail2">
  </div>
  <span class="form-group bmd-form-group"> <!-- needed to match padding for floating labels -->
    <button type="submit" class="btn btn-primary">Send invitation</button>
  </span>
</form>
{% endexample %}


## Help blocks

`bmd-help` can be used for form tips (known as `help-block` in v3 which has been removed in v4).  These elements are absolutely positioned but hidden, they occupy the space when hidden to prevent form bouncing.

### Multiple

Multiple help blocks will cause the form to bounce because subsequent blocks are relatively positioned.  The space used when hidden is that of a single help comment only.

{% example html %}
<form>
  <div class="form-group">
    <label for="exampleInputEmail1" class="bmd-label-floating">Email address (two help blocks)</label>
    <input type="email" class="form-control" id="exampleInputEmail1">
    <span class="bmd-help">We'll never share your email with anyone else.</span>
    <span class="bmd-help">And this is probably from a second plugin showing in a non-optimal way</span>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1" class="bmd-label-floating">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>  
</form>
{% endexample %}
