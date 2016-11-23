const Incoming = require('./../incoming');
const IncomingPacket = require('./../incoming_packet');
const HCrypto = require('../../../encryption/habbo_encryption');

async function initCrypto(session, packet) {
    const prime = HCrypto.getRsaStringEncrypted(HCrypto.Prime);
    const generator = HCrypto.getRsaStringEncrypted(HCrypto.Generator);
    console.log(prime);
    console.log(generator);
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