# Changelog

## v 0.3.0

- Implemented full color palette from Material Design specifications (thanks @korgan00)
- Reformat of `ripples.js` (thanks @grvcoelho)
- Autofill option of `material.js` is now set to false by default
- Deprecated `material-wfont.css`, now to include web fonts you should include roboto.css
- Now `material.css` supports only the primary shades of the material color palette (lightweight! about 200KB)
- `material-fullpalette.css` supports every shade of the material color palette (huge size! ~ 2MB)
- Adjusted padding on dialog(modal) to be more inline with standards (thanks @GradyD)
- Added jQuery 1.9.1 and Bootstrap 3.0 as dependencies (thanks @GradyD)
- fixed #468 (thanks @MatrixZ)
- Added :hover, :focus, :active and .active states on buttons
- Added color variations on toggles
- Improved shadows to better fit Material Design specs
- Improved hover state of buttons
- Material Checkboxes now are a single inline element `.checkbox-material`, this helps when you need to vertical align them
- Fixed Material Design icons
- Fixed behavior of floating labels and inputs
- Fixed several bugs
- Updated Meteor packages

## v 0.2.1

- Fixed well sizes
- Fixed $.ripple that needed two clicks to effectively "click" an element
- Added $.ripple support to browsers that don't support CSS transitions (eg. IE9)
- Arrive.js integration is now complete, it inits correctly every Material Design element dynamically added
- Arrive.js is now faster, it run directly on the new element instead of scan the entire document
- $.material.autofill() is now configurable, you can set $.material.options.autofill = false to disable it
- Every $.material.init() options is now configurable, you can disable them setting false in the $.material.options.\<feature\>

## v 0.2.0

- The master branch is now the development branch, if you want to use a "stable" release use the releases provided by GitHub.
- New demo page
- Primary color is now a subtle teal to follow the Material Design specifications.
- Ripples.js is now completely rewritten with jQuery.
- Fixed thousands of bugs.

