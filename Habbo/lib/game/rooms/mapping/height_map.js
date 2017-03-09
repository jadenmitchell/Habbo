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

class HeightMap {
    constructor(heightMap) {
        heightMap = heightMap.split('\r\n');
        this._sizeX = heightMap[0].length;
        this._sizeY = heightMap.length;
        this._tileStates = [];
        this._floorHeight = [];

        for (let y = 0; y < this._sizeY; y++) {
            for (let x = 0; x < this._sizeX; x++) {
                const value = heightMap[y][x].toLowerCase();

                if (value === 'x') {
                    if (!this._tileStates[x])
                        this._tileStates[x] = [];
                    if (!this._floorHeight[x])
                        this._floorHeight[x] = [];

                    this._tileStates[x][y] = RoomTileState.Blocked;
                    this._floorHeight[x][y] = 0;

                    this._heightMap += 'x';
                }
                else {
                    if (!this._tileStates[x])
                        this._tileStates[x] = [];
                    if (!this._floorHeight[x])
                        this._floorHeight[x] = [];

                    const floorHeight = Number(value);

                    this._tileStates[x][y] = RoomTileState.Open;
                    this._floorHeight[x][y] = floorHeight;

                    this._heightMap += floorHeight;
                }
            }

            this._heightMap += String.fromCharCode(13);
        }

        this._relativeHeightMap = '';

        for (let y = 0; y < this._sizeY; y++) {
            for (let x = 0; x < this._sizeX; x++) {
                if (this._tileStates[x][y] === RoomTileState.Blocked) {
                    this._relativeHeightMap += 'x';
                    continue;
                }
                
                this._relativeHeightMap += this._floorHeight[x][y];
            }
        }
    }

    get relativeHeightMap() {
        return this._relativeHeightMap;
    }

    get tileStates() {
        return this._tileStates;
    }

    get floorHeight() {
        return this._floorHeight;
    }

    toString() {
        return this._heightMap;
    }
}

module.exports = HeightMap;