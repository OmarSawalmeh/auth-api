'use strict';

const userModel = require('./model/users');
const bcrypt = require('bcrypt');
const app = require('express');
const authRouter = app.Router();
// Require middleware
const basic = require('./middleware/basic');
const bearer = require('./middleware/bearer');
const acl = require('./middleware/acl');

authRouter.get('/testRoute', test);
authRouter.post('/signup', signUp);
authRouter.post('/signin', basic, signIn);
authRouter.get('/secret', bearer, secret);
authRouter.get('/users', bearer, acl('delete'), users);
// ACL Rotuers
authRouter.get('/img', bearer, acl('read'), handleRead);
authRouter.post('/img', bearer, acl('create'), handleCreate);
authRouter.put('/img', bearer, acl('update'), handleUpdate);
authRouter.delete('/img', bearer, acl('delete'), handleDelete);


async function test(req, res){
    res.send('YNWA...');
}

async function signUp(req, res){
    try{
        let username = req.body.username;
        let password = await bcrypt.hash(req.body.password, 10);
        let role = req.body.role;
        let fullname = req.body.fullname;
        let email = req.body.email;

        const record = await userModel.create({
            username: username,
            password: password,
            fullname: fullname,
            email: email,
            role: role
        });
        res.status(201).json(record);
    }
    catch(e){
        throw new Error("signup error");
    }
}

async function signIn(req, res){
    res.status(200).json(req.user); 
}

async function secret(req, res){
    if(req.user.typeError !== "Invalid token"){
        res.json({
            'message': 'Welcome to the secret area',
            status: 'You are authorized to view the secret stuff.',
            user: req.user
          });
    }
    else{
        res.json(req.user);
    }
}

async function users (req, res, next){
    const userRecords = await userModel.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
}

async function handleRead(req, res){
    res.send('this is new image');
}
async function handleCreate(req, res){
    res.send('new image was created');
}
async function handleUpdate(req, res){
    res.send('new image was updated');
}
async function handleDelete(req, res){
    res.send('new image was deleted');
}

module.exports = authRouter;