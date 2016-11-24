const crypto = require('crypto');
const diffieHellman = crypto.createDiffieHellman(30);
const prime = diffieHellman.getPrime();
const generator = diffieHellman.getGenerator();

const Rsa = require('node-rsa');
const key = new Rsa({
    n: new Buffer('85F5D787695551F8899858DD52C1C19D080308C78C13FD9FBDCF6B8852B6FEF8A9380F5DEB39CC64F65321F94FE415F02E455A9A82B7E55AC3E9DF684347AA04A4A95B798A9C465042CB8EC95C91F0B68415E1A8CD9BCE1473D1397319295E0C7AA362E25992D83289FD4E2DAB39F794D4D779671DF18A898BFDCFE25CD0A5F1'),
    e: 3,
    d: new Buffer('594E8FAF9B8E36A5B1103B3E372BD668B00205DA5D62A9152934F25AE1CF54A5C6255F93F22688434EE216A63542B94AC98391BC57254391D7F13F9AD7851C021703B238CD44EE121992AD950C020B899764A5FDDF9F09D459887AAA26BAAC08450FA6490243CAE1D7E69F372B6CAFE4C5BA0FBC095C9537E33EA795E6A848A3')
});

/**
 * Signs the bytes of a string.
 * 
 * @param str plaintext string
 * @returns {string} encrypted hex signature
 */
function getRsaStringEncrypted(str) {
    const buffer = Buffer.byteLength(str, 'utf-8');
    return key.sign(buffer, 'hex');
}

module.exports.Prime = prime;
module.exports.Generator = generator;
module.exports.getRsaStringEncrypted = getRsaStringEncrypted;