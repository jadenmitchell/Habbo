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

class UserObjectComposer extends OutgoingPacket {
    constructor(player) {
        super(outgoing.userObjectComposer);
        super.writeInt(player.id);
        super.writeString(player.username);
        super.writeString(player.figure);
        super.writeString(player.gender);
        super.writeString(player.motto);
        super.writeString('Jaden');
        super.writeBoolean(false);
        super.writeInt(3); //RespectPoints
        super.writeInt(3); //RespectPointsLeftPlayer
        super.writeInt(3); //RespectPointsLeftPet
        super.writeBoolean(true); // Friends stream active
        super.writeString(''); // last online?
        super.writeBoolean(false); // Can change name
        super.writeBoolean(false);
    }
}

module.exports = UserObjectComposer;