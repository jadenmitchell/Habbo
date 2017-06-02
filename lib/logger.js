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

const winston = require('winston');
const fs = require('fs');
const logDir = 'logs';

winston.setLevels(winston.config.npm.levels);
winston.addColors(winston.config.npm.colors);

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = new (winston.Logger)({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/HabboServer.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5
        }),
        new winston.transports.Console({
            level: 'silly',
            json: false,
            colorize: true
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'logs/Habbo_Exceptions.log'
        })
    ]
});

module.exports = logger;