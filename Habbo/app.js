"use strict";

const logger = require("./lib/logger.js");
const server = require("./lib/server.js");

let tcpServer = new server.TcpServer(3001, 100);

tcpServer.startListen();