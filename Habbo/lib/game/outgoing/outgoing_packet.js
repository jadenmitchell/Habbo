const Packet = require('../packet');
const ByteBuf = require('../../bytebuf');

class OutgoingPacket extends Packet {
    constructor(header) {
        super(header, 0, new ByteBuf(new Buffer(0)));
        this._buffer.writeInt(0);
        this._buffer.writeShort(header);
        console.log(this._buffer.source);
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
        const buf = new Buffer(value.length);
        this._buffer.writeShort(value.length);
        this._buffer.writeBytes(buf);
    }

    wrap() {
        let buf = new Buffer.alloc(4);
        buf.writeInt32BE(this._buffer.length);
        let buf2 = this._buffer.source.slice(5);
        buf = Buffer.concat([buf, buf2]);
        console.log(buf);
        this._finalized = true;
        return buf;
    }
}

module.exports = OutgoingPacket;