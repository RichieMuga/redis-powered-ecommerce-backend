import request from 'supertest';
import express from 'express';
import categoryRouter from '../../src/routes/category.routes'; 

const app = express();
app.use(express.json()); 
app.use(categoryRouter);

describe('Category Routes', () => {
  describe('GET /categories', () => {
    it('should return all categories', async () => {
      const response = await request(app).get('/categories');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /products/category/:categoryName', () => {
    it('should return products in a specific category', async () => {
      const categoryName = 'electronics';
      const response = await request(app).get(`/products/category/${categoryName}`);
      expect(response.status).toBe(200);
    });
  });
});

