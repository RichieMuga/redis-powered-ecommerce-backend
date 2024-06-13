import { Request, Response, NextFunction } from "express";
import {
  getUserCart,
  addCart,
  deleteCart,
  updateCart,
} from "../../src/controllers/cart.controller";
import {
  fetchUserCart,
  updateCartById,
  deleteCartById,
  addNewCart,
} from "../../src/helpers/cart.service";
import {
  getCache,
  setCache,
  deleteCache,
} from "../../src/helpers/cache.service";

jest.mock("../../src/helpers/cart.service", () => ({
  fetchUserCart: jest.fn(),
  updateCartById: jest.fn(),
  deleteCartById: jest.fn(),
  addNewCart: jest.fn(),
}));

jest.mock("../../src/helpers/cache.service", () => ({
  getCache: jest.fn(),
  setCache: jest.fn(),
  deleteCache: jest.fn(),
}));

describe("Cart Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNextFunction = jest.fn();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserCart", () => {
    it("should return cached user cart", async () => {
      const userId = "1234";
      const cachedData = JSON.stringify({ items: [] });
      mockRequest.params = { userId };
      (getCache as jest.MockedFunction<typeof getCache>).mockResolvedValueOnce(
        cachedData,
      );

      await getUserCart(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(JSON.parse(cachedData));
      expect(setCache).not.toHaveBeenCalled();
    });

    it("should fetch and cache user cart if not cached", async () => {
      const userId = "1234";
      const userCart = { items: [] };
      mockRequest.params = { userId };
      (getCache as jest.MockedFunction<typeof getCache>).mockResolvedValueOnce(
        null,
      );
      (
        fetchUserCart as jest.MockedFunction<typeof fetchUserCart>
      ).mockResolvedValueOnce(userCart);

      await getUserCart(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(userCart);
      expect(setCache).toHaveBeenCalled();
    });

    it("should call next with error on failure", async () => {
      const userId = "1234";
      const error = new Error("Failed to get user cart");
      mockRequest.params = { userId }; // Set the params property
      (getCache as jest.MockedFunction<typeof getCache>).mockRejectedValueOnce(
        error,
      );

      await getUserCart(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction,
      );

      expect(mockNextFunction).toHaveBeenCalledWith(error);
    });
  });

  describe('addCart', () => {
    it('should add new cart and invalidate cache', async () => {
      const newCart = { id: '789', userId: '1', items: [] };
      mockRequest.body = { userId: '123', items: [] };
      (addNewCart as jest.MockedFunction<typeof addNewCart>).mockResolvedValueOnce(newCart);

      await addCart(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'cart added successfully' });
      expect(deleteCache).toHaveBeenCalledTimes(2);
    });

    it('should call next with error on failure', async () => {
      const error = new Error('Failed to add cart');
      (addNewCart as jest.MockedFunction<typeof addNewCart>).mockRejectedValueOnce(error);

      mockRequest.body = { userId: '123', items: [] };  // Ensure userId is set

      await addCart(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(error);
    });
  });


  describe('deleteCart', () => {
    it('should delete cart and invalidate cache', async () => {
      const cartId = '456';
      mockRequest.params = { cartId };
      (deleteCartById as jest.MockedFunction<typeof deleteCartById>).mockResolvedValueOnce(deleteCart);

      await deleteCart(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Cart deleted successfully' });
      expect(deleteCache).toHaveBeenCalledTimes(2);
    });

    it('should call next with error on failure', async () => {
      const cartId = '456';
      const error = new Error('Failed to delete cart');
      mockRequest.params = { cartId };
      (deleteCartById as jest.MockedFunction<typeof deleteCartById>).mockRejectedValueOnce(error);

      await deleteCart(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(error);
    });
  });

  describe('updateCart', () => {
    it('should update cart and invalidate cache', async () => {
      const cartId = '456';
      const updatedCart = { id: '456', items: [{ id: '1', quantity: 2 }] };
      mockRequest.params = { cartId };
      mockRequest.body = { items: [{ id: '1', quantity: 2 }] };
      (updateCartById as jest.MockedFunction<typeof updateCartById>).mockResolvedValueOnce(updatedCart);

      await updateCart(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedCart);
      expect(deleteCache).toHaveBeenCalledTimes(2);
    });

    it('should call next with error on failure', async () => {
      const cartId = '456';
      const error = new Error('Failed to update cart');
      mockRequest.params = { cartId };
      (updateCartById as jest.MockedFunction<typeof updateCartById>).mockRejectedValueOnce(error);

      await updateCart(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(error);
    });
  });

});
