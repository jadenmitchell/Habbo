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