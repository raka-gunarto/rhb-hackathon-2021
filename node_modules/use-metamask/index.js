"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "store", {
  enumerable: true,
  get: function get() {
    return _store.store;
  }
});
Object.defineProperty(exports, "MetamaskStateProvider", {
  enumerable: true,
  get: function get() {
    return _store.MetamaskStateProvider;
  }
});
Object.defineProperty(exports, "useMetamask", {
  enumerable: true,
  get: function get() {
    return _useMetamask["default"];
  }
});

var _store = require("./store");

var _useMetamask = _interopRequireDefault(require("./useMetamask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }