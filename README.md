# bootstrap-material-design

[![build status](https://travis-ci.org/FezVrasta/bootstrap-material-design.svg?branch=master)](https://travis-ci.org/FezVrasta/bootstrap-material-design)
[![gratipay](https://img.shields.io/gratipay/FezVrasta.svg)](https://gratipay.com/FezVrasta)
[![Bower version](https://badge.fury.io/bo/bootstrap-material-design.svg)](https://github.com/FezVrasta/bootstrap-material-design)

[![banner](demo/imgs/banner.jpg)](#)

This Bootstrap theme is an easy way to use the new [Material Design guidelines by Google](http://www.google.com/design/spec/material-design/introduction.html) in your Bootstrap 3 based application.
Just include the theme, after the Bootstrap CSS and include the JavaScript at the end of your document (just before the `</body>` tag), and everything will be converted to Material Design (Paper) style.

**NOTE**: This theme is still in development, it could be used on production websites but I can't guarantee compatibility with previous versions.

Check out [the demo at this link](http://fezvrasta.github.io/bootstrap-material-design/).

## How to install

You may install this theme using Bower or Meteor:

- Bower : `bower install bootstrap-material-design`
- Meteor: `meteor add fezvrasta:bootstrap-material-design`

If you prefer, you can include this framework in your project using our official CDN:

- [Bootstrap Material Design on CDNJS.com](https://cdnjs.com/libraries/bootstrap-material-design)
- [Bootstrap Material Design on JSDelivr.com](http://www.jsdelivr.com/#!bootstrap.material-design)


## Getting started

Navigate to the `dist/` folder in this repository, and you will see the `test.html` file, which has the CSS include statements, in the `head` section and the JS includes just before `body` section closes.
You need to copy the `dist/` folder to the root of your project, ensuring that all the files in your project can access the files through the relative URL, supplied in the CSS and the JS includes.

### material-fullpalette.css or material.css?

The only difference is that `material-fullpalette.css` has the full colors palette available (large file), the other one has just the primary colors (small file).

### Use custom color as primary

Is often asked how to change the primary color of this theme without edit the bower package directly.

You can do it by creating a less file in your project:

```css
@import "../bower_components/bootstrap-material-design/less/material.less";

// Override @primary color with one took from _colors.less
@primary: @deep-purple;
```    

Then, compiling this file, the entire theme will be compiled using the color chosen by you.

## Support

If you like this project you may support it by donating via Gittip, starring this repository or reporting issues.  All issues filed should be reduced to a [CodePen](http://codepen.io/rosskevin/pen/VvRgrN) test case where possible.

[![gittip](demo/imgs/gittip-button.jpg)](https://www.gratipay.com/FezVrasta/)
[![issues](demo/imgs/issues-button.jpg)](https://github.com/FezVrasta/bootstrap-material-design/issues)

## Contribute

Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file.  

## Development

We are using Grunt to automate the workflow and build process. Ensure you have nodejs installed and grunt-cli installed globally.
After cloning the repo, run `npm install` to ensure you have all dev dependencies.

### Grunt

- `grunt build` - run the tests and compile the less/sass. See [Gruntfile.js](Gruntfile.js) for details on targets.
- `grunt test` - browser-based Jasmine unit tests.
- `grunt serve` - build and fire up an http server with live-reload and a watch for development purposes.

### LESS & SASS

The bootstrap 3.x compatible version (master) is developed using LESS, with an automated conversion to SASS.

The upcoming 4.x version (no branch yet) will be developed using SASS.


## Documentation

Material Design ([spec](http://www.google.com/design/spec/material-design/introduction.html)) for Bootstrap provides 
styles for bootstrap based markup to comply with Material Design concepts.

### Color Variations

There are 17 additional color variations (in addition to the classic 4 variations) for buttons, inputs, checkboxes, radios, alerts, navbars, tabs, labels, paginations, progress bars and more.
They can be used by adding the class suffix `-material-color` to the desired element and replacing `color` with the desired one.

Example:

```html
<button class="btn btn-material-deep-purple">Deep purple button</button>
```

These colors are taken from the Material Design color palette and are reported below:

![palette](demo/imgs/palette.jpg)

To take advantage of all the shades please use `material-fullpalette.css`, but please be aware of its huge size.

### Forms

All inputs should be surrounded by a standard `.form-group`, and as such `material.js` will enforce this.  The `.form-group` is
used to signal different input styles and variations.  See the examples for variations.

#### Sizing

In general, it is preferred that sizing be altered with either `.form-group-sm` or `.form-group-lg`.  Due to the interconnected
nature of inputs, labels, margins and padding, `material.js` will convert any use of `.input-sm` or `.input-lg` to 
`.form-group-sm` or `.form-group-lg` in order to reduce the necessary markup/variations and get a standard sizing with
fewer side effects.

#### Buttons

Add `.btn-flat` to a button to make it flat, without shadows.
Add `.btn-raised` to a button to add a permanent shadow to it.

#### Inputs

##### Labels

The following classes should be placed on the `.form-group` to indicate the label style:

- `.label-floating` - renders label as a placeholder, that animates above the field upon focus
- `.label-static` - renders label above the field. `input placeholder` attribute can also be used in conjunction
- `.label-placeholder` - renders a label as a placeholder only 
- no label, but use of `input placeholder` attribute - same rendering as `.label-placeholder`

##### Hints

Upon focus, a hint can be displayed.  Use any `p | span` with `.help-block`.


##### Examples

```html
  <div class="form-group label-static">
    <label for="i2" class="control-label">label-static</label>
    <input type="email" class="form-control" id="i2" placeholder="placeholder attribute">
    <p class="help-block">This is a hint as a <code>p.help-block.hint</code></p>
  </div>

  <div class="form-group label-floating">
    <label for="i5" class="control-label">label-floating</label>
    <input type="email" class="form-control" id="i5">
    <span class="help-block">This is a hint as a <code>span.help-block.hint</code></span>
  </div>

  <div class="form-group label-placeholder">
    <label for="i5p" class="control-label">label-placeholder</label>
    <input type="email" class="form-control" id="i5p">
    <span class="help-block">This is a hint as a <code>span.help-block.hint</code></span>
  </div>
```


#### Radio, Checkbox, Toggle

Be sure to inspect the source of the demos to find proper markup examples. Remember to use the proper HTML markup.

Radio example:

```html
<div class="form-group">
  <label class="col-lg-2 control-label">Radios</label>

  <div class="col-lg-10">
    <div class="radio radio-primary">
      <label>
        <input type="radio" name="optionsRadios" checked="">
        Option one
      </label>
    </div>
    <div class="radio radio-primary">
      <label>
        <input type="radio" name="optionsRadios">
        Option two
      </label>
    </div>
  </div>
</div>
```      
        
        

### Icons

Material Design for Bootstrap includes 490 original Material Design icons!
These icons are extracted from the original Google sources and are licensed under the BSD license.
They are provided as an iconic and easy to use font.

Variations are available for every icon, including the original Bootstrap icons.

The syntax to add a Material icon is:

```html
<i class="icon icon-material-favorite"></i>
```

### Cards 

A card will expand to fill all of the available width (e.g. column's width). Card's height will be automatically resized to match width.

Here is an example on how to use it:

```html
<div class="card">

    <div class="card-height-indicator"></div>

    <div class="card-content">

        <div class="card-image">
            <img src="./image.jpg" alt="Loading image...">
            <h3 class="card-image-headline">Lorem Ipsum Dolor</h3>
        </div>

        <div class="card-body">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>

        <footer class="card-footer">
            <button class="btn btn-flat">Share</button>
            <button class="btn btn-flat btn-warning">Learn More</button>
        </footer>

    </div>

</div>
```    
    
Cards will adapt to column's width. The card below will have width equal to col-lg-6:

```html
<div class="row">
    <div class="col-lg-3"></div>

    <div class="col-lg-6">
        <div class="card">
            ...
        </div>
    </div>

    <div class="col-lg-3"></div>
</div>
```

## material.js

`material.js` is a jQuery plugin that adds some magic to your markup and allows Material Design for Bootstrap to style some elements like inputs, checkboxes, radios etc.

### Functions

* `$.material.init()` - shortcut to run all the following commands:
* `$.material.ripples()` will apply ripples.js to the default elements.
* `$.material.input()` will enable the MD style to the text inputs, and other kind of inputs (number, email, file etc).
* `$.material.checkbox():` will enable the MD style to the checkboxes (remember to follow the markup guidelines explained in the [Inputs section](#inputs).
* `$.material.radio():` will enable the MD style to the checkboxes (remember to follow the markup guidelines explained in the Inputs section.

### Apply only to specific elements

Every function expects an optional value that will be used as a selector for the function; for example,
`$.material.ripples("#selector, #foobar")` will apply Ripples.js only to `#selector` and `#foobar`.
The functions that allows an optional selector are `$.material.ripples`, `$.material.input`, `$.material.checkbox` and `$.material.radio`.

You can even override the default values using the `$.material.options` function. The default values are:

```javascript
$.material.options = {
    "withRipples": ".btn:not(.btn-link), .card-image, .navbar a:not(.withoutripple), .nav-tabs a:not(.withoutripple), .withripple",
    "inputElements": "input.form-control, textarea.form-control, select.form-control",
    "checkboxElements": ".checkbox > label > input[type=checkbox]",
    "radioElements": ".radio > label > input[type=radio]"
}
```    

### Arrive.js support

If you need to dynamically add elements to your DOM then you may need to include `Arrive.js` before `Material.js`. This will automatically apply `material.js` to every new element added via JavaScript.

## Plugins

Material Design for Bootstrap comes with styling support for various external scripts:

### SnackbarJS

Create snackbars and toasts with the [SnackbarJS plugin](https://github.com/FezVrasta/snackbarjs). The default toast style is the squared one (snackbar style). If you like to use the rounded style (toast style), please add the `toast` class to the `style` option of SnackbarJS.

### RipplesJS

This is part of the Material Design for Bootstrap project and is a plain JavaScript script which creates the ripple effect when clicking on the specified elements.
At the moment RipplesJS does not have its own repository but it will probably have one in the future.

You may want to set a custom color to the ripples of a specific element, to do so write:

```html
<button class="btn btn-default" data-ripple-color="#F0F0F0">Custom ripple</button>
```

### noUiSlider

Make cross-browser sliders and get them styled with Material Design thanks to the support provided by this theme.
Read more about [noUiSlider here](http://refreshless.com/nouislider/).

### Dropdown.js

Finally a dropdown plugin that transforms select inputs in nice dropdowns and does not drive you crazy.
Read more about [Dropdown.js here](https://github.com/FezVrasta/dropdown.js).

### Selectize.js

Transform select and multi-select inputs into advanced text inputs. Material Design for BS provides a full replacement of the plugin's CSS, so don't include it.
Read more about [selectize.js](http://brianreavis.github.io/selectize.js/).

### Bootstrap Material Datepicker

A Material Design datepicker created to be used with Material Design for Bootstrap.  
Read more about [Bootstrap Material Datepicker](https://github.com/T00rk/bootstrap-material-datepicker)

## Compatibility

Currently, Material Design for Bootstrap supports Google Chrome (tested v37+), Mozilla Firefox (tested 30+), and Internet Explorer (tested 11+). Mobile browsers are not currently tested but they may work.


## License
[MIT License](LICENSE) 
