var stream = require('stream'),
    util = require('util');

function BufferStream(source) {
    if (!Buffer.isBuffer(source)) {
        throw(new Error("Source must be a buffer."));
    }

    stream.Readable.call(this);

    this._source = source;
    this._offset = 0;
    this._length = source.length;

    this.on("end", this._destroy);
}

util.inherits(BufferStream, stream.Readable);

BufferStream.prototype._destroy = function () {
    this._source = null;
    this._offset = null;
    this._length = null;
};

BufferStream.prototype.readBytes = function (size) {
    if (this._offset < this._length) {
        this.push(this._source.slice(this._offset, (this._offset + size)));
        this._offset += size;
    }

    if (this._offset >= this._length) {
        this.push(null);
    }
};

BufferStream.prototype._toString = function () {
    return this._source.toString();
};

BufferStream.prototype.readShort = function () {
    return this.read(2).readInt16BE();
};

BufferStream.prototype.readInt = function () {
    return this.read(4).readInt32BE();
};

BufferStream.prototype.readUInt = function () {
    return this.read(4).readInt32LE();
};

BufferStream.prototype.readString = function () {
    var length = this.read(2).readInt16BE();
    return this.read(length).toString("utf-8");
};

BufferStream.prototype.readToEnd = function () {
    return this.read(this._length - this._offset);
};

BufferStream.prototype.writeShort = function (val) {
    var buf = new Buffer(4);
    buf.writeInt32BE(val);
    var obj = new BufferStream(Buffer.concat([this._source, buf]));
    this._destroy();
    return obj;
};

BufferStream.prototype.writeInt = function (val) {
    var buf = new Buffer(4);
    buf.writeInt32BE(val);
    var obj = new BufferStream(Buffer.concat([this._source, buf]));
    this._destroy();
    return obj;
};

BufferStream.prototype.writeString = function (str) {
    var buf = new Buffer(str.length + 2);
    buf.writeInt16BE(str.length, 0);
    buf.write(str, 2);
    var obj = new BufferStream(Buffer.concat([this._source, buf]));
    this._destroy();
    return obj;
};

BufferStream.prototype.wrap = function (header) {
    var buf = new Buffer(this._source.length + 6);
    buf.writeInt32BE(this._source.length, 0);
    buf.writeInt16BE(header, 4);
    var obj = new BufferStream(Buffer.concat([buf, this._source]))
    this._destroy();
    return obj;
};

module.exports = BufferStream;