function Player(session) {
    this.session = session;

    console.log("<Player " + this.id + "> has joined the game.");
}

Player.tryLoad = function (sso, ipaddress) {
    global.Environment.getPool().getConnection(function (err, connection) {
        if (err) {
            connection.release();
            return;
        }

        var queryString = "SELECT * FROM users WHERE auth_ticket = " + sso + " LIMIT 1;";
        connection.query(queryString, function (err, rows) {
            connection.release();
            if (!err) {
                // rows[0].column
            }
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
};

Player.prototype.save = function () {
    global.Environment.getPool().getConnection(function (err, connection) {
        if (err) {
            connection.release();
            return;
        }

        var queryString = "UPDATE users SET id = " + Player.Id + " LIMIT 1;";
        connection.query(queryString, function (err, result) {
            connection.release();
            if (!err) {
                // Updated Sucessfully.
            }
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
};

module.exports = Player;
