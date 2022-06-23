'use strict';

const bearer = require('../../auth-server/middleware/bearer');
const acl = require('../../auth-server/middleware/acl');

const app = require('express');
const foodRouterV2 = app.Router();

foodRouterV2.get('/foodv2', bearer, acl('read'), getFood);
foodRouterV2.post('/foodv2', bearer, acl('create'), createFood);
foodRouterV2.put('/foodv2', bearer, acl('update'), updateFood);
foodRouterV2.delete('/foodv2', bearer, acl('delete'), deleteFood);

async function getFood(req, res){
    let allRecords = await req.foodv2.get();
    res.status(200).json(allRecords);
}
async function createFood(req, res){
    let obj = req.body;
    let newRecord = await req.foodv2.create(obj);
    res.status(201).json(newRecord);
}
async function updateFood(req, res){
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.foodv2.update(id, obj)
    res.status(201).json(updatedRecord);
}
async function deleteFood(req, res){
    let id = req.params.id;
    let deletedRecord = await req.foodv2.delete(id);
    res.status(204).json(deletedRecord);
}

module.exports = foodRouterV2;