'use strict';

var config = require('../config'),
    logger = require('./logger'),
    Stopwatch = require('node-stopwatch').Stopwatch,
    Sequelize = require('sequelize');

var sequelize = new Sequelize(config.host, config.user, config.pass);
var models = require('./models')(sequelize);
var sw = Stopwatch.create();

function Database() {
    sw.start();
    models.sequelize.sync().then(function () {
        sw.stop();
        logger.info('Successfully booted the database connection ORM (' + sw.elapsedMilliseconds + ' ms)');
    });
}

// singleton
module.exports.database = Database;