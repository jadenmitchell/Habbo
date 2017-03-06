
const versionCheckMessageEvent = 4000;
const initDiffieHandshakeMessageEvent = 1525;
const completeDiffieHandshakeMessageEvent = 3557;
const uniqueIDMessageEvent = 3786;
const ssoTicketMessageEvent = 1887;
const infoRetrieveMessageEvent = 3897;

class Incoming {
    static get VersionCheckMessageEvent() {
        return versionCheckMessageEvent;
    }

    static get InitDiffieHandshakeMessageEvent() {
        return initDiffieHandshakeMessageEvent;
    }

    static get CompleteDiffieHandshakeMessageEvent() {
        return completeDiffieHandshakeMessageEvent;
    }

    static get UniqueIDMessageEvent() {
        return uniqueIDMessageEvent;
    }

    static get SSOTicketMessageEvent() {
        return ssoTicketMessageEvent;
    }

    static get InfoRetrieveMessageEvent() {
        return infoRetrieveMessageEvent;
    }
}

module.exports = Incoming;