/*
 * This is the iife compilation entry point - only used for the build.
 */
import 'babel-polyfill/dist/polyfill'

// if we wanted to import/export global $, we would do it like this:
// import $ from 'jquery'
// export {$}

import './index'

// if we used a page global `var onReady = []`, we could then in-page do onReady.push(function(){ /* my init fn */}) and exec them here
// $(() => {
//   for (let fn of onReady) {
//     fn()
//   }
// })
