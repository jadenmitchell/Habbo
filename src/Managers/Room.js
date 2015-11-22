function Room() {
    this.models = Room.getModels();
    this.rooms = [];
}

Room.getModels = function () {
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

Room.prototype.getRoom = function (room) {
    return this.rooms[room];
};

Room.prototype.getModel = function (name) {
    return this.models[name];
}

Room.prototype.onCycle = function () {
    setTimeout(function () {
        onCycle();
    }, 10000);
};
