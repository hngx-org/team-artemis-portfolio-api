import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Reference API endpoints', () => {
  let sectionId: number;
  // Endpoint to Create Reference section
  describe('POST /sections', () => {
    it('should create Reference section', async () => {
      const res = await request
        .post('/sections')
        .send({ name: 'Reference', description: 'This is reference section' });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      sectionId = res.body.id; // Store section ID for later tests
    });
  });

  // Endpoint to update Reference section
  describe('PUT /sections/:sectionId', () => {
    it('should update Reference section', async () => {
      const res = await request
        .put(`/sections/${sectionId}`) 
        .send({ description: 'Another reference description' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete Reference section
  describe('DELETE /sections/:sectionId', () => {
    it('should delete Reference section', async () => {
      const initialSections = await request.get('/sections');
      const res = await request
        .delete(`/sections/${sectionId}`);
      expect(res.status).to.equal(204);
      // Verify that the section is deleted in the database
      const updatedSections = await request.get('/sections');
      expect(updatedSections.body.length).to.equal(initialSections.body.length - 1);
    });
  });
});
