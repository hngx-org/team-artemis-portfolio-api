import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Interests API endpoints', () => {
  let sectionId: number;
  // Endpoint to Create Interests section
  describe('POST /sections', () => {
    it('should create Interests section', async () => {
      const res = await request
        .post('/sections')
        .send({ name: 'Experience', description: 'This is the experience section' });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      sectionId = res.body.id; // Store section ID for later tests
    });
  });

  // Endpoint to update Interests section
  describe('PUT /sections/:sectionId', () => {
    it('should update Interests section', async () => {
      const res = await request
        .put(`/sections/${sectionId}`) 
        .send({ description: 'Another experience description' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete Interests section
  describe('DELETE /sections/:sectionId', () => {
    it('should delete Interests section', async () => {
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
