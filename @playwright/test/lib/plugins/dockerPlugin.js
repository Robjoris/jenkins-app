"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dockerPlugin = void 0;
var _utilsBundle = require("playwright-core/lib/utilsBundle");
var _docker = require("playwright-core/lib/containers/docker");
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

const dockerPlugin = {
  name: 'playwright:docker',
  async setup(config, configDir, rootSuite, reporter) {
    if (!process.env.PLAYWRIGHT_DOCKER) return;
    const println = text => {
      var _reporter$onStdOut;
      return (_reporter$onStdOut = reporter.onStdOut) === null || _reporter$onStdOut === void 0 ? void 0 : _reporter$onStdOut.call(reporter, text + '\n');
    };
    println(_utilsBundle.colors.dim('Using docker container to run browsers.'));
    await (0, _docker.checkDockerEngineIsRunningOrDie)();
    const info = await (0, _docker.containerInfo)();
    if (!info) throw new Error('ERROR: please launch docker container separately!');
    println('');
    process.env.PW_TEST_CONNECT_WS_ENDPOINT = info.httpEndpoint;
    process.env.PW_TEST_CONNECT_EXPOSE_NETWORK = '*';
  }
};
exports.dockerPlugin = dockerPlugin;