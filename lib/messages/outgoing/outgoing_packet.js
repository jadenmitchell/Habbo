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

const logger = require('../../logger');
const Packet = require('../packet');
const ByteBuf = require('../../network/bytebuf');

class OutgoingPacket extends Packet {
    constructor(header) {
        super(header, 0, new ByteBuf(Buffer.alloc(0)));
        this._buffer.writer();
        this._buffer.writeShort(header);
    }

    /**
     * Write a boolean to the packet buffer.
     *
     * @this {OutgoingPacket}
     * @param value bool, byte, or integer value
     */
    writeBoolean(value) {
        this._buffer.writeByte(Buffer.from(String.fromCharCode(value)));
    }

    /**
     * Write an integer to the packet buffer.
     *
     * @this {OutgoingPacket}
     * @param value signed integer value to write.
     */
    writeInt(value) {
        this._buffer.writeInt(value);
    }

    /**
     * Write an unsigned integer to the packet buffer.
     *
     * @this {OutgoingPacket}
     * @param value unsigned integer value to write.
     */
    writeUInt(value) {
        this._buffer.writeUInt(value);
    }

    /**
     * Write a short to the packet buffer.
     *
     * @this {OutgoingPacket}
     * @param value short value to write.
     */
    writeShort(value) {
        this._buffer.writeShort(value);
    }

    /**
     * Write a string to the packet buffer.
     *
     * @this {OutgoingPacket}
     * @param value string value to write.
     */
    writeString(value) {
        const buf = Buffer.alloc(value.length + 2);
        buf.writeInt16BE(value.length, 0);
        buf.write(value, 2);
        this._buffer.writeBytes(buf);
    }

    /**
     * Wrap the length, header, and body in one buffer.
     *
     * @this {OutgoingPacket}
     */
    wrap() {
        this._buffer.resetIndex();
        this._buffer.writeInt(this._buffer.length);
        return this._buffer.source;
    }

    /**
     * Better practice calls for using an instance method
     * to handle outgoing msgs.
     *
     * constructors = possible corruption and lack of testability.
     *
     * @this {OutgoingPacket}
     */
    compose() {
        logger.warn(`No functionality for ${this.constructor.name}.compose() implemented.`);
    }
}

module.exports = OutgoingPacket;