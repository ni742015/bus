require("source-map-support/register"),module.exports=function(e){var t={};function r(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,r),s.l=!0,s.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(o,s,function(t){return e[t]}.bind(null,s));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=13)}([function(e,t){e.exports={filter_request_body(e){const t={};if(e)return function(e,r){for(const o in e)e.hasOwnProperty(o)&&(r.some(e=>o===e)||(t[o]=e[o]));return t}(e,["created_date","updated_date","creator_name","creator_id","last_modifier_name","last_modifier_id","_id"])},compact(e){let t;if(console.log("compact",Object.prototype.toString.call(e)),"[object Object]"===Object.prototype.toString.call(e)){t={};for(const r in e)e[r]&&(t[r]=e[r])}else"[object Array]"===Object.prototype.toString.call(e)&&(t=[],e.forEach(e=>{e&&t.push(e)}));return t},unless({url:e,method:t},r){function o(e){return!e||Array.isArray(e)?e:[e]}return r.some(function(r){var s=r.methods||o(r.method);return function e(t,r){var o="string"==typeof t&&t===r||t instanceof RegExp&&!!t.exec(r);return t instanceof RegExp&&(t.lastIndex=0),t&&t.url&&(o=e(t.url,r)),o}(r,e)&&function(e,t){return!e||(e=o(e)).indexOf(t)>-1}(s,t)})}}},function(e,t){let r={UNKNOW_ERROR:"unknowError",PARAMS_ERROR:"paramsError",RESOURCES_EXIST:"resourcesExist",USER_NOT_PERMISSIONS:"userNotPermissions",RESOURCES_NOT_EXIST:"resourcesNotExist",SERVER_ERROR:"serverError",INVALID_CODE:"invalidCode"};const o=new Map;o.set(r.PARAMS_ERROR,{status:400,message:"Request parameter is wrong"}),o.set(r.RESOURCES_EXIST,{status:400,message:"Data already exists"}),o.set(r.USER_NOT_PERMISSIONS,{status:401,message:"User has no permissions"}),o.set(r.RESOURCES_NOT_EXIST,{status:404,message:"There is no resources"}),o.set(r.SERVER_ERROR,{status:500,message:"Internal Server Error"}),o.set(r.INVALID_CODE,{status:400,message:"验证码错误"}),r.getErrorInfo=(e=>{let t;return e&&(t=o.get(e)),t||(e=r.UNKNOW_ERROR,t=o.get(e)),t}),e.exports=r},function(e,t,r){const o=r(1);e.exports=class extends Error{constructor(e,t,r){super();let s="",n="";if(null!==e){const t=o.getErrorInfo(e);s=t.status,n=t.message}else s=t,n=r;this.name=e,this.status=s,this.message=n}}},function(e,t,r){const o=r(6),s=r(4).logsPath;console.log("logsPath",s),o.configure({appenders:{out:{type:"stdout"},result:{type:"dateFile",filename:`${s}/result`,pattern:"-yyyy-MM-dd.log",alwaysIncludePattern:!0,keepFileExt:!0},"result-filter":{type:"logLevelFilter",appender:"result",level:"info",maxLevel:"info"},error:{type:"dateFile",filename:`${s}/error`,pattern:"-yyyy-MM-dd.log",alwaysIncludePattern:!0,keepFileExt:!0},"error-filter":{type:"logLevelFilter",appender:"error",level:"error",maxLevel:"error"}},categories:{default:{appenders:["out"],level:"info"},result:{appenders:["result"],level:"debug"},error:{appenders:["error"],level:"error"}}});var n={},i=o.getLogger("error"),a=o.getLogger("result");n.logError=function(e,t,r){e&&t&&i.error(l(e,t,r))},n.logResponse=function(e,t){e&&a.info(c(e,t))},n.log=function(e){a.info(e)},n.error=function(e){a.error(e)};var c=function(e,t){var r=new String;return r+="\n*************** response log start ***************\n",r+=u(e.request,t),r+="response status: "+e.status+"\n",r+="response body: \n"+JSON.stringify(e.body)+"\n",r+="*************** response log end ***************\n"},l=function(e,t,r){var o=new String;return o+="\n*************** error log start ***************\n",o+="string"==typeof e?"info: "+e:u(e.request,r),o+="err name: "+t.name+"\n",o+="err message: "+t.message+"\n",o+="err stack: "+t.stack+"\n",o+="*************** error log end ***************\n"},u=function(e,t){var r=new String,o=e.method;return r+="request method: "+o+"\n",r+="request originalUrl:  "+e.originalUrl+"\n",r+="request referer:  "+e.header.referer+"\n",r+="request client ip:  "+e.ip+"\n",r+="GET"===o?"request query:  "+JSON.stringify(e.query)+"\n":"request body: \n"+JSON.stringify(e.body)+"\n",r+="response time: "+t+"\n"};e.exports=n},function(e,t,r){const o=r(7),s=o.resolve(process.cwd()),n=o.join(s,"build"),i=o.join(n,"public");e.exports={port:3333,rootPath:s,buildPath:n,publicBuildPath:i,serverSrcPath:o.join(s,"src"),serverBuildPath:n,userNodeModulesPath:o.join(s,"node_modules"),publicPath:"/",logsPath:o.join(s,"logs"),mongodb:{url:"mongodb://localhost:27017/test",options:{}},apiPrefix:"api"}},function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("log4js")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("koa-router")},function(e,t,r){function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const s=r(10),{unless:n}=r(0);e.exports=class{constructor(e={secret:"",rules:[]}){o(this,"create",({info:e,secret:t=this.secret,expiresIn:r})=>s.sign(e,t,{expiresIn:r})),o(this,"decode",({token:e,secret:t=this.secret})=>{if(e){let r=s.decode(e,t);if(r&&r.exp>new Date/1e3)return r}}),o(this,"addCheckRules",e=>{let t=Object.prototype.toString.call(e);"[object Array]"===t?this.rules=this.rules.concat(e):"[object String]"===t&&this.rules.push(e)}),o(this,"checkUrl",({url:e,method:t})=>e.indexOf("swagger-")<0&&!n({url:e,method:t},this.rules)),this.rules=e.rules||[],this.secret=e.secret||""}}},function(e,t){e.exports=require("jsonwebtoken")},function(e,t,r){function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const s=r(5),n=r(12);e.exports=class{constructor(e={}){o(this,"add",e=>{this.datas.push(e)}),o(this,"init",async({schemas:e,hooks:t})=>{try{const r={};for(const o in e){let i=s.Schema(e[o],{timestamps:{createdAt:"created_date",updatedAt:"updated_date"}});for(const e of this.datas){const{name:t,model:s}=e;o===t&&s(i,r)}for(const e in n)if(n.hasOwnProperty(e)){const{type:t,func:r}=n[e];i[t][e]=r}if(t.onInitModels){let e=await t.onInitModels(o,i);i=e||i}r[o]=s.model(o.replace(/^\S/,e=>e.toUpperCase()),i)}return Object.assign(this.models,r),r}catch(e){throw console.warn("Init Models Error",e),e}}),this.onInitModels=e.onInitModels,this.datas=[],this.models={}}}},function(e,t){e.exports={like:{type:"query",func(e,t="name"){return e?this.where({[t]:new RegExp(e.replace(/[*.?+$^[\](){}|\/\\]/g,e=>`\\${e}`),"i")}):this}},paging:{type:"query",func({page:e,page_count:t,sort:r={created_date:-1}}){const o=(e-1)*t;return this.sort(r).skip(o).limit(parseInt(t))}},regexp:{type:"statics",func:e=>new RegExp(e.replace(/[*.?+$^[\](){}|\/\\]/g,e=>`\\${e}`),"i")}}},function(e,t,r){function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const s=r(14),n=r(21),i=r(8)(),a=r(4),c=r(9),l=r(23),u=r(11);e.exports=class{constructor({config:e,Model:t,Schema:r,Api:p,hooks:d={}}){o(this,"initMongo",async()=>{l.init(this.config.mongodb);const{schemas:e,examples:t}=await this.Schema.init(this);this.schemas=e,this.examples=t,this.models=await this.Model.init(this)}),o(this,"initRouter",async()=>{console.log("initRouter");let{secret:e,excludeCheckUrl:t}=this.config;this.Token=new c({secret:e,rules:t});const r=await this.Api.init(this);this.router.use(`/${this.config.apiPrefix}`,r.routes(),r.allowedMethods())}),o(this,"initApp",async()=>(await this.initMongo(),await this.initRouter(),console.log("initApp"),s.call(this,this.router))),o(this,"start",async()=>(console.log("start"),this.app=await this.initApp(),console.log("start server"),n.call(this,this.app))),this.config=e?Object.assign(a,e):a,this.router=i,this.Model=t||new u,this.Schema=r,this.Api=p,this.hooks=d}}},function(e,t,r){const o=new(r(15)),s=r(16),n=r(17),i=r(18),a=r(19),c=r(20);e.exports=function(e){let t=[i(),n({enableTypes:["json","form"]}),s(),async(e,t)=>{const r=new Date;await t();const o=new Date-r;console.log(`${e.method} ${e.url} - ${o}ms`)},c.bind(this),[e.routes(),e.allowedMethods()]];this.hooks.onInitMiddlewares&&(t=this.hooks.onInitMiddlewares(t,o)||t);for(const e of t)"[object Array]"===Object.prototype.toString.call(e)?o.use.apply(o,e):o.use(e);return o.on("error",a),o}},function(e,t){e.exports=require("koa")},function(e,t){e.exports=require("koa-json")},function(e,t){e.exports=require("koa-bodyparser")},function(e,t){e.exports=require("koa2-cors")},function(e,t,r){const o=r(3);e.exports=((e,t)=>{const r=new Date-t.start_time;console.warn(`${t.method} ${t.url} - ${r}ms`),o.logError(t,e,r)})},function(e,t,r){const{filter_request_body:o}=r(0),s=r(2),n=r(3);e.exports=async function(e,t){try{let{config:{apiPrefix:r},hooks:{beforeApiEnter:i}}=this;if(e.start_time=new Date,new RegExp(`^/${r}`).test(e.url)){let t=this.Token;if(t.checkUrl(e)){if(!e.request.header.authorization)throw new s(null,401,"There is no token");{let r=e.request.header.authorization.split(" ")[1];const o=t.decode({token:r});if(!o)throw new s(null,401,"Auth failed");this.hooks.onTokenCheck&&(e.state=this.hooks.onTokenCheck(o)),e.state=e.state||o}}e.request.body=o(e.request.body)}i&&!1===i(e,t)||(await t(),0===e.url.indexOf(`/${r}`)&&e.url.indexOf(`/${r}/swagger`)<0&&e.body&&(e.body={success:!0,data:e.body})),404===e.status&&(e.body={success:!1,data:new s("resourcesNotExist")},e.status=404)}catch(t){e.response.status=t.status||500,e.body={success:!1,data:{message:t.message}},n.logError(e,t,new Date-e.start_time)}}},function(e,t,r){const o=r(22);e.exports=function(e){let{port:t}=this.config;t=function(e){var t=parseInt(e,10);if(isNaN(t))return e;if(t>=0)return t;return!1}(t||"3000"),console.log("port",t);var r=o.createServer(e.callback());return new Promise((o,s)=>{r.on("error",function(e){!function(e){if(console.log("onError",e),"listen"!==e.syscall)throw e;var r="string"==typeof t?"Pipe "+t:"Port "+t;switch(e.code){case"EACCES":console.error(r+" requires elevated privileges"),process.exit(1);break;case"EADDRINUSE":console.error(r+" is already in use"),process.exit(1);break;default:throw e}}(e),s(e)}),r.on("listening",function(){var t,s;t=r.address(),s="string"==typeof t?"pipe "+t:"port "+t.port,console.log("Listening on "+s),o(e)}),r.listen(t)})}},function(e,t){e.exports=require("http")},function(e,t,r){const o=r(5),s={useNewUrlParser:!0,autoIndex:!1,reconnectTries:30,reconnectInterval:500};e.exports=new class{init(e){console.log("mongodb url",e.url),o.connect(e.url,Object.assign(s,e.options||{}));const t=o.connection;o.Promise=global.Promise,t.on("error",e=>{console.log("数据库连接出错!",e)}),t.on("open",()=>{console.log("数据库连接成功!")})}}}]);
//# sourceMappingURL=index.js.map