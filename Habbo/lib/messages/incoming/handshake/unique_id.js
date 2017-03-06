const Incoming = require('./../incoming');

function uniqueID(session, packet) {
    //const junk = packet.readString();
    //const machineId = packet.readString();
}

/**d
 * @interface
 * @type {uniqueID}
 */
module.exports.handle = uniqueID;

/**
 * @interface
 * @type {Number}
 */
module.exports.serial = Incoming.UniqueIDMessageEvent;