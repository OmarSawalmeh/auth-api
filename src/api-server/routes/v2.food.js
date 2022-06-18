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
    res.send('You are authorized to --> read');
}
async function createFood(req, res){
    res.send('You are authorized to --> create');
}
async function updateFood(req, res){
    res.send('You are authorized to --> update');
}
async function deleteFood(req, res){
    res.send('You are authorized to --> delete');
}

module.exports = foodRouterV2;