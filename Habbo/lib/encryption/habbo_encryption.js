const crypto = require('crypto');

const BigInteger = require('jsbn').BigInteger;
const RSA = require('./rsa');
const rc4 = require('./rc4');

const diffieHellman = crypto.createDiffieHellman(30);
const prime = new BigInteger('114670925920269957593299136150366957983142588366300079186349531', 10); // diffieHellman.getPrime();
const generator = new BigInteger('1589935137502239924254699078669119674538324391752663931735947', 10); // diffieHellman.getGenerator();

const keys = {
    n: '86851DD364D5C5CECE3C883171CC6DDC5760779B992482BD1E20DD296888DF91B33B936A7B93F06D29E8870F703A216257DEC7C81DE0058FEA4CC5116F75E6EFC4E9113513E45357DC3FD43D4EFAB5963EF178B78BD61E81A14C603B24C8BCCE0A12230B320045498EDC29282FF0603BC7B7DAE8FC1B05B52B2F301A9DC783B7',
    e: '3',
    d: '59AE13E243392E89DED305764BDD9E92E4EAFA67BB6DAC7E1415E8C645B0950BCCD26246FD0D4AF37145AF5FA026C0EC3A94853013EAAE5FF1888360F4F9449EE023762EC195DFF3F30CA0B08B8C947E3859877B5D7DCED5C8715C58B53740B84E11FBC71349A27C31745FCEFEEEA57CFF291099205E230E0C7C27E8E1C0512B'
};

const Rsa = new RSA();
Rsa.setPrivate(keys.n, keys.e, keys.d);

const publicKey = generator.modPow(Rsa.d, prime);

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

function calculateDiffieHellmanSharedKey(cipherKey) {
    const publicKey = Rsa.decrypt(cipherKey);
    const publicClientKey = new BigInteger(publicKey, 10);
    return publicClientKey.modPow(Rsa.d, prime);
}

module.exports.Prime = prime;
module.exports.Generator = generator;
module.exports.PublicKey = publicKey;
module.exports.getRsaStringEncrypted = getRsaStringEncrypted;
module.exports.calculateDiffieHellmanSharedKey = calculateDiffieHellmanSharedKey;