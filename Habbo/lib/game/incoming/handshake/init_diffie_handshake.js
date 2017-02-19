const Incoming = require('./../incoming');
const Encryption = require('../../../encryption/habbo_encryption');
const InitDiffieHandshakeComposer = require('../../outgoing/handshake/init_diffie_handshake');

async function initCrypto(session, packet) {
    const token = Encryption.getRsaStringEncrypted(Encryption.Prime);
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