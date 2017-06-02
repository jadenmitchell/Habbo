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

class RoomAppender {
    static writeRoom(packet, room, promotion = null) {
        console.log(room);
        packet.writeInt(room.id);
        packet.writeString(room.name);
        packet.writeBoolean(true);
        packet.writeInt(room.ownerId);
        packet.writeString(room.ownerName);
        packet.writeInt(0);
        packet.writeInt(1); // users now
        packet.writeInt(10); // max users
        packet.writeString(room.description);
        packet.writeInt(0);
        packet.writeInt(2); // can trade
        packet.writeInt(0); // score
        packet.writeInt(0);
        packet.writeInt(room.categoryId);
        packet.writeInt(0);
        packet.writeString('');
        packet.writeString('');
        packet.writeString('');
        packet.writeInt(0); // tag count

        // tags

        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeBoolean(false);
        packet.writeBoolean(false);
        packet.writeInt(promotion != null ? 1 : 0);
        packet.writeString(promotion != null ? promotion.name : '');
        packet.writeString(promotion != null ? promotion.description : '');
        packet.writeInt(promotion != null ? promotion.minutesLeft : 0);
    }
}

module.exports = RoomAppender;