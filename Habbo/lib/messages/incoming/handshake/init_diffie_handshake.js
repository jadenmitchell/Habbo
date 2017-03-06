const Incoming = require('./../incoming');
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
module.exports.serial = Incoming.InitDiffieHandshakeMessageEvent;