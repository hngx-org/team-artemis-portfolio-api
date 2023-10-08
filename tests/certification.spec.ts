import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Certification API endpoints', () => {
  let certId: number;
  // Endpoint to Create Certification section
  describe('POST api/certifications', () => {
    it('should create Certification section', async () => {
      const res = await request
        .post('api/certifications')
        .send({ name: 'Certification', description: 'This is the certification section' });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      certId = res.body.id;
    });
  });

  // Endpoint to fetch certification section
  describe('Get api/certifications', () => {
    it('should fetch certification section', async () => {
      const res = await request
        .get('api/certifications');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to update Certification section
  describe('PUT api/certifications/:certId', () => {
    it('should update Certification section', async () => {
      const res = await request
        .put(`api/certifications/${certId}`) 
        .send({ description: 'Another certification description' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete Certification sectio
  describe('DELETE api/certifications/:certId', () => {
    it('should delete Certification section', async () => {
      const initialCerts = await request.get('api/certifications');
      const res = await request
        .delete(`api/certifications/${certId}`);
      expect(res.status).to.equal(204);
      // Verify that the section is deleted in the database
      const updatedCerts = await request.get('api/certifications');
      expect(updatedCerts.body.length).to.equal(initialCerts.body.length - 1);
    });
  });
});
