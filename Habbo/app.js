'use strict';

const packetInfo = require('./lib/game/packet_info');
const server = require('./lib/server');

packetInfo.loadPacketHandlers();
const tcpServer = new server(3001, 10);
tcpServer.listen();