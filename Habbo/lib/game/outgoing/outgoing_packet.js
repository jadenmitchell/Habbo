const Packet = require('../packet');

class OutgoingPacket extends Packet {
    constructor(header) {
        super(header, 0, null);
        this._buffer.writeInt(0);
        this._buffer.writeShort(header);
        this._finalized = false;
    }

    writeBoolean(value) {
        this._buffer.writeByte(+value);
    }

    writeInt(value) {
        this._buffer.writeInt(value);
    }

    writeUInt(value) {
        this._buffer.writeUInt(value);
    }

    writeShort(value) {
        this._buffer.writeShort(value);
    }

    writeString(value) {
        const buf = new Buffer(value.length + 2);
        this._buffer.writeShort(value.length);
        this._buffer.writeBytes(buf);
    }

    wrap() {
        const buf = new Buffer(this._buffer.source);
    }
}

module.exports = OutgoingPacket;