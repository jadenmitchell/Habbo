/**
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

const net = require('net');
const client = new net.Socket();

client.connect(3001, '127.0.0.1', () => {
    console.log('Connected');
    const buffer = Buffer.alloc(6);
    buffer.writeInt32BE(6, 0);
    buffer.writeInt16BE(1525, 4);
    client.write(buffer);
});

client.on('data', (data) => {
    console.log('Received: ' + data);
    const buffer = Buffer.from(data);
    console.log(buffer);
    const length = buffer.readInt32BE(0);
    const header = buffer.readInt16BE(4);
    const strlen = buffer.readInt16BE(6);
    const str = [];
    
    for (let i = 0; i <= strlen; i++) {
        str[i] = buffer[8 + i];
    }

    const bool = buffer.readInt8(8 + strlen);

    console.log('header: ' + header + ' length: ' + length);
    console.log(Buffer.from(str).toString('utf-8'));
    console.log(bool);
    client.destroy(); // kill client after server's response
});

client.on('close', () => {
    console.log('Connection closed');
});