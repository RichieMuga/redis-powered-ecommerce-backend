import request from 'supertest';
import express from 'express';
import baseRouter from '../../src/routes/base.routes';

const app = express();
app.use(baseRouter);

describe('Base Routes', () => {
  it('should return the status', async () => {
    const response = await request(app).get('/api/v1/status');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'success', message:"Server is running" });
  });
});

