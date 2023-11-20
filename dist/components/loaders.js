"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xhrLoader = exports.timeout = exports.imageLoader = exports.combineCancel = void 0;
var _unfetch = require("./unfetch");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // There is an issue with cancelable interface
// It is not obvious that
// `image(src)` has `cancel` function
// but `image(src).then()` doesn't
/**
 * returns new "promise" with cancel function combined
 *
 * @param {Promise} p1 - first "promise" with cancel
 * @param {Promise} p2 - second "promise" with cancel
 * @returns {Promise} - new "promise" with cancel
 */
var combineCancel = exports.combineCancel = function combineCancel(p1, p2) {
  if (!p2) return p1;
  var result = p1.then(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  result.cancel = function () {
    p1.cancel();
    p2.cancel();
  };
  return result;
};
var timeout = exports.timeout = function timeout(threshold) {
  var timerId;
  var result = new Promise(function (resolve) {
    timerId = setTimeout(resolve, threshold);
  });
  result.cancel = function () {
    // there is a bug with cancel somewhere in the code
    // if (!timerId) throw new Error('Already canceled')
    clearTimeout(timerId);
    timerId = undefined;
  };
  return result;
};

// Caveat: image loader can not cancel download in some browsers
var imageLoader = exports.imageLoader = function imageLoader(src) {
  var img = new Image();
  var result = new Promise(function (resolve, reject) {
    img.onload = resolve;
    // eslint-disable-next-line no-multi-assign
    img.onabort = img.onerror = function () {
      return reject({});
    };
    img.src = src;
  });
  result.cancel = function () {
    if (!img) throw new Error('Already canceled');
    // eslint-disable-next-line no-multi-assign
    img.onload = img.onabort = img.onerror = undefined;
    img.src = '';
    img = undefined;
  };
  return result;
};

// Caveat: XHR loader can cause errors because of 'Access-Control-Allow-Origin'
// Caveat: we still need imageLoader to do actual decoding,
// but if images are uncachable this will lead to two requests
var xhrLoader = exports.xhrLoader = function xhrLoader(url, options) {
  var controller = new _unfetch.UnfetchAbortController();
  var signal = controller.signal;
  var result = new Promise(function (resolve, reject) {
    return (0, _unfetch.unfetch)(url, _objectSpread(_objectSpread({}, options), {}, {
      signal: signal
    })).then(function (response) {
      if (response.ok) {
        response.blob().then(function () {
          return imageLoader(url);
        }).then(resolve);
      } else {
        reject({
          status: response.status
        });
      }
    }, reject);
  });
  result.cancel = function () {
    if (!controller) throw new Error('Already canceled');
    controller.abort();
    controller = undefined;
  };
  return result;
};

// Caveat: AbortController only supported in Chrome 66+
// Caveat: we still need imageLoader to do actual decoding,
// but if images are uncachable this will lead to two requests
// export const fetchLoader = (url, options) => {
//   let controller = new AbortController()
//   const signal = controller.signal
//   const result = new Promise((resolve, reject) =>
//     fetch(url, {...options, signal}).then(response => {
//       if (response.ok) {
//         options && options.onMeta && options.onMeta(response.headers)
//         response
//           .blob()
//           .then(() => imageLoader(url))
//           .then(resolve)
//       } else {
//         reject({status: response.status})
//       }
//     }, reject),
//   )
//   result.cancel = () => {
//     if (!controller) throw new Error('Already canceled')
//     controller.abort()
//     controller = undefined
//   }
//   return result
// }