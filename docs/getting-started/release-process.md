---
layout: docs
title: Release process
group: getting-started
---

Material Design for Bootstrap has a well defined release process that is automated by [Gulp](http://gulpjs.com).  See the [Build Tools](../build-tools) section for setup.

## Creating a release

### Add a release issue to Github

Use the following task template:

~~~~~~~~
  - [] run `gulp publish` it will bump the version, build core, docs, gh-pages, publish them all (with a tag) and push to npm
  - [] `meteor publish`
  - [] close any milestone
  - [] create release from tag and reference milestone issues
~~~~~~~~


### Github tasks
1. Close any related open milestone
1. Create a release and reference the milestone



