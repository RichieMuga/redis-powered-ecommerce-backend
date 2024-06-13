import request from 'supertest';
import express from 'express';
import userRouter from '../../src/routes/user.routes';  

const app = express();
app.use(express.json()); 
app.use(userRouter);

describe('User Routes', () => {
  describe('GET /users/:userId', () => {
    it('should return user details', async () => {
      const userId = '1';
      const response = await request(app).get(`/users/${userId}`);
      expect(response.status).toBe(200);
    });
  });

  describe('DELETE /users/:userId', () => {
    it('should delete the user', async () => {
      const userId = '1';
      const response = await request(app).delete(`/users/${userId}`);
      expect(response.status).toBe(200);
    });
  });

  describe('PATCH /users/:userId', () => {
    it('should update user details', async () => {
      const userId = '1';
      const updateData = { /* Data to update */ };
      const response = await request(app)
        .patch(`/users/${userId}`)
        .send(updateData);
      expect(response.status).toBe(200);
    });
  });

  describe('POST /users', () => {
    it('should add a new user', async () => {
      const newUserData = { /* Data for new user */ };
      const response = await request(app)
        .post('/users')
        .send(newUserData);
      expect(response.status).toBe(201);
    });
  });
});

