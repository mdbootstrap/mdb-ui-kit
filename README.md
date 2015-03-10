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

#### material-fullpalette.css or material.css?

The only difference is that `material-fullpalette.css` has the full colors palette available, the other one has just the primary colors.

#### Use custom color as primary

Is often asked how to change the primary color of this theme without edit the bower package directly.

You can do it by creating a less file in your project:

    @import "../bower_components/bootstrap-material-design/less/material-wfont.less";

    // Override @primary color with one took from _colors.less
    @primary: @deep-purple;

Then, compiling this file, the entire theme will be compiled using the color chosen by you.

## Development

We are using Grunt to automate the workflow and build process. Ensure you have nodejs installed and grunt-cli installed globally.
After cloning the repo, run `npm install` to ensure you have all dev dependencies.

Run the `grunt build` command to run the tests and compile the less/sass. See [Gruntfile.js](Gruntfile.js) for details on targets.

Run the `grunt test` command for browser-based Jasmine unit tests.

Run the `grunt serve` command to build and fire up an http server with live-reload and a watch for development purposes.

### LESS & SASS

Currently only LESS is maintained. The SASS version no longer has a maintainer (#256).
The SASS files are in the source just in case someone wants to update the source from SASS and use these files as a base.

## Support me

If you like this project you may support me by donating something on Gittip, starring this repository or reporting bugs and ideas in the issue section.

[![gittip](demo/imgs/gittip-button.jpg)](https://www.gratipay.com/FezVrasta/)
[![issues](demo/imgs/issues-button.jpg)](https://github.com/FezVrasta/bootstrap-material-design/issues)

## Contribute

Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file.


# Documentation

Material Design for Bootstrap provides some additional stuff to get the best from Material Design.

### Variations

There are 17 additional color variations (in addition to the classic 4 variations) for buttons, inputs, checkboxes, radios, alerts, navbars, tabs, labels, paginations, progress bars and more.
They can be used by adding the class suffix `-material-color` to the desired element and replacing `color` with the desired one.

Example:

    <button class="btn btn-material-deep-purple">Deep purple button</button>

These colors are taken from the Material Design color palette and are reported below:

![palette](demo/imgs/palette.jpg)

To take advantage of all the shades please use `material-fullpalette.css`, be aware of its huge size.

### Buttons

Add `.btn-flat` to a button to make it flat, without shadows.
Add `.btn-raised` to a button to add a permanent shadow to it.

### Inputs

Add `.floating-label` to an input field with a `placeholder` to transform the placeholder in a floating label.

Add `data-hint="some hint"` to show an hint under the input when the user focus it.

Remember to use the proper HTML markup to get radio and checkboxes styled correctly (choose between *radio* or *checkbox*):

    <div class="radio/checkbox radio-primary">
        <label>
            <input type="radio/checkbox" checked>
            Option one is this
        </label>
    </div>

### Icons

Material Design for Bootstrap includes 490 original Material Design icons!
These icons are extracted from the original Google sources and are licensed under the BSD license.
They are provided as an iconic and easy to use font.

Variations are available for every icon, including the original Bootstrap icons.

The syntax to add a Material icon is:

     <i class="icon icon-material-favorite"></i>

## Material.js

`Material.js` is a jQuery plugin that adds some magic to your markup and allows Material Design for Bootstrap to style some elements like inputs, checkboxes, radios etc.

### Functions

* `$.material.init()` - shortcut to run all the following commands:
* `$.material.ripples()` will apply ripples.js to the default elements.
* `$.material.input()` will enable the MD style to the text inputs, and other kind of inputs (number, email, file etc).
* `$.material.checkbox():` will enable the MD style to the checkboxes (remember to follow the markup guidelines explained in the [Inputs section](#inputs).
* `$.material.radio():` will enable the MD style to the checkboxes (remember to follow the markup guidelines explained in the Inputs section.

### Apply Material.js only to specific elements

Every function expects an optional value that will be used as a selector for the function; for example,
`$.material.ripples("#selector, #foobar")` will apply Ripples.js only to `#selector` and `#foobar`.
The functions that allows an optional selector are `$.material.ripples`, `$.material.input`, `$.material.checkbox` and `$.material.radio`.

You can even override the default values using the `$.material.options` function. The default values are:

    $.material.options = {
        "withRipples": ".btn:not(.btn-link), .card-image, .navbar a:not(.withoutripple), .nav-tabs a:not(.withoutripple), .withripple",
        "inputElements": "input.form-control, textarea.form-control, select.form-control",
        "checkboxElements": ".checkbox > label > input[type=checkbox]",
        "radioElements": ".radio > label > input[type=radio]"
    }

### Arrive.js support

If you need to dynamically add elements to your DOM then you may need to include `Arrive.js` before `Material.js`. This will automatically apply `Material.js` to every new element added via JavaScript.

## Plugins

Material Design for Bootstrap comes with styling support for various external scripts:

### SnackbarJS

Create snackbars and toasts with the [SnackbarJS plugin](https://github.com/FezVrasta/snackbarjs). The default toast style is the squared one (snackbar style). If you like to use the rounded style (toast style), please add the `toast` class to the `style` option of SnackbarJS.

### RipplesJS

This is part of the Material Design for Bootstrap project and is a plain JavaScript script which creates the ripple effect when clicking on the specified elements.
At the moment RipplesJS does not have its own repository but it will probably have one in the future.

You may want to set a custom color to the ripples of a specific element, to do so write:

    <button class="btn btn-default" data-ripple-color="#F0F0F0">Custom ripple</button>

### noUiSlider

Make cross-browser sliders and get them styled with Material Design thanks to the support provided by this theme.
Read more about [noUiSlider here](http://refreshless.com/nouislider/).

### Dropdown.js

Finally a dropdown plugin that transforms select inputs in nice dropdowns and does not drive you crazy.
Read more about [Dropdown.js here](https://github.com/FezVrasta/dropdown.js).

### Selectize.js

Transform select and multi-select inputs into advanced text inputs. Material Design for BS provides a full replacement of the plugin's CSS, so don't include it.
Read more about [selectize.js](http://brianreavis.github.io/selectize.js/).

## Compatibility

Currently, Material Design for Bootstrap supports Google Chrome (tested v37+), Mozilla Firefox (tested 30+), and Internet Explorer (tested 11+). Mobile browsers are not currently tested but they may work.
