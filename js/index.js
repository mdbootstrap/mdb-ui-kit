/*
 * This is the main entry point.
 *
 * You can import other modules here, including external packages. When bundling using rollup you can mark those modules as external and have them excluded or, if they have a jsnext:main entry in their package.json (like this package does), let rollup bundle them into your dist file.
 *
 * IMPORTANT NOTE: If you are ultimately creating an iife/self executing bundle for the browser, be sure to:
 *  import 'babel-polyfill'
 *
 * at your application entry point.  This is necessary for browsers that do not yet support some ES2015 runtime necessities such as Symbol.  We do this in `index-iife.js` for our iife rollup bundle.
 */
import 'babel-polyfill'

// Bootstrap components
import 'bootstrap/dist/js/bootstrap'

// invalidComponentMatches is currently disabled due to https://github.com/rollup/rollup/issues/428#issuecomment-170066452
import './checkbox'
import './checkboxInline'
import './collapseInline'
import './file'
import './radio'
import './radioInline'
import './select'
import './switch'
import './text'
import './textarea'

import './drawer'

import './ripples'
import './autofill'
import './bootstrapMaterialDesign'
