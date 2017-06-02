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
const HabboBroadcastComposer = require('../../outgoing/notifications/habbo_broadcast');

function tryLogin(session, packet) {
    const ssoTicket = packet.readString();

    session.tryLogin(ssoTicket).catch((err) => {
        session.sendPacket(new HabboBroadcastComposer(err || 'There was an error while logging you in.'));
    });
}

/**d
 * @interface
 * @type {tryLogin}
 */
module.exports.handle = tryLogin;

/**
 * @interface
 * @type {Number}
 */
module.exports.serial = incoming.ssoTicketMessageEvent;