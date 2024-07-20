const createError = require('http-errors');
const { verifyAccessToken } = require('../Security/JWT');

async function authorization(req, res, next) {
    try {
        if (!req.headers.authorization) throw createError(401, 'Authorization header is missing');
        const authHeader = req.headers.authorization.split(' ');
        if (authHeader[0] !== 'Bearer' || authHeader.length !== 2) throw createError(401, 'Malformed token');
        const token = authHeader[1];
        const decodedToken = await verifyAccessToken(token);
        if (decodedToken.role !== 'admin') throw createError(403, 'Forbidden');
        req.user = decodedToken;
        
        next();
    } catch (error) {
        if (!error.status) error = createError(401, 'Unauthorized');
        next(error);
    }
}

module.exports = {
    authorization,
};