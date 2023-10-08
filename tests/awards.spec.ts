import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Awards API endpoints', () => {
  let awardId: number;
  // Endpoint to Create Awards section
  describe('POST api/awards', () => {
    it('should create Awards section', async () => {
      const res = await request
        .post('api/awards')
        .send({ name: 'Awards', description: 'This is the awards section' });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      awardId = res.body.id;
    });
  });

  // Endpoint to fetch Work Experience section
  describe('Get api/awards', () => {
    it('should fetch Awards section', async () => {
      const res = await request
        .get('api/awards');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to update Awards section
  describe('PUT api/awards/:awardId', () => {
    it('should update Awards section', async () => {
      const res = await request
        .put(`api/awards/${awardId}`) 
        .send({ description: 'Another awards description' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete Awards section
  describe('DELETE api/awards/:awardId', () => {
    it('should delete an existing section', async () => {
      const initialAwards = await request.get('api/awards');
      const res = await request
        .delete(`api/awards/${awardId}`);
      expect(res.status).to.equal(204);
      // Verify that the section is deleted in the database
      const updatedAwards = await request.get('api/awards');
      expect(updatedAwards.body.length).to.equal(initialAwards.body.length - 1);
    });
  });
});
