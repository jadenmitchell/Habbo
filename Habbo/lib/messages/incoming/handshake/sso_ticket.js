const Incoming = require('./../incoming');
const HabboBroadcastComposer = require('../../outgoing/notifications/habbo_broadcast');

function tryLogin(session, packet) {
    const ssoTicket = packet.readString();

    session.tryLogin(ssoTicket).catch((err) => {
        session.sendPacket(new HabboBroadcastComposer(err || 'There was an error while logging you in.'));
    });
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