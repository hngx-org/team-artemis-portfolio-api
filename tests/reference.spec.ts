import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Reference API endpoints', () => {
  let refId: number;
  // Endpoint to Create Reference section
  describe('POST api/references', () => {
    it('should create Reference section', async () => {
      const res = await request
        .post('api/references')
        .send({ name: 'Reference', description: 'This is reference section' });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      refId = res.body.id;
    });
  });

    // Endpoint to fetch Reference section
  describe('Get api/references', () => {
    it('should fetch Reference section', async () => {
      const res = await request
        .get('api/references');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to update Reference section
  describe('PUT api/references/:refId', () => {
    it('should update Reference section', async () => {
      const res = await request
        .put(`api/references/${refId}`) 
        .send({ description: 'Another reference description' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete Reference section
  describe('DELETE api/references/:refId', () => {
    it('should delete Reference section', async () => {
      const initialReferences = await request.get('api/references');
      const res = await request
        .delete(`api/references/${refId}`);
      expect(res.status).to.equal(204);
      // Verify that the section is deleted in the database
      const updatedReferences = await request.get('api/references');
      expect(updatedReferences.body.length).to.equal(initialReferences.body.length - 1);
    });
  });
});
