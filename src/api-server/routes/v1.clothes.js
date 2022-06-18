'use strict';

const { clothes } = require('../../model/index');

const app = require('express');
const clothesRouter = app.Router();

// RESTful Route Delectation 
clothesRouter.get('/clothe', getClothes);
clothesRouter.get('/clothe/:id', getOneClothe);
clothesRouter.post('/clothe', createClothe);
clothesRouter.put('/clothe/:id', updateClothe);
clothesRouter.delete('/clothe/:id', deleteClothe);

async function getClothes(req, res){
    let allClothes = await clothes.read();
    res.status(200).json(allClothes);
}

async function getOneClothe(req, res){
    let id = req.params.id;
    let record = await clothes.read(id);
    res.status(200).json(record); 
}

async function createClothe(req, res){
    let obj = req.body;
    let creatRecord = await clothes.create(obj);
    res.status(201).json(creatRecord);
}

async function updateClothe(req, res){
    let id = req.params.id;
    let obj = req.body;
    let updateRecord = await clothes.update(id, obj);
    res.status(201).json(updateRecord);
}

async function deleteClothe(req, res){
    let id = req.params.id;
    let deleteRecord = await clothes.delete(id);
    res.status(204).send(deleteRecord);
}

module.exports = clothesRouter;