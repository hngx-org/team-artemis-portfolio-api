import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Skill API endpoints', () => {
  let sectionId: number;
  // Endpoint to Create Skill section
  describe('POST /sections', () => {
    it('should create Skill section', async () => {
      const res = await request
        .post('/sections')
        .send({ name: 'Skill', description: 'This is skill section' });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      sectionId = res.body.id; // Store section ID for later tests
    });
  });

  // Endpoint to update Skill section
  describe('PUT /sections/:sectionId', () => {
    it('should update Skill section', async () => {
      const res = await request
        .put(`/sections/${sectionId}`) 
        .send({ description: 'Another skill description' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete Skill section
  describe('DELETE /sections/:sectionId', () => {
    it('should delete Skill section', async () => {
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
