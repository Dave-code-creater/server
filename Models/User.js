const mongoose = require("../Database/Config");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
	img: {
		type: String,
		default:'https://img.icons8.com/?size=100&id=7820&format=png&color=000000',
	},
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
	position: {
		type: String,
		default: 'user',
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
