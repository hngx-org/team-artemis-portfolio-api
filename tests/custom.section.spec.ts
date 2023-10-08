import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Custom section API Endpoints', () => {
  let customSectionId; // editing and deleting custom sections

  // Endpoint to Create a Custom Section (Add Image, Text, etc.)
  describe('POST /custom-sections', () => {
    it('should create a new custom section', async () => {
      const res = await request
        .post('/custom-sections')
        .send({ userId: '', sectionId: null });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      customSectionId = res.body.id;
    });
  });

  // Endpoint to Edit a Custom Section (Add Image, Text, etc.)
  describe('PUT /custom-sections/:sectionId', () => {
    it('should edit an existing custom section', async () => {
      const res = await request
        .put(`/custom-sections/${customSectionId}`)
        .send({ userId: '', sectionId: null });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete a Custom Section (Add Image, Text, etc.)
  describe('DELETE /custom-sections/:customSectionId', () => {
    it('should delete an existing custom section', async () => {
      const initialCustomSections = await request.get('/custom-sections');
      const res = await request
        .delete(`/custom-sections/${customSectionId}`);
      expect(res.status).to.equal(204);
      // Verify that the custom section is deleted in the database
      const updatedCustomSections = await request.get('/custom-sections');
      expect(updatedCustomSections.body.length).to.equal(initialCustomSections.body.length - 1);
    });
  });
});
