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

module.exports = (sequelize, dataTypes) => {
    return sequelize.define('User', {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[a-z0-9\_\-]+$/i,
            }
        },
        motto: {
            type: dataTypes.STRING,
            validate: {
                is: /(<([^>]+)>)/ig,
            }
        },
        gender: {
            type: dataTypes.ENUM,
            allowNull: false,
            values: ['M', 'F'],
            defaultValue: 'M'
        },
        figure: {
            type: dataTypes.STRING,
            validate: {
                is: /[^a-zA-Z0-9\-]+/ig,
            }
        },
        credits: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        pixels: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        auth_ticket: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[^\\w-]+$/i,
            }
        }
    }, { timestamps: false });
};