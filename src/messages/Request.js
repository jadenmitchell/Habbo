var BufferStream = require('./BufferStream');

function Request(buffer) {
    this.buffer = buffer;
    this.stream = new BufferStream(buffer);

    this.setRemainingBytes();
}

Request.prototype.readBytes = function (amount) {
    var data = new Buffer(amount);

    for (var i = 0; i < amount; i++) {
        data[i] = this.buffer[this.pointer++];
    }

    return data;
};

Request.prototype.readInt = function () {
    return this.stream.readInt();
};

Request.prototype.readUInt = function () {
    return this.stream.readUInt();
};

Request.prototype.readShort = function () {
    return this.stream.readShort();
};

Request.prototype.readString = function () {
    return this.stream.readString();
};

Request.prototype.setRemainingBytes = function () {
    this.length = this.stream.readInt();
    this.header = this.stream.readShort();

    var buff = this.readBytes(this.length - 2);

    this.remain = 0;

    if (this.pointer < this.buffer.length) {
        this.remain = this.readBytes(this.buffer.length);
        //this.remain = this.readBytes((this.buffer.length, this.pointer));
    }

    console.log("HEADER: " + this.header + " Length: " + this.length + " Remaining Bytes: " + this.remain);

    this.buffer = buff;
    this.pointer = 0;
};

module.exports = Request;
