"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.embedDashboard = embedDashboard;
exports.embedSession = embedSession;

var _EmbeddableObject = _interopRequireDefault(require("./EmbeddableObject"));

var _EmbeddableDashboard = _interopRequireDefault(require("./EmbeddableDashboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Embed a dashboard.
 * @function
 * @name embedDashboard
 * @param {EmbeddingOptions} options - options set by customers to embed the dashboard.
 */
function embedDashboard(options) {
  var dashboard = new _EmbeddableDashboard["default"](options);
  return embedObject(dashboard);
}
/**
 * Embed a session.
 * @function
 * @name embedSession
 * @param {EmbeddingOptions} options - options set by customers to embed the session.
 */


function embedSession(options) {
  var embeddedSession = new _EmbeddableObject["default"](options);
  return embedObject(embeddedSession);
}

function embedObject(embeddableObject) {
  var container = embeddableObject.getContainer();
  setTimeout(attachToDom.bind(null, embeddableObject.iframe, container), 0);
  return embeddableObject;
}
/**
 * Create a iframe and attach it to parent element.
 * @function
 * @name attachToDom
 * @param {HTMLIFrameElement} iframe
 * @param {string} url - url of the dashboard to embed with parameter values appended.
 * @param {HTMLElement} container - parent html element.
 */


function attachToDom(iframe, container) {
  if (!iframe) {
    throw new Error('iFrame is required');
  }

  if (!container) {
    throw new Error('container of iFrame is required');
  }

  container.appendChild(iframe);
}