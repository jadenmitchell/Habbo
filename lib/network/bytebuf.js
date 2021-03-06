﻿/**
 * Copyright 2016 Jaden M.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const stream = require('stream');

/**
 * A more complex Node.js buffering class for easily
 * reading and writing bytes of data to a stream.
 *
 * @author Jaden Mitchell
 * @export @final
 * @extends {stream.Duplex}
 */
class ByteBuf extends stream.Duplex {

    /**
     * Create a duplex stream for our buffer.
     *
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
     * The internal buffer.
     * 
     * @this {ByteBuf}
     * @returns {Buffer}
     */
    get source() {
        return this._source;
    }

    /**
     * The length of the buffer
     *
     * @this {ByteBuf}
     * @returns {number}
     */
    get length() {
        return this._length;
    }

    /**
     * The reader/writer offset
     * 
     * @this {ByteBuf}
     * @returns {number}
     */
    get index() {
        return this._offset;
    }

    /**
     * Convert a ByteBuf or Buffer object to an AOB.

     * @param {ByteBuf|Buffer} buffer the buffer to convert
     * @returns {Array} array of bytes.
     */
    static aob(source) {
        // assert source is Buffer or ByteBuf.
        const result = [];
        for (var i = 0; i < source.length; i++)
            result.push(source[i]);
        return result;
    }

    /**
     * Dispose of the stream and the variables defined in
     * this class.
     * 
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
     * 
     * @param size buffer size high watermark
     * @private
     */
    _read(size) {
        if (this._offset <= this._length) {
            this.push(this._source.slice(this._offset, (this._offset + 1)));
            this._offset++;
        }

        if (this._offset > this._length) {
            this.push(null);
        }
    }

    /**
     * Write data to the stream.
     * 
     * @param chunk data to be written
     * @param encoding encoding if chuck is a string
     * @param callback callback when the chunk of data is flushed
     * @private
     */
    _write(chunk, encoding, callback) {
        // The underlying source only deals with buffers
        if (!Buffer.isBuffer(chunk))
            chunk = new Buffer(chunk, encoding);

        chunk = Buffer.concat([chunk, this._source.slice(this._offset, this._length)]);
        this._source = Buffer.concat([this._source.slice(0, this._offset), chunk]);
        this._offset += chunk.length;
        
        this._length = this._source.length;

        callback();
    }

    /**
     * Resets the reader/writer offset to 0.
     * 
     * @this {ByteBuf}
     */
    resetIndex() {
        this._offset = 0;
    }

    /**
     * Increments the reader/writer offset.
     * 
     * @this {ByteBuf}
     * @param size amount of bytes to skip over
     */
    incrementIndex(size) {
        this._offset += size;
    }

    /**
     * Decrements the reader/writer offset.
     * 
     * @this {ByteBuf}
     * @param size amount of bytes to jump back
     */
    decrementIndex(size) {
        this.incrementIndex(-size);
    }

    /**
     * Configure the ByteBuf class for writing operations.
     * 
     * @this {ByteBuf}
     */
    writer() {
        this._offset = this.length;
    }

    /**
     * Reverses the data in the source buffer.
     *
     * @this {ByteBuf}
     */
    reverse() {
        Array.prototype.reverse.call(this._source);
        this._offset = 0;
    }

    /**
     * Read a byte from the source buffer.
     * 
     * @this {ByteBuf}
     * @returns {number} byte in form of a char code
     */
    readByte() {
        return this.read(1)[0];
    }

    /**
     * Read an integer from the source buffer.
     * 
     * @this {ByteBuf}
     * @returns {number} 4 bytes in the form of a signed integer
     */
    readInt() {
        return this.read(4).readInt32BE();
    }

    /**
     * Read an unsigned integer from the source buffer.
     * 
     * @this {ByteBuf}
     * @returns {number} 4 bytes in the form of a unsigned (positive) integer
     */
    readUInt() {
        return this.read(4).readUInt32BE();
    }

    /**
     * Read an short from the source buffer.
     * 
     * @this {ByteBuf}
     * @returns {number} 2 bytes in the form of a short
     */
    readShort() {
        return this.read(2).readInt16BE();
    }

    /**
     * Reads bytes from the source buffer.
     * 
     * @this {ByteBuf}
     * @param size the amount of bytes to read
     * @returns {Buffer}
     */
    readBytes(size) {
        return this.read(size);
    }

    /**
     * Read the rest of the source buffer from the reader index.
     * 
     * @this {ByteBuf}
     * @returns {Buffer} bytes that are left in the buffer
     */
    readToEnd() {
        return this.read(this._length - this._offset);
    }

    /**
     * Fill in the zero-filled buffer with another value.
     *
     * @this {ByteBuf}
     * @param value data to write
     * @param offset where to start filling
     * @param end where to stop filling
     * @param encoding value string encoding def 'utf8'
     */
    fill(value, offset, end, encoding) {
        if (!offset)
            offset = 0;
        if (!end)
            end = this._source.length;
        if (!encoding)
            encoding = null;

        this._source.fill(value, offset, end, encoding);
    }

    /**
     * Write a byte to the source buffer.
     * 
     * @this {ByteBuf}
     * @param value data to write
     */
    writeByte(value) {
        this.write(String.fromCharCode(value), 'utf-8');
    }

    /**
     * Write an integer to the source buffer.
     * 
     * @param value data to write
     */
    writeInt(value) {
        const buf = Buffer.alloc(4);
        buf.writeInt32BE(value);
        this.write(buf);
    }

    /**
     * Write an unsigned integer to the source buffer.
     * 
     * @param value data to write
     */
    writeUInt(value) {
        const buf = Buffer.alloc(4);
        buf.writeUInt32BE(value);
        this.write(buf);
    }

    /**
     * Write an short to the source buffer.
     * 
     * @param value data to write
     */
    writeShort(value) {
        const buf = Buffer.alloc(2);
        buf.writeInt16BE(value);
        this.write(buf);
    }

    /**
     * Write bytes to the source buffer.
     * 
     * @param value buffer to write
     */
    writeBytes(value) {
        this.write(value);
    }
}

module.exports = ByteBuf;