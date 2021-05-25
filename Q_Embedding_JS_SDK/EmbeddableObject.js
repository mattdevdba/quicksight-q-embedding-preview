"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _eventify = _interopRequireDefault(require("./lib/eventify"));

var _constructEvent = _interopRequireDefault(require("./lib/constructEvent"));

var _constants = require("./lib/constants");

var _punycode = _interopRequireDefault(require("punycode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Embedding options.
 * @typedef {Object} EmbeddingOptions
 * @property {string} url - url of the session or dashboard to embed
 * @property {HTMLElement | string} container - parent html element or query selector string
 * @property {Function} errorCallback - callback when error occurs
 * @property {Function} loadCallback - callback when visualization data load complete
 * @property {Function} parametersChangeCallback - callback when parameters change occurs
 * @property {Function} getActiveParametersCallback - callback to get active parameter values
 * @property {Function} getSheetsCallback - callback to get sheet details
 * @property {Function} selectedSheetChangeCallback - callback when current sheet is changed
 * @property {Object} parameters
 * @property {string} width - width of the iframe
 * @property {string} height - height of the iframe
 * @property {string} loadingHeight - when height is set to be "AutoFit",
 *                                   loadingHeight is used before actual height is received
 * @property {string} scrolling
 * @property {string} locale
 * @property {boolean} isQEmbedded - embeddable object is Q search bar flag
 * @property {string} maxHeightForQ - height for Q to resize to when it expands
 * @property {Function} onQBarOpenCallback - optional callback for Q search bar open
 * @property {Function} onQBarCloseCallback - optional callback for Q search bar close
 * @property {boolean} qBarIconDisabled, - option to hide the Q search bar icon
 * @property {boolean} qBarTopicNameDisabled - option to hide the Q search bar topic name
 * @property {string} themeId - option to apply the quicksight theme to Q
 */

/**
 * Embeddable Object class.
 * @class
 * @name EmbeddableObject
 * @param {EmbeddingOptions} options - options set by customers to embed the session or dashboard.
 */
var EmbeddableObject = /*#__PURE__*/function () {
  /* eslint-disable complexity */
  function EmbeddableObject(options) {
    _classCallCheck(this, EmbeddableObject);

    if (!options) {
      throw new Error('options is required');
    }

    if (!options.url) {
      throw new Error('url is required');
    }

    var url = options.url,
        container = options.container,
        parameters = options.parameters,
        defaultEmbeddingVisualType = options.defaultEmbeddingVisualType,
        errorCallback = options.errorCallback,
        loadCallback = options.loadCallback,
        parametersChangeCallback = options.parametersChangeCallback,
        selectedSheetChangeCallback = options.selectedSheetChangeCallback,
        isQEmbedded = options.isQEmbedded;
    this.url = url;

    if (isQEmbedded) {
      this.qBarOpen = false;
      this.isQEmbedded = isQEmbedded;
      this.maxHeightForQ = options.maxHeightForQ;
      this.onQBarOpenCallback = options.onQBarOpenCallback;
      this.onQBarCloseCallback = options.onQBarCloseCallback;
      this.qBarIconDisabled = options.qBarIconDisabled;
      this.qBarTopicNameDisabled = options.qBarTopicNameDisabled;
      this.themeId = options.themeId;
    }

    if (container instanceof HTMLElement) {
      this.container = container;
    } else if (typeof container === 'string') {
      this.container = document.querySelector(container);
    }

    if (!this.container) {
      throw new Error('can\'t find valid container');
    }

    this.parameters = parameters;
    this.defaultEmbeddingVisualType = defaultEmbeddingVisualType;
    this.iframe = createIframe(options);
    (0, _eventify["default"])(this);

    if (typeof errorCallback === 'function') {
      this.on(_constants.CLIENT_FACING_EVENT_NAMES.error, errorCallback);
    }

    if (typeof loadCallback === 'function') {
      this.on(_constants.CLIENT_FACING_EVENT_NAMES.load, loadCallback);
    }

    if (typeof parametersChangeCallback === 'function') {
      this.on(_constants.CLIENT_FACING_EVENT_NAMES.parametersChange, parametersChangeCallback);
    }

    if (typeof selectedSheetChangeCallback === 'function') {
      this.on(_constants.CLIENT_FACING_EVENT_NAMES.selectedSheetChange, selectedSheetChangeCallback);
    }

    window.addEventListener('message', function (event) {
      if (!event) {
        return;
      }

      if (event.source === (this.iframe && this.iframe.contentWindow)) {
        this.handleMessageEvent(event, options);
      }
    }.bind(this), false);

    if (isQEmbedded) {
      this.originalHeight = options.height;
      window.addEventListener('click', function (event) {
        var isClickInside = this.container ? this.container.contains(event.target) : true;

        if (!isClickInside && this.qBarOpen) {
          var hideQBarEvent = (0, _constructEvent["default"])(_constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES.HIDE_Q_BAR, {});
          this.iframe.contentWindow.postMessage(hideQBarEvent, this.url);
        }
      }.bind(this), false);

      if (!this.onQBarOpenCallback || !this.onQBarCloseCallback) {
        this.qBackdrop = createQBackdrop();
      }
    }

    this.getContainer = this.getContainer.bind(this);
    this.getParameters = this.getParameters.bind(this);
    this.getActiveParameterValues = this.getActiveParameterValues.bind(this);
    this.getSheets = this.getSheets.bind(this);
    this.getDefaultEmbeddingVisualType = this.getDefaultEmbeddingVisualType.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.handleMessageEvent = this.handleMessageEvent.bind(this);
    this.setParameters = this.setParameters.bind(this);
    this.setDefaultEmbeddingVisualType = this.setDefaultEmbeddingVisualType.bind(this);
    this.handleHideQ = this.handleHideQ.bind(this);
    this.handleShowQ = this.handleShowQ.bind(this);
  }

  _createClass(EmbeddableObject, [{
    key: "handleShowQ",
    value: function handleShowQ() {
      var container = this.getContainer();

      if (!container) {
        return;
      }

      if (this.onQBarOpenCallback && typeof this.onQBarOpenCallback === 'function') {
        this.onQBarOpenCallback();
      } else {
        var qBackdrop = this.qBackdrop;

        if (qBackdrop) {
          setElementStyle(qBackdrop, {
            height: '100vh'
          });
        }
      }

      setElementStyle(container, {
        height: this.maxHeightForQ || '100vh',
        zIndex: _constants.MAXIMUM_Z_INDEX
      });
      setElementStyle(this.iframe, {
        height: '100%',
        zIndex: _constants.MAXIMUM_Z_INDEX
      });
      this.qBarOpen = true;
    }
  }, {
    key: "handleHideQ",
    value: function handleHideQ() {
      var container = this.getContainer();

      if (!container) {
        return;
      }

      if (this.onQBarCloseCallback && typeof this.onQBarCloseCallback === 'function') {
        this.onQBarCloseCallback();
      } else {
        var qBackdrop = this.qBackdrop;

        if (qBackdrop) {
          setElementStyle(qBackdrop, {
            height: 0
          });
        }
      }

      setElementStyle(container, {
        height: this.originalHeight,
        zIndex: 0
      });
      setElementStyle(this.iframe, {
        height: this.originalHeight,
        zIndex: 0
      });
      this.qBarOpen = false;
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      return this.url;
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }
  }, {
    key: "getParameters",
    value: function getParameters() {
      return this.parameters;
    }
  }, {
    key: "getActiveParameterValues",
    value: function getActiveParameterValues(callback) {
      if (typeof callback !== 'function') {
        return;
      }

      if (this.getActiveParametersCallback) {
        this.off(_constants.CLIENT_FACING_EVENT_NAMES.GET_ACTIVE_PARAMETER_VALUES, this.getActiveParametersCallback);
      }

      this.getActiveParametersCallback = callback;
      this.on(_constants.CLIENT_FACING_EVENT_NAMES.GET_ACTIVE_PARAMETER_VALUES, callback);
      var event = (0, _constructEvent["default"])(_constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES.GET_ACTIVE_PARAMETER_VALUES, {});
      this.iframe.contentWindow.postMessage(event, this.url);
    }
  }, {
    key: "getSheets",
    value: function getSheets(callback) {
      if (typeof callback !== 'function') {
        return;
      }

      if (this.getSheetsCallback) {
        this.off(_constants.CLIENT_FACING_EVENT_NAMES.GET_SHEETS, this.getSheetsCallback);
      }

      this.getSheetsCallback = callback;
      this.on(_constants.CLIENT_FACING_EVENT_NAMES.GET_SHEETS, callback);
      var event = (0, _constructEvent["default"])(_constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES.GET_SHEETS, {});
      this.iframe.contentWindow.postMessage(event, this.url);
    }
  }, {
    key: "handleMessageEvent",
    value: function handleMessageEvent(event, options) {
      var _event$data = event.data,
          eventName = _event$data.eventName,
          payload = _event$data.payload;
      this.trigger(_constants.CLIENT_FACING_EVENT_NAMES[eventName], payload);

      if (eventName === _constants.IN_COMING_POST_MESSAGE_EVENT_NAMES.RESIZE_EVENT) {
        var height = options.height;

        if (height === _constants.DASHBOARD_SIZE_OPTIONS.AUTO_FIT) {
          this.iframe.height = payload.height;
        }
      } else if (eventName === _constants.CLIENT_FACING_EVENT_NAMES.SHOW_Q_BAR) {
        this.handleShowQ();
      } else if (eventName === _constants.CLIENT_FACING_EVENT_NAMES.HIDE_Q_BAR) {
        this.handleHideQ();
      }
    }
  }, {
    key: "getDefaultEmbeddingVisualType",
    value: function getDefaultEmbeddingVisualType() {
      return this.defaultEmbeddingVisualType;
    }
  }, {
    key: "setParameters",
    value: function setParameters(parameters) {
      var eventName = _constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES.UPDATE_PARAMETER_VALUES;
      var payload = {
        parameters: parameters
      };
      var event = (0, _constructEvent["default"])(eventName, payload);
      this.iframe.contentWindow.postMessage(event, this.url);
    }
  }, {
    key: "setDefaultEmbeddingVisualType",
    value: function setDefaultEmbeddingVisualType(defaultEmbeddingVisualType) {
      var event = this.generateDefaultEmbeddingVisualTypeEvent(defaultEmbeddingVisualType);
      this.iframe.contentWindow.postMessage(event, this.url);
    }
  }, {
    key: "generateDefaultEmbeddingVisualTypeEvent",
    value: function generateDefaultEmbeddingVisualTypeEvent(defaultEmbeddingVisualType) {
      var eventName = _constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES.DEFAULT_EMBEDDING_VISUAL_TYPE_OPTIONS;

      if (defaultEmbeddingVisualType == null || !(defaultEmbeddingVisualType in _constants.DEFAULT_EMBEDDING_VISUAL_TYPE_OPTIONS)) {
        defaultEmbeddingVisualType = _constants.DEFAULT_EMBEDDING_VISUAL_TYPE_OPTIONS.AUTO_GRAPH;
      }

      var payload = {
        defaultEmbeddingVisualType: defaultEmbeddingVisualType
      };
      return (0, _constructEvent["default"])(eventName, payload);
    }
  }]);

  return EmbeddableObject;
}();

function createQBackdrop() {
  var backdrop = document.createElement('div');
  backdrop.className = 'quicksight-q-searchbar-backdrop';
  setElementStyle(backdrop, _constants.Q_BACKDROP_STYLES);
  document && document.body && document.body.insertBefore(backdrop, document.body.firstChild);
  return backdrop;
}

function setElementStyle(element, style) {
  for (var key in style) {
    // $FlowFixMe - mismatch between key and value for setting styling like this
    element.style[key] = style[key];
  }
}

function createIframe(options) {
  var width = options.width,
      height = options.height,
      isQEmbedded = options.isQEmbedded;
  var loadingHeight = options.loadingHeight,
      url = options.url,
      scrolling = options.scrolling,
      className = options.className;

  if (height === _constants.DASHBOARD_SIZE_OPTIONS.AUTO_FIT) {
    height = loadingHeight;
  }

  var iframe = document.createElement('iframe');
  iframe.className = ['quicksight-embedding-iframe', className].join(' ').trim();
  iframe.width = width || '100%';
  iframe.height = height || '100%';
  iframe.scrolling = scrolling || 'no';
  iframe.onload = sendInitialPostMessage.bind(null, iframe, url);
  iframe.src = getIframeSrc(options);
  iframe.style.border = '0px';
  iframe.style.padding = '0px';

  if (isQEmbedded) {
    iframe.setAttribute('allowtransparency', 'true');
  }

  return iframe;
}

function getIframeSrc(options) {
  var url = options.url,
      parameters = options.parameters,
      locale = options.locale,
      footerPaddingEnabled = options.footerPaddingEnabled,
      iframeResizeOnSheetChange = options.iframeResizeOnSheetChange,
      printEnabled = options.printEnabled,
      sheetId = options.sheetId,
      sheetTabsDisabled = options.sheetTabsDisabled,
      qBarIconDisabled = options.qBarIconDisabled,
      qBarTopicNameDisabled = options.qBarTopicNameDisabled,
      isQEmbedded = options.isQEmbedded,
      themeId = options.themeId;

  var src = url + '&punyCodeEmbedOrigin=' + _punycode["default"].encode(window.location.origin + '/');

  src = src + '&printEnabled=' + String(!!printEnabled);

  if (locale) {
    src = src + '&locale=' + locale;
  }

  if (sheetTabsDisabled) {
    src = src + '&sheetTabsDisabled=' + String(sheetTabsDisabled);
  }

  if (sheetId) {
    src = src + '&sheetId=' + sheetId;
  }

  if (footerPaddingEnabled) {
    src = src + '&footerPaddingEnabled=' + String(footerPaddingEnabled);
  }

  if (iframeResizeOnSheetChange) {
    src = src + '&resizeOnSheetChange=' + String(iframeResizeOnSheetChange);
  }

  if (isQEmbedded && qBarIconDisabled) {
    src = src + '&qBarIconDisabled=' + String(qBarIconDisabled);
  }

  if (isQEmbedded && qBarTopicNameDisabled) {
    src = src + '&qBarTopicNameDisabled=' + String(qBarTopicNameDisabled);
  }

  if (isQEmbedded && themeId) {
    src = src + '&themeId=' + themeId;
  }

  if (parameters) {
    return useParameterValuesInUrl(src, parameters);
  }

  return src;
}
/**
 * Use parameter values in url.
 * @function
 * @name useParameterValuesInUrl
 * @param {string} url - url of the session or dashboard to embed.
 * @param {Object} parameters
 */


function useParameterValuesInUrl(url, parameters) {
  var parameterNames = Object.keys(parameters);
  var parameterStrings = parameterNames.map(function (name) {
    var value = parameters[name];
    var values = [].concat(value);
    var encodedName = encodeURIComponent(name);
    return values.map(function (paramValue) {
      return encodeURIComponent(paramValue);
    }).map(function (encodedValue) {
      return "p.".concat(encodedName, "=").concat(encodedValue);
    }).join('&');
  });
  return "".concat(url, "#").concat(parameterStrings.join('&'));
}

function sendInitialPostMessage(iframe, domain) {
  if (iframe.contentWindow === null) {
    setTimeout(sendInitialPostMessage.bind(null, iframe, domain), 100);
  }

  var eventName = _constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES.ESTABLISH_MESSAGE_CHANNEL;
  var event = (0, _constructEvent["default"])(eventName); // wait until iframe.contentWindow exists and send message to iframe window

  iframe.contentWindow.postMessage(event, domain);
}

var _default = EmbeddableObject;
exports["default"] = _default;