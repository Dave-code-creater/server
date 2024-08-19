const Company = require('../Models/Company');
const createError = require('http-errors');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
dotenv.config();

async function createCompany(req, res, next) {
	try {
		const { name, about, email, country, streetAddress, city, region, postalCode, id } = req.body;
		const existingCompany = await Company.findOne({
			name,
			email,
		}).exec();
		if (existingCompany) {
			throw createError(409, 'Company already exists'); // 409 Conflict
		}
		const company = new Company({name,
			address: streetAddress,
			about,
			email,
			admin: id,
			country,
			city,
			region,
			postalCode,
			createdBy: id,}
			
		);
		const result = await company.save();
		res.status(201).send(result.companyUUID); // 201 Created
	} catch (err) {
		console.log(err);
		next(err);
	}
}

async function getCompanyThatUserIDWorking(req, res, next) {
	try {
		const { id } = req.params;
		const company = await Company.findOne
		({ $or: [{ admin: id }, { employees: id }] }).exec();
		console.log(company);
		if (!company) throw createError(404, 'Company not found'); // 404 Not Found
		res.status(200).send(company); // 200 OK
	} catch (err) {
		next(err);
	}
}

async function getAllEmployeesWorkingInCompany(req, res, next) {
	try {
        const { companyUUID } = req.params;

        // Find the company and populate the employees and admins
        const company = await Company.findOne({ companyUUID }).exec();
            
        if (!company) throw createError(404, 'Company not found'); // 404 Not Found
		console.log(company.employees, company.admin);
        // Return the company details along with populated employees and admins
        res.status(200).json({
            employees: company.employees,
            admins: company.admin
        });
    } catch (err) {
        next(err);
    }
}

async function addEmployee(req, res, next) {
    try {
        const { id, companyUUID } = req.body;

		const company = await Company.findOne({ companyUUID });
        // Find the company by companyUUIDconst company = awaitCompany.findOne({ companyUUID });
        if (!company) {
            console.error('Company not found:', companyUUID);
            return res.status(404).send('Company not found'); // 404 Not Found
        }

        
        // Check if the employee is already in the company
		if (company.employees.includes(id)) {
			console.error('Employee already in company:', id);
			return res.status(409).send('Employee already in company'); // 409 Conflict
		}
        company.employees.push(id);
        await company.save();

        res.status(200).send(companyUUID); // 200 OK
    } catch (err) {
        console.error('Error in addEmployee:', err.message);
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
	getCompanyThatUserIDWorking,
	updateCompany,
	getAllCompanies,
	deleteCompany,
	addEmployee,
	getAllEmployeesWorkingInCompany
};
