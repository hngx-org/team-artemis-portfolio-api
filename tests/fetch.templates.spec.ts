import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

// Endpoint to Fetch All Templates
describe('GET /templates', () => {
  it('should retrieve all available templates', async () => {
    const res = await request.get('/templates');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});