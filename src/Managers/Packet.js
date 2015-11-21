function Packet() {
    Packet.Packets = null;
}

Packet.execute = function(session, message) {
    //console.log("Unhandled packet: " + message.header);
    if (typeof Packet.Packets[message.header] == "undefined") {
        return;
    }

    //console.log("<" + session.getSocket().remoteAddress + "> Packet Header: " + message.header + " Packet Length: " + message.length);
    //console.log("<" + session.getSocket().remoteAddress + "> Executing packet: " + message.header);

    try {
        var Incoming = require('../messages/Handlers/' + Packet.Packets[message.header]);
        Incoming.Parse(session, message);
    }
    catch(err) {
        console.log("Unhandled Error: " + err.message + " - " + err.stack);
    }
};

Packet.define = function() {
    Packet.Packets = [];
    Packet.Packets[global.Incoming.ReleaseVersion] = "VersionCheck";
    Packet.Packets[global.Incoming.InitCryptoMessageEvent] = "InitCrypto";
    Packet.Packets[global.Incoming.GenerateSecretKeyMessageEvent] = "GenerateSecretKey";
    Packet.Packets[global.Incoming.UniqueIDMessageEvent] = "UniqueID";
    Packet.Packets[global.Incoming.SSOTicketMessageEvent] = "SSOTicket";
};

module.exports = Packet;
