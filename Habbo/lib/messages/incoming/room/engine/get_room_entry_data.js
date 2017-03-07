const Incoming = require('./../../incoming');
const HeightMapComposer = require('../../../outgoing/room/engine/height_map');

function getRoomEntryData(session, packet) {
    session.sendPacket(new HeightMapComposer('xxxxxxxxxxxx\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxxxxxxxxxx\r\nxxxxxxxxxxxx'));
    //HeightMapComposer
    //FloorHeightMapComposer
    //RoomEntryInfoComposer
    //RoomVisualizationSettingsComposer
}

/**
 * @interface
 * @type {getRoomEntryData}
 */
module.exports.handle = getRoomEntryData;

/**
 * @interface
 * @type {Number}
 */
module.exports.serial = Incoming.GetRoomEntryDataMessageEvent;