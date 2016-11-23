
const versionCheckMessageEvent = 4000;
const initDiffieHandshakeMessageEvent = 316;
const completeDiffieHandshakeMessageEvent = 3847;

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
}

module.exports = Incoming;