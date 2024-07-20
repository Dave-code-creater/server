const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	signAccessToken: (userId, username, role, permission, verified) => {
		return new Promise((resolve, reject) => {
			const payload = {
				userId: userId,
				username: username,
				role: role,
				permission: permission,
				verified: verified,
			};
			const secret = process.env.ACCESS_TOKEN_SECRET;
			const options = {
				expiresIn: '1d',
				issuer: 'auth-service',
				audience: userId.toString(),
			};
			jwt.sign(payload, secret, options, (err, token) => {
				if (err) {
					console.log(err.message);
					return reject(createError.InternalServerError());
				}
				resolve(token);
			});
		});
	},
	verifyAccessToken: (token) => {
		return new Promise((resolve, reject) => {
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
				if (err) return reject(createError.Unauthorized());
				resolve(payload);
			});
		});
	},
	signRefreshToken: (userId, username, role, permission, verified) => {
		return new Promise((resolve, reject) => {
			const payload = {
				userId: userId,
				username: username,
				role: role,
				permission: permission,
				verified: verified,
			};
			const secret = process.env.REFRESH_TOKEN_SECRET;
			const options = {
				expiresIn: '1d',
				issuer: 'auth-service',
				audience: userId.toString(),
			};
			jwt.sign(payload, secret, options, (err, token) => {
				if (err) {
					console.log(err.message);
					return reject(createError.InternalServerError());
				}
				resolve(token);
			});
		});
	},
	verifyRefreshToken: (token) => {
		return new Promise((resolve, reject) => {
			jwt.verify(
				token,
				process.env.REFRESH_TOKEN_SECRET,
				(err, payload) => {
					if (err) return reject(createError.Unauthorized());
					const userId = payload.aud;
					resolve(userId);
				}
			);
		});
	},
};
