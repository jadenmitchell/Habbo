'use strict';

const packetInfo = require('./lib/game/packet_info');
const TcpServer = require('./lib/server');

packetInfo.loadPacketHandlers();
const tcpServer = new TcpServer(3001, 10);
tcpServer.listen();