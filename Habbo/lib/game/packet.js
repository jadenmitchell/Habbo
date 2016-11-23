const assert = require('assert');
const ByteBuf = require('../bytebuf');

/**
 * @export @final
 */
class Packet {
    constructor(header, length, buffer) {
        assert(buffer instanceof ByteBuf, 'Buffer must be an instance of ByteBuf!');
        this._header = header;
        this._length = length;
        this._buffer = buffer == null ? new ByteBuf(Buffer.allocUnsafeSlow(6)) : buffer;
    }

    /**
     * Packet header
     * @this {Packet}
     * @returns {number}
     */
    get header() {
        return this._header;
    }

    /**
     * Packet length
     * @this {Packet}
     * @returns {number}
     */
    get length() {
        return this._length;
    }

    /**
     * Is the packet buffer corrupt?
     * @this {Packet}
     * @returns {boolean}
     */
    isCorrupt() {
        return (!this._buffer.readable || this._buffer.length < 6);
    }
}

module.exports = Packet;