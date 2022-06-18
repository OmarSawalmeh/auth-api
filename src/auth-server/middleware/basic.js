'use strict';

const userModel = require('../model/users')
const base64 = require('base-64');

module.exports = (req, res, next)=>{
    if(req.headers.authorization){
        const headers = req.headers.authorization.split(' ');
        const encoded = headers.pop();
        const decode = base64.decode(encoded);
        const [username, password] = decode.split(':');

        userModel.authenticateBasic(username, password).then((validUser)=>{
            req.user = validUser;
            next();
        }).catch((error)=>{
            let invalidSignin = {
                "typeError": "Invalid signin",
                "message": "username or password not correct.",
              }
            req.user = invalidSignin;
            next();
        })
    }
}
