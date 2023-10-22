import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Interests API endpoints', () => {
  let interestId: number;
  // Endpoint to Create Interests section
  describe('POST api/interests', () => {
    it('should create Interests section', async () => {
      const res = await request
        .post('api/interests')
        .send({ interest: 'test interesst' });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      interestId = res.body.id;
    });
  });

    // Endpoint to fetch Interests section
  describe('Get /interests', () => {
    it('should fetch Interests section', async () => {
      const res = await request
        .get('api/interests');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to update Interests section
  describe('PUT api/interests/:interestId', () => {
    it('should update Interests section', async () => {
      const res = await request
        .put(`api/interests/${interestId}`) 
        .send({ interest: 'Another interest' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete Interests section
  describe('DELETE /interests/:interestId', () => {
    it('should delete Interests section', async () => {
      const initialInterests = await request.get('api/interests');
      const res = await request
        .delete(`api/interests/${interestId}`);
      expect(res.status).to.equal(204);
      // Verify that the section is deleted in the database
      const updatedInterests = await request.get('api/interests');
      expect(updatedInterests.body.length).to.equal(initialInterests.body.length - 1);
    });
  });
});
