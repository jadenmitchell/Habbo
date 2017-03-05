const Incoming = require('./../incoming');
const IncomingPacket = require('./../incoming_packet');

async function versionCheck(session, packet) {
    const version = packet.readString();
    console.log(version);
}

/**
 * @interface
 * @type {versionCheck}
 */
module.exports.handle = versionCheck;

/**
 * @interface
 * @type {Number}
 */
module.exports.serial = Incoming.VersionCheckMessageEvent;