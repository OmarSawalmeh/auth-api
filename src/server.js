'use strict';

const express = require('express');
// Middleware
const notFoundHandler = require('./api-server/error-handlers/404');
const errorHandler = require('./api-server/error-handlers/500');
const logger = require('./api-server/middleware/logger');

// Router
// APT
const foodV1 = require('./api-server/routes/v1.food');
const clothesV1 = require('./api-server/routes/v1.clothes');
const foodRouterV2 = require('./api-server/routes/v2.food');
const foodClotheV2 = require('./api-server/routes/v2.clothes');
// Auth
const auth = require('./auth-server/auth.routes');

// Class app an parse it.....
const app = express();
app.use(express.json());

// Home Route
app.get('/', (req, res)=>{
    res.send("You Will Never Walk Alone Liverpool\nThis app contain all routes from api and auth server.");
});

// use global middleware
app.use(logger);

// use router
app.use(foodV1);
app.use(clothesV1);
app.use(foodRouterV2);
app.use(foodClotheV2);
app.use(auth);

// Handle error
// 404
app.use('*', notFoundHandler);
// 500
app.use(errorHandler);


// Kick off 
function start(PORT){
    app.listen(PORT, ()=>{
        console.log(`Server on port ${PORT}`);
    });
}

module.exports = {
    server: app,
    start: start
}



