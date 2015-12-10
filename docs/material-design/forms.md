---
layout: docs
title: Forms
group: material-design
---

Bootstrap provides several form control styles, layout options, and custom components for creating a wide variety of forms.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Form controls

Form controls flavored by Material Design for Bootstrap customizations such as `label-floating`.
{% example html %}
<form>
  <fieldset class="form-group label-floating">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
    <small class="text-muted">We'll never share your email with anyone else.</small>
  </fieldset>
  <fieldset class="form-group label-floating">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </fieldset>
  <fieldset class="form-group label-floating">
    <label for="exampleSelect1">Example select</label>
    <select class="form-control" id="exampleSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </fieldset>
  <fieldset class="form-group label-floating">
    <label for="exampleSelect2">Example multiple select</label>
    <select multiple class="form-control" id="exampleSelect2">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </fieldset>
  <fieldset class="form-group label-floating">
    <label for="exampleTextarea">Example textarea</label>
    <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
  </fieldset>
  <fieldset class="form-group label-floating">
    <label for="exampleInputFile">File input</label>
    <input type="file" class="form-control-file" id="exampleInputFile">
    <small class="text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
  </fieldset>
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
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
{% endexample %}

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
        {% markdown %}`.mdb-form-group`{% endmarkdown %}
      </td>
      <td class="text-nowrap">
        Any group of form controls
      </td>
      <td>
        {% markdown %}This is automatically added by javascript, but if your code is templated, adding `.mdb-form-group` 
        to your form groups or otherwise your groups of controls can reduce rendering churn since the javascript will not
        add the class after the initial page rendering.{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        {% markdown %}`.label-floating`{% endmarkdown %}
      </td>
      <td>
        
      </td>
      <td>
        {% markdown %}TODO{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        {% markdown %}`.label-static`{% endmarkdown %}
      </td>
      <td>
        
      </td>
      <td>
        {% markdown %}TODO{% endmarkdown %}
      </td>
    </tr>
    <tr>
      <td>
        {% markdown %}`.label-placeholder`{% endmarkdown %}
      </td>
      <td>
        
      </td>
      <td>
        {% markdown %}TODO{% endmarkdown %}
      </td>
    </tr>
  </tbody>
</table>


### Form groups

The `.mdb-form-group` class is usually added to the `.form-group` element. Whereas the `.form-group` adds structure to forms by providing `margin-bottom` around a label and control pairing,
 the only purpose of the  `.mdb-form-group` is to demarcate Material Design behaviors.  Decorations and size variations are intended to be specified on
 this element e.g. `.label-floating`.  Focus/hover styling for the label/input is determined based on the `.mdb-form-group`. 

The `.mdb-form-group` is added automatically by javascript through basic discovery of the outer demarcation of the component defined by the Bootstrap standard 
markup.  If your code is templated, you may want to add `.mdb-form-group` to the markup directly to prevent any rendering churn from the javascript determining 
and adding the class to the markup.  In custom situations, the javascript may not be able to properly resolve the location for the `.mdb-form-group`, so in rare cases
you may need to wrap your markup in an `.mdb-form-group` to get appropriate focus/hover behavior.

{% example html %}
<form>
  <fieldset class="form-group label-floating"> <!-- left unspecified, .mdb-form-group will be automatically added (inspect the code) -->
    <label for="formGroupExampleInput">Example label</label>
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">
  </fieldset>
  <fieldset class="form-group mdb-form-group label-floating"> <!-- manually specified --> 
    <label for="formGroupExampleInput2">Another label</label>
    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input">
  </fieldset>
</form>
{% endexample %}

### Inline forms

Use the `.form-inline` class to to display a series of labels, form controls, and buttons on a single horizontal row. Form controls within inline forms behave differently:

- Controls are `display: inline-block` to provide alignment control via `vertical-align` and `margin`.
- Controls receive `width: auto` to override the Bootstrap default `width: 100%`.
- Controls **only appear inline in viewports that are at least 768px wide** to account for narrow viewports on mobile devices.

Because of this, you may need to manually address the width and alignment of individual form controls. Lastly, as shown below, you should always include a `<label>` with each form control.

#### Visible labels

{% example html %}
<form class="form-inline">
  <div class="form-group label-floating">
    <label for="exampleInputName2">Name</label>
    <input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe">
  </div>
  <div class="form-group label-floating">
    <label for="exampleInputEmail2">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com">
  </div>
  <button type="submit" class="btn btn-primary">Send invitation</button>
</form>
{% endexample %}
