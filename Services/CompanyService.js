const Company = require('../Models/Company');
const createError = require('http-errors');
const dotenv = require('dotenv');
dotenv.config();

async function createCompany(req, res, next) {
	try {
		const company = new Company(req.body);
		const result = await company.save();
		res.status(201).send(result); // 201 Created
	} catch (err) {
		next(err);
	}
}

async function getCompanyById(req, res, next) {
	try {
		const { id } = req.params;
		const company = await Company.findById(id).exec();
		if (!company) throw createError(404, 'Company not found'); // 404 Not Found
		res.status(200).send(company); // 200 OK
	} catch (err) {
		next(err);
	}
}

async function updateCompany(req, res, next) {
	try {
		const { id } = req.params;
		const company = await Company.findByIdAndUpdate(id, req.body, {
			new: true,
		}).exec();
		if (!company) throw createError(404, 'Company not found'); // 404 Not Found
		res.status(200).send(company); // 200 OK
	} catch (err) {
		next(err);
	}
}

async function getAllCompanies(req, res, next) {
	try {
		const companies = await Company.find().exec();
		console.log(companies);
		res.status(200).send(companies); // 200 OK
	} catch (err) {
		next(err);
	}
}

async function deleteCompany(req, res, next) {
	try {
		const { id } = req.params;
		const company = await Company.findByIdAndDelete(id).exec();
		if (!company) throw createError(404, 'Company not found'); // 404 Not Found
		res.status(204).send(); // 204 No Content
	} catch (err) {
		next(err);
	}
}

module.exports = {
	createCompany,
	getCompanyById,
	updateCompany,
	getAllCompanies,
	deleteCompany,
};
