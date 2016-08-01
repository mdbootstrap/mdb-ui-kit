---
layout: docs
title: Customization options
group: getting-started
---

Bootstrap Material Design 4 is designed to be customized via Sass variables. You may customize any Bootstrap or BMD variable. 

{% callout info %}
The following assumes you have [setup your build tools and are building successfully](../building).
{% endcallout %}

{% callout warning %}
If overriding a variable via Sass, ensure that your are `@import`ing the _underscored_ file `_core.scss` **not** the main file used for distributions.  For more information see this [StackOverflow post](http://stackoverflow.com/a/25191403/2363935). 
{% endcallout %}

Here are some ways to customize:

## 1. (Recommended) Include the source in your application

Installing via `npm` (recommended) or `bower`, customizing BMD is a breeze.  
 
1. Add `bootstrap-material-design` as a dependency to your `package.json` or your `bower.json`
1. `npm install` OR `bower install` depending on your tool of choice
1. Add either `node_modules` or `bower_components` in the `includePaths` for your `grunt-sass`, `gulp-sass`, or equivalent configurations so you are able to import without specifying the full path of the resource.
1. In your application's SCSS, redefine any customized variable _before_ `@import`ing bootstrap material design.  For example:

~~~~~~~~
$brand-primary: #3f51b5;         // bootstrap variable
$bmd-label-color-focus: #303f9f; // bmd variable

@import "bootstrap-material-design/scss/core"; // make sure to use _core.scss!
~~~~~~~~


## 3. Download the source and change/compile

{% callout warning %}
This method is not recommended because it may be difficult to use source control **and** keep up to date with new releases.  Please consider the recommended method above. 
{% endcallout %}

1. Download the source via `npm`, `bower` or otherwise
2. Change any of the variables
3. Run `gulp`

