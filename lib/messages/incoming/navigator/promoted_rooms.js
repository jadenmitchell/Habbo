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

const incoming = require('./../incoming');
const GuestRoomSearchResultComposer = require('../../outgoing/navigator/guest_room_search_result');

function promotedRooms(session, packet) {
    const something = packet.readInt();
    const categoryId = packet.readInt();

    const rooms = [];
    session.sendPacket(new GuestRoomSearchResultComposer(0, categoryId, '', rooms, true));
}

/**
 * @interface
 * @type {promotedRooms}
 */
module.exports.handle = promotedRooms;

/**
 * @interface
 * @type {Number}
 */
module.exports.serial = incoming.promotedRoomsEvent;