---
layout: docs
title: Best practices
group: getting-started
---

We've designed and developed Material Design for Bootstrap to work in a number of environments. Here are some of the best practices we've gathered from years of working on and using it ourselves.

{% callout info %}
**Heads up!** This copy is a work in progress.
{% endcallout %}

## SASS

### Avoid vendor prefixes 
Material Design for Bootstrap uses Autoprefixer (included in our gulpfile and build process) to automatically add vendor prefixes to some CSS properties at build time. Doing so saves us time and code by allowing us to write key parts of our CSS a single time.
