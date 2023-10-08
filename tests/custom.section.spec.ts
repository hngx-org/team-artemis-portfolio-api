import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Custom section API Endpoints', () => {
  let customFieldId: number; // editing and deleting custom sections

  // Endpoint to Create a Custom Section (Add Image, Text, etc.)
  describe('POST api/custom-fields', () => {
    it('should create a new custom field', async () => {
      const res = await request
        .post('api/custom-fields')
        .send({
          fieldType: 'Test field type',
          fieldName: 'Test field name',
          value: 'Test value'
        });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      customFieldId = res.body.id;
    });
  });

    // Endpoint to fetch custom fields section
  describe('Get api/custom-fields', () => {
    it('should fetch Custom fields', async () => {
      const res = await request
        .get('api/custom-fields');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Edit a Custom fields Section (Add Image, Text, etc.)
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
  });
});
