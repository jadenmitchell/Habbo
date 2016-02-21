var BufferStream = require('./BufferStream');

function Response(header) {
    this.buffer = buffer;
    this.stream = new BufferStream(buffer);
    this.header = header;
    this.finalized = false;
}

Request.prototype = {
    writeString : function(val) {
        this.stream.writeString(val);
    }

    writeInt : function(val) {
        this.stream.writeInt(val);
    }

    writeShort : function(val) {
        this.stream.writeShort(val);
    },

    getBuffer : function () {
        if (!this.finalized) {
            this.stream.wrap(this.header);
            this.finalized = true;
        }

        return this.buffer;
    }
};

module.exports = Request;