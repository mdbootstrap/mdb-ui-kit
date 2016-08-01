---
layout: docs
title: Download
group: getting-started
---

{% callout warning %}
## **Heads up! Use the repository branch!**

With the pace of current changes, any published package would be out of date almost every day.

For the current time, please use the `v4-dev` branch for **all package managers including bower and npm** by pointing to `FezVrasta/bootstrap-material-design#v4-dev`.
{% endcallout %}



**Bootstrap Material Design v{{ site.data.version}}** is available for download in several ways, including some of your favorite package managers. Choose from the options below to snag just what you need.

<div class="row m-t-md">
  <div class="col-sm-6">
{% markdown %}
### Compiled
Download just the compiled and minified CSS and JavaScript. Doesn't include any documentation or original source files.

{% comment %}
<a href="{{ site.data.download.dist }}" class="btn btn-bs btn-outline" onclick="ga('send', 'event', 'Getting started', 'Download', 'Download compiled');">Download Bootstrap Material Design</a>
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

Pull in Bootstrap Material Design's **source files** into nearly any project with some of the most popular package managers. No matter the package manager, Bootstrap Material Design will **require a Sass compiler and [Autoprefixer](https://github.com/postcss/autoprefixer)** for a setup that matches our official compiled versions.

### npm

Install Bootstrap Material Design in your Node powered apps with [the npm package](https://www.npmjs.org/package/bootstrap):

{% highlight bash %}$ npm install bootstrap-material-design@{{ site.data.version }}{% endhighlight %}

`require('bootstrap-material-design')` will load all of Bootstrap Material Design's jQuery plugins onto the jQuery object.

Bootstrap Material Design's `package.json` contains some additional metadata under the following keys:

- `sass` - path to Bootstrap Material Design's main [Sass](http://sass-lang.com/) source file
- `style` - path to Bootstrap Material Design's non-minified CSS that's been precompiled using the default settings (no customization)

### Bower

Install and manage Bootstrap Material Design's Sass and JavaScript using [Bower](http://bower.io).

{% highlight bash %}$ bower install bootstrap-material-design#v{{ site.data.version }}{% endhighlight %}

### Meteor

{% highlight bash %}
$ meteor add FezVrasta/bootstrap-material-design@={{ site.data.version }}
{% endhighlight %}

### Composer

You can also install and manage Bootstrap Material Design's Sass and JavaScript using [Composer](https://getcomposer.org):

{% highlight bash %}
$ composer require FezVrasta/bootstrap-material-design
{% endhighlight %}
