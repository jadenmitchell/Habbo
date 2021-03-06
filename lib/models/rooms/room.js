﻿/**
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
    return sequelize.define('Room', {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        ownerId: {
            field: 'owner_id',
            type: dataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: dataTypes.STRING,
        categoryId: {
            field: 'category',
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }, {
            tableName: 'rooms',
            timestamps: false
        });
};