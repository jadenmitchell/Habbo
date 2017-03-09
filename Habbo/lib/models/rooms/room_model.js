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
    return sequelize.define('RoomModel', {
        id: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        type: {
            type: dataTypes.ENUM,
            allowNull: false,
            values: ['FLAT', 'PUBLIC'],
            defaultValue: 'FLAT'
        },
        heightmap: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        enabled: {
            type: dataTypes.ENUM,
            allowNull: false,
            values: ['0', '1'],
            defaultValue: '1'
        },
        door_x: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        door_y: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        door_z: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        door_dir: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        subscription_requirement: {
            type: dataTypes.ENUM,
            allowNull: false,
            values: ['0', '1', '2']
        },
        max_users: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 30
        }
    }, {
            tableName: 'room_models',
            timestamps: false
        });
};