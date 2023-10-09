import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Skill API endpoints', () => {
  let skillId: number;
  // Endpoint to Create skills
  describe('POST api/create-skills', () => {
    it('should create skills', async () => {
      const users = await request.get('https://hng6-r5y3.onrender.com/api/portfolio');
      const userId = users.body[0].id;
      const res = await request
        .post('https://hng6-r5y3.onrender.com/api/create-skills')
        .send({
          skills: 'test skill',
          sectionId: 1,
          userId
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      skillId = res.body.id;
    });
  });

    // Endpoint to fetch skills
  describe('Get api/skills-details', () => {
    it('should fetch skills', async () => {
      const res = await request
        .get('https://hng6-r5y3.onrender.com/api/skills-details');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  // Endpoint to update skills
  describe('PUT api/update-skills/:skillId', () => {
    it('should update skills', async () => {
      const res = await request
        .put(`https://hng6-r5y3.onrender.com/api/update-skills/${skillId}`) 
        .send({
          skills: 'Another test skill'
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete skills
  describe('DELETE api/delete-skills/:skillId', () => {
    it('should delete skills', async () => {
      const initialSkills = await request.get('https://hng6-r5y3.onrender.com/api/skills-details');
      const res = await request
        .delete(`https://hng6-r5y3.onrender.com/api/delete-skills/${skillId}`);
      expect(res.status).to.equal(200);
      // Verify that the section is deleted in the database
      const updatedSkills = await request.get('https://hng6-r5y3.onrender.com/api/skills-details');
      expect(updatedSkills.body.length).to.equal(initialSkills.body.length - 1);
    });
  });
});
