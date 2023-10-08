import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Language API endpoints', () => {
  let sectionId: number;
  // Endpoint to Create Sections (Work Experience, Projects, etc.)
  describe('POST /sections', () => {
    it('should create a new section', async () => {
      const res = await request
        .post('/sections')
        .send({ name: 'Language', description: 'This is the language section' });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      sectionId = res.body.id; // Store section ID for later tests
    });
  });

  // Endpoint to Edit Sections (Work Experience, Projects, etc.)
  describe('PUT /sections/:sectionId', () => {
    it('should edit an existing section', async () => {
      const res = await request
        .put(`/sections/${sectionId}`) 
        .send({ description: 'Another language description' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete Sections (Work Experience, Projects, etc.)
  describe('DELETE /sections/:sectionId', () => {
    it('should delete an existing section', async () => {
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
