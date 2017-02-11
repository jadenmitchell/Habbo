'use strict';

const fileAsync = require('../common/file');
const logger = require('../common/logger');
const assert = require('assert');

/**
 * Packet list where the key is the header, and the
 * value is the packet event handler function.
 * 
 * @type {Array}
 */
const packets = [];

/**
 * Remove redundant and/or invalid files from the list.
 * Packet criteria requires certain file naming standards.
 * 
 * @param list files found in the directory
 * @returns {Array.<String>} filtered list
 */
function filterPacketFile(list) {
    return list.filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== 'incoming.js') && (file !== 'incoming_packet.js');
    });
}

/**
 * Get packet handler associated.
 *
 * @param header key for packets
 * @returns {function} packet handler
 * @exports
 */
function getPacketHandler(header) {
    return packets[header];
}

/**
 * Load packet handlers with reflection.
 * 
 * @exports
 */
async function loadPacketHandlers() {
    fileAsync.recursive('./lib/game/incoming',
        filterPacketFile,
        (err, results) => {
            // todo: better error handling for packet initialization.
            if (err) throw err;
            results.forEach((file) => {
                const eventHandler = require(file);
                if (eventHandler.serial && eventHandler.handle) {
                    assert.equal(typeof eventHandler.serial, 'number', 'Packet serial must be a number!');
                    assert.equal(typeof eventHandler.handle, 'function', 'Packet event handler must be a function!');

                    packets[eventHandler.serial] = eventHandler.handle;
                    logger.info('Registered packet event (%s)', eventHandler.handle.name);
                    // todo: allow own static function names using getOwnPropertyNames()
                    /*const properties = Object.getOwnPropertyNames(eventHandler);
                    properties.forEach((element) => {
                        console.log(element);
                    });*/
                }
            });
        });
}

module.exports = (header) => {
    if (header && !!packets.length) {
        return getPacketHandler(header);
    }

    // throw err:
    if (header)
        return false;

    loadPacketHandlers();
    return true;
};

module.exports.getPacketHandler = getPacketHandler;
module.exports.loadPacketHandlers = loadPacketHandlers;