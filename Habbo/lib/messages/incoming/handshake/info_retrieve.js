const Incoming = require('./../incoming');
const UserObjectComposer = require('../../outgoing/handshake/user_object');
const PerkAllowancesComposer = require('../../outgoing/handshake/perk_allowances');

function infoRetrieve(session, packet) {
    session.sendPacket(new UserObjectComposer(session.player));
    session.sendPacket(new PerkAllowancesComposer());
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