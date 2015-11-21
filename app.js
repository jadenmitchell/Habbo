var Server = require('./src/Server');
var mysql = require('mysql');
var Pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'habbo_db',
    debug    :  false
});

var server = new Server(3000);

global.Environment = {
    getPool : function() {
        return Pool;
    },

    getConnection : function() {
        return server;
    }
};