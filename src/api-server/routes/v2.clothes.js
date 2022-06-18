'use strict';

const bearer = require('../../auth-server/middleware/bearer');
const acl = require('../../auth-server/middleware/acl');

const app = require('express');
const clotheRouterV2 = app.Router();

clotheRouterV2.get('/clothev2', bearer, acl('read'), getClothe);
clotheRouterV2.post('/clothev2', bearer, acl('create'), createClothe);
clotheRouterV2.put('/clothev2', bearer, acl('update'), updateClothe);
clotheRouterV2.delete('/clothev2', bearer, acl('delete'), deleteClothe);

async function getClothe(req, res){
    if(req.user.typeError !== "Invalid token"){
        res.send('You are authorized to --> read');
    }
    else{
        res.send('XXX NOT authorized to --> read');
    } 
}
async function createClothe(req, res){
    if(req.user.typeError !== "Invalid token"){
        res.send('You are authorized to --> create');
    }
    else{
        res.send('XXX NOT authorized to --> create');
    } 
}
async function updateClothe(req, res){
    if(req.user.typeError !== "Invalid token"){
        res.send('You are authorized to --> update');
    }
    else{
        res.send('XXX NOT authorized to --> update');
    } 
}
async function deleteClothe(req, res){
    if(req.user.typeError !== "Invalid token"){
        res.send('You are authorized to --> delete');
    }
    else{
        res.send('XXX NOT authorized to --> delete');
    } 
}

module.exports = clotheRouterV2;