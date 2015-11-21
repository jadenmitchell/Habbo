function VersionCheck() { };

VersionCheck.Parse = function(Session, Message)
{
    var Build = Message.readString();
    console.log(Build);
}

module.exports = VersionCheck;
