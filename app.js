var logger = require('./lib/logger'),
    Network = require('./lib/Network'),
    network;

network = new Network(3001);
network.invokeTcpServer();

logger.info("Networking server is listening on 3001");