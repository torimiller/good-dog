const jwt = require('jsonwebtoken');
const config = require('config');

// This is a middleware function, a function that has access to the request and response objects
// Next is a callback that has to run when we're done so it moves on to the next piece of middleware
module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}