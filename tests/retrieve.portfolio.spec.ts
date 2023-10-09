import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Portfolio API Endpoints', () => {
  // Endpoint to Retrieve the Entire Portfolio (with Sections) for a user
  describe('GET api/portfolio/:userId', () => {
    it('should retrieve the entire portfolio with sections for a user', async () => {
      const users = await request.get('https://hng6-r5y3.onrender.com/api/portfolio');
      const userId = users.body[0].id;
      const res = await request.get(`https://hng6-r5y3.onrender.com/api/portfolio/${userId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Retrieve the Entire Portfolio (with Sections)
  describe('GET api/portfolio', () => {
    it('should retrieve the entire portfolio with sections', async () => {
      const res = await request.get('https://hng6-r5y3.onrender.com/api/portfolio');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });
});
