const Incoming = require('./../incoming');
const HabboBroadcastComposer = require('../../outgoing/notifications/habbo_broadcast');

async function tryLogin(session, packet) {
    const ssoTicket = packet.readString();

    if (!session.tryLogin(ssoTicket))
        session.sendPacket(new HabboBroadcastComposer('There was an error while logging you in.'));
}

/**d
 * @interface
 * @type {tryLogin}
 */
module.exports.handle = tryLogin;

/**
 * @interface
 * @type {Number}
 */
module.exports.serial = Incoming.SSOTicketMessageEvent;