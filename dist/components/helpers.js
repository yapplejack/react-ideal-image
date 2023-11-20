"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportsWebp = exports.ssr = exports.selectSrc = exports.nativeConnection = exports.guessMaxImageWidth = exports.fallbackParams = exports.bytesToSize = void 0;
var ssr = exports.ssr = typeof window === 'undefined' || window.navigator.userAgent === 'ReactSnap';
var nativeConnection = exports.nativeConnection = !ssr && !!window.navigator.connection;

// export const getScreenWidth = () => {
//   if (ssr) return 0
//   const devicePixelRatio = window.devicePixelRatio || 1
//   const {screen} = window
//   const {width} = screen
//   // const angle = (screen.orientation && screen.orientation.angle) || 0
//   // return Math.max(width, height)
//   // const rotated = Math.floor(angle / 90) % 2 !== 0
//   // return (rotated ? height : width) * devicePixelRatio
//   return width * devicePixelRatio
// }
// export const screenWidth = getScreenWidth()

var guessMaxImageWidth = exports.guessMaxImageWidth = function guessMaxImageWidth(dimensions, w) {
  if (ssr) return 0;

  // Default to window object but don't use window as a default
  // parameter so that this can be used on the server as well
  if (!w) {
    w = window;
  }
  var imgWidth = dimensions.width;
  var _w = w,
    screen = _w.screen;
  var sWidth = screen.width;
  var sHeight = screen.height;
  var _document = document,
    documentElement = _document.documentElement;
  var windowWidth = w.innerWidth || documentElement.clientWidth;
  var windowHeight = w.innerHeight || documentElement.clientHeight;
  var devicePixelRatio = w.devicePixelRatio || 1;
  var windowResized = sWidth > windowWidth;
  var result;
  if (windowResized) {
    var body = document.getElementsByTagName('body')[0];
    var scrollWidth = windowWidth - imgWidth;
    var isScroll = body.clientHeight > windowHeight || body.clientHeight > sHeight;
    if (isScroll && scrollWidth <= 15) {
      result = sWidth - scrollWidth;
    } else {
      result = imgWidth / windowWidth * sWidth;
    }
  } else {
    result = imgWidth;
  }
  return result * devicePixelRatio;
};
var bytesToSize = exports.bytesToSize = function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return "".concat(bytes, " ").concat(sizes[i]);
  return "".concat((bytes / Math.pow(1024, i)).toFixed(1), " ").concat(sizes[i]);
};

// async function supportsWebp() {
//   if (typeof createImageBitmap === 'undefined' || typeof fetch === 'undefined')
//     return false
//   return fetch(
//     'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=',
//   )
//     .then(response => response.blob())
//     .then(blob => createImageBitmap(blob).then(() => true, () => false))
// }
// let webp = undefined
// const webpPromise = supportsWebp()
// webpPromise.then(x => (webp = x))
// export default () => {
//   if (webp === undefined) return webpPromise
//   return {
//     then: callback => callback(webp),
//   }
// }

var detectWebpSupport = function detectWebpSupport() {
  if (ssr) return false;
  var elem = document.createElement('canvas');
  if (elem.getContext && elem.getContext('2d')) {
    // was able or not to get WebP representation
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } else {
    // very old browser like IE 8, canvas not supported
    return false;
  }
};
var supportsWebp = exports.supportsWebp = detectWebpSupport();
var isWebp = function isWebp(x) {
  return x.format === 'webp' || x.src && x.src.match(/\.webp($|\?.*)/i);
};

// eslint-disable-next-line no-shadow
var selectSrc = exports.selectSrc = function selectSrc(_ref) {
  var srcSet = _ref.srcSet,
    maxImageWidth = _ref.maxImageWidth,
    supportsWebp = _ref.supportsWebp;
  if (srcSet.length === 0) throw new Error('Need at least one item in srcSet');
  var supportedFormat, width;
  if (supportsWebp) {
    supportedFormat = srcSet.filter(isWebp);
    if (supportedFormat.length === 0) supportedFormat = srcSet;
  } else {
    supportedFormat = srcSet.filter(function (x) {
      return !isWebp(x);
    });
    if (supportedFormat.length === 0) throw new Error('Need at least one supported format item in srcSet');
  }
  var widths = supportedFormat.filter(function (x) {
    return x.width >= maxImageWidth;
  });
  if (widths.length === 0) {
    widths = supportedFormat;
    width = Math.max.apply(null, widths.map(function (x) {
      return x.width;
    }));
  } else {
    width = Math.min.apply(null, widths.map(function (x) {
      return x.width;
    }));
  }
  return supportedFormat.filter(function (x) {
    return x.width === width;
  })[0];
};
var fallbackParams = exports.fallbackParams = function fallbackParams(_ref2) {
  var srcSet = _ref2.srcSet,
    getUrl = _ref2.getUrl;
  if (!ssr) return {};
  var notWebp = srcSet.filter(function (x) {
    return !isWebp(x);
  });
  var first = notWebp[0];
  return {
    nsSrcSet: notWebp.map(function (x) {
      return "".concat(getUrl ? getUrl(x) : x.src, " ").concat(x.width, "w");
    }).join(','),
    nsSrc: getUrl ? getUrl(first) : first.src,
    ssr: ssr
  };
};