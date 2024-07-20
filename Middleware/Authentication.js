const createError = require('http-errors');
const dotenv = require('dotenv');
const {verifyAccessToken} = require('../Security/JWT');
dotenv.config();

async function authentication(req, res, next) {
    try {
        
        if (!req.headers.authorization) throw createError(401, 'Unauthorized');
        const token = req.headers.authorization.split(' ')[1];
        if (!token) throw createError(401, 'Unauthorized');
        const decodedToken = await verifyAccessToken(token);
        if (!decodedToken) throw createError(401, 'Unauthorized');
        next();
    } catch (error) {
        console.log(error);
        next(createError(401, 'Unauthorized'));
    }
}

module.exports = {
	authentication,
};
