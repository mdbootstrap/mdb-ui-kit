---
layout: docs
title: Introduction
group: getting-started
redirect_from: "/getting-started/"
---

This is Material Design for Bootstrap, the world's most popular framework for building responsive, mobile-first sites and applications. 
Inside you'll find high quality HTML, CSS, and JavaScript to make starting any project easier than ever.

Here's how to quickly get started with the Material Design for Bootstrap CDN and a template starter page.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Quick start

Looking to quickly add Material Design for Bootstrap to your project? Use the Material Design for Bootstrap CDN, 
provided for free by the folks at MaxCDN. Using a package manager or need to download the source files? 
[Head to the downloads page.]({{ site.baseurl }}/getting-started/download)

Copy-paste the font and stylesheet `<link>` into your `<head>` before all other stylesheets to load our CSS.

{% highlight html %}
<!-- Material Design fonts -->
<link rel="stylesheet" href="{{ site.cdn.font_roboto }}">
<link rel="stylesheet" href="{{ site.cdn.font_icons }}">

<!-- Material Design for Bootstrap -->
<link rel="stylesheet" href="{{ site.cdn.css }}">
{% endhighlight %}

Add jQuery, Tether, and our Javascript near the end of your pages, right before the closing `</body>` tag. Be sure to place jQuery first as our code depends on it.

{% highlight html %}
<script src="{{ site.data.cdn.jquery }}.min.js"></script>
<script src="{{ site.data.cdn.tether }}.min.js"></script>
<script src="{{ site.cdn.js }}.iife.min.js"></script>
<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="{{ site.data.cdn['ie10-viewport-bug-workaround'] }}"></script>
<script>
  $('body').bootstrapMaterialDesign()
</script>
{% endhighlight %}

And that's it—you're on your way to a fully Material Design for Bootstrapped site. If you're at all unsure about the general page structure, keep reading for an example page template.

## Starter template

Be sure to have your pages set up with the latest design and development standards. That means:

* Using an HTML5 doctype
* Forcing Internet Explorer to use its latest rendering mode ([read more](http://stackoverflow.com/q/6771258))
* And, utilizing the viewport meta tag.

Put it all together and your pages should look like this:

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags always come first -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <!-- Material Design fonts -->
    <link rel="stylesheet" href="{{ site.cdn.font_roboto }}">
    <link rel="stylesheet" href="{{ site.cdn.font_icons }}">
    
    <!-- Material Design for Bootstrap -->
    <link rel="stylesheet" href="{{ site.cdn.css }}">
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- jQuery first, optional tether for tooltips, then Material Design for Bootstrap JS. -->
    <script src="{{ site.data.cdn.jquery }}.min.js"></script>
    <script src="{{ site.data.cdn.tether }}.min.js"></script>
    <script src="{{ site.cdn.js }}.iife.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="{{ site.data.cdn['ie10-viewport-bug-workaround'] }}"></script>
    <script>
      $('body').bootstrapMaterialDesign()
    </script>
  </body>
</html>
{% endhighlight %}

That's all you need for overall page requirements. Visit the [Layout docs]({{ site.baseurl }}/layout/overview) or [our official examples]({{ site.baseurl }}/examples/) to start laying out your site's content and components.

## Important globals

Material Design for Bootstrap employs a handful of important global styles and settings that you'll need to be aware of when using it, all of which are almost exclusively geared towards the *normalization* of cross browser styles. Let's dive in.

### HTML5 doctype

Material Design for Bootstrap requires the use of the HTML5 doctype. Without it, you'll see some funky incomplete styling, but including it shouldn't cause any considerable hiccups.

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
  ...
</html>
{% endhighlight %}

### Responsive meta tag

Material Design for Bootstrap is developed *mobile first*, a strategy in which we optimize code for mobile devices first and then scale up components as necessary using CSS media queries. To ensure proper rendering and touch zooming for all devices, **add the responsive viewport meta tag** to your `<head>`.

{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
{% endhighlight %}

You can see an example of this in action in the [starter template](#starter-template).


## Community

Stay up to date on the development of Material Design for Bootstrap and reach out to the community with these helpful resources.

- Implementation help may be found at Stack Overflow (tagged [`bootstrap-material-design`](https://stackoverflow.com/questions/tagged/bootstrap-material-design)).

[//]: #- Follow [@getbootstrap on Twitter](https://twitter.com/getbootstrap).
[//]: #- Read and subscribe to [The Official Bootstrap Blog]({{ site.blog }}).
[//]: #- Join [the official Slack room]({{ site.slack }}).
[//]: #- Chat with fellow Bootstrappers in IRC. On the `irc.freenode.net` server, in the `##bootstrap` channel.
[//]: #- Developers should use the keyword `bootstrap` on packages which modify or add to the functionality of Bootstrap when distributing through [npm](https://www.npmjs.com/browse/keyword/bootstrap) or similar delivery mechanisms for maximum discoverability.

[//]: #You can also follow [@getbootstrap on Twitter](https://twitter.com/getbootstrap) for the latest gossip and awesome music videos.
