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

const incoming = require('./../../incoming');
const HeightMap = require('../../../../game/rooms/mapping/height_map');
const YouAreControllerComposer = require('../../../outgoing/room/permissions/you_are_controller');
const HeightMapComposer = require('../../../outgoing/room/engine/height_map');
const FloorHeightMapComposer = require('../../../outgoing/room/engine/floor_height_map');
const RoomEntryInfoComposer = require('../../../outgoing/room/engine/room_entry_info');
const RoomVisualizationSettingsComposer = require('../../../outgoing/room/engine/room_visualization_settings');
const UsersComposer = require('../../../outgoing/room/engine/users');
const ObjectsComposer = require('../../../outgoing/room/engine/objects');
const ItemsComposer = require('../../../outgoing/room/engine/items');
const UserUpdateComposer = require('../../../outgoing/room/engine/user_update');

function getRoomEntryData(session, packet) {
    const row = {};
    row.name = 'model_a';
    row.door_x = 3;
    row.door_y = 5;
    row.door_z = 0;
    row.door_dir = 2;
    row.heightmap = 'xxxxxxxxxxxx\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxxxxxxxxxx\r\nxxxxxxxxxxxx';
    const heightMap = new HeightMap(row);

    session.player.avatar.position = {
        x: row.door_x,
        y: row.door_y,
        z: row.door_z + '.0',
        headRotation: row.door_dir,
        bodyRotation: row.door_dir
    };

    const avatars = [];
    avatars[0] = session.player.avatar;

    session.sendPacket(new UsersComposer(session.player.avatar));
    session.player.avatar.setStatus('flatctrl');
    session.sendPacket(new YouAreControllerComposer());
    //session.sendPacket(new UserUpdateComposer(avatars));

    session.sendPacket(new HeightMapComposer(row.heightmap));
    session.sendPacket(new FloorHeightMapComposer(heightMap.getRelativeMap()));
    session.sendPacket(new UsersComposer(session.player.avatar));
    session.sendPacket(new ObjectsComposer());
    session.sendPacket(new ItemsComposer());
    session.sendPacket(new UserUpdateComposer(avatars));
    session.sendPacket(new RoomEntryInfoComposer());
    session.sendPacket(new RoomVisualizationSettingsComposer());
}

/**
 * @interface
 * @type {getRoomEntryData}
 */
module.exports.handle = getRoomEntryData;

/**
 * @interface
 * @type {Number}
 */
module.exports.serial = incoming.getRoomEntryDataMessageEvent;