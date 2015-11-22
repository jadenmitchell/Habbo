var PF = require('pathfinding');

function Pathfinder() {
}

Pathfinder.getCoordinates = function (vector, room) {
    var finder = new PF.AStarFinder();
    var grid = PF.grid(0, 0);
    finder.findPath(vector.x, vector.y, grid);
};

Pathfinder.getVelocity = function () {

};
