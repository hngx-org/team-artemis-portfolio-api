import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Contact API endpoints', () => {
  let contactId: number;
  // Endpoint to Create Contact section
  describe('POST api/contact', () => {
    it('should create Contact section', async () => {
      const res = await request
        .post('api/contact')
        .send({ name: 'Contact', description: 'This is the contact section' });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      contactId = res.body.id;
    });
  });

  // Endpoint to fetch Contact section
  describe('Get api/contact', () => {
    it('should fetch contact section', async () => {
      const res = await request
        .get('api/contact');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to update Contact section
  describe('PUT api/contact/:contactId', () => {
    it('should update Contact section', async () => {
      const res = await request
        .put(`api/contact/${contactId}`) 
        .send({ description: 'Another contact description' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete Contact section
  describe('DELETE api/contact/:contactId', () => {
    it('should delete Contact section', async () => {
      const initialContacts = await request.get('api/contact');
      const res = await request
        .delete(`api/contact/${contactId}`);
      expect(res.status).to.equal(204);
      // Verify that the section is deleted in the database
      const updatedContacts = await request.get('api/contact');
      expect(updatedContacts.body.length).to.equal(initialContacts.body.length - 1);
    });
  });
});
