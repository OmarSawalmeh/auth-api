'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);
const { db } = require('../src/model/index');

// before any of the test create a connection
beforeAll(async () => {
    await db.sync();
  });
  
// after all the tests are done
afterAll(async () => {
    await db.drop();
  });

describe("API Server", ()=>{

    // Check if 404 is handled 
    test("Should respond with 404 status on an invalid path", async ()=>{
        let response = await mockRequest.get("/ynwa");
        expect(response.status).toEqual(404);
    });

    // Check if 404 is handled 
    test("Should respond with 404 status on an invalid method", async ()=>{
        let response = await mockRequest.post("/ynwa");
        expect(response.status).toEqual(404);
    });

    // Check if 500 is handled 
    test('Should respond with 500', async () => {
        const response = await mockRequest.get("/foods/?name=");
        expect(response.status).toEqual(404);
    });
});
