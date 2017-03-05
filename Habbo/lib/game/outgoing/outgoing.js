
const initDiffieHandshakeMessageComposer = 1030;
const completeDiffieHandshakeMessageComposer = 1989;
const uniqueIDMessageEvent = 2935;
const habboBroadcastMessageComposer = 3578;

class Outgoing {
    static get InitDiffieHandshakeMessageComposer() {
        return initDiffieHandshakeMessageComposer;
    }

    static get CompleteDiffieHandshakeMessageComposer() {
        return completeDiffieHandshakeMessageComposer;
    }
    
    static get UniqueIDMessageEvent() {
        return uniqueIDMessageEvent;
    }

    static get HabboBroadcastMessageComposer() {
        return habboBroadcastMessageComposer;
    }
}

module.exports = Outgoing;