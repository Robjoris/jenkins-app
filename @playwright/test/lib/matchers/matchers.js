"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBeChecked = toBeChecked;
exports.toBeDisabled = toBeDisabled;
exports.toBeEditable = toBeEditable;
exports.toBeEmpty = toBeEmpty;
exports.toBeEnabled = toBeEnabled;
exports.toBeFocused = toBeFocused;
exports.toBeHidden = toBeHidden;
exports.toBeOK = toBeOK;
exports.toBeVisible = toBeVisible;
exports.toContainText = toContainText;
exports.toHaveAttribute = toHaveAttribute;
exports.toHaveCSS = toHaveCSS;
exports.toHaveClass = toHaveClass;
exports.toHaveCount = toHaveCount;
exports.toHaveId = toHaveId;
exports.toHaveJSProperty = toHaveJSProperty;
exports.toHaveText = toHaveText;
exports.toHaveTitle = toHaveTitle;
exports.toHaveURL = toHaveURL;
exports.toHaveValue = toHaveValue;
exports.toHaveValues = toHaveValues;
exports.toPass = toPass;
var _utilsBundle = require("playwright-core/lib/utilsBundle");
var _utils = require("playwright-core/lib/utils");
var _util = require("../util");
var _toBeTruthy = require("./toBeTruthy");
var _toEqual = require("./toEqual");
var _toMatchText = require("./toMatchText");
var _mimeType = require("playwright-core/lib/utils/mimeType");
var _timeoutRunner = require("playwright-core/lib/utils/timeoutRunner");
/**
 * Copyright Microsoft Corporation. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function toBeChecked(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeChecked', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    const checked = !options || options.checked === undefined || options.checked === true;
    return await locator._expect(customStackTrace, checked ? 'to.be.checked' : 'to.be.unchecked', {
      isNot,
      timeout
    });
  }, options);
}
function toBeDisabled(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeDisabled', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    return await locator._expect(customStackTrace, 'to.be.disabled', {
      isNot,
      timeout
    });
  }, options);
}
function toBeEditable(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeEditable', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    const editable = !options || options.editable === undefined || options.editable === true;
    return await locator._expect(customStackTrace, editable ? 'to.be.editable' : 'to.be.readonly', {
      isNot,
      timeout
    });
  }, options);
}
function toBeEmpty(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeEmpty', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    return await locator._expect(customStackTrace, 'to.be.empty', {
      isNot,
      timeout
    });
  }, options);
}
function toBeEnabled(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeEnabled', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    const enabled = !options || options.enabled === undefined || options.enabled === true;
    return await locator._expect(customStackTrace, enabled ? 'to.be.enabled' : 'to.be.disabled', {
      isNot,
      timeout
    });
  }, options);
}
function toBeFocused(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeFocused', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    return await locator._expect(customStackTrace, 'to.be.focused', {
      isNot,
      timeout
    });
  }, options);
}
function toBeHidden(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeHidden', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    return await locator._expect(customStackTrace, 'to.be.hidden', {
      isNot,
      timeout
    });
  }, options);
}
function toBeVisible(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeVisible', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    const visible = !options || options.visible === undefined || options.visible === true;
    return await locator._expect(customStackTrace, visible ? 'to.be.visible' : 'to.be.hidden', {
      isNot,
      timeout
    });
  }, options);
}
function toContainText(locator, expected, options = {}) {
  if (Array.isArray(expected)) {
    return _toEqual.toEqual.call(this, 'toContainText', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
      const expectedText = (0, _toMatchText.toExpectedTextValues)(expected, {
        matchSubstring: true,
        normalizeWhiteSpace: true,
        ignoreCase: options.ignoreCase
      });
      return await locator._expect(customStackTrace, 'to.contain.text.array', {
        expectedText,
        isNot,
        useInnerText: options.useInnerText,
        timeout
      });
    }, expected, {
      ...options,
      contains: true
    });
  } else {
    return _toMatchText.toMatchText.call(this, 'toContainText', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
      const expectedText = (0, _toMatchText.toExpectedTextValues)([expected], {
        matchSubstring: true,
        normalizeWhiteSpace: true,
        ignoreCase: options.ignoreCase
      });
      return await locator._expect(customStackTrace, 'to.have.text', {
        expectedText,
        isNot,
        useInnerText: options.useInnerText,
        timeout
      });
    }, expected, options);
  }
}
function toHaveAttribute(locator, name, expected, options) {
  return _toMatchText.toMatchText.call(this, 'toHaveAttribute', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    const expectedText = (0, _toMatchText.toExpectedTextValues)([expected]);
    return await locator._expect(customStackTrace, 'to.have.attribute', {
      expressionArg: name,
      expectedText,
      isNot,
      timeout
    });
  }, expected, options);
}
function toHaveClass(locator, expected, options) {
  if (Array.isArray(expected)) {
    return _toEqual.toEqual.call(this, 'toHaveClass', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
      const expectedText = (0, _toMatchText.toExpectedTextValues)(expected);
      return await locator._expect(customStackTrace, 'to.have.class.array', {
        expectedText,
        isNot,
        timeout
      });
    }, expected, options);
  } else {
    return _toMatchText.toMatchText.call(this, 'toHaveClass', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
      const expectedText = (0, _toMatchText.toExpectedTextValues)([expected]);
      return await locator._expect(customStackTrace, 'to.have.class', {
        expectedText,
        isNot,
        timeout
      });
    }, expected, options);
  }
}
function toHaveCount(locator, expected, options) {
  return _toEqual.toEqual.call(this, 'toHaveCount', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    return await locator._expect(customStackTrace, 'to.have.count', {
      expectedNumber: expected,
      isNot,
      timeout
    });
  }, expected, options);
}
function toHaveCSS(locator, name, expected, options) {
  return _toMatchText.toMatchText.call(this, 'toHaveCSS', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    const expectedText = (0, _toMatchText.toExpectedTextValues)([expected]);
    return await locator._expect(customStackTrace, 'to.have.css', {
      expressionArg: name,
      expectedText,
      isNot,
      timeout
    });
  }, expected, options);
}
function toHaveId(locator, expected, options) {
  return _toMatchText.toMatchText.call(this, 'toHaveId', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    const expectedText = (0, _toMatchText.toExpectedTextValues)([expected]);
    return await locator._expect(customStackTrace, 'to.have.id', {
      expectedText,
      isNot,
      timeout
    });
  }, expected, options);
}
function toHaveJSProperty(locator, name, expected, options) {
  return _toEqual.toEqual.call(this, 'toHaveJSProperty', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    return await locator._expect(customStackTrace, 'to.have.property', {
      expressionArg: name,
      expectedValue: expected,
      isNot,
      timeout
    });
  }, expected, options);
}
function toHaveText(locator, expected, options = {}) {
  if (Array.isArray(expected)) {
    return _toEqual.toEqual.call(this, 'toHaveText', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
      const expectedText = (0, _toMatchText.toExpectedTextValues)(expected, {
        normalizeWhiteSpace: true,
        ignoreCase: options.ignoreCase
      });
      return await locator._expect(customStackTrace, 'to.have.text.array', {
        expectedText,
        isNot,
        useInnerText: options === null || options === void 0 ? void 0 : options.useInnerText,
        timeout
      });
    }, expected, options);
  } else {
    return _toMatchText.toMatchText.call(this, 'toHaveText', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
      const expectedText = (0, _toMatchText.toExpectedTextValues)([expected], {
        normalizeWhiteSpace: true,
        ignoreCase: options.ignoreCase
      });
      return await locator._expect(customStackTrace, 'to.have.text', {
        expectedText,
        isNot,
        useInnerText: options === null || options === void 0 ? void 0 : options.useInnerText,
        timeout
      });
    }, expected, options);
  }
}
function toHaveValue(locator, expected, options) {
  return _toMatchText.toMatchText.call(this, 'toHaveValue', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    const expectedText = (0, _toMatchText.toExpectedTextValues)([expected]);
    return await locator._expect(customStackTrace, 'to.have.value', {
      expectedText,
      isNot,
      timeout
    });
  }, expected, options);
}
function toHaveValues(locator, expected, options) {
  return _toEqual.toEqual.call(this, 'toHaveValues', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    const expectedText = (0, _toMatchText.toExpectedTextValues)(expected);
    return await locator._expect(customStackTrace, 'to.have.values', {
      expectedText,
      isNot,
      timeout
    });
  }, expected, options);
}
function toHaveTitle(page, expected, options = {}) {
  const locator = page.locator(':root');
  return _toMatchText.toMatchText.call(this, 'toHaveTitle', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    const expectedText = (0, _toMatchText.toExpectedTextValues)([expected], {
      normalizeWhiteSpace: true
    });
    return await locator._expect(customStackTrace, 'to.have.title', {
      expectedText,
      isNot,
      timeout
    });
  }, expected, options);
}
function toHaveURL(page, expected, options) {
  const baseURL = page.context()._options.baseURL;
  expected = typeof expected === 'string' ? (0, _utils.constructURLBasedOnBaseURL)(baseURL, expected) : expected;
  const locator = page.locator(':root');
  return _toMatchText.toMatchText.call(this, 'toHaveURL', locator, 'Locator', async (isNot, timeout, customStackTrace) => {
    const expectedText = (0, _toMatchText.toExpectedTextValues)([expected]);
    return await locator._expect(customStackTrace, 'to.have.url', {
      expectedText,
      isNot,
      timeout
    });
  }, expected, options);
}
async function toBeOK(response) {
  const matcherName = 'toBeOK';
  (0, _util.expectTypes)(response, ['APIResponse'], matcherName);
  const contentType = response.headers()['content-type'];
  const isTextEncoding = contentType && (0, _mimeType.isTextualMimeType)(contentType);
  const [log, text] = this.isNot === response.ok() ? await Promise.all([response._fetchLog(), isTextEncoding ? response.text() : null]) : [];
  const message = () => this.utils.matcherHint(matcherName, undefined, '', {
    isNot: this.isNot
  }) + (0, _util.callLogText)(log) + (text === null ? '' : `\nResponse text:\n${_utilsBundle.colors.dim((text === null || text === void 0 ? void 0 : text.substring(0, 1000)) || '')}`);
  const pass = response.ok();
  return {
    message,
    pass
  };
}
async function toPass(callback, options = {}) {
  let matcherError;
  const startTime = (0, _utils.monotonicTime)();
  const pollIntervals = options.intervals || [100, 250, 500, 1000];
  const lastPollInterval = pollIntervals[pollIntervals.length - 1] || 1000;
  const timeout = options.timeout !== undefined ? options.timeout : 0;
  const isNot = this.isNot;
  while (true) {
    const elapsed = (0, _utils.monotonicTime)() - startTime;
    if (timeout !== 0 && elapsed > timeout) break;
    try {
      const wrappedCallback = () => Promise.resolve().then(callback);
      const received = timeout !== 0 ? await (0, _timeoutRunner.raceAgainstTimeout)(wrappedCallback, timeout - elapsed) : await wrappedCallback().then(() => ({
        timedOut: false
      }));
      if (received.timedOut) break;
      // The check passed, exit sucessfully.
      if (isNot) matcherError = new Error('Expected to fail, but passed');else return {
        message: () => '',
        pass: true
      };
    } catch (e) {
      if (isNot) return {
        message: () => '',
        pass: false
      };
      matcherError = e;
    }
    await new Promise(x => {
      var _shift;
      return setTimeout(x, (_shift = pollIntervals.shift()) !== null && _shift !== void 0 ? _shift : lastPollInterval);
    });
  }
  const timeoutMessage = `Timeout ${timeout}ms exceeded while waiting on the predicate`;
  const message = () => matcherError ? [matcherError.message, '', `Call Log:`, `- ${timeoutMessage}`].join('\n') : timeoutMessage;
  return {
    message,
    pass: false
  };
}