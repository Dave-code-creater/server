const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose
	.connect(process.env.MONGO_URI, {
		dbName: process.env.DB_NAME,
	})
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.log('Error connecting to MongoDB', err);
	});

mongoose.connection.on('connected', () => {
	console.log('Mongoose connected to db');
});

mongoose.connection.on('error', (err) => {
	console.log('Mongoose connection error', err);
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose disconnected from db');
});

process.on('SIGINT', async () => {
	await mongoose.connection.close();
	process.exit(0);
});
module.exports = mongoose;
