import { expect } from 'chai';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Project API endpoints', () => {
  let projectId: number;
  // Endpoint to Create Project section
  describe('POST api/projects', () => {
    it('should create Project section', async () => {
      const res = await request
        .post('api/projects')
        .send({
          title: 'test project',
          year: 2019,
          url: 'test url',
          tags: 'tag1 tag2',
          description: 'test description',
          thumbnail: 1,
        });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      projectId = res.body.id;
    });
  });

  // Endpoint to fetch project section
  describe('Get api/projects', () => {
    it('should fetch project section', async () => {
      const res = await request
        .get('api/projects');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to update Project section
  describe('PUT api/projects/:projectId', () => {
    it('should update Project section', async () => {
      const res = await request
        .put(`api/projects/${projectId}`) 
        .send({
          title: 'new title',
          description: 'Another project description'
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete Project section
  describe('DELETE api/projects/:projectId', () => {
    it('should delete Project section', async () => {
      const initialProjects = await request.get('api/projects');
      const res = await request
        .delete(`api/projects/${projectId}`);
      expect(res.status).to.equal(204);
      // Verify that the section is deleted in the database
      const updatedProjects = await request.get('api/projects');
      expect(updatedProjects.body.length).to.equal(initialProjects.body.length - 1);
    });
  });
});
