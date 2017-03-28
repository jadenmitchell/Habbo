const Incoming = require('./../../incoming');
const HeightMap = require('../../../../game/rooms/mapping/height_map');
const HeightMapComposer = require('../../../outgoing/room/engine/height_map');
const FloorHeightMapComposer = require('../../../outgoing/room/engine/floor_height_map');
const RoomEntryInfoComposer = require('../../../outgoing/room/engine/room_entry_info');
const RoomVisualizationSettingsComposer = require('../../../outgoing/room/engine/room_visualization_settings');
const UsersComposer = require('../../../outgoing/room/engine/users');
const ObjectsComposer = require('../../../outgoing/room/engine/objects');
const ItemsComposer = require('../../../outgoing/room/engine/items');
const UserUpdateComposer = require('../../../outgoing/room/engine/user_update');

function getRoomEntryData(session, packet) {
    const row = {};
    row.name = 'model_a';
    row.door_x = 3;
    row.door_y = 5;
    row.door_z = 0;
    row.door_dir = 2;
    row.heightmap = 'xxxxxxxxxxxx\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxx00000000\r\nxxxxxxxxxxxx\r\nxxxxxxxxxxxx';
    const heightMap = new HeightMap(row);

    session.sendPacket(new HeightMapComposer(heightMap.getRelativeMap()));
    session.sendPacket(new FloorHeightMapComposer(heightMap.getRelativeMap()));
    session.sendPacket(new UsersComposer());
    session.sendPacket(new ObjectsComposer());
    session.sendPacket(new ItemsComposer());
    session.sendPacket(new UserUpdateComposer());
    session.sendPacket(new RoomEntryInfoComposer());
    session.sendPacket(new RoomVisualizationSettingsComposer());
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