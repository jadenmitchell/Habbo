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

const assert = require('assert');
const ByteBuf = require('../network/bytebuf');

/**
 * @export @final
 */
class Packet {
    constructor(header, length, buffer) {
        assert(buffer instanceof ByteBuf, 'Buffer must be an instance of ByteBuf!');
        this._header = header;
        this._length = length;
        this._buffer = buffer;
    }

    /**
     * Packet header.
     * 
     * @this {Packet}
     * @returns {number}
     */
    get header() {
        return this._header;
    }

    /**
     * Packet length.
     * 
     * @this {Packet}
     * @returns {number}
     */
    get length() {
        return this._length;
    }

    /**
     * Set the packet length.
     *
     * @this {Packet}
     */
    set length(value) {
        this._length = value;
    }

    /**
     * Is the packet buffer corrupt?
     * 
     * @this {Packet}
     * @returns {boolean}
     */
    isCorrupt() {
        return (!this._buffer.readable || this._buffer.length < 6);
    }
}

module.exports = Packet;