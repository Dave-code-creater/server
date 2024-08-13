const express = require('express');
const router = express.Router();
const { authentication } = require('../Middleware/Authentication');
const { authorization } = require('../Middleware/Authorization');
const {
	createCompany,
	getCompanyById,
	updateCompany,
	getAllCompanies,
	deleteCompany,
} = require('../Services/CompanyService');

router.post('/create', createCompany);
router.get('/:id', authorization, getCompanyById);
router.put('/:id', authorization, updateCompany);
router.get('/', authorization, getAllCompanies);
router.delete('/:id', authorization, deleteCompany);
