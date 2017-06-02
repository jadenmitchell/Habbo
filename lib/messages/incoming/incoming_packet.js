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

const Packet = require('../packet');

class IncomingPacket extends Packet {
    constructor(header, length, buffer) {
        super(header, length, buffer);
    }

    /**
     * Remaining amount of bytes.
     * 
     * @this {IncomingPacket}
     * @returns {number} length - offset
     */
    get remaining() {
        return this._buffer.length - this._buffer.index;
    }

    /**
     * Reads a boolean from the packet buffer.
     * 
     * @this {IncomingPacket}
     * @returns {boolean} true/1 or false/0
     */
    readBoolean() {
        return (this._buffer.readByte() == 1);
    }

    /**
     * Reads an integer from the packet buffer.
     * 
     * @this {IncomingPacket}
     * @returns {Number|number}
     */
    readInt() {
        return this._buffer.readInt();
    }

    /**
     * Reads an positive integer from the packet buffer.
     * 
     * @returns {Number|number}
     */
    readUInt() {
        return this._buffer.readUInt();
    }

    /**
     * Reads a short from the packet buffer.
     * 
     * @returns {Number|number}
     */
    readShort() {
        return this._buffer.readShort();
    }

    /**
     * Reads a string from the packet buffer.
     * 
     * @this {IncomingPacket}
     * @returns {string|String} AOB in the form of a string
     */
    readString() {
        const length = this._buffer.readShort();
        return this._buffer.readBytes(length).toString('utf-8');
    }
}

module.exports = IncomingPacket;