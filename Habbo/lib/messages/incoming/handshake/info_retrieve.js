const Incoming = require('./../incoming');
const UserObjectComposer = require('../../outgoing/handshake/user_object');

function infoRetrieve(session, packet) {
    session.sendPacket(new UserObjectComposer(session.player));
}

/**
 * @interface
 * @type {infoRetrieve}
 */
module.exports.handle = infoRetrieve;

/**
 * @interface
 * @type {Number}
 */
module.exports.serial = Incoming.InfoRetrieveMessageEvent;