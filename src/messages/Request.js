var BufferStream = require('./BufferStream');

function Request(buffer) {
    if (buffer[0] == 60) {
        return;
    }

    this.buffer = buffer;
    this.stream = new BufferStream(buffer);

    this.setRemainingBytes();
}

Request.prototype.readBytes = function(amount) {
    var data = new Buffer(amount);

    for (var i = 0; i < amount; i++) {
        data[i] = this.buffer[this.pointer++];
    }

    return data;
};

Request.prototype.readInt = function() {
    return this.stream.readInt();
};

Request.prototype.readUInt = function() {
    return this.stream.readUInt();
};

Request.prototype.readShort = function() {
    return this.stream.readShort();
};

Request.prototype.readString = function() {
    return this.stream.readString();
};

Request.prototype.setRemainingBytes = function() {
    this.length = this.stream.readInt();
    this.header = this.stream.readShort();

    console.log(this.header + " length: " + this.length);

    var buff = this.readBytes(this.length - 2);

    if (this.pointer < this.buffer.length) {
        this.remain = this.readBytes((this.buffer.length, this.pointer));
    }

    this.buffer = buff;
    this.pointer = 0;
};

module.exports = Request;
