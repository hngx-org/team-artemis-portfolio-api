import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Skill API endpoints', () => {
  let skillId: number;
  // Endpoint to Create Skill section
  describe('POST api/skills', () => {
    it('should create Skill section', async () => {
      const res = await request
        .post('api/skills')
        .send({ categoryName: 'Test category', description: 'Test skill description' });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      skillId = res.body.id;
    });
  });

    // Endpoint to fetch Skill section
  describe('Get api/skills', () => {
    it('should fetch Skill section', async () => {
      const res = await request
        .get('api/skills');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to update Skill section
  describe('PUT api/skills/:skillId', () => {
    it('should update Skill section', async () => {
      const res = await request
        .put(`api/skills/${skillId}`) 
        .send({
          categoryName: 'Another category name',
          description: 'Another skill description'
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete Skill section
  describe('DELETE api/skills/:skillId', () => {
    it('should delete Skill section', async () => {
      const initialSkills = await request.get('api/skills');
      const res = await request
        .delete(`api/skills/${skillId}`);
      expect(res.status).to.equal(204);
      // Verify that the section is deleted in the database
      const updatedSkills = await request.get('api/skills');
      expect(updatedSkills.body.length).to.equal(initialSkills.body.length - 1);
    });
  });
});
