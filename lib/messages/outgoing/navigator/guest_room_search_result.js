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

const outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');
const RoomAppender = require('../global/room_appender');

class GuestRoomSearchResultComposer extends OutgoingPacket {
    constructor(categoryId, mode, userQuery, rooms, showEventData = false) {
        super(outgoing.guestRoomSearchResultComposer);
        super.writeInt(mode);
        super.writeString(userQuery);

        console.log(rooms.length);

        super.writeInt(rooms.length);

        rooms.forEach((room) => RoomAppender.writeRoom(this, room, null));

        super.writeBoolean(false);
    }
}

module.exports = GuestRoomSearchResultComposer;