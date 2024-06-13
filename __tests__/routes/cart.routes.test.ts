import request from 'supertest';
import express from 'express';
import cartRouter from '../../src/routes/cart.routes';  

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use(cartRouter);

describe('Cart Routes', () => {
  describe('GET /carts/user/:userId', () => {
    it('should return the user cart', async () => {
      const userId = '123';
      const response = await request(app).get(`/carts/user/${userId}`);
      expect(response.status).toBe(200);
    });
  });

  describe('PATCH /carts/:cartId', () => {
    it('should update the cart', async () => {
      const cartId = '456';
      const updateData = { /* Data to update */ };
      const response = await request(app)
        .patch(`/carts/${cartId}`)
        .send(updateData);
      expect(response.status).toBe(200);
    });
  });

  describe('DELETE /carts/:cartId', () => {
    it('should delete the cart', async () => {
      const cartId = '456';
      const response = await request(app).delete(`/carts/${cartId}`);
      expect(response.status).toBe(200);
    });
  });

  describe('POST /carts', () => {
    it('should add a new cart', async () => {
      const newCartData = { /* Data for new cart */ };
      const response = await request(app)
        .post('/carts')
        .send(newCartData);
      expect(response.status).toBe(201);
    });
  });
});

