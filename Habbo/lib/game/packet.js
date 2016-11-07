const stream = require("stream");

function request() {
};

function response(buff) {

};

function requestBufferCodecHandler(socket, buff) {
    // garbage data
    if (buff.length < 6) return;

    if (buff[0] == 60) {
        socket.write("<?xml version=\"1.0\"?>\r\n" +
            "<!DOCTYPE cross-domain-policy SYSTEM \"/xml/dtds/cross-domain-policy.dtd\">\r\n" +
            "<cross-domain-policy>\r\n" +
            "<allow-access-from domain=\"*\" to-ports=\"1-31111\" />\r\n" +
            "</cross-domain-policy>\0");
        return;
    }

    const bufferStream = new ReaderBufferStream(buff);
    const length = bufferStream.readInt();
    const header = bufferStream.readShort();
    const data = bufferStream.readToEnd();
};

function responsePipelineHandler(buff) {

};

class ReaderBufferStream extends stream.Readable {
    constructor(source) {
        if (!Buffer.isBuffer(source)) {
            throw (new Error("Source must be a buffer."));
        }

        stream.Readable.call(this);

        this._source = source;
        this._offset = 0;
        this._length = source.length;

        this.on("end", this._destroy);
    }

    _destroy() {
        this._source = null;
        this._offset = null;
        this._length = null;
    }

    readBytes(size) {
        if (this._offset < this._length) {
            this.push(this._source.slice(this._offset, (this._offset + size)));
            this._offset += size;
        }

        if (this._offset >= this._length) {
            this.push(null);
        }
    }

    readShort() {
        return this.read(2).readInt16BE();
    }

    readInt() {
        return this.read(4).readInt32BE();
    }

    readUInt() {
        return this.read(4).readInt32LE();
    }

    readString() {
        const length = this.read(2).readInt16BE();
        return this.read(length).toString("utf-8");
    }

    readToEnd() {
        return this.read(this._length - this._offset);
    }
};

module.exports.Request = request;
module.exports.Response = response;
module.exports.requestBufferCodecHandler = requestBufferCodecHandler;
module.exports.responsePipelineHandler = responsePipelineHandler;