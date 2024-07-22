const express = require("express");
const router = express.Router();

const { authentication } = require("../Middleware/Authentication");
const { authorization } = require("../Middleware/Authorization");

const {
	getAllTasksByUserID,
	createTaskByUserID,
	updateTaskByUserID,
	deleteTask,
	getTaskByStatusByUserID,
	getTaskByTypeByUserID,
	updateTaskByTaskID,
} = require("../Services/TaskService");

// Route to get all tasks by user ID
router.get('/:id', authentication, getAllTasksByUserID);

// Route to create a new task for a user by user ID
router.post('/:id', authentication, createTaskByUserID);

// Route to update a task by task ID
router.put('/:taskId', authentication, updateTaskByTaskID);

// Route to delete a task by task ID
router.delete('/:taskId', authentication, deleteTask);

// Route to get tasks by status for a specific user
router.get('/:id/status', authentication, getTaskByStatusByUserID);

// Route to get tasks by type for a specific user
router.get('/:id/type', authentication, getTaskByTypeByUserID);


// Test route to check if the service is running
router.get("/", (req, res) => {
	res.send("Hello World from task service");
});

module.exports = router;
