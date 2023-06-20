const jsonwebtoken = require("jsonwebtoken");
const config = require('../config');

const jwt = (req, res, next) => {
    let allowURL = [
        '/auth/login',
        '/auth/forgot',
        '/auth/reset',
        '/auth/register',
        '/uploads'
    ];
    if (allowURL.includes(req.path) || (req.path.search(/uploads/) > -1?true:false)) {
        return next();
    } else {
        let resp = { status: false, message: 'unauthorization request', data: null };
        let token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
        if (token) {
            jsonwebtoken.verify(token, config.JWT_SECRET,(err, response) => {
                if (!err) {
                    req.user = response.user;
                    next();
                } else {
                    res.json(resp);
                }
            })
        } else {
            res.json(resp);
        }
    }  
}

module.exports = jwt;