require("source-map-support/register"),module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=9)}({1:function(e,t){e.exports={filter_request_body(e,t=[]){const r={};if(e)return function(e,t){for(const n in e)e.hasOwnProperty(n)&&(t.some(e=>n===e)||(r[n]=e[n]));return r}(e,t)},compact(e){let t;if("[object Object]"===Object.prototype.toString.call(e)){t={};for(const r in e)e[r]&&(t[r]=e[r])}else"[object Array]"===Object.prototype.toString.call(e)&&(t=[],e.forEach(e=>{e&&t.push(e)}));return t},unless({url:e,method:t},r){function n(e){return!e||Array.isArray(e)?e:[e]}return r.some(function(r){var o=r.methods||n(r.method);return function e(t,r){var n="string"==typeof t&&t===r||t instanceof RegExp&&!!t.exec(r);return t instanceof RegExp&&(t.lastIndex=0),t&&t.url&&(n=e(t.url,r)),n}(r,e)&&function(e,t){return!e||(e=n(e)).indexOf(t)>-1}(o,t)})}}},10:function(e,t){e.exports=require("jsonwebtoken")},9:function(e,t,r){function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const o=r(10),{unless:u}=r(1);e.exports=class{constructor(e={secret:"",rules:[]}){n(this,"create",(e,t,r=this.secret)=>o.sign(e,r,{expiresIn:t})),n(this,"decode",(e,t=this.secret)=>{if(e){let r=o.decode(e,t);if(r&&r.exp>new Date/1e3)return r}}),n(this,"addCheckRules",e=>{let t=Object.prototype.toString.call(e);"[object Array]"===t?this.rules=this.rules.concat(e):"[object String]"===t&&this.rules.push(e)}),n(this,"checkUrl",({url:e,method:t})=>e.indexOf("swagger-")<0&&!u({url:e,method:t},this.rules)),this.rules=e.rules||[],this.secret=e.secret||""}}}});
//# sourceMappingURL=token.js.map