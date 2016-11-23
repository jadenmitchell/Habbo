'use strict';

const fs = require('fs');
const path = require('path');
const logger = require('../common/logger');
const assert = require('assert');

/**
 * Packet list where the key is the header, and the
 * value is the packet event handler function.
 * @type {Array}
 */
const packets = [];

/**
 * Get a list of files in a directory and its subdirectories
 * using parallel and recursive file reading.
 * @param dir the directory we start searching in
 * @param filter exclude any files with certain name qualities
 * @param done the results, list of files by name
 */
function readFilesRecur(dir, filter, done) {
    let results = [];
    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        list = filter(list);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach((file) => {
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    readFilesRecur(file, filter, (err, res) => {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
}

/**
 * Remove redundant and/or invalid files from the list.
 * Packet criteria requires certain file naming standards.
 * @param list files found in the directory
 * @returns {Array.<String>} filtered list
 */
function filterPacketFile(list) {
    return list.filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== 'incoming.js') && (file !== 'incoming_packet.js');
    });
}

function getPacketHandlerAssoc(header) {
    return packets[header];
}

async function loadPacketHandlers() {
    readFilesRecur('./lib/game/incoming', filterPacketFile, (err, results) => {
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
                 /*
                 const properties = Object.getOwnPropertyNames(eventHandler);
                 properties.forEach((element) => {
                console.log(element);
            });*/
            }
        });
    });
}

module.exports.loadPacketHandlers = loadPacketHandlers;
module.exports.getPacketHandlerAssoc = getPacketHandlerAssoc;