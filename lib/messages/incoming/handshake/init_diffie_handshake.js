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
const HabboEncryption = require('../../../encryption/habbo_encryption');
const InitDiffieHandshakeComposer = require('../../outgoing/handshake/init_diffie_handshake');

function initCrypto(session, packet) {
    const token = '9875802655200380'; // HabboEncryption.getRsaStringEncrypted(Encryption.Prime);
    session.sendPacket(new InitDiffieHandshakeComposer(token));
}

/**
 * @interface
 * @type {initCrypto}
 */
module.exports.handle = initCrypto;

/**
 * @interface
 * @type {Number}
 */
module.exports.serial = incoming.initDiffieHandshakeMessageEvent;