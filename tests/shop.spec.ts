import { expect } from 'chai';
import { normalize } from 'path';
import supertest from 'supertest';
const app = require('../src/server');
const request = supertest(app);

describe('Shop API endpoints', () => {
  let shopId: number;
  // Endpoint to Create Shop section
  describe('POST api/shops', () => {
    it('should create Shop section', async () => {
      const res = await request
        .post('api/shops')
        .send({
          name: 'test shop',
          policyConfirmation: true,
          reviewed: false,
          rating: 6,
        });
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      shopId = res.body.id;
    });
  });

    // Endpoint to fetch Shop section
  describe('Get api/shops', () => {
    it('should fetch Shop section', async () => {
      const res = await request
        .get('api/shops');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to update Shop section
  describe('PUT api/shops/:shopId', () => {
    it('should update Shop section', async () => {
      const res = await request
        .put(`api/shop/${shopId}`) 
        .send({
          name: 'Another shop',
          rating: 5
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
  });

  // Endpoint to Delete Shop section
  describe('DELETE api/shops/:shopId', () => {
    it('should delete Shop section', async () => {
      const initialShops = await request.get('api/shops');
      const res = await request
        .delete(`api/shops/${shopId}`);
      expect(res.status).to.equal(204);
      // Verify that the section is deleted in the database
      const updatedShops = await request.get('api/shops');
      expect(updatedShops.body.length).to.equal(initialShops.body.length - 1);
    });
  });
});
