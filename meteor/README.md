[![Build Status](https://travis-ci.org/MeteorPackaging/hammer.js.svg?branch=master)](https://travis-ci.org/MeteorPackaging/hammer.js)

Packaging [FezVrasta's Bootstrap Material Design](https://github.com/FezVrasta/bootstrap-material-design)
for [Meteor.js](http://meteor.com).

# Usage

Just run


```sh
meteor add meteorpackaging:bootstrap-material-design
```

and your Bootstrap CSS will look like Google's Material Design (Polymer Paper).


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

* Icons font loading test: EOT, SVG, TTF, WOFF
* Ripples test


# TODO

* Depend on a version of twbs:bootstrap without the Glyphicons font, to avoid loading those obsoleted icons


# Acknowledgements

* [Yuri Dybskiy / html5cat](https://github.com/html5cat) for the first wrapper of this package
* [Dan Dascalescu / dandv](https://github.com/dandv) for this direct integration
