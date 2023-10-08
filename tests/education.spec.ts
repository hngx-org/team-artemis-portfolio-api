import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Education API endpoints', () => {
  let educationId: number;
  // Endpoint to Create Education section
  describe('POST api/education', () => {
    it('should create a new section', async () => {
      const res = await request
        .post('api/education')
        .send({
          fieldOfStudy: 'test field',
          school: 'test school',
          from: 2018,
          description: 'test school description',
          to: 2021,
        });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      educationId = res.body.id;
    });
  });

  // Endpoint to fetch Education section
  describe('Get api/education', () => {
    it('should fetch Education section', async () => {
      const res = await request
        .get('api/education');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to update education details
  describe('PUT /updateEducationDetail/:educationId', () => {
    it('should update Education section', async () => {
      const res = await request
        .put(`/updateEducationDetail/${educationId}`) 
        .send({ description: 'Another education description' });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete education section
  describe('DELETE api/education/:educationId', () => {
    it('should delete Education section', async () => {
      const initialEducation = await request.get('api/education');
      const res = await request
        .delete(`api/education/${educationId}`);
      expect(res.status).to.equal(204);
      // Verify that the section is deleted in the database
      const updatedEducation = await request.get('api/education');
      expect(updatedEducation.body.length).to.equal(initialEducation.body.length - 1);
    });
  });
});
