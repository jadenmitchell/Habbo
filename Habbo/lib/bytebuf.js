const stream = require('stream');

/**
 * A more complex Node.js buffering class for easily
 * reading and writing bytes of data to a stream.
 * @export @final
 * @extends {stream.Duplex}
 */
class ByteBuf extends stream.Duplex {
    /**
     * Create a duplex stream for our buffer.
     * @param source network buffer
     */
    constructor(source) {
        if (!Buffer.isBuffer(source)) {
            throw (new Error('Source must be a valid Buffer!'));
        }

        super();

        this._source = source;
        this._length = source.length;
        this._offset = 0;

        this.on('end', this._destroy);
    }

    /**
     * The length of the buffer
     * @this {ByteBuf}
     * @returns {number}
     */
    get length() {
        return this._length;
    }

    /**
     * The reader/writer offset
     * @this {ByteBuf}
     * @returns {number}
     */
    get index() {
        return this._offset;
    }

    /**
     * Dispose/null the stream and the variables defined in
     * this class.
     * @this {ByteBuf}
     * @private
     */
    _destroy() {
        this._source = null;
        this._length = null;
        this._offset = null;
    }

    /**
     * Pull data from the internal buffer.
     * @param size specify how much data to read
     * @private
     */
    _read(size) {
        if (this._offset < this._length) {
            this.push(this._source.slice(this._offset, (this._offset + 1)));
            this._offset++;
        }

        if (this._offset >= this._length) {
            this.push(null);
        }
    }

    /**
     * Write data to the stream.
     * @param chunk data to be written
     * @param encoding encoding if chuck is a string
     * @param callback callback when the chunk of data is flushed
     * @private
     */
    _write(chunk, encoding, callback) {
        // The underlying source only deals with strings
        if (Buffer.isBuffer(chunk))
            chunk = chunk.toString();
        // do something with the data.
        callback();
    }

    /**
     * Resets the reader/writer offset to 0.
     * @this {ByteBuf}
     */
    resetIndex() {
        this._offset = 0;
    }

    /**
     * Increments the reader/writer offset.
     * @this {ByteBuf}
     * @param size amount of bytes to skip over
     */
    incrementIndex(size) {
        this._offset += size;
    }

    /**
     * Decrements the reader/writer offset.
     * @this {ByteBuf}
     * @param size amount of bytes to jump back
     */
    decrementIndex(size) {
        this.incrementIndex(-size);
    }

    /**
     * Read a byte from the source buffer.
     * @this {ByteBuf}
     * @returns {Number|number} byte in form of a char code
     */
    readByte() {
        return this.read(1)[0];
    }

    /**
     * Read a 32-bit integer from the source buffer.
     * @this {ByteBuf}
     * @returns {Number|number} 4 bytes in the form of a signed integer
     */
    readInt() {
        return this.read(4).readInt32BE();
    }

    /**
     * Reads a 32-bit unsigned integer from the source buffer.
     * @this {ByteBuf}
     * @returns {Number|number} 4 bytes in the form of a unsigned (positive) integer
     */
    readUInt() {
        return this.read(4).readUInt32BE();
    }

    /**
     * Reads a 16-bit short from the source buffer.
     * @this {ByteBuf}
     * @returns {Number|number} 2 bytes in the form of a short
     */
    readShort() {
        return this.read(2).readInt16BE();
    }

    /**
     * Reads x amount of bytes from the source buffer.
     * @this {ByteBuf}
     * @param size the amount of bytes to read
     * @returns {Buffer}
     */
    readBytes(size) {
        return this.read(size);
    }

    /**
     * Read the rest of the source buffer from the reader index.
     * @this {ByteBuf}
     * @returns {Buffer} bytes that are left in the buffer
     */
    readToEnd() {
        return this.read(this._length - this._offset);
    }

    writeByte(value) {
        // todo.
    }
}

module.exports = ByteBuf;