'use strict';
var logger = require('./logger'),
    models = require('./models'),
    Stopwatch = require('node-stopwatch').Stopwatch;

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