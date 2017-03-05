const Incoming = require('./../incoming');
const HabboEncryption = require('../../../encryption/habbo_encryption');
const CompleteDiffieHandshakeComposer = require('../../outgoing/handshake/complete_diffie_handshake');
const BigInteger = require('jsbn').BigInteger;

async function generateSecretKey(session, packet) {
    const cipherPublicKey = packet.readString();
    const sharedKey = HabboEncryption.calculateDiffieHellmanSharedKey(cipherPublicKey);
    
    if (sharedKey.equals(BigInteger.ZERO)) {
        return;
    }
    
    session.enableRC4(sharedKey.toByteArray());
    session.sendPacket(new CompleteDiffieHandshakeComposer(HabboEncryption.PublicKey.toString()));
}

/**
 * @interface
 * @type {generateSecretKey}
 */
module.exports.handle = generateSecretKey;

/**
 * @interface
 * @type {Number}
 */
module.exports.serial = Incoming.CompleteDiffieHandshakeMessageEvent;