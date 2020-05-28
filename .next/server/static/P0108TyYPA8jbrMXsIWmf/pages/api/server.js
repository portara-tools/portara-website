module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ "4iGU":
/***/ (function(module, exports) {

module.exports = require("apollo-server-lambda");

/***/ }),

/***/ "6LlA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
const mongoose = __webpack_require__("FiKB");

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});
const User = mongoose.model('User', userSchema);

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("SElj");


/***/ }),

/***/ "FiKB":
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "GW0h":
/***/ (function(module, exports) {

module.exports = require("apollo-server");

/***/ }),

/***/ "SElj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _graphql_typeDefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("hi82");
/* harmony import */ var _graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("burR");
// import {gql} from 'apollo-server-lambda';
// const { ApolloServer } = require('apollo-server-lambda');
// const {typeDefs} = require('./graphql/typeDefs');
// const {resolvers} = require('./graphql/resolvers');
// import { resolvers } from './graphql/resolvers';
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   // context: ({ req, res }) => ({ req, res }),
//   playground: {
//     endpoint: "/dev/graphql",
//   },
// });
// exports.graphqlHandler = server.createHandler({
//   cors: {
//     origin: '*',
//     credentials: true,
//   },
//   endpointURL: '/graphql',
// });
// !UNCOMMENT TO USE LOCAL SERVER FOR TESTING. If switching to AWS, remember to change the URI string at the bottom in the "lib/withApollo" file
const {
  ApolloServer
} = __webpack_require__("GW0h");




__webpack_require__("SNIt");

const server = new ApolloServer({
  typeDefs: _graphql_typeDefs__WEBPACK_IMPORTED_MODULE_0__["typeDefs"],
  resolvers: _graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__["resolvers"]
});
server.listen().then(({
  url
}) => {
  console.log(`🐬 listening @ ${url}`);
});

/***/ }),

/***/ "SNIt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


const mongoose = __webpack_require__("FiKB");

__webpack_require__("qW5S").config();

const URI = process.env.MONGO_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch(err => console.log('Error While Connecting to DB', err));

/***/ }),

/***/ "burR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var _models_userModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6LlA");

const resolvers = {
  Query: {
    hello: () => 'hello'
  },
  Mutation: {
    createUser: (_, {
      name
    }) => {
      const user = new _models_userModel__WEBPACK_IMPORTED_MODULE_0__["User"]({
        name
      });
      user.save();
      console.log('new user saved to database');
      return user;
    }
  }
};

/***/ }),

/***/ "hi82":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeDefs", function() { return typeDefs; });
const {
  gql
} = __webpack_require__("4iGU");

const typeDefs = gql`
  type Query {
    hello: String
  }

  type User {
    id: ID!
    name: String!
  }

  type Mutation {
    createUser(name: String!): User!
  }
`;

/***/ }),

/***/ "qW5S":
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ })

/******/ });