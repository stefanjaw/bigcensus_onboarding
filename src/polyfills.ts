/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 */
// (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
// (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
// (window as any).__zone_symbol__BLACK_LISTED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames

/**
 * In IE/Edge and Safari, the Intl API is not available by default.
 */
// import 'core-js/features/intl';

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js';  // Included with Angular CLI.

/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * If you need to support Web Animations `@angular/platform-browser/animations`,
 * uncomment the following line.
 */
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.

/**
 * By default, Angular's build system removes CSS like this:
 * @import './styles/theme.scss';
 * 
 * If you need to preserve these imports, you need to import the CSS in this file.
 */

/**
 * Support for ResizeObserver is still incomplete in some browsers.
 * If you need to use it, uncomment the following line.
 */
// import 'resize-observer-polyfill/dist/ResizeObserver.global';

/**
 * Make sure to import Reflect and ES7 Proposals for decorator support
 */
import 'reflect-metadata';
