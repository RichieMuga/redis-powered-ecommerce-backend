import { Request, Response, NextFunction } from "express";
import { getAllCategories, getProductsInSpecificCategory } from "../../src/controllers/category.controller";
import { fetchAllCategories, fetchProductsInSpecificCategory } from "../../src/helpers/category.service";
import { getCache, setCache } from "../../src/helpers/cache.service";

jest.mock("../../src/helpers/category.service");
jest.mock("../../src/helpers/cache.service");

describe('Category Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockRequest = {
      params: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNextFunction = jest.fn();
  });

  describe('getAllCategories', () => {
    it('should return cached categories if available', async () => {
      const categories = [{ id: '1', name: 'Electronics' }];
      (getCache as jest.MockedFunction<typeof getCache>).mockResolvedValueOnce(JSON.stringify(categories));

      await getAllCategories(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(categories);
    });

    it('should fetch categories, cache them, and return them if not cached', async () => {
      const categories = [{ id: '1', name: 'Electronics' }];
      (getCache as jest.MockedFunction<typeof getCache>).mockResolvedValueOnce(null);
      (fetchAllCategories as jest.MockedFunction<typeof fetchAllCategories>).mockResolvedValueOnce(categories);

      await getAllCategories(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(fetchAllCategories).toHaveBeenCalled();
      expect(setCache).toHaveBeenCalledWith('category:all', categories);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(categories);
    });

    it('should call next with error on failure', async () => {
      const error = new Error('Failed to fetch categories');
      (getCache as jest.MockedFunction<typeof getCache>).mockRejectedValueOnce(error);

      await getAllCategories(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(error);
    });
  });
  describe('getProductsInSpecificCategory', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNextFunction: jest.MockedFunction<NextFunction>;

    beforeEach(() => {
      mockRequest = {
        params: {}
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      mockNextFunction = jest.fn();
    });

    it('should return cached products if available', async () => {
      const products = [{ id: '1', name: 'Laptop' }];
      mockRequest.params = { categoryName: 'Electronics' }; // Ensure params is defined
      (getCache as jest.MockedFunction<typeof getCache>).mockResolvedValueOnce(JSON.stringify(products));

      await getProductsInSpecificCategory(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(products);
    });

    it('should fetch products, cache them, and return them if not cached', async () => {
      const products = [{ id: '1', name: 'Laptop' }];
      mockRequest.params = { categoryName: 'Electronics' }; // Ensure params is defined
      (getCache as jest.MockedFunction<typeof getCache>).mockResolvedValueOnce(null);
      (fetchProductsInSpecificCategory as jest.MockedFunction<typeof fetchProductsInSpecificCategory>).mockResolvedValueOnce(products);

      await getProductsInSpecificCategory(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(fetchProductsInSpecificCategory).toHaveBeenCalledWith('Electronics');
      expect(setCache).toHaveBeenCalledWith('category:Electronics', products);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(products);
    });

    it('should call next with error on failure', async () => {
      const error = new Error('Failed to fetch products');
      mockRequest.params = { categoryName: 'Electronics' }; // Ensure params is defined
      (getCache as jest.MockedFunction<typeof getCache>).mockRejectedValueOnce(error);

      await getProductsInSpecificCategory(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(error);
    });
  });
})
