const express = require('express');
const router = express.Router();
const { authentication } = require('../Middleware/Authentication');
const { authorization } = require('../Middleware/Authorization');
const {
	createCompany,
	getCompanyThatUserIDWorking,
	updateCompany,
	getAllCompanies,
	addEmployee,
	deleteCompany,
	getAllEmployeesWorkingInCompany,
} = require('../Services/CompanyService');

router.post('/',authentication, createCompany);
router.get('/:id', authentication, getCompanyThatUserIDWorking);
router.get('/:companyUUID/employees', authentication, getAllEmployeesWorkingInCompany);
router.post('/employees', authentication, addEmployee);
router.put('/', authentication, updateCompany);
router.delete('/', authentication, deleteCompany);

module.exports = router;
