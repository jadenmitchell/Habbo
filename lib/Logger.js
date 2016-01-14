var winston = require('winston'),
    fs = require('fs'),
    logDir = 'logs',
    env = process.env.NODE_ENV || 'development',
    logger;

winston.setLevels(winston.config.npm.levels);
winston.addColors(winston.config.npm.colors);

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

logger = new (winston.Logger)({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/HabboServer.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'logs/Habbo_Exceptions.log'
        })
    ]
});

module.exports = logger;