const logger = require('../../common/logger');
const Packet = require('../packet');
const ByteBuf = require('../../bytebuf');

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