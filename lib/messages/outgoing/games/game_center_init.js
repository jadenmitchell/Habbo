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

class GameCenterInitComposer extends OutgoingPacket {
    constructor(imageUrl) {
        super(outgoing.gameCenterInitComposer);
        super.writeInt(1); // game count

        // loop
        super.writeInt(0);
        super.writeString('snowwar');
        super.writeString('93d4f3');
        super.writeString('');
        super.writeString(imageUrl);
        super.writeString('');
    }
}

module.exports = GameCenterInitComposer;