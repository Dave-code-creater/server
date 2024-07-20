const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const createError = require('http-errors');
const AuthRouter = require('./Controllers/AuthController');
const UserRouter = require('./Controllers/UserController');
const TaskRouter = require('./Controllers/TaskController');

const app = express();
dotenv.config();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*', // Adjust if necessary for production
    credentials: true
}));

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/task", TaskRouter);

// 404 Handler (must be after all routes)
app.use(async (req, res, next) => {
    next(createError(404, 'This route does not exist'));
});

// Error Handling Middleware (must be after 404 handler)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
