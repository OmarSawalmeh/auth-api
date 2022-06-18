'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3070;

const { db } = require('./src/model/index');
const server = require('./src/server');


db.sync().then(()=>{
  server.start(PORT);
}).catch(console.error());