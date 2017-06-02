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

const outgoing = require('../../outgoing');
const OutgoingPacket = require('../../outgoing_packet');
const RoomAvatar = require('../../../../game/rooms/room_avatar');

class UsersComposer extends OutgoingPacket {
    constructor(avatars) {
        super(outgoing.usersMessageComposer);

        if (avatars instanceof RoomAvatar) {
            super.writeInt(1);
            this.writeAvatar(avatars);
            return;
        }

        super.writeInt(avatars.length);
        avatars.forEach((avatar) => this.writeAvatar(avatar));
    }

    writeAvatar(avatar) {
        super.writeInt(avatar.player.id);
        super.writeString(avatar.player.username);
        super.writeString(avatar.player.motto);
        super.writeString(avatar.player.figure);
        super.writeInt(avatar.player.id);
        super.writeInt(avatar.position.x);
        super.writeInt(avatar.position.y);
        super.writeString(avatar.position.z);
        super.writeInt(1);
        super.writeInt(1);
        super.writeString('m');
        super.writeInt(0);
        super.writeInt(0);
        super.writeString('');
        super.writeString('');
        super.writeInt(0);
    }
}

module.exports = UsersComposer;