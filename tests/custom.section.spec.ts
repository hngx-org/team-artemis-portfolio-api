import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Custom section API Endpoints', () => {
  let customSectionId;
  let customFieldId;

  // Endpoint to Create a Custom Section (Add Image, Text, etc.)
  describe('POST api/custom', () => {
    it('should create a new custom section', async () => {
      const users = await request.get('https://hng6-r5y3.onrender.com/api/portfolio');
      const userId = users.body[0].id;
      const res = await request
        .post('https://hng6-r5y3.onrender.com/api/custom')
        .send({
          userId,
          sectionId: 1
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      customSectionId = res.body.id;
    });
  });

  // Endpoint to Create a Custom field
  describe('POST api/custom/field', () => {
    it('should create a new custom field', async () => {
      const res = await request
        .post('https://hng6-r5y3.onrender.com/api/custom/field')
        .send({
          fieldType: 'Test field type',
          fieldName: 'Test field name',
          value: 'Test value',
          customSectionId
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      customFieldId = res.body.id;
    });
  });

  // Endpoint to fetch one custom field by Id
  describe('Get api/custom/field', () => {
    it('should fetch Custom field by Id', async () => {
      const res = await request
        .get(`https://hng6-r5y3.onrender.com/api/custom/field/${customFieldId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to fetch all custom sections
  describe('Get api/custom', () => {
    it('should fetch all Custom sections', async () => {
      const res = await request
        .get(`https://hng6-r5y3.onrender.com/api/custom`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  // Endpoint to Edit a Custom fields Section (Add Image, Text, etc.)
/*
  describe('PUT /custom-fields/:customFieldId', () => {
    it('should edit an existing custom field section', async () => {
      const res = await request
        .put(`/custom-fields/${customFieldId}`)
        .send({ fieldName: 'new field name' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete a Custom field Section (Add Image, Text, etc.)
  describe('DELETE api/custom-fields/:customFieldId', () => {
    it('should delete an existing custom field', async () => {
      const initialCustomFields = await request.get('api/custom-fields');
      const res = await request
        .delete(`api/custom-fields/${customFieldId}`);
      expect(res.status).to.equal(204);
      // Verify that the custom fields section is deleted in the database
      const updatedCustomFields = await request.get('api/custom-fields');
      expect(updatedCustomFields.body.length).to.equal(initialCustomFields.body.length - 1);
    });
  }); */
});
