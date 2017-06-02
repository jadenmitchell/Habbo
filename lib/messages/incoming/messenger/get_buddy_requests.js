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
const BuddyRequestsComposer = require('../../outgoing/messenger/buddy_requests');

function getUserFlatCats(session, packet) {
    const players = [];
    players[0] = {
        id: 2,
        username: 'Josh',
        figure: 'hr-170-34.ha-1002-62.lg-3391-81-80.sh-290-62.hd-205-8.ch-3342-1189-1189'
    };

    session.sendPacket(new BuddyRequestsComposer(players));
}

/**
 * @interface
 * @type {getUserFlatCats}
 */
module.exports.handle = getUserFlatCats;

/**
 * @interface
 * @type {Number}
 */
module.exports.serial = incoming.getUserFlatCatsMessageEvent;