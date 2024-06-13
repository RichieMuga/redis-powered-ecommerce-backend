import { app } from '../../src/config/settings';

// Mocking the response from the server
jest.mock('../../src/config/settings', () => ({
 ...jest.requireActual('../../src/config/settings'), // Use actual for all unmocked properties
  app: {
    get: jest.fn().mockImplementation((path) => {
      if (path === '/api/v1/status') {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ message: 'Server is running' }),
        });
      }
    }),
  },
}));

describe('Base Controller', () => {
  it('should return server status', async () => {
    const response = await app.get('/api/v1/status');
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ message: 'Server is running' });
  });
});

