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

const Database = require('../../models')();
const sequelize = Database.sequelize;
const Room = Database.models['Room'];
const RoomInstance = require('./room_instance');

class RoomLoader {
    static getRoomsDataByOwnerIdSortByName(ownerId) {
        return new Promise((resolve, reject) => {
            Room.findAll({
                where: { 'owner_id': ownerId },
                order: sequelize.col('name')
            }).then((rooms) => {
                const roomInstances = [];
                rooms.forEach((room) => roomInstances.push(new RoomInstance(room)));
                resolve(roomInstances);
            });
        });
    }
}

module.exports = RoomLoader;