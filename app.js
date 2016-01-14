var logger = require('./lib/logger'),
    //redis = require('redis'),
    //client = redis.createClient(),
    Network = require('./lib/Network'),
    network;

network = new Network(3001);
network.invokeTcpServer();

logger.info("Networking server is listening on 3001");