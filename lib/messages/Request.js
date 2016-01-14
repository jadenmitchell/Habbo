var BufferStream = require('./BufferStream');

function Request(buffer) {
    this.buffer = buffer;
    this.stream = new BufferStream(buffer);
    this.setRemainingBytes();
}

Request.prototype = {
    readBytes : function (amount) {
        return this.stream.readBytes(amount);
    },

    setRemainingBytes : function () {
        this.length = this.stream.readInt();
        this.header = this.stream.readShort();

        if (this.length < 6) {
            this.corrupt = true;
        }
    }
};

module.exports = Request;