'use strict';


const { db, DataTypes } = require('../../model/index');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'liverpool';

const userModel = db.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    fullname: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    token: {
        type: DataTypes.VIRTUAL
    },
    role: {
        type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'),
        required: true,
        defaultValue: 'user'
    },
    capabilities: {
        type: DataTypes.VIRTUAL,

        get(){
            const acl = {
                user: ['read'],
                writer: ['read', 'create'],
                editor: ['read', 'create', 'update'],
                admin: ['read', 'create', 'update', 'delete']
            }
            return acl[this.role];
        }
    }
});

userModel.authenticateBasic = async function (username, password){
    let user = await userModel.findOne({where:{username:username}});
    let valid = await bcrypt.compare(password, user.password);
    if(valid){
        let newToken = jwt.sign({username: user.username}, SECRET);
        user.token = newToken;
        return user;
    }
    else{
        throw new Error("Invalid user");
    }
}

userModel.authenticateBearer = async function(token){
    let parsedToken = jwt.verify(token, SECRET);
    let user = await userModel.findOne({where:{username: parsedToken.username}});
    if(user.username){
        return user;
    }
    else{
        throw new Error("Invalid Token");
    }
}



module.exports = userModel;