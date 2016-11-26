const Incoming = require('./../incoming');
const Encryption = require('../../../encryption/habbo_encryption');
const InitDiffieHandshakeComposer = require('../../outgoing/handshake/init_diffie_handshake');

async function initCrypto(session, packet) {
    const prime = Encryption.getRsaStringEncrypted(Encryption.Prime);
    const generator = Encryption.getRsaStringEncrypted(Encryption.Generator);
    session.sendPacket(new InitDiffieHandshakeComposer(prime, generator));
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