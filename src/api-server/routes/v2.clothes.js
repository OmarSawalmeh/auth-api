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
        let allRecords = await req.clothev2.get();
        res.status(200).json(allRecords);
    }
    else{
        res.send('XXX NOT authorized to --> read');
    } 
}
async function createClothe(req, res){
    if(req.user.typeError !== "Invalid token"){
        let obj = req.body;
        let newRecord = await req.clothev2.create(obj);
        res.status(201).json(newRecord);
    }
    else{
        res.send('XXX NOT authorized to --> create');
    } 
}
async function updateClothe(req, res){
    if(req.user.typeError !== "Invalid token"){
        const id = req.params.id;
        const obj = req.body;
        let updatedRecord = await req.clothev2.update(id, obj)
        res.status(201).json(updatedRecord);
    }
    else{
        res.send('XXX NOT authorized to --> update');
    } 
}
async function deleteClothe(req, res){
    if(req.user.typeError !== "Invalid token"){
        let id = req.params.id;
        let deletedRecord = await req.clothev2.delete(id);
        res.status(204).json(deletedRecord);
    }
    else{
        res.send('XXX NOT authorized to --> delete');
    } 
}

module.exports = clotheRouterV2;