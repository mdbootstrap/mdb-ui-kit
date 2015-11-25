# bootstrap-material-design

## **WARNING:** These docs relate to the next major release and integration with bootstrap V4.

[![build status](https://travis-ci.org/FezVrasta/bootstrap-material-design.svg?branch=master)](https://travis-ci.org/FezVrasta/bootstrap-material-design)
[![gratipay](https://img.shields.io/gratipay/FezVrasta.svg)](https://gratipay.com/FezVrasta)
[![Bower version](https://badge.fury.io/bo/bootstrap-material-design.svg)](https://github.com/FezVrasta/bootstrap-material-design)

[![banner](demo/imgs/banner.jpg)](#)

Bootstrap Material Design is the best way to use [Material Design guidelines by Google](http://www.google.com/design/spec/material-design/introduction.html) 
in your Bootstrap 4 based application.  Since this is a fully customizable version of Bootstrap,
just include Bootstrap Material Design CSS instead of Bootstrap CSS, and include the JavaScript at 
the end of your document (just before the `</body>` tag), and everything will be converted to Material Design (Paper) style.

TODO: docs/demo link

## How to install

You may install this theme using Bower or Meteor:

- Bower : `bower install bootstrap-material-design`
- Meteor: `meteor add fezvrasta:bootstrap-material-design`

If you prefer, you can include this framework in your project using our official CDN:

- [Bootstrap Material Design on CDNJS.com](https://cdnjs.com/libraries/bootstrap-material-design)
- [Bootstrap Material Design on JSDelivr.com](http://www.jsdelivr.com/#!bootstrap.material-design)


## Getting started

Add the necessary links to your `<head` element for fonts
To embed Roboto into your web page, copy the code as the first element in the <head> of your HTML document.
```html
  <!-- Material Design fonts -->
  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <!-- Bootstrap Material Design -->
  <link href="dist/css/bootstrap-material-design.css" rel="stylesheet">
```

## Support

If you like this project you may support it by donating via Gittip, starring this repository or reporting issues.  All issues filed should be reduced to a [CodePen](http://codepen.io/rosskevin/pen/VvRgrN) test case where possible.

[![gittip](demo/imgs/gittip-button.jpg)](https://www.gratipay.com/FezVrasta/)
[![issues](demo/imgs/issues-button.jpg)](https://github.com/FezVrasta/bootstrap-material-design/issues)


## Contributing

Please read through our [contributing guidelines](CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

Moreover, if your pull request contains JavaScript patches or features, you must include relevant unit tests. All HTML and CSS should conform to the [Code Guide](http://codeguide.co/), maintained by one of Bootstrap's founder's [Mark Otto](https://github.com/mdo).

Editor preferences are available in the [editor config](https://github.com/FezVrasta/bootstrap-material-design/blob/master/.editorconfig) for easy use in common text editors. Read more and download plugins at <http://editorconfig.org>.


## Development

### Tools

We are using Grunt to automate the workflow and build process. Ensure you have `nodejs` installed and `grunt-cli` 
and `bower` installed globally. After cloning the repo, run `npm install` to ensure you have all dev dependencies.

### SASS

The Bootstrap 4.x compatible version is developed using SASS.

The Bootstrap 3.x compatible version was developed using LESS, with an automated conversion to SASS.
TODO: The Bootstrap 3.x compatibile version is available as version 0.x.x


## Documentation

TODO: For customization and examples, please see the documentation (link)

[Material Design Specification](http://www.google.com/design/spec/material-design/introduction.html) 


## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, this project is maintained under 
[the Semantic Versioning guidelines](http://semver.org/). Sometimes we screw up, but we'll adhere to those rules whenever possible.

See [the Releases section of our GitHub project](https://github.com/fezvrasta/bootstrap-material-design/releases) for changelogs 
of each release version. 


## License
[MIT License](LICENSE.md) 
