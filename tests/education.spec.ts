import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Education API endpoints', () => {
  let sectionId: number;
  // Endpoint to Create Education section
  describe('POST /sections', () => {
    it('should create a new section', async () => {
      const res = await request
        .post('/sections')
        .send({ name: 'Education', description: 'This is the education section' });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      sectionId = res.body.id; // Store section ID for later tests
    });
  });

  // Endpoint to update education details
  describe('PUT /updateEducationDetail/:sectionId', () => {
    it('should update Education section', async () => {
      const res = await request
        .put(`/updateEducationDetail/${sectionId}`) 
        .send({ description: 'Another education description' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete education section
  describe('DELETE /sections/:sectionId', () => {
    it('should delete Education section', async () => {
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
