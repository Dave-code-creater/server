const mongoose = require('../Database/Config');

const companySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	about: {
		type: String,
		required: true,
		trim: true,
	},
	country: {
		type: String,
		required: true,
		trim: true,
	},
	city: {
		type: String,
		required: true,
		trim: true,
	},
	region: {
		type: String,
		required: true,
		trim: true,
	},
	postalCode: {
		type: String,
		required: false,
		trim: true,
	},
	address: {
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
	companyUUID: {
		type: String,
		required: true,
		unique: true,
		default: function() {
			return uuidv4();
		}
	},
	
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
