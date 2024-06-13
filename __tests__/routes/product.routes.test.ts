import request from 'supertest';
import express from 'express';
import productRouter from '../../src/routes/product.routes';

const app = express();
app.use(express.json());
app.use(productRouter);

describe('Product Routes', () => {
  describe('GET /products', () => {
    it('should return all products', async () => {
      const response = await request(app).get('/products');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /products/:productId', () => {
    it('should return a single product by ID', async () => {
      const productId = '1';
      const response = await request(app).get(`/products/${productId}`);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /products/:productId/interactions', () => {
    it('should return interactions for a specific product', async () => {
      const productId = '1';
      const response = await request(app).get(`/products/${productId}/interactions`);
      expect(response.status).toBe(200);
    });
  });

  describe('PATCH /products/:productId', () => {
    it('should update the product', async () => {
      const productId = '1';
      const updateData = {
        "title": "test product",
        "price": 13.5,
        "description": "lorem ipsum set",
        "image": "https://i.pravatar.cc",
        "category": "electronic"
      }
      const response = await request(app)
        .patch(`/products/${productId}`)
        .send(updateData);
      expect(response.status).toBe(200);
    });
  });

  describe('DELETE /products/:productId', () => {
    it('should delete the product', async () => {
      const productId = '1';
      const response = await request(app).delete(`/products/${productId}`);
      expect(response.status).toBe(200);
    });
  });

  describe('POST /products', () => {
    it('should add a new product', async () => {
      const newProductData = {
        "title": "test product",
        "price": 13.5,
        "description": "lorem ipsum set",
        "image": "https://i.pravatar.cc",
        "category": "electronic"
      }
      const response = await request(app)
        .post('/products')
        .send(newProductData);
      expect(response.status).toBe(201);
    });
  });
});

