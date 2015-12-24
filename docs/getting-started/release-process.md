---
layout: docs
title: Release process
group: getting-started
---

Material Design for Bootstrap has a well defined release process that is automated by [Grunt](http://gruntjs.com).  See the [Build Tools](../build-tools) section for setup.

## Creating a release

### Add a release issue to Github

Use the following task template:

~~~~~~~~
  - [] update `package.json` version
  - [] `grunt prep-release`
  - [] commit
  - [] travis success
  - [] tag for bower e.g. `v4.0.0`
  - [] push to npm
  - [] push to meteor
  - [] `grunt publish`
  - [] close any milestone
  - [] create release and reference milestone issues</code>
~~~~~~~~

  
### Build the release
1. Update the version in `package.json`, it's version is used in the documentation
1. Build the distribution `grunt prep-release`
1. Commit
1. Ensure travis succeeds

### Bower
Tag for bower - a valid tag starts with a `v` such as `v4.0.0`

### NPM
TODO: push to npm?

### Meteor
TODO: push to meteor?

### Github tasks
1. Push documentation with `grunt publish`
1. Close any related open milestone
1. Create a release and reference the milestone



