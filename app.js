/**
 * Copyright 2016 Jaden M.
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
'use strict';

console.time('startup');

const Promise = require('bluebird');
const config = require('./config/server.json');
const logger = require('./lib/logger');
const model = require('./lib/models');
const packets = require('./lib/messages/packets');

model(config).then(database => {
    process.on('exit', () => database.sequelize.close());
    const TcpServer = require('./lib/network/tcp_server');
    const tcpServer = new TcpServer(3001, 10);
    tcpServer.listen();
});

packets();
logger.info(process.cpuUsage());

if (global.gc) {
    logger.debug('Forced garbage collection for your Node.js app is available and will be used.');
} else {
    logger.debug('Garbage collection unavailable.  Pass --expose-gc '
        + 'when launching node to enable forced garbage collection.');
}

const stdin = process.openStdin();

stdin.addListener('data', function (input) {
    const command = input.toString().trim();
});