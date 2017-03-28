const Incoming = require('./../incoming');
const MessengerInitComposer = require('../../outgoing/messenger/messenger_init');

function messengerInit(session, packet) {
    session.sendPacket(new MessengerInitComposer());
}

/**
 * @interface
 * @type {messengerInit}
 */
module.exports.handle = messengerInit;

/**
 * @interface
 * @type {Number}
 */
module.exports.serial = Incoming.MessengerInitMessageEvent;