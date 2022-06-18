'use strict';

const userModel = require('../model/users')

module.exports = (req, res, next)=>{
    if (req.headers.authorization) {
        let bearerToken = req.headers.authorization.split(' ').pop();

        userModel.authenticateBearer(bearerToken).then((data)=>{
            req.user = data;
            next();
        }).catch((error)=>{
            let invalidToken = {
                "typeError": "Invalid token",
                "message": "You are Not authorized to view this page.",
              }
            req.user = invalidToken;
            next();
        })
    }
}