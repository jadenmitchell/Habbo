function VersionCheck()
{
}

VersionCheck.Parse = function (Session, Message)
{
    var build = Message.readString();
    console.log(build);
};

module.exports = VersionCheck;
