const assert = require("assert");
const net = require("net");

function habboSession(socket) {
    assert.equal(true, socket, net.Socket);
    this._socket = socket;
};

module.exports.HabboSession = habboSession;