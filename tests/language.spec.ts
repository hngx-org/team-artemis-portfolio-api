import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Language API endpoints', () => {
  let langId: number;
  // Endpoint to Create Language section
  describe('POST api/languages', () => {
    it('should create Language section', async () => {
      const res = await request
        .post('api/languages')
        .send({ name: 'Language', description: 'This is the language section' });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      langId = res.body.id;
    });
  });

    // Endpoint to fetch Work Experience section
  describe('Get api/languages', () => {
    it('should Language section', async () => {
      const res = await request
        .get('api/languages');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to update Language section
  describe('PUT api/languages/:langId', () => {
    it('should update Language section', async () => {
      const res = await request
        .put(`api/languages/${langId}`) 
        .send({ description: 'Another language description' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete Language section
  describe('DELETE api/languages/:langId', () => {
    it('should delete Language section', async () => {
      const initialLanguages = await request.get('api/languages');
      const res = await request
        .delete(`api/languages/${langId}`);
      expect(res.status).to.equal(204);
      // Verify that the section is deleted in the database
      const updatedLanguages = await request.get('api/languages');
      expect(updatedLanguages.body.length).to.equal(initialLanguages.body.length - 1);
    });
  });
});
