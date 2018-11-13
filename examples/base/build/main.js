require('/Users/yonghuapro/Documents/mygithub/bus/node_modules/source-map-support/register.js')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/apis/index.js":
/*!***************************!*\
  !*** ./src/apis/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bus_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bus/api */ "bus/api");
/* harmony import */ var bus_api__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bus_api__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ "./src/apis/user.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_user__WEBPACK_IMPORTED_MODULE_1__);



class _Api extends bus_api__WEBPACK_IMPORTED_MODULE_0___default.a {
  constructor(props) {
    super(props);
  }

}

const api = new _Api();
api.add({
  name: 'user',
  apiClass: _user__WEBPACK_IMPORTED_MODULE_1___default.a
});
/* harmony default export */ __webpack_exports__["default"] = (api);

/***/ }),

/***/ "./src/apis/user.js":
/*!**************************!*\
  !*** ./src/apis/user.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ({
  example,
  models,
  tag,
  decorator: {
    request,
    summary,
    body,
    middlewares,
    path,
    description,
    query,
    responses
  },
  ApiError,
  ApiErrorNames
}) => {
  const userModel = models.user;
  return {
    name: 'user',
    needCommonApi: true,
    ApiClass: class User {}
  };
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bus */ "bus");
/* harmony import */ var bus__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bus__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apis */ "./src/apis/index.js");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models */ "./src/models/index.js");
/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./schemas */ "./src/schemas/index.js");




const bus = new bus__WEBPACK_IMPORTED_MODULE_0___default.a({
  config: {
    serect: 'bus',
    excludeCheckUrl: [{
      url: /user$/,
      methods: ['GET']
    }]
  },
  Api: _apis__WEBPACK_IMPORTED_MODULE_1__["default"],
  Model: _models__WEBPACK_IMPORTED_MODULE_2__["default"],
  Schema: _schemas__WEBPACK_IMPORTED_MODULE_3__["default"]
});
bus.start().then(app => {
  console.log('app', app);
});

/***/ }),

/***/ "./src/models/index.js":
/*!*****************************!*\
  !*** ./src/models/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bus_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bus/model */ "bus/model");
/* harmony import */ var bus_model__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bus_model__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ "./src/models/user.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_user__WEBPACK_IMPORTED_MODULE_1__);



class _Model extends bus_model__WEBPACK_IMPORTED_MODULE_0___default.a {
  constructor(props) {
    super(props);
  }

}

const model = new _Model();
model.add({
  name: 'user',
  model: _user__WEBPACK_IMPORTED_MODULE_1___default.a
});
/* harmony default export */ __webpack_exports__["default"] = (model);

/***/ }),

/***/ "./src/models/user.js":
/*!****************************!*\
  !*** ./src/models/user.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = schema => {
  /**
   * Virtuals
   */
  // schema
  // 	.virtual('password')
  // 	.set(function (password) {
  // 		this._password = password
  // 		this.password = bcrypt.hashSync(password, salt)(password)
  // 	})
  // 	.get(function () {
  // 		return this._password
  // 	})
};

/***/ }),

/***/ "./src/schemas/index.js":
/*!******************************!*\
  !*** ./src/schemas/index.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bus_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bus/schema */ "bus/schema");
/* harmony import */ var bus_schema__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bus_schema__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ "./src/schemas/user.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_user__WEBPACK_IMPORTED_MODULE_1__);



class _Scheam extends bus_schema__WEBPACK_IMPORTED_MODULE_0___default.a {
  constructor(props) {
    super(props);
  }

}

const scheam = new _Scheam();
scheam.add({
  name: 'user',
  scheam: _user__WEBPACK_IMPORTED_MODULE_1___default.a
});
/* harmony default export */ __webpack_exports__["default"] = (scheam);

/***/ }),

/***/ "./src/schemas/user.js":
/*!*****************************!*\
  !*** ./src/schemas/user.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  username: {
    type: String,
    example: 'admin',
    unique: true,
    required: true
  },
  password: {
    type: String,
    example: 'admin',
    required: true
  }
};

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/yonghuapro/Documents/mygithub/bus/examples/base/src/index.js */"./src/index.js");


/***/ }),

/***/ "bus":
/*!**********************!*\
  !*** external "bus" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bus");

/***/ }),

/***/ "bus/api":
/*!**************************!*\
  !*** external "bus/api" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bus/api");

/***/ }),

/***/ "bus/model":
/*!****************************!*\
  !*** external "bus/model" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bus/model");

/***/ }),

/***/ "bus/schema":
/*!*****************************!*\
  !*** external "bus/schema" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bus/schema");

/***/ })

/******/ });
//# sourceMappingURL=main.map