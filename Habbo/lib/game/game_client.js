﻿const assert = require('assert');
const logger = require('../common/logger');
const packets = require('./packets');
const IncomingPacket = require('./incoming/incoming_packet');
const OutgoingPacket = require('./outgoing/outgoing_packet');

class GameClient {
    constructor(socket) {
        this._socket = socket;
    }

    async sendPacket(packet) {
        assert(packet instanceof OutgoingPacket);
        this._socket.write(packet.wrap());
    }

    async handlePacket(buffer) {
        const delimiter = String.fromCharCode(buffer.readByte());
        await buffer.resetIndex();

        if (delimiter === '<') {
            this._socket.write('<?xml version="1.0"?>\r\n' +
                '<!DOCTYPE cross-domain-policy SYSTEM "/xml/dtds/cross-domain-policy.dtd">\r\n' +
                '<cross-domain-policy>\r\n' +
                '<allow-access-from domain="*" to-ports="1-31111" />\r\n' +
                '</cross-domain-policy>\0');
            this._socket.destroy();
            return;
        }

        const length = buffer.readInt();
        if (length > 5120 && (length >> 24 != 60)) {
            this._socket.destroy();
            return;
        }

        const header = buffer.readShort();
        const packet = new IncomingPacket(header, length, buffer);
        if (packet.isCorrupt()) {
            logger.debug('Corrupted packet: %s', packet.header);
            return;
        }

        const handler = packets(packet.header);
        if (handler === undefined) {
            logger.debug('Unhandled packet: %s', packet.header);
            return;
        }

        logger.debug('Incoming packet: %s', handler.name);
        await handler(this, packet);
    }
}

module.exports = GameClient;