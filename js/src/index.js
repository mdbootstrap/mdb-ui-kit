/*
 * This is the main entry point for your package.
 *
 * You can import other modules here, including external packages. When
 * bundling using rollup you can mark those modules as external and have them
 * excluded or, if they have a jsnext:main entry in their package.json (like
 * this package does), let rollup bundle them into your dist file.
 */

/* eslint-disable no-unused-vars */
import 'babel-polyfill/dist/polyfill'
import 'bootstrap'

// invalidComponentMatches is currently disabled due to https://github.com/rollup/rollup/issues/428#issuecomment-170066452
import Checkbox from './checkbox'
import CheckboxInline from './checkboxInline'
import CollapseInline from './collapseInline'
import File from './file'
import Radio from './radio'
import RadioInline from './radioInline'
import Select from './select'
import Switch from './switch'
import Text from './text'
import Textarea from './textarea'

import Drawer from './drawer'

import Ripples from './ripples'
import Autofill from './autofill'
import BootstrapMaterialDesign from './bootstrapMaterialDesign'
/* eslint-enable no-unused-vars */
