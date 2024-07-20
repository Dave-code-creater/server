const express = require("express");
const router = express.Router();

const { authentication } = require("../Middleware/Authentication");
const { authorization } = require("../Middleware/Authorization");
const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} = require("../Services/Userservice");

// Route to get all users
router.get("/users", authentication, authorization, getAllUsers);

// Route to get a user by their ID
router.get("/users/:id", authentication, getUserById);

// Route to create a new user
router.post("/users", authentication, authorization, createUser);

// Route to update a user
router.put("/users/:id", authentication, updateUser);

// Route to delete a user
router.delete("/users/:id", authentication, deleteUser);

// Test route
router.get("/", (req, res) => {
	res.send("Hello World from user service");
});

module.exports = router;
