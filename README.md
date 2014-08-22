Material Design for Bootstrap
=========================

This Bootstrap theme is an easy way to use the new Material Design guide-lines by Google in your Bootstrap 3 based application.
Just include the theme right after the Bootstrap CSS and include the javascript at the end of your document, everything will be converted to Material Design (paper) style.

This theme is in early developement and is not ready for production.

Check out [the demo at this link](http://fezvrasta.github.io/bootstrap-material-design/).


Currently supported elements:

- Input fields (text, numeric, email, etc)
- Textarea
- Buttons (ripple effect working)
- Select
- Navbar
- Button groups
- Input groups
- Checkbox
- Radio
- Alerts
- Progress bars
- Jumbotron
- Wells
- Dialogs

# Support me

If you like this project you may support me donating something on Gittip, starring this repository or reporting bugs and ideas in the issue section.

[![gittip](screenshots/gittip-button.jpg)](https://www.gittip.com/FezVrasta/)
[![issues](screenshots/issues-button.jpg)](/FezVrasta/bootstrap-material-design)

# Documentation

Material Design for Bootstrap provides some additional stuff to get the best from Material Design.

### Variations:

There are 17 additional color variations (in addition to the classic 4 variations) for buttons, inputs, checkboxes, radios, alerts, navbars, tabs, labels, paginations, progess bars and more.
They can be used adding to the desired element the class suffix `-material-color` replacing `color` with the desired one.

Example:

    <button class="btn btn-material-deeppurple">Deep purple button</button>

These colors are took from the Material Design color palette and are reported below:

![palette](screenshots/palette.jpg)

### Buttons:

Add `.btn-flat` to a button to make it flat, without shadows.
Add `.btn-raised` to a button to add a permanent shadow to it.

### Inputs:

Add `.floating-label` to an input field with a `placeholder` to transform the placeholder in a floating label.

Remember to use the proper HTML markup to get radio and checkboxes styled correctly (choose between *radio* or *checkbox*):

    <div class="radio/checkbox radio-primary">
        <label>
            <input type="radio/checkbox" checked>
            Option one is this
        </label>
    </div>

# Plugins

Material Design for Bootstrap comes with styling support for various Bootstrap plugins, at the moment only one plugin is supported but others will come:

### SnackbarJS

Create snackbars and toasts with [SnackbarJS plugin](https://github.com/FezVrasta/snackbarjs), the default toast style is the squared one (snackbar style), if you like to use the rounded style (toast style) please add the `toast` class to the `style` option of SnackbarJS.


# Compatibility

Currently Material Design for Bootstrap supports Google Chrome (tested v37+), Mozilla Firefox (tested 30+), Internet Explorer (tested 11+). Mobile browsers are not currently tested but may works.

