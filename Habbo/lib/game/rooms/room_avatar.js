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

const OpenConnectionComposer = require('../../messages/outgoing/room/session/open_connection');
const RoomReadyComposer = require('../../messages/outgoing/room/session/room_ready');
const RoomRatingComposer = require('../../messages/outgoing/navigator/room_rating');

class RoomAvatar {
    constructor(player) {
        this._player = player;
    }

    prepareRoom(roomId, password = '', ignoreAuth = false) {
        this._player.session.sendPacket(new OpenConnectionComposer());
        this._player.session.sendPacket(new RoomReadyComposer(1, 'model_a'));
        this._player.session.sendPacket(new RoomRatingComposer(-1));
    }
}

module.exports = RoomAvatar;