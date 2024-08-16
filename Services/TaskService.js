const Task = require("../Models/Task");
const createError = require("http-errors");
const dotenv = require("dotenv");
dotenv.config();

async function getAllTasksByUserID(req, res, next) {
	try {
		const { id } = req.params;
		const tasks = await Task.find({ user: id }).exec();
		res.send(tasks);
	} catch (err) {
		next(err);
	}
}

async function createTaskByUserID(req, res, next) {
	try {
		const { title, description, status, type, deadline, userId } = req.body;
		const task = new Task({
			title,
			description,
			status,
			type,
			deadline,
			user: userId,
		});
		const result = await task.save();
		
		res.send(result);
	} catch (err) {
		next(err);
	}
}
async function updateTaskByUserID(req, res, next) {
	try {
		const { id } = req.params;
		const task = await Task.findByIdAndUpdate(id, req.body, {
			new: true,
		}).exec();
		if (!task) throw createError.NotFound();
		res.send(task);
	} catch (err) {
		next(err);
	}
}

async function deleteTask(req, res, next) {
	try {
		const { id } = req.params;
		const task = await Task.findByIdAndDelete(id).exec();
		if (!task) throw createError.NotFound();
		res.send(task);
	} catch (err) {
		next(err);
	}
}

async function getTaskByStatusByUserID(req, res, next) {
	try {
		const { status } = req.query;
		const { id } = req.params;
		const tasks = await Task.find({ status, user: id }).exec();
		res.send(tasks);
	} catch (err) {
		next(err);
	}
}

async function updateTaskStatusByTaskID(req, res, next) {
	try {
		const { taskId } = req.params;
		const task = await Task.findByIdAndUpdate(taskId, req.body, {
			new: true,
		}).exec();
		if (!task) throw createError.NotFound();
		res.send(task);
	}
	catch (err) {
		next(err);
	}
}

async function getTaskByTypeByUserID(req, res, next) {
	try {
		const { type } = req.query;
		const { id } = req.params;
		const tasks = await Task.find({ type, user: id }).exec();
		res.send(tasks);
	} catch (err) {
		next(err);
	}
}

async function updateTaskByTaskID(req, res, next) {
	try {
		const { taskId } = req.params;
		const task = await Task.findByIdAndUpdate(taskId, req.body, {
			new: true,
		}).exec();
		if (!task) throw createError.NotFound();
		res.send(task);
	}
	catch (err) {
		next(err);
	}
}

module.exports = {
	getAllTasksByUserID,
	createTaskByUserID,
	updateTaskByUserID,
	deleteTask,
	getTaskByStatusByUserID,
	getTaskByTypeByUserID,
	updateTaskByTaskID,
	updateTaskStatusByTaskID,
};
