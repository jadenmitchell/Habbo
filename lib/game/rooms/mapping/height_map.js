/**
 * Copyright 2016 Jaden M.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const RoomTileState = require('./room_tile_state');

function HeightMap(row) {
    this.name = row.name;
    this.doorX = row.door_x;
    this.doorY = row.door_y;
    this.doorDirection = row.door_dir;
    this.heightmap = row.heightmap;
    this.parse();
}

HeightMap.prototype.parse = function () {
    var modelTemp = this.heightmap.split("\r");
    this.mapSize = 0;
    this.mapSizeX = modelTemp[0].length;
    this.mapSizeY = modelTemp.length;
    this.squareHeights = new Array();
    this.squareStates = new Array();
    for (var i = 0; i < this.mapSizeX; i++) {
        this.squareHeights[i] = new Array();
        this.squareStates[i] = new Array();
    }
    var x;
    var Square;
    var height;
    for (var y = 0; y < this.mapSizeY; y++) {
        if (modelTemp[y].length == 0 || modelTemp[y] == "\r")
            continue;
        if (y > 0) {
            modelTemp[y] = modelTemp[y].substring(1);
        }
        for (x = 0; x < this.mapSizeX; x++) {
            if (modelTemp[y].length != this.mapSizeX)
                break;
            Square = modelTemp[y].substring(x, x + 1).trim().toLowerCase();
            if (Square == "x") {
                this.squareStates[x][y] = RoomTileState.BLOCKED;
                this.mapSize += 1;
            }
            else {
                if (Square.length == 0) {
                    height = 0;
                }
                else if (!isNaN(parseFloat(Square))) {
                    height = parseInt(Square);
                }
                else {
                    height = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(Square.toUpperCase());
                }
                this.squareStates[x][y] = RoomTileState.OPEN;
                this.squareHeights[x][y] = height;
                this.mapSize += 1;
                if (this.heighestPoint < height) {
                    this.heighestPoint = height;
                }
            }
        }
    }
};

HeightMap.prototype.getHeightAtSquare = function (x, y) {
    if (x < 0 || y < 0 || x >= this.getMapSizeX() || y >= this.getMapSizeY())
        return 0;
    return this.squareHeights[x][y];
};
HeightMap.prototype.getName = function () {
    return this.name;
};
HeightMap.prototype.getMapSize = function () {
    return this.mapSize;
};
HeightMap.prototype.getMapSizeX = function () {
    return this.mapSizeX;
};
HeightMap.prototype.getMapSizeY = function () {
    return this.mapSizeY;
};
HeightMap.prototype.getDoorX = function () {
    return this.doorX;
};
HeightMap.prototype.getDoorY = function () {
    return this.doorY;
};
HeightMap.prototype.getDoorZ = function () {
    return this.doorZ;
};
HeightMap.prototype.getDoorDirection = function () {
    return this.doorDirection;
};
HeightMap.prototype.getSquareStates = function () {
    return this.squareStates;
};
HeightMap.prototype.getSquareHeights = function () {
    return this.squareHeights;
};
HeightMap.prototype.getRelativeMap = function () {
    var heightmap = this.heightmap;
    for (var i = 0; i < 50; i++) {
        heightmap = heightmap.replace("\r\n", "\r");
    }
    return heightmap;
};

module.exports = HeightMap;