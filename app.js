var logger = require('./lib/logger'),
    //redis = require('redis'),
    //client = redis.createClient(),
    Database = require('./lib/Database').database,
    database,
    Network = require('./lib/Network'),
    network;

database = new Database();

network = new Network(3001);
network.invokeTcpServer();

logger.info("Networking server is listening on 3001");