---
layout: docs
title: Migrating to v4
group: migration
---

Material Design for Bootstrap 4 is a major rewrite of almost the entire project. 
The most notable changes are summarized immediately below, followed by more specific class and behavioral changes to relevant components.

{% callout info %}
**Heads up!** This will be in flux as work on the v4 alphas progresses. Until then consider it incomplete, and we'd love pull requests to help keep it up to date.
{% endcallout %}

{% callout info %}
These migration changes are for MDB, and should be considered **in addition** to the [Bootstrap migration guidelines](http://v4-alpha.getbootstrap.com/migration/).
{% endcallout %}

## Summary

Here are the big ticket items you'll want to be aware of when moving from MDB v3 to v4.

### Browser support

- Dropped IE8 and iOS 6 support. v4 is now only IE9+ and iOS 7+. For sites needing either of those, use v3.
- Added official support for Android v5.0 Lollipop's Browser and WebView. Earlier versions of the Android Browser and WebView remain only unofficially supported.

### Global changes

- Switched from [Less](http://lesscss.org/) to [SCSS](http://sass-lang.com/) for our source CSS files.
- No longer a theme that overrides Bootstrap, instead it is a full customization of Bootstrap.
- Switched from `px` to `rem` as our primary CSS unit.
- Global font-size increased from `14px` to `16px`.
- Switched Javascript to ES6 classes
- Globally switched MDB variables and classes to the prefix `bmd-` to avoid confusion with Bootstrap variables.
- Added strong scss-lint and eslint rules from Bootstrap
- Adopted Bootstrap project organization and Build structure
- Reference documentation is now synced from Bootstrap, rendered with MDB to show default rendering examples
- File renaming to be equivalent to Bootstrap files

### Components

- Bootstrap dropped panels, thumbnails, and wells for a new all-encompassing component, cards (now part of BS4).
- Refactored nearly all components to use more unnested classes instead of children selectors.

### Misc
- Non-responsive usage of Material Design for Bootstrap is no longer supported.


## By component
This list highlights key changes by component between v3.x.x and v4.0.0.

### State variants
- Removed any state variant that didn't already exist in Bootstrap
- Removed use of generic variant mixin

### [Typography](../content/typography)
- Refactored and compared to spec.  Aim to be spec compliant.
- Added dynamic size/color markers to Bootstrap reference documentation

### Tables
- TODO

### [Forms](../material-design/forms)
- Refactored with much less code now that we are customizing Bootstrap
- Simpler selectors
- Introduced `.bmd-form-group` to provide demarcation for label/input combinations, disconnecting it explicitly from `.form-group` so that they can be used independently.
- Spec review for sizing
- Bootstrap removed `.help-block`, MDB added `.bmd-help` class to mark added behaviors.
- Inverted marker class to use `.is-filled` instead of `.is-empty` for simpler css matches
- Bootstrap removed `.form-group-sm` and `.form-group-lg`.  `.bmd-form-group-*` variants added to address sizing combinations of label/input/help
- V3 MDB `toggle` is now `bmd-switch` for more consistent naming with the spec
- TODO - File Input 

### [Labels](../material-design/labels)
- Labels are now (once again) set as a class on the `label` element.
- Use of `bmd-` prefixes.

### [Buttons](../material-design/buttons)
- Bootstrap renamed `.btn-default` to `.btn-secondary`.
- Utilized Bootstrap mixins for plain/hover/focus/active
- Introduced mixin `bmd-hover-focus-active` to address `.active` in addition to Bootstraps `hover-focus-active`
- Refactored shadow behaviors, now more consistent
- Changed `btn-fab` to `bmd-btn-fab` to denote MDB only component
- `btn-fab-mini` is now `btn-fab-sm` for consistency with Bootstrap size naming
- Introduced shadow behaviors to `bmd-btn-fab`. Spec is silent on this.


### Navs

- Started over
- Initial focus on `nav-tabs`, `nav-pills`, and `navbar-nav` 


#### Panels

Guidance included from Bootstrap's documentation:

- `.panel` to `.card`
- `.panel-default` removed and no replacement
- `.panel-heading` to `.card-header`
- `.panel-title` to `.card-title`
- `.panel-body` to `.card-block`
- `.panel-footer` to `.card-footer`
- `.panel-primary` to `.card-primary` and `.card-inverse`
- `.panel-success` to `.card-success` and `.card-inverse`
- `.panel-info` to `.card-info` and `.card-inverse`
- `.panel-warning` to `.card-warning` and `.card-inverse`
- `.panel-danger` to `.card-danger` and `.card-inverse`

### Cards

- Started over with the introduction of cards in Bootstrap V4.

## Documentation

Our documentation received an upgrade across the board as well. Here's the low down:

- We're using Jekyll (seeded from Bootstrap's project itself) and we have custom plugins in the mix:
  - `example.rb` is a fork of the default `highlight.rb` plugin, allowing for easier example-code handling.
  - `callout.rb` is a similar fork of that, but designed for our special docs callouts.
  - `variables.rb` which gathers the version from (`package.json`), dependencies from `node_modules` (`package.json`) and makes them available to render text and links in the documentation `site.data`.  No more SED to replace versions everywhere! 
- All docs content has been rewritten in Markdown (instead of HTML) for easier editing.
- Pages have been reorganized for simpler content and a more approachable hierarchy.
- We moved from regular CSS to SCSS to take full advantage of variables, mixins, and more.
 

## What's new

TODO

## What's removed
The following components have been removed in v4.0.0.

TODO
