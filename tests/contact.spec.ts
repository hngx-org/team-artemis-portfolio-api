import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Contact API endpoints', () => {
  let contactId: number;
  // Endpoint to Create Contact section
  describe('POST api/contacts', () => {
    it('should create Contact section', async () => {
      const socialUsers = await request.get('https://hng6-r5y3.onrender.com/api/social-user'); // social user endpoint not seen/implemented
      const { url, user_id, social_media_id } = socialUsers.body[0];
      const res = await request
        .post('https://hng6-r5y3.onrender.com/api/contacts')
        .send({
          url,
          userId: user_id,
          socialMediaId: social_media_id
        });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      contactId = res.body.id;
    });
  });

  // Endpoint to fetch contacts for a specific user
  describe('Get api/contacts', () => {
    it('should fetch contact section', async () => {
      const users = await request.get('https://hng6-r5y3.onrender.com/api/portfolio');
      const userId = users.body[0].id;
      const res = await request
        .get(`api/contacts/${userId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  /*  Endpoints Not yet implemented
  // Endpoint to update Contact section
  describe('PUT api/contacts/:contactId', () => {
    it('should update Contact section', async () => {
      const res = await request
        .put(`api/contacts/${contactId}`) 
        .send({ description: 'Another contact description' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete Contact section
  describe('DELETE api/contacts/:contactId', () => {
    it('should delete Contact section', async () => {
      const initialContacts = await request.get('api/contacts');
      const res = await request
        .delete(`api/contacts/${contactId}`);
      expect(res.status).to.equal(204);
      // Verify that the section is deleted in the database
      const updatedContacts = await request.get('api/contacts');
      expect(updatedContacts.body.length).to.equal(initialContacts.body.length - 1);
    });
  }); */
});
