const Packet = require('../packet');
const ByteBuf = require('../../bytebuf');

class OutgoingPacket extends Packet {
    constructor(header) {
        super(header, 0, new ByteBuf(Buffer.alloc(2)));
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
        const buf = new Buffer(value.length);
        this._buffer.writeShort(value.length);
        this._buffer.writeBytes(buf);
    }

    wrap() {
        if (!this._finalized) {
            const buf = new Buffer.alloc(4);
            buf.writeInt32BE(this.length, 0);
            const obj = new ByteBuf(Buffer.concat([buf, this._buffer.source]));
            this._buffer._destroy();
            this._finalized = obj;
            console.log(obj.readInt());
            Object.freeze(this._finalized);
            return obj.source;
        }
        
        return this._finalized.source;
    }
}

module.exports = OutgoingPacket;