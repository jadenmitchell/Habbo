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

const async = require('async');
const RoomAvatar = require('../rooms/room_avatar');

class Player {
    constructor(session, user) {
        this._session = session;
        this._avatar = new RoomAvatar(this);

        async.eachOf(user.dataValues, (value, key) => {
            this[key] = value;
        });
    }

    get session() {
        return this._session;
    }

    get avatar() {
        return this._avatar;
    }
}

module.exports = Player;