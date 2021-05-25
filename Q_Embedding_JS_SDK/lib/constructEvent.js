"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = constructEvent;

var _constants = require("./constants");

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function constructEvent(eventName, payload) {
  var isValidEventName = Object.keys(_constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES).some(function (k) {
    return _constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES[k] === eventName;
  });

  if (!isValidEventName) {
    throw new Error('Unexpected eventName');
  }

  return {
    eventName: eventName,
    clientType: 'EMBEDDING',
    payload: payload
  };
}