import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('About API endpoints', () => {
  let aboutId: number;
  // Endpoint to Create About me section
  describe('POST api/about', () => {
    it('should create About section', async () => {
      const res = await request
        .post('api/about')
        .send({ bio: 'test bio' });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      aboutId = res.body.id;
    });
  });

  // Endpoint to fetch About section
  describe('Get api/about', () => {
    it('should fetch About section', async () => {
      const res = await request
        .get('api/about');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to update About me section
  describe('PUT api/about/:aboutId', () => {
    it('should update About section', async () => {
      const res = await request
        .put(`api/about/${aboutId}`) 
        .send({ bio: 'Another bio' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete About section
  describe('DELETE api/about/:aboutId', () => {
    it('should delete About section', async () => {
      const initialAbouts = await request.get('api/about');
      const res = await request
        .delete(`api/about/${aboutId}`);
      expect(res.status).to.equal(204);
      // Verify that the section is deleted in the database
      const updatedAbouts = await request.get('api/about');
      expect(updatedAbouts.body.length).to.equal(initialAbouts.body.length - 1);
    });
  });
});
