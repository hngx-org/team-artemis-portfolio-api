import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Work experience API endpoints', () => {
  let workId: number;
  // Endpoint to Create Work Experience section
  describe('POST api/work-experience', () => {
    it('should create Work Experience section', async () => {
      const res = await request
        .post('api/work-experience')
        .send({
          role: 'test role',
          company: 'First company',
          description: 'Test description',
          startMonth: 'January',
          startYear: 2018,
          endMonth: 'June',
          endYear: 2020,
          isEmployee: true,
        });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      workId = res.body.id;
    });
  });

  // Endpoint to fetch Work Experience section
  describe('Get api/work-experience', () => {
    it('should fetch Work Experience section', async () => {
      const res = await request
        .get('api/work-experience');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to update Work Experience section
  describe('PUT api/work-experience/:workId', () => {
    it('should update Work Experience section', async () => {
      const res = await request
        .put(`api/work-experience/${workId}`) 
        .send({ company: 'new company', description: 'Another description' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete Work Experience section
  describe('DELETE api/work-experience/:sectionId', () => {
    it('should delete Work Experience section', async () => {
      const initialWork = await request.get('api/work-experience');
      const res = await request
        .delete(`api/work-experience/${workId}`);
      expect(res.status).to.equal(204);
      // Verify that the section is deleted in the database
      const updatedWork = await request.get('api/work-experience');
      expect(updatedWork.body.length).to.equal(initialWork.body.length - 1);
    });
  });
});
