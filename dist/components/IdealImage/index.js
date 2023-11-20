"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactWaypoint = require("react-waypoint");
var _Media = _interopRequireDefault(require("../Media"));
var _constants = require("../constants");
var _loaders = require("../loaders");
var _helpers = require("../helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var initial = _constants.loadStates.initial,
  loading = _constants.loadStates.loading,
  loaded = _constants.loadStates.loaded,
  error = _constants.loadStates.error;
var defaultShouldAutoDownload = function defaultShouldAutoDownload(_ref) {
  var connection = _ref.connection,
    size = _ref.size,
    threshold = _ref.threshold,
    possiblySlowNetwork = _ref.possiblySlowNetwork;
  if (possiblySlowNetwork) return false;
  if (!connection) return true;
  var downlink = connection.downlink,
    rtt = connection.rtt,
    effectiveType = connection.effectiveType;
  switch (effectiveType) {
    case 'slow-2g':
    case '2g':
      return false;
    case '3g':
      if (downlink && size && threshold) {
        return size * 8 / (downlink * 1000) + rtt < threshold;
      }
      return false;
    case '4g':
    default:
      return true;
  }
};
var defaultGetMessage = function defaultGetMessage(icon, state) {
  switch (icon) {
    case _constants.icons.noicon:
    case _constants.icons.loaded:
      return null;
    case _constants.icons.loading:
      return 'Loading...';
    case _constants.icons.load:
      // we can show `alt` here
      var pickedSrc = state.pickedSrc;
      var size = pickedSrc.size;
      if (size) {
        return ['Click to load (', /*#__PURE__*/_react["default"].createElement("nobr", {
          key: "nb"
        }, (0, _helpers.bytesToSize)(size)), ')'];
      } else {
        return 'Click to load';
      }
    case _constants.icons.offline:
      return 'Your browser is offline. Image not loaded';
    case _constants.icons.error:
      var loadInfo = state.loadInfo;
      if (loadInfo === 404) {
        return '404. Image not found';
      } else {
        return 'Error. Click to reload';
      }
    default:
      throw new Error("Wrong icon: ".concat(icon));
  }
};
var defaultGetIcon = function defaultGetIcon(state) {
  var loadState = state.loadState,
    onLine = state.onLine,
    overThreshold = state.overThreshold,
    userTriggered = state.userTriggered;
  if (_helpers.ssr) return _constants.icons.noicon;
  switch (loadState) {
    case loaded:
      return _constants.icons.loaded;
    case loading:
      return overThreshold ? _constants.icons.loading : _constants.icons.noicon;
    case initial:
      if (onLine) {
        var shouldAutoDownload = state.shouldAutoDownload;
        if (shouldAutoDownload === undefined) return _constants.icons.noicon;
        return userTriggered || !shouldAutoDownload ? _constants.icons.load : _constants.icons.noicon;
      } else {
        return _constants.icons.offline;
      }
    case error:
      return onLine ? _constants.icons.error : _constants.icons.offline;
    default:
      throw new Error("Wrong state: ".concat(loadState));
  }
};
var IdealImage = exports["default"] = /*#__PURE__*/function (_Component) {
  _inherits(IdealImage, _Component);
  var _super = _createSuper(IdealImage);
  function IdealImage(props) {
    var _this;
    _classCallCheck(this, IdealImage);
    _this = _super.call(this, props);
    // TODO: validate props.srcSet
    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      var _this$state = _this.state,
        loadState = _this$state.loadState,
        onLine = _this$state.onLine,
        overThreshold = _this$state.overThreshold;
      if (!onLine) return;
      switch (loadState) {
        case loading:
          if (overThreshold) _this.cancel(true);
          return;
        case loaded:
          // nothing
          return;
        case initial:
        case error:
          _this.load(true);
          return;
        default:
          throw new Error("Wrong state: ".concat(loadState));
      }
    });
    _defineProperty(_assertThisInitialized(_this), "load", function (userTriggered) {
      var _this$state2 = _this.state,
        loadState = _this$state2.loadState,
        url = _this$state2.url;
      if (_helpers.ssr || loaded === loadState || loading === loadState) return;
      _this.loadStateChange(loading, userTriggered);
      var threshold = _this.props.threshold;
      var loader = _this.props.loader === 'xhr' ? (0, _loaders.xhrLoader)(url) : (0, _loaders.imageLoader)(url);
      loader.then(function () {
        _this.clear();
        _this.loadStateChange(loaded, false);
      })["catch"](function (e) {
        _this.clear();
        if (e.status === 404) {
          _this.loadStateChange(error, false, 404);
        } else {
          _this.loadStateChange(error, false);
        }
      });
      if (threshold) {
        var timeoutLoader = (0, _loaders.timeout)(threshold);
        timeoutLoader.then(function () {
          if (!_this.loader) return;
          window.document.dispatchEvent(new CustomEvent('possiblySlowNetwork', {
            detail: {
              possiblySlowNetwork: true
            }
          }));
          _this.setState({
            overThreshold: true
          });
          if (!_this.state.userTriggered) _this.cancel(true);
        });
        _this.loader = (0, _loaders.combineCancel)(loader, timeoutLoader);
      } else {
        _this.loader = loader;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onEnter", function () {
      if (_this.state.inViewport) return;
      _this.setState({
        inViewport: true
      });
      var pickedSrc = (0, _helpers.selectSrc)({
        srcSet: _this.props.srcSet,
        maxImageWidth: _this.props.srcSet.length > 1 ? (0, _helpers.guessMaxImageWidth)(_this.state.dimensions) // eslint-disable-line react/no-access-state-in-setstate
        : 0,
        supportsWebp: _helpers.supportsWebp
      });
      var getUrl = _this.props.getUrl;
      var url = getUrl ? getUrl(pickedSrc) : pickedSrc.src;
      var shouldAutoDownload = _this.props.shouldAutoDownload(_objectSpread(_objectSpread({}, _this.state), {}, {
        // eslint-disable-line react/no-access-state-in-setstate
        size: pickedSrc.size
      }));
      _this.setState({
        pickedSrc: pickedSrc,
        shouldAutoDownload: shouldAutoDownload,
        url: url
      }, function () {
        if (shouldAutoDownload) _this.load(false);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onLeave", function () {
      if (_this.state.loadState === loading && !_this.state.userTriggered) {
        _this.setState({
          inViewport: false
        });
        _this.cancel(false);
      }
    });
    _this.state = {
      loadState: initial,
      connection: _helpers.nativeConnection ? {
        downlink: navigator.connection.downlink,
        // megabits per second
        rtt: navigator.connection.rtt,
        // ms
        effectiveType: navigator.connection.effectiveType // 'slow-2g', '2g', '3g', or '4g'
      } : null,
      onLine: true,
      overThreshold: false,
      inViewport: false,
      userTriggered: false,
      possiblySlowNetwork: false
    };
    return _this;
  }
  _createClass(IdealImage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      if (_helpers.nativeConnection) {
        this.updateConnection = function () {
          if (!navigator.onLine) return;
          if (_this2.state.loadState === initial) {
            _this2.setState({
              connection: {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
              }
            });
          }
        };
        navigator.connection.addEventListener('onchange', this.updateConnection);
      } else if (this.props.threshold) {
        this.possiblySlowNetworkListener = function (e) {
          if (_this2.state.loadState !== initial) return;
          var possiblySlowNetwork = e.detail.possiblySlowNetwork;
          if (!_this2.state.possiblySlowNetwork && possiblySlowNetwork) {
            _this2.setState({
              possiblySlowNetwork: possiblySlowNetwork
            });
          }
        };
        window.document.addEventListener('possiblySlowNetwork', this.possiblySlowNetworkListener);
      }
      this.updateOnlineStatus = function () {
        return _this2.setState({
          onLine: navigator.onLine
        });
      };
      this.updateOnlineStatus();
      console.log("tester");
      window.addEventListener('online', this.updateOnlineStatus);
      window.addEventListener('offline', this.updateOnlineStatus);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clear();
      if (_helpers.nativeConnection) {
        navigator.connection.removeEventListener('onchange', this.updateConnection);
      } else if (this.props.threshold) {
        window.document.removeEventListener('possiblySlowNetwork', this.possiblySlowNetworkListener);
      }
      window.removeEventListener('online', this.updateOnlineStatus);
      window.removeEventListener('offline', this.updateOnlineStatus);
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.loader) {
        this.loader.cancel();
        this.loader = undefined;
      }
    }
  }, {
    key: "cancel",
    value: function cancel(userTriggered) {
      if (loading !== this.state.loadState) return;
      this.clear();
      this.loadStateChange(initial, userTriggered);
    }
  }, {
    key: "loadStateChange",
    value: function loadStateChange(loadState, userTriggered) {
      var loadInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      this.setState({
        loadState: loadState,
        overThreshold: false,
        userTriggered: !!userTriggered,
        loadInfo: loadInfo
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var icon = this.props.getIcon(this.state);
      var message = this.props.getMessage(icon, this.state);
      return /*#__PURE__*/_react["default"].createElement(_reactWaypoint.Waypoint, {
        onEnter: this.onEnter,
        onLeave: this.onLeave
      }, /*#__PURE__*/_react["default"].createElement(_Media["default"], _extends({}, this.props, (0, _helpers.fallbackParams)(this.props), {
        onClick: this.onClick,
        icon: icon,
        src: this.state.url || '',
        onDimensions: function onDimensions(dimensions) {
          return _this3.setState({
            dimensions: dimensions
          });
        },
        message: message
      })));
    }
  }]);
  return IdealImage;
}(_react.Component);
_defineProperty(IdealImage, "propTypes", {
  /** how much to wait in ms until concider download to slow */
  threshold: _propTypes["default"].number,
  /** function to generate src based on width and format */
  getUrl: _propTypes["default"].func,
  /** array of sources */
  srcSet: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    width: _propTypes["default"].number.isRequired,
    src: _propTypes["default"].string,
    size: _propTypes["default"].number,
    format: _propTypes["default"].oneOf(['jpeg', 'jpg', 'webp', 'png', 'gif'])
  })).isRequired,
  /** function which decides if image should be downloaded */
  shouldAutoDownload: _propTypes["default"].func,
  /** function which decides what message to show */
  getMessage: _propTypes["default"].func,
  /** function which decides what icon to show */
  getIcon: _propTypes["default"].func,
  /** type of loader */
  loader: _propTypes["default"].oneOf(['image', 'xhr']),
  /** Width of the image in px */
  width: _propTypes["default"].number.isRequired,
  /** Height of the image in px */
  height: _propTypes["default"].number.isRequired,
  placeholder: _propTypes["default"].oneOfType([_propTypes["default"].shape({
    /** Solid color placeholder */
    color: _propTypes["default"].string.isRequired
  }), _propTypes["default"].shape({
    /**
     * [Low Quality Image Placeholder](https://github.com/zouhir/lqip)
     * [SVG-Based Image Placeholder](https://github.com/technopagan/sqip)
     * base64 encoded image of low quality
     */
    lqip: _propTypes["default"].string.isRequired
  })]).isRequired,
  /** Map of icons */
  icons: _propTypes["default"].object.isRequired,
  /** theme object - CSS Modules or React styles */
  theme: _propTypes["default"].object.isRequired,
  autoLoad: _propTypes["default"].bool
});
_defineProperty(IdealImage, "defaultProps", {
  shouldAutoDownload: defaultShouldAutoDownload,
  getMessage: defaultGetMessage,
  getIcon: defaultGetIcon,
  loader: 'xhr',
  autoLoad: false
});