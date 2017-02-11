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

const fileAsync = require('../common/file');
const logger = require('../common/logger');
const Sequelize = require('Sequelize');

/**
 * Model name linked with interface.
 * 
 * @type {Array}
 */
const db = [];

/**
 * Server environment.
 */
const environment = process.env['NODE_ENV'] || 'development';

/**
 * Shared database connections across the server.
 */
let database;

module.exports = (config) => {
    if (!config && Object.isFrozen(database)) {
        return database;
    }

    // throw err:
    if (!config)
        return null;

    logger.info('Connecting to the database: ' + config[environment]['database']);

    const sequelize = new Sequelize(config[environment]['database'],
        config[environment]['username'],
        config[environment]['password'],
        {
            dialect: config[environment]['dialect'],
            pool: {
                max: 100,
                min: 3,
                idle: 60000
            }
        });

    sequelize
        .authenticate()
        .then(function (err) {
            logger.info('Connection has been established successfully.');
        })
        .catch(function (err) {
            logger.error('Unable to connect to the database.', err);
            return null;
        });

    fileAsync.recursive(__dirname,
        filterModelFile,
        (err, files) => {
            if (err) throw err;
            files.forEach((file) => {
                var model = sequelize.import(file);
                db[model.name] = model;

                logger.debug(`Loaded the ${model.name} database model.`);
            });

            sequelize.sync();
        });

    Object.keys(db)
        .forEach(function (modelName) {
            if ('associate' in db[modelName]) {
                db[modelName].associate(db);
            }
        });

    database = {
        models: db,
        sequelize: sequelize,
        Sequelize: Sequelize
    };

    Object.freeze(database);
    return database;
};

/**
 * Remove redundant and/or invalid files from the list.
 * Model criteria requires certain file naming standards.
 * 
 * @param list files found in the directory
 * @returns {Array.<String>} filtered list
 */
function filterModelFile(list) {
    return list.filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    });
}