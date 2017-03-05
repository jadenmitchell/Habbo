var BigInteger = require('jsbn').BigInteger;
function parseBigInt(str, r) {
	return new BigInteger(str, r)
}

function linebrk(s, n) {
	var ret = "";
	var i = 0;
	while (i + n < s.length) {
		ret += s.substring(i, i + n) + "\n";
		i += n
	}
	return ret + s.substring(i, s.length)
}

function byte2Hex(b) {
	if (b < 0x10) return "0" + b.toString(16);
	else return b.toString(16)
}

function pkcs1pad(s, n) {
	if (n < s.length + 11) {
		alert("Message too long for RSA");
		return null
	}
	var ba = [];
	var i = s.length - 1;
	while (i >= 0 && n > 0) {
		var c = s.charCodeAt(i--);
		ba[--n] = c
	}
	ba[--n] = 0;
	while (n > 2) {
		ba[--n] = 0xFF
	}
	ba[--n] = 1;
	ba[--n] = 0;
	return new BigInteger(ba)
}

function pkcs1pad2(s, n) {
	if (n < s.length + 11) {
		alert("Message too long for RSA");
		return null
	}
	var ba = [];
	var i = s.length - 1;
	while (i >= 0 && n > 0) {
		var c = s.charCodeAt(i--);
		ba[--n] = c
	}
	ba[--n] = 0;
	while (n > 2) {
		ba[--n] = Math.floor(Math.random() * 256)
	}
	ba[--n] = 2;
	ba[--n] = 0;
	return new BigInteger(ba)
}

function RSAKey() {
	this.n = null;
	this.e = 0;
	this.d = null;
	this.p = null;
	this.q = null;
	this.dmp1 = null;
	this.dmq1 = null;
	this.coeff = null
}

function RSASetPublic(N, E) {
	if (N != null && E != null && N.length > 0 && E.length > 0) {
		this.n = parseBigInt(N, 16);
		this.e = parseInt(E, 16)
	} else alert("Invalid RSA public key")
}

function RSADoPublic(x) {
	return x.modPowInt(this.e, this.n)
}

function RSAEncrypt(text) {
	var m = pkcs1pad2(text, (this.n.bitLength() + 7) >> 3);
	if (m == null) return null;
	var c = this.doPublic(m);
	if (c == null) return null;
	var h = c.toString(16);
	if ((h.length & 1) == 0) return h;
	else return "0" + h
}

function RSASign(text) {
	var m = pkcs1pad(text, (this.n.bitLength() + 7) >> 3);
	if (m == null) return null;
	var c = this.doPrivate(m);
	if (c == null) return null;
	var h = c.toString(16);
	if ((h.length & 1) == 0) return h;
	else return "0" + h
}
RSAKey.prototype.doPublic = RSADoPublic;
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
RSAKey.prototype.sign = RSASign;

function pkcs1unpad2(d, n) {
	var b = d.toByteArray();
	var i = 0;
	while (i < b.length && b[i] == 0) ++i;
	if (b.length - i != n - 1 || b[i] > 2) return null;
	++i;
	while (b[i] != 0)
		if (++i >= b.length) return null;
	var result = "";
	while (++i < b.length) {
		var c = b[i] & 255;
		result += String.fromCharCode(c)
	}
	return result
}

function RSASetPrivate(N, E, D) {
	if (N != null && E != null && N.length > 0 && E.length > 0) {
		this.n = parseBigInt(N, 16);
		this.e = parseInt(E, 16);
		this.d = parseBigInt(D, 16)
	} else alert("Invalid RSA private key")
}

function RSASetPrivateEx(N, E, D, P, Q, DP, DQ, C) {
	if (N != null && E != null && N.length > 0 && E.length > 0) {
		this.n = parseBigInt(N, 16);
		this.e = parseInt(E, 16);
		this.d = parseBigInt(D, 16);
		this.p = parseBigInt(P, 16);
		this.q = parseBigInt(Q, 16);
		this.dmp1 = parseBigInt(DP, 16);
		this.dmq1 = parseBigInt(DQ, 16);
		this.coeff = parseBigInt(C, 16)
	} else alert("Invalid RSA private key")
}

function RSAGenerate(B, E) {
	var rng = new SecureRandom();
	var qs = B >> 1;
	this.e = parseInt(E, 16);
	var ee = new BigInteger(E, 16);
	for (;;) {
		for (;;) {
			this.p = new BigInteger(B - qs, 1, rng);
			if (this.p.subtract(BigInteger.ONE)
				.gcd(ee)
				.compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) break
		}
		for (;;) {
			this.q = new BigInteger(qs, 1, rng);
			if (this.q.subtract(BigInteger.ONE)
				.gcd(ee)
				.compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) break
		}
		if (this.p.compareTo(this.q) <= 0) {
			var t = this.p;
			this.p = this.q;
			this.q = t
		}
		var p1 = this.p.subtract(BigInteger.ONE);
		var q1 = this.q.subtract(BigInteger.ONE);
		var phi = p1.multiply(q1);
		if (phi.gcd(ee)
			.compareTo(BigInteger.ONE) == 0) {
			this.n = this.p.multiply(this.q);
			this.d = ee.modInverse(phi);
			this.dmp1 = this.d.mod(p1);
			this.dmq1 = this.d.mod(q1);
			this.coeff = this.q.modInverse(this.p);
			break
		}
	}
}

function RSADoPrivate(x) {
	if (this.p == null || this.q == null) return x.modPow(this.d, this.n);
	var xp = x.mod(this.p)
		.modPow(this.dmp1, this.p);
	var xq = x.mod(this.q)
		.modPow(this.dmq1, this.q);
	while (xp.compareTo(xq) < 0) xp = xp.add(this.p);
	return xp.subtract(xq)
		.multiply(this.coeff)
		.mod(this.p)
		.multiply(this.q)
		.add(xq)
}

function RSADecrypt(ctext) {
	var c = parseBigInt(ctext, 16);
	var m = this.doPrivate(c);
	if (m == null) return null;
	return pkcs1unpad2(m, (this.n.bitLength() + 7) >> 3)
}

function RSAVerify(ctext) {
	var c = parseBigInt(ctext, 16);
	var m = this.doPublic(c);
	if (m == null) return null;
	return pkcs1unpad2(m, (this.n.bitLength() + 7) >> 3)
}
RSAKey.prototype.doPrivate = RSADoPrivate;
RSAKey.prototype.setPrivate = RSASetPrivate;
RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
RSAKey.prototype.generate = RSAGenerate;
RSAKey.prototype.decrypt = RSADecrypt;
RSAKey.prototype.verify = RSAVerify;

module.exports = RSAKey;
