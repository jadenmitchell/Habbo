const Incoming = require('./../../incoming');
const FurnitureAliasesComposer = require('../../../outgoing/room/engine/furniture_aliases');

function getFurniAliases(session, packet) {
    session.sendPacket(new FurnitureAliasesComposer());
}

/**
 * @interface
 * @type {getFurniAliases}
 */
module.exports.handle = getFurniAliases;

/**
 * @interface
 * @type {Number}
 */
module.exports.serial = Incoming.GetFurnitureAliasesMessageEvent;