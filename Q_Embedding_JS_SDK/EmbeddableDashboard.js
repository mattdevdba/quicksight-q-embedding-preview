"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constructEvent = _interopRequireDefault(require("./lib/constructEvent"));

var _EmbeddableObject2 = _interopRequireDefault(require("./EmbeddableObject"));

var _constants = require("./lib/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Embeddable dashboard object.
 * @name EmbeddableDashboard
 * @param {EmbeddingOptions} options - options set by customers to embed the session or dashboard.
 */
var EmbeddableDashboard = /*#__PURE__*/function (_EmbeddableObject) {
  _inherits(EmbeddableDashboard, _EmbeddableObject);

  var _super = _createSuper(EmbeddableDashboard);

  function EmbeddableDashboard(options) {
    _classCallCheck(this, EmbeddableDashboard);

    return _super.call(this, options);
  }
  /**
   * Navigates to new dashboard given options with dashboard Id.
   * Options must contain dashboard Id the user wants to navigate to.
   * @param {*} options 
   */


  _createClass(EmbeddableDashboard, [{
    key: "navigateToDashboard",
    value: function navigateToDashboard(options) {
      if (!options.dashboardId) {
        throw new Error('dashboardId is required');
      }

      var eventName = _constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES.NAVIGATE_TO_DASHBOARD;
      var payload = options;
      var event = (0, _constructEvent["default"])(eventName, payload);
      this.iframe.contentWindow.postMessage(event, this.url);
    }
    /**
     * Navigates to given sheet within dashboard
     * @param {String} sheetId
     */

  }, {
    key: "navigateToSheet",
    value: function navigateToSheet(sheetId) {
      var eventName = _constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES.NAVIGATE_TO_SHEET;
      var payload = {
        sheetId: sheetId
      };
      var event = (0, _constructEvent["default"])(eventName, payload);
      this.iframe.contentWindow.postMessage(event, this.url);
    }
  }, {
    key: "initiatePrint",
    value: function initiatePrint() {
      var eventName = _constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES.PRINT;
      var event = (0, _constructEvent["default"])(eventName, {});
      this.iframe.contentWindow.postMessage(event, this.url);
    }
  }, {
    key: "exportPdf",
    value: function exportPdf() {
      var eventName = _constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES.EXPORT_PDF;
      var event = (0, _constructEvent["default"])(eventName, {});
      this.iframe.contentWindow.postMessage(event, this.url);
    }
  }]);

  return EmbeddableDashboard;
}(_EmbeddableObject2["default"]);

var _default = EmbeddableDashboard;
exports["default"] = _default;