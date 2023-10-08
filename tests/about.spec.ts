import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('About API endpoints', () => {
  let sectionId: number;
  // Endpoint to Create About me section
  describe('POST /sections', () => {
    it('should create About me section', async () => {
      const res = await request
        .post('/sections')
        .send({ name: 'About me', description: 'This is the about me section' });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      sectionId = res.body.id; // Store section ID for later tests
    });
  });

  // Endpoint to update About me section
  describe('PUT /sections/:sectionId', () => {
    it('should update About me section', async () => {
      const res = await request
        .put(`/sections/${sectionId}`) 
        .send({ description: 'Another about me description' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete About me section
  describe('DELETE /sections/:sectionId', () => {
    it('should delete About me section', async () => {
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
