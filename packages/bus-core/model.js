require("source-map-support/register"),module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=11)}({0:function(e,t){e.exports=require("mongoose")},11:function(e,t,r){function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const o=r(0),i=r(12);e.exports=class{constructor(e={}){n(this,"add",e=>{this.datas.push(e)}),n(this,"init",async({schemas:e,hooks:t})=>{try{const r={};for(const n in e){let s=o.Schema(e[n],{timestamps:{createdAt:"created_date",updatedAt:"updated_date"}});for(const e of this.datas){const{name:t,model:o}=e;n===t&&o(s,r)}for(const e in i)if(i.hasOwnProperty(e)){const{type:t,func:r}=i[e];s[t][e]=r}if(t.onInitModels){let e=await t.onInitModels.call(this,n,s);s=e||s}r[n]=o.model(n.replace(/^\S/,e=>e.toUpperCase()),s)}return Object.assign(this.models,r),r}catch(e){throw console.warn("Init Models Error",e),e}}),this.onInitModels=e.onInitModels,this.datas=[],this.models={}}}},12:function(e,t){e.exports={like:{type:"query",func(e,t="name"){return e?this.where({[t]:new RegExp(e.replace(/[*.?+$^[\](){}|/\\]/g,e=>`\\${e}`),"i")}):this}},paging:{type:"query",func({page:e,page_count:t,sort:r={created_date:-1}}){const n=(e-1)*t;return this.sort(r).skip(n).limit(parseInt(t))}},regexp:{type:"statics",func:e=>new RegExp(e.replace(/[*.?+$^[\](){}|/\\]/g,e=>`\\${e}`),"i")}}}});
//# sourceMappingURL=model.js.map