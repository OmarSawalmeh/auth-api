'use strict';

const { food } = require('../../model/index');

const app = require('express');
const foodRouter = app.Router();

// RESTful Route Delectation 
foodRouter.get('/food', getFood);
foodRouter.get('/food/:id', getOneFood);
foodRouter.post('/food', createFood);
foodRouter.put('/food/:id', updateFood);
foodRouter.delete('/food/:id', deleteFood);

async function getFood(req, res){
    let allFood = await food.read();
    res.status(200).json(allFood);
}

async function getOneFood(req, res){
    let id = req.params.id;
    let record = await food.read(id);
    res.status(200).json(record); 
}

async function createFood(req, res){
    let obj = req.body;
    let creatRecord = await food.create(obj);
    res.status(201).json(creatRecord);
}

async function updateFood(req, res){
    let id = req.params.id;
    let obj = req.body;
    let updateRecord = await food.update(id, obj);
    res.status(201).json(updateRecord);
}

async function deleteFood(req, res){
    let id = req.params.id;
    let deleteRecord = await food.delete(id);
    res.status(204).json(deleteRecord);
}

module.exports = foodRouter;