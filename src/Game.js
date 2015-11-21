function Game() { }

Game.prototype.initGameServer = function() {
    this.invokeGameLoop();
};

Game.prototype.invokeGameLoop = function() {
    // Run this before reset.
    this.onGameLoopFinished();

    // Re-invoke the game loop.
    setTimeout(function() {
        //this.invokeGameLoop();
    }, 10000);
};

Game.prototype.onGameLoopFinished = function() {
    console.log("0 Active Rooms, 0 Active Users, 0 Everything.");
};

Game.prototype.broadcast = function(data) {
    global.Environment.getConnection().getConnectedClients().forEach(function(socket){
        socket.write(data);
    });
};

module.exports = Game;
