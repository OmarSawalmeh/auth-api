'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const clothesModel = require('../api-server/models/clothes.model');
const foodModel = require('../api-server/models/food.model');
const Collection = require('../api-server/models/data-collection');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  } : {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);

let ClothesClass = new Collection(clothes);
let FoodClass = new Collection(food);

module.exports = {
  db: sequelize,
  DataTypes: DataTypes,
  food: FoodClass,
  clothes: ClothesClass
};