const Joi = require('joi');

const registerValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().required().min(8),
	});
	return schema.validate(data);
};

const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string().required().min(6),
	});
	return schema.validate(data);
};


module.exports = { registerValidation, loginValidation };
