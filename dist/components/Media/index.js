"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _composeStyle = _interopRequireDefault(require("../composeStyle"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
var load = _constants.icons.load,
  loading = _constants.icons.loading,
  loaded = _constants.icons.loaded,
  error = _constants.icons.error,
  noicon = _constants.icons.noicon,
  offline = _constants.icons.offline;
var Media = exports["default"] = /*#__PURE__*/function (_PureComponent) {
  _inherits(Media, _PureComponent);
  var _super = _createSuper(Media);
  function Media(props) {
    var _this;
    _classCallCheck(this, Media);
    _this = _super.call(this, props);
    _this.state = {
      isMounted: false
    };
    return _this;
  }
  _createClass(Media, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        isMounted: true
      });
      if (this.props.onDimensions && this.dimensionElement)
        /* Firefox returns 0 for both clientWidth and clientHeight.
        To fix this we can check the parentNode's clientWidth and clientHeight as a fallback. */
        this.props.onDimensions({
          width: this.dimensionElement.clientWidth || this.dimensionElement.parentNode.clientWidth,
          height: this.dimensionElement.clientHeight || this.dimensionElement.parentNode.clientHeight
        });
    }
  }, {
    key: "renderIcon",
    value: function renderIcon(props) {
      var icon = props.icon,
        icons = props.icons,
        fill = props.iconColor,
        size = props.iconSize,
        theme = props.theme;
      var iconToRender = icons[icon];
      if (!iconToRender) return null;
      var styleOrClass = (0, _composeStyle["default"])({
        width: size + 100,
        height: size,
        color: fill
      }, theme.icon);
      return /*#__PURE__*/_react["default"].createElement('div', styleOrClass, [/*#__PURE__*/_react["default"].createElement(iconToRender, {
        fill: fill,
        size: size,
        key: 'icon'
      }), /*#__PURE__*/_react["default"].createElement('br', {
        key: 'br'
      }), this.props.message]);
    }
  }, {
    key: "renderImage",
    value: function renderImage(props) {
      var _this2 = this;
      return props.icon === loaded ? /*#__PURE__*/_react["default"].createElement("img", _extends({}, (0, _composeStyle["default"])(props.theme.img), {
        src: props.src,
        alt: props.alt,
        width: props.width,
        height: props.height
      })) : /*#__PURE__*/_react["default"].createElement("svg", _extends({}, (0, _composeStyle["default"])(props.theme.img), {
        width: props.width,
        height: props.height,
        ref: function ref(_ref) {
          return _this2.dimensionElement = _ref;
        }
      }));
    }
  }, {
    key: "renderNoscript",
    value: function renderNoscript(props) {
      // render noscript in ssr + hydration to avoid hydration mismatch error
      return this.state.isMounted ? null : /*#__PURE__*/_react["default"].createElement("noscript", null, /*#__PURE__*/_react["default"].createElement("img", _extends({}, (0, _composeStyle["default"])(props.theme.img, props.theme.noscript), {
        src: props.nsSrc,
        srcSet: props.nsSrcSet,
        alt: props.alt,
        width: props.width,
        height: props.height
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var placeholder = props.placeholder,
        theme = props.theme;
      var background;
      if (props.icon === loaded) {
        background = {};
      } else if (placeholder.lqip) {
        background = {
          backgroundImage: "url(\"".concat(placeholder.lqip, "\")")
        };
      } else {
        background = {
          backgroundColor: placeholder.color
        };
      }
      return /*#__PURE__*/_react["default"].createElement("div", _extends({}, (0, _composeStyle["default"])(theme.placeholder, background, props.style, props.className), {
        onClick: this.props.onClick,
        onKeyPress: this.props.onClick,
        ref: this.props.innerRef
      }), this.renderImage(props), this.renderNoscript(props), this.renderIcon(props));
    }
  }]);
  return Media;
}(_react.PureComponent);
_defineProperty(Media, "propTypes", {
  /** URL of the image */
  src: _propTypes["default"].string.isRequired,
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
  /** display icon */
  icon: _propTypes["default"].oneOf([load, loading, loaded, error, noicon, offline]).isRequired,
  /** Map of icons */
  icons: _propTypes["default"].object.isRequired,
  /** theme object - CSS Modules or React styles */
  theme: _propTypes["default"].object.isRequired,
  /** Alternative text */
  alt: _propTypes["default"].string,
  /** Color of the icon */
  iconColor: _propTypes["default"].string,
  /** Size of the icon in px */
  iconSize: _propTypes["default"].number,
  /** React's style attribute for root element of the component */
  style: _propTypes["default"].object,
  /** React's className attribute for root element of the component */
  className: _propTypes["default"].string,
  /** On click handler */
  onClick: _propTypes["default"].func,
  /** callback to get dimensions of the placeholder */
  onDimensions: _propTypes["default"].func,
  /** message to show below the icon */
  message: _propTypes["default"].node,
  /** reference for Waypoint */
  innerRef: _propTypes["default"].func,
  /** noscript image src */
  nsSrc: _propTypes["default"].string,
  /** noscript image srcSet */
  nsSrcSet: _propTypes["default"].string
});
_defineProperty(Media, "defaultProps", {
  iconColor: '#fff',
  iconSize: 64
});