"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webServerPluginsForConfig = exports.webServer = exports.WebServerPlugin = void 0;
var _http = _interopRequireDefault(require("http"));
var _https = _interopRequireDefault(require("https"));
var _path = _interopRequireDefault(require("path"));
var _net = _interopRequireDefault(require("net"));
var _utilsBundle = require("playwright-core/lib/utilsBundle");
var _timeoutRunner = require("playwright-core/lib/utils/timeoutRunner");
var _processLauncher = require("playwright-core/lib/utils/processLauncher");
var _cli = require("../cli");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const DEFAULT_ENVIRONMENT_VARIABLES = {
  'BROWSER': 'none' // Disable that create-react-app will open the page in the browser
};

const debugWebServer = (0, _utilsBundle.debug)('pw:webserver');
class WebServerPlugin {
  constructor(options, checkPortOnly) {
    this._isAvailable = void 0;
    this._killProcess = void 0;
    this._processExitedPromise = void 0;
    this._options = void 0;
    this._checkPortOnly = void 0;
    this._reporter = void 0;
    this.name = 'playwright:webserver';
    this._options = options;
    this._checkPortOnly = checkPortOnly;
  }
  async setup(config, configDir, rootSuite, reporter) {
    var _this$_reporter$onStd;
    this._reporter = reporter;
    this._isAvailable = getIsAvailableFunction(this._options.url, this._checkPortOnly, !!this._options.ignoreHTTPSErrors, (_this$_reporter$onStd = this._reporter.onStdErr) === null || _this$_reporter$onStd === void 0 ? void 0 : _this$_reporter$onStd.bind(this._reporter));
    this._options.cwd = this._options.cwd ? _path.default.resolve(configDir, this._options.cwd) : configDir;
    try {
      await this._startProcess();
      await this._waitForProcess();
    } catch (error) {
      await this.teardown();
      throw error;
    }
  }
  async teardown() {
    var _this$_killProcess;
    await ((_this$_killProcess = this._killProcess) === null || _this$_killProcess === void 0 ? void 0 : _this$_killProcess.call(this));
  }
  async _startProcess() {
    let processExitedReject = error => {};
    this._processExitedPromise = new Promise((_, reject) => processExitedReject = reject);
    const isAlreadyAvailable = await this._isAvailable();
    if (isAlreadyAvailable) {
      var _this$_options$url;
      debugWebServer(`WebServer is already available`);
      if (this._options.reuseExistingServer) return;
      const port = new URL(this._options.url);
      throw new Error(`${(_this$_options$url = this._options.url) !== null && _this$_options$url !== void 0 ? _this$_options$url : `http://localhost${port ? ':' + port : ''}`} is already used, make sure that nothing is running on the port/url or set reuseExistingServer:true in config.webServer.`);
    }
    debugWebServer(`Starting WebServer process ${this._options.command}...`);
    const {
      launchedProcess,
      kill
    } = await (0, _processLauncher.launchProcess)({
      command: this._options.command,
      env: {
        ...DEFAULT_ENVIRONMENT_VARIABLES,
        ...(0, _cli.envWithoutExperimentalLoaderOptions)(),
        ...this._options.env
      },
      cwd: this._options.cwd,
      stdio: 'stdin',
      shell: true,
      attemptToGracefullyClose: async () => {},
      log: () => {},
      onExit: code => processExitedReject(new Error(code ? `Process from config.webServer was not able to start. Exit code: ${code}` : 'Process from config.webServer exited early.')),
      tempDirectories: []
    });
    this._killProcess = kill;
    debugWebServer(`Process started`);
    launchedProcess.stderr.on('data', line => {
      var _onStdErr, _ref;
      return (_onStdErr = (_ref = this._reporter).onStdErr) === null || _onStdErr === void 0 ? void 0 : _onStdErr.call(_ref, '[WebServer] ' + line.toString());
    });
    launchedProcess.stdout.on('data', line => {
      var _onStdOut, _ref2;
      if (debugWebServer.enabled) (_onStdOut = (_ref2 = this._reporter).onStdOut) === null || _onStdOut === void 0 ? void 0 : _onStdOut.call(_ref2, '[WebServer] ' + line.toString());
    });
  }
  async _waitForProcess() {
    debugWebServer(`Waiting for availability...`);
    await this._waitForAvailability();
    debugWebServer(`WebServer available`);
  }
  async _waitForAvailability() {
    const launchTimeout = this._options.timeout || 60 * 1000;
    const cancellationToken = {
      canceled: false
    };
    const {
      timedOut
    } = await Promise.race([(0, _timeoutRunner.raceAgainstTimeout)(() => waitFor(this._isAvailable, cancellationToken), launchTimeout), this._processExitedPromise]);
    cancellationToken.canceled = true;
    if (timedOut) throw new Error(`Timed out waiting ${launchTimeout}ms from config.webServer.`);
  }
}
exports.WebServerPlugin = WebServerPlugin;
async function isPortUsed(port) {
  const innerIsPortUsed = host => new Promise(resolve => {
    const conn = _net.default.connect(port, host).on('error', () => {
      resolve(false);
    }).on('connect', () => {
      conn.end();
      resolve(true);
    });
  });
  return (await innerIsPortUsed('127.0.0.1')) || (await innerIsPortUsed('::1'));
}
async function isURLAvailable(url, ignoreHTTPSErrors, onStdErr) {
  let statusCode = await httpStatusCode(url, ignoreHTTPSErrors, onStdErr);
  if (statusCode === 404 && url.pathname === '/') {
    const indexUrl = new URL(url);
    indexUrl.pathname = '/index.html';
    statusCode = await httpStatusCode(indexUrl, ignoreHTTPSErrors, onStdErr);
  }
  return statusCode >= 200 && statusCode < 404;
}
async function httpStatusCode(url, ignoreHTTPSErrors, onStdErr) {
  const commonRequestOptions = {
    headers: {
      Accept: '*/*'
    }
  };
  const isHttps = url.protocol === 'https:';
  const requestOptions = isHttps ? {
    ...commonRequestOptions,
    rejectUnauthorized: !ignoreHTTPSErrors
  } : commonRequestOptions;
  return new Promise(resolve => {
    debugWebServer(`HTTP GET: ${url}`);
    (isHttps ? _https.default : _http.default).get(url, requestOptions, res => {
      var _res$statusCode;
      res.resume();
      const statusCode = (_res$statusCode = res.statusCode) !== null && _res$statusCode !== void 0 ? _res$statusCode : 0;
      debugWebServer(`HTTP Status: ${statusCode}`);
      resolve(statusCode);
    }).on('error', error => {
      if (error.code === 'DEPTH_ZERO_SELF_SIGNED_CERT') onStdErr === null || onStdErr === void 0 ? void 0 : onStdErr(`[WebServer] Self-signed certificate detected. Try adding ignoreHTTPSErrors: true to config.webServer.`);
      debugWebServer(`Error while checking if ${url} is available: ${error.message}`);
      resolve(0);
    });
  });
}
async function waitFor(waitFn, cancellationToken) {
  const logScale = [100, 250, 500];
  while (!cancellationToken.canceled) {
    const connected = await waitFn();
    if (connected) return;
    const delay = logScale.shift() || 1000;
    debugWebServer(`Waiting ${delay}ms`);
    await new Promise(x => setTimeout(x, delay));
  }
}
function getIsAvailableFunction(url, checkPortOnly, ignoreHTTPSErrors, onStdErr) {
  const urlObject = new URL(url);
  if (!checkPortOnly) return () => isURLAvailable(urlObject, ignoreHTTPSErrors, onStdErr);
  const port = urlObject.port;
  return () => isPortUsed(+port);
}
const webServer = options => {
  // eslint-disable-next-line no-console
  return new WebServerPlugin(options, false);
};
exports.webServer = webServer;
const webServerPluginsForConfig = config => {
  const shouldSetBaseUrl = !!config.webServer;
  const webServerPlugins = [];
  for (const webServerConfig of config._webServers) {
    if (webServerConfig.port !== undefined && webServerConfig.url !== undefined) throw new Error(`Exactly one of 'port' or 'url' is required in config.webServer.`);
    const url = webServerConfig.url || `http://localhost:${webServerConfig.port}`;

    // We only set base url when only the port is given. That's a legacy mode we have regrets about.
    if (shouldSetBaseUrl && !webServerConfig.url) process.env.PLAYWRIGHT_TEST_BASE_URL = url;
    webServerPlugins.push(new WebServerPlugin({
      ...webServerConfig,
      url
    }, webServerConfig.port !== undefined));
  }
  return webServerPlugins;
};
exports.webServerPluginsForConfig = webServerPluginsForConfig;