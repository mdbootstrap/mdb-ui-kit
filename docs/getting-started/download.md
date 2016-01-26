---
layout: docs
title: Download
group: getting-started
---

**Material Design for Bootstrap v{{ site.data.version}}** is available for download in several ways, including some of your favorite package managers. Choose from the options below to snag just what you need.

<div class="row m-t-md">
  <div class="col-sm-6">
{% markdown %}
### Compiled
Download just the compiled and minified CSS and JavaScript. Doesn't include any documentation or original source files.

{% comment %}
<a href="{{ site.data.download.dist }}" class="btn btn-bs btn-outline" onclick="ga('send', 'event', 'Getting started', 'Download', 'Download compiled');">Download Material Design for Bootstrap</a>
{% endcomment %}
<span class="text-muted">Coming soon!</span>
{% endmarkdown %}
  </div>
  <div class="col-sm-6">
{% markdown %}
### Source files
Download everything: source Sass, JavaScript, and documentation files. **Requires a Sass compiler, [Autoprefixer](https://github.com/postcss/autoprefixer), and [some setup]({{ site.baseurl }}/getting-started/build-tools/#tooling-setup).**

<a href="{{ site.data.download.source }}" class="btn btn-bs btn-outline" onclick="ga('send', 'event', 'Getting started', 'Download', 'Download source');">Download source</a>
{% endmarkdown %}
  </div>
</div>

## Package managers

Pull in Material Design for Bootstrap's **source files** into nearly any project with some of the most popular package managers. No matter the package manager, Material Design for Bootstrap will **require a Sass compiler and [Autoprefixer](https://github.com/postcss/autoprefixer)** for a setup that matches our official compiled versions.

{% callout warning %}
**Heads up!** Not all package managers have the v4 alpha published yet, but we should have them up shortly!
{% endcallout %}

### npm

Install Material Design for Bootstrap in your Node powered apps with [the npm package](https://www.npmjs.org/package/bootstrap):

{% highlight bash %}$ npm install bootstrap-material-design@{{ site.data.version }}{% endhighlight %}

`require('bootstrap-material-design')` will load all of Material Design for Bootstrap's jQuery plugins onto the jQuery object. 

Material Design for Material Design for Bootstrap's `package.json` contains some additional metadata under the following keys:

- `sass` - path to Material Design for Bootstrap's main [Sass](http://sass-lang.com/) source file
- `style` - path to Material Design for Bootstrap's non-minified CSS that's been precompiled using the default settings (no customization)

### Bower

Install and manage Material Design for Bootstrap's Sass and JavaScript using [Bower](http://bower.io).

{% highlight bash %}$ bower install bootstrap-material-design#v{{ site.data.version }}{% endhighlight %}

### Meteor

{% highlight bash %}
$ meteor add FezVrasta/bootstrap-material-design@={{ site.data.version }}
{% endhighlight %}

### Composer

You can also install and manage Material Design for Bootstrap's Sass and JavaScript using [Composer](https://getcomposer.org):

{% highlight bash %}
$ composer require FezVrasta/bootstrap-material-design
{% endhighlight %}


