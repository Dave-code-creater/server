const mongoose = require("../Database/Config");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['user', 'admin', 'employee'],
		default: 'user',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},

});

userSchema.pre('save', async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
		next();
	} catch (err) {
		next(err);
	}
});
userSchema.post('save', async function () {
	try {
		console.log('User saved');
	} catch (err) {
		console.log(err);
	}
});

userSchema.methods.isValidPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (err) {
		throw err;
	}
};

const User = mongoose.model('user', userSchema);

module.exports = User;
