var logger = require('../logger'),
    BufferStream = require('./BufferStream');

function Request(buffer) {
    this.buffer = buffer;
    this.stream = new BufferStream(buffer);
    this.setRemainingBytes();
}

Request.prototype = {
    setRemainingBytes : function () {
        this.length = this.stream.readInt();
        this.header = this.stream.readShort();

        if (this.length < 6) {
            // TODO: Handle corrupt packet data.
        }
    }
};

module.exports = Request;