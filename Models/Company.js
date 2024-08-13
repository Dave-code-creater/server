const mongoose = require('../Database/Config');

const companySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	address: {
		type: String,
		required: true,
		trim: true,
	},
	contact: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	employees: {
		type: Array,
		required: false,
		default: [],
	},
	admin: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'user',
		required: false,
		default: [],
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
