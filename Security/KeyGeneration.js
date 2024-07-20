const crypto = require('crypto');

const generateHS256Key = () => {
	return crypto.randomBytes(32).toString('hex'); // Generate a 32-byte (256-bit) key and convert it to hexadecimal string
};

const key1 = generateHS256Key();
const key2 = generateHS256Key();
console.table({ key1, key2 });
