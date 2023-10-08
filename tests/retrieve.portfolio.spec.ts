import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

// Endpoint to Retrieve the Entire Portfolio (with Sections)
describe('GET /portfolio/:userId', () => {
  it('should retrieve the entire portfolio with sections for a user', async () => {
    const users = await request.get('api/portfolio');
    const userId = users.body[0].id;
    const res = await request.get(`api/portfolio/${userId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
  });
});