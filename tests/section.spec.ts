const { expect } = chai;
const app = require('../src/server');
const request = require('supertest')(app);

describe('Portfolio API Endpoints', () => {
  let sectionId; // for editing and deleting sections
  let customSectionId; // editing and deleting custom sections

  // Endpoint to Retrieve the Entire Portfolio (with Sections)
  describe('GET /portfolio/:userId', () => {
    it('should retrieve the entire portfolio with sections for a user', async () => {
      const res = await request.get('/portfolio/123'); // Replace with a valid user ID
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.sections).to.be.an('array');
    });
  });

  // Endpoint to Create Sections (Work Experience, Projects, etc.)
  describe('POST /sections', () => {
    it('should create a new section', async () => {
      const res = await request
        .post('/sections')
        .send({ name: 'Work Experience', description: 'This is work experience' });
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
        .send({ name: 'Another section name', description: 'Another description' });
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

  // Endpoint to Fetch All Templates
  describe('GET /templates', () => {
    it('should retrieve all available templates', async () => {
      const res = await request.get('/templates');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

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
