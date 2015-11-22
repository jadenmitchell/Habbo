var Response = require('../Response');

function InitCrypto()
{
}

InitCrypto.Parse = function (Session, Message)
{
    var response = new Response(global.Outgoing.InitCryptoMessageComposer);
    response.pushString("Habbo");
    response.pushString("Crypto Disabled"); // pushBoolean(false)?
    Session.sendData(response.getBytes());
};

module.exports = InitCrypto;
