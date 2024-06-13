import { Request, Response, NextFunction } from 'express';
import { getUserDetails, deleteUser, updateUser, addUser } from '../../src/controllers/user.controller';
import { fetchUserData, deleteUserById, addNewUser, updateUserById } from '../../src/helpers/user.service';
import { getCache, setCache, deleteCache } from '../../src/helpers/cache.service';

jest.mock('../../src/helpers/user.service');
jest.mock('../../src/helpers/cache.service');

describe('User Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockRequest = {
      params: {},
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNextFunction = jest.fn();
  });

  describe('getUserDetails', () => {
    it('should return cached user data if available', async () => {
      const userData = { id: '1', name: 'John Doe' };
      mockRequest.params = { userId: '1' };
      (getCache as jest.MockedFunction<typeof getCache>).mockResolvedValueOnce(JSON.stringify(userData));

      await getUserDetails(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(userData);
    });

    it('should fetch user data, cache it, and return it if not cached', async () => {
      const userData = { id: '1', name: 'John Doe', password: 'secret', address: { geolocation: 'xyz', zipcode: '12345', number: '678' } };
      const userDataToCache = { id: '1', name: 'John Doe', password: undefined, address: { geolocation: undefined, zipcode: undefined, number: undefined } };
      mockRequest.params = { userId: '1' };
      (getCache as jest.MockedFunction<typeof getCache>).mockResolvedValueOnce(null);
      (fetchUserData as jest.MockedFunction<typeof fetchUserData>).mockResolvedValueOnce(userData);

      await getUserDetails(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(fetchUserData).toHaveBeenCalledWith('1');
      expect(setCache).toHaveBeenCalledWith('user:1', userDataToCache);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(userDataToCache);
    });

    it('should call next with error on failure', async () => {
      const error = new Error('Failed to fetch user data');
      mockRequest.params = { userId: '1' };
      (getCache as jest.MockedFunction<typeof getCache>).mockRejectedValueOnce(error);

      await getUserDetails(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteUser', () => {
    it('should delete user, invalidate caches, and return success message', async () => {
      mockRequest.params = { userId: '1' };
      (deleteUserById as jest.MockedFunction<typeof deleteUserById>).mockResolvedValueOnce(undefined);

      await deleteUser(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(deleteUserById).toHaveBeenCalledWith('1');
      expect(deleteCache).toHaveBeenCalledWith('user:1');
      expect(deleteCache).toHaveBeenCalledWith('carts:all');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    it('should call next with error on failure', async () => {
      const error = new Error('Failed to delete user');
      mockRequest.params = { userId: '1' };
      (deleteUserById as jest.MockedFunction<typeof deleteUserById>).mockRejectedValueOnce(error);

      await deleteUser(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(error);
    });
  });

  describe('updateUser', () => {
    it('should update user, invalidate caches, and return updated user', async () => {
      const updatedUser = { id: '1', name: 'Updated John Doe' };
      mockRequest.params = { userId: '1' };
      mockRequest.body = { name: 'Updated John Doe' };
      (updateUserById as jest.MockedFunction<typeof updateUserById>).mockResolvedValueOnce(updatedUser);

      await updateUser(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(updateUserById).toHaveBeenCalledWith('1', mockRequest.body);
      expect(deleteCache).toHaveBeenCalledWith('user:1');
      expect(deleteCache).toHaveBeenCalledWith('users:all');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedUser);
    });

    it('should call next with error on failure', async () => {
      const error = new Error('Failed to update user');
      mockRequest.params = { userId: '1' };
      mockRequest.body = { name: 'Updated John Doe' };
      (updateUserById as jest.MockedFunction<typeof updateUserById>).mockRejectedValueOnce(error);

      await updateUser(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(error);
    });
  });

  describe('addUser', () => {
    it('should add user, invalidate caches, and return success message', async () => {
      const newUser = { id: '2', name: 'Jane Doe' };
      mockRequest.body = { name: 'Jane Doe' };
      (addNewUser as jest.MockedFunction<typeof addNewUser>).mockResolvedValueOnce(newUser);

      await addUser(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(addNewUser).toHaveBeenCalledWith(mockRequest.body);
      expect(deleteCache).toHaveBeenCalledWith('carts:all');
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'user created successfully' });
    });

    it('should call next with error on failure', async () => {
      const error = new Error('Failed to add user');
      mockRequest.body = { name: 'Jane Doe' };
      (addNewUser as jest.MockedFunction<typeof addNewUser>).mockRejectedValueOnce(error);

      await addUser(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(error);
    });
  });
});

