const User = require('../Models/User');
const { signAccessToken, signRefreshToken } = require('../Security/JWT');
const jwt = require('jsonwebtoken');
const {
	registerValidation,
	loginValidation,
} = require('../Utility/Validation');

const createError = require('http-errors');
const dotenv = require('dotenv');

dotenv.config();

async function login(req, res, next) {
	try {
		const { email, password } = req.body;
		const { error } = loginValidation(req.body);
		if (error) throw createError.LengthRequired(error.details[0].message);
		const user = await User.findOne({ email });
		if (!user) throw createError.NotFound('User not registered');
		const isMatch = await user.isValidPassword(password);
		if (!isMatch)
			throw createError.Unauthorized('Invalid username/password');

		const accessToken = await signAccessToken(
			user._id,
			user.username,
			user.role,
			user.permission,
			user.creeatedAt,
			user.updatedAt
		);
		const refreshToken = await signRefreshToken(
			user._id,
			user.username,
			user.role,
			user.permission,
			user.creeatedAt,
			user.updatedAt
		);

		res.send({ accessToken, refreshToken }).status(200);
	} catch (err) {
		if (err.isJoi === true)
			return next(createError.BadRequest('Invalid username/password'));
		else {
			if (err.status === 404)
				return next(createError.NotFound('User not registered'));
		}
		next(err);
	}
}

async function logout(req, res, next) {
	try {
		const { refreshToken } = req.body;
		if (!refreshToken) throw createError.BadRequest();
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(err, payload) => {
				if (err) throw createError.Unauthorized();
				// Delete token from database
				res.sendStatus(204);
			}
		);
	} catch (err) {
		next(err);
	}
}

async function register(req, res, next) {
	try {
		const { username, email, password } = req.body;
		const { error } = registerValidation(req.body);

		if (error) throw createError.BadRequest(error.details[0].message);
		const existEmail = await User.findOne({ email });
		if (existEmail) throw createError.Conflict('Email already exists');
		const existUsername = await User.findOne({ username });
		if (existUsername)
			throw createError.Conflict('Username already exists');

		const user = new User({ username, email, password });
		const savedUser = await user.save();
		const accessToken = await signAccessToken(
			savedUser._id,
			savedUser.username,
			savedUser.role,
			savedUser.permission,
			savedUser.creeatedAt,
			savedUser.updatedAt
		);
		const refreshToken = await signRefreshToken(
			savedUser._id,
			savedUser.username,
			savedUser.role,
			savedUser.permission,
			savedUser.creeatedAt,
			savedUser.updatedAt
		);
		return res.send({ accessToken, refreshToken });
	} catch (err) {
		if (err.isJoi === true) err.status = 422;
		next(err);
	}
}

async function verify(req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) throw createError.BadRequest();
		jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
			if (err) throw createError.Unauthorized();
			// Check token from database
			res.sendStatus(200);
		});
	} catch (err) {
		next(err);
	}
}

async function refreshToken(req, res, next) {
	try {
		const { refreshToken } = req.body;
		if (!refreshToken) throw createError.BadRequest();
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			async (err, payload) => {
				if (err) throw createError.Unauthorized();
				const userId = payload.userId;
				const username = payload.username;
				const role = payload.role;
				const permission = payload.permission;
				const verified = payload.verified;
				const accessToken = await signAccessToken(
					userId,
					username,
					role,
					permission,
					verified
				);
				const refreshToken = await signRefreshToken(
					userId,
					username,
					role,
					permission,
					verified
				);
				res.send({ accessToken, refreshToken });
			}
		);
	} catch (err) {
		next(err);
	}
}

module.exports = {
	login,
	logout,
	register,
	verify,
	refreshToken,
};
