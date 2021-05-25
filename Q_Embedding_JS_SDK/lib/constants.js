"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Q_BACKDROP_STYLES = exports.MAXIMUM_Z_INDEX = exports.DEFAULT_EMBEDDING_VISUAL_TYPE_OPTIONS = exports.DASHBOARD_SIZE_OPTIONS = exports.CLIENT_FACING_EVENT_NAMES = exports.IN_COMING_POST_MESSAGE_EVENT_NAMES = exports.OUT_GOING_POST_MESSAGE_EVENT_NAMES = void 0;
// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var OUT_GOING_POST_MESSAGE_EVENT_NAMES = {
  ESTABLISH_MESSAGE_CHANNEL: 'establishMessageChannel',
  UPDATE_PARAMETER_VALUES: 'updateParameterValues',
  DEFAULT_EMBEDDING_VISUAL_TYPE_OPTIONS: 'updateDefaultEmbeddingVisualType',
  NAVIGATE_TO_DASHBOARD: 'navigateToDashboard',
  GET_ACTIVE_PARAMETER_VALUES: 'getActiveParameterValues',
  NAVIGATE_TO_SHEET: 'navigateToSheet',
  GET_SHEETS: 'getSheets',
  PRINT: 'initiatePrint',
  EXPORT_PDF: 'exportPdf',
  HIDE_Q_BAR: 'hideQSearchBar'
};
exports.OUT_GOING_POST_MESSAGE_EVENT_NAMES = OUT_GOING_POST_MESSAGE_EVENT_NAMES;
var IN_COMING_POST_MESSAGE_EVENT_NAMES = {
  LOAD: 'load',
  ERROR: 'error',
  RESIZE_EVENT: 'RESIZE_EVENT',
  SHOW_MODAL_EVENT: 'SHOW_MODAL_EVENT'
}; // this is a mapping of event names we use internally to the event names we expose to clients

exports.IN_COMING_POST_MESSAGE_EVENT_NAMES = IN_COMING_POST_MESSAGE_EVENT_NAMES;
var CLIENT_FACING_EVENT_NAMES = {
  load: 'load',
  error: 'error',
  parametersChange: 'parametersChange',
  selectedSheetChange: 'selectedSheetChange',
  RESIZE_EVENT: 'resize',
  SHOW_MODAL_EVENT: 'SHOW_MODAL_EVENT',
  GET_ACTIVE_PARAMETER_VALUES: 'GET_ACTIVE_PARAMETER_VALUES',
  GET_SHEETS: 'GET_SHEETS',
  SHOW_Q_BAR: 'showQSearchBar',
  HIDE_Q_BAR: 'hideQSearchBar'
};
exports.CLIENT_FACING_EVENT_NAMES = CLIENT_FACING_EVENT_NAMES;
var DASHBOARD_SIZE_OPTIONS = {
  AUTO_FIT: 'AutoFit'
};
exports.DASHBOARD_SIZE_OPTIONS = DASHBOARD_SIZE_OPTIONS;
var DEFAULT_EMBEDDING_VISUAL_TYPE_OPTIONS = {
  AUTO_GRAPH: 'AUTO_GRAPH',
  TABLE: 'TABLE'
}; // Q embedding constants

exports.DEFAULT_EMBEDDING_VISUAL_TYPE_OPTIONS = DEFAULT_EMBEDDING_VISUAL_TYPE_OPTIONS;
var MAXIMUM_Z_INDEX = 0x7FFFFFFF; // These are same as backdrop in QS application

exports.MAXIMUM_Z_INDEX = MAXIMUM_Z_INDEX;
var Q_BACKDROP_STYLES = {
  background: '#202124',
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '0%',
  zIndex: (MAXIMUM_Z_INDEX - 2).toString(),
  opacity: '0.28'
};
exports.Q_BACKDROP_STYLES = Q_BACKDROP_STYLES;