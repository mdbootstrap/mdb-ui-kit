[![Build Status](https://travis-ci.org/MeteorPackaging/hammer.js.svg?branch=master)](https://travis-ci.org/MeteorPackaging/hammer.js)

Packaging [FezVrasta's Bootstrap Material Design](https://github.com/FezVrasta/bootstrap-material-design)
for [Meteor.js](http://meteor.com).


# Versions

All versions include the Material Design theme CSS, JS, and `ripple.js` for the ripple click effect.

* [fezvrasta:bootstrap-material-design](https://atmospherejs.com/fezvrasta/bootstrap-material-design) - Includes Bootstrap's glyphicons along with some Material Design icons.
* [fezvrasta:bootstrap-material-design-noglyph](https://atmospherejs.com/fezvrasta/bootstrap-material-design-noglyph) - No Bootstrap glyphicons, but includes the Material Design icons.
* [fezvrasta:bootstrap-material-design-noicons](https://atmospherejs.com/fezvrasta/bootstrap-material-design-noicons) - No icons at all. Useful if you want to use another icon set instead, such as [Font Awesome](https://atmospherejs.com/fortawesome/fontawesome).


# Usage

Just run


```sh
meteor add fezvrasta:bootstrap-material-design
```

and your Bootstrap CSS will look like Google's Material Design (Polymer Paper Elements).


# Dependencies

* [twbs:bootstrap](https://atmospherejs.com/twbs/bootstrap) (the official community integration package for Bootstrap 3)
* jquery


# Meteor

If you're new to Meteor, here's what the excitement is all about -
[watch the first two minutes](https://www.youtube.com/watch?v=fsi0aJ9yr2o); you'll be hooked by 1:28.

That screencast is from 2012. In the meantime, Meteor has become a mature JavaScript-everywhere web
development framework. Read more at [Why Meteor](http://www.meteorpedia.com/read/Why_Meteor).


# Issues

If you encounter an issue while using this package, please CC @dandv when you file it in this repo.


# DONE

* Automatically initialize the JS on client startup: `$.material.init()`
* Material Design Icons font loading test: EOT, SVG, TTF, WOFF
* Bootstrap plugin loading tests
* Visual check, including for the ripple effect


# TODO

* LESS version / fine-grained control? See [nemo64's package](https://github.com/Nemo64/meteor-bootstrap).


# Testing

To test the theme in a browser, run `cp meteor/package.js ./ && meteor test-packages ./`


# Acknowledgements

* [Yuri Dybskiy / html5cat](https://github.com/html5cat) for the first wrapper of this package
* [Dan Dascalescu / dandv](https://github.com/dandv) for this direct integration
