var BufferStream = require('./BufferStream');

function Response(packet) {
    this.packet = packet;
    this.stream = new BufferStream(new Buffer(0));
}

Response.prototype.pushString = function(str) {
    this.stream.writeString(str);
};

Response.prototype.pushInt = function(val) {
    this.stream.writeInt(val);
};

Response.prototype.pushShort = function(val) {
    this.stream.writeShort(val);
};

Response.prototype.getBytes = function() {
    return this.stream.wrap(this.packet);
};

module.expots = Response;
