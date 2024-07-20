const User = require("../Models/User");

const createError = require("http-errors");
const dotenv = require("dotenv");
dotenv.config();

async function createUser(req, res, next) {
	try {
		const user = new User(req.body);
		const result = await user.save();
		res.send(result);
	} catch (err) {
		next(err);
	}
}

async function getUserById(req, res, next) {
	try {
		
		const { id } = req.params;
		console.log(id);
		const user = await User.findById(id).select("-password").exec();
		console.log(user);
		if (!user) throw createError(404, "User not found");
		res.send(user);
	} catch (err) {
		next(err);
	}
}

async function updateUser(req, res, next) {
	try {
		const { id } = req.params;
		const user = await User.findByIdAndUpdate(id, req.body, {
			new: true,
		}).exec();
		if (!user) throw createError(404, "User not found");
		res.send(user);
	} catch (err) {
		next(err);
	}
}

async function getAllUsers(req, res, next) {
	try {
		const users = await User.find().select("-password").exec();
		console.log(users);
		res.send(users);
	} catch (err) {
		next(err);
	}
}

async function updateUser(req, res, next) {
	try {
		const { id } = req.params;
		const user = await User.findByIdAndUpdate(id, req.body, {
			new: true,
		}).exec();
		if (!user) throw createError.NotFound();
		res.send(user);
	} catch (err) {
		next(err);
	}
}

async function deleteUser(req, res, next) {
	try {
		const { id } = req.params;
		const user = await User.findByIdAndDelete(id).exec();
		if (!user) throw createError.NotFound();
		res.send(user);
	} catch (err) {
		next(err);
	}
}

module.exports = { getUserById, getAllUsers, updateUser, deleteUser, createUser };
