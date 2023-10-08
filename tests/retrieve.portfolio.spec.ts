import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

// Endpoint to Retrieve the Entire Portfolio (with Sections)
describe('GET /portfolio/:userId', () => {
  it('should retrieve the entire portfolio with sections for a user', async () => {
    const res = await request.get('/portfolio/123'); // replace with valid user id
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.sections).to.be.an('array');
  });
});