import { Request, Response, NextFunction } from 'express';
import { getProducts, getSingleProductById, updateProduct, deleteProduct, addProduct } from '../../src/controllers/product.controller';
import { fetchProducts, fetchProductsById, updateProductById, deleteProductById, addNewProduct } from '../../src/helpers/product.service';
import { getCache, setCache, deleteCache } from '../../src/helpers/cache.service';

jest.mock('../../src/helpers/product.service');
jest.mock('../../src/helpers/cache.service');

describe('Product Controller', () => {
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

  describe('getProducts', () => {
    it('should return cached products if available', async () => {
      const products = [{ id: '1', name: 'Laptop' }];
      (getCache as jest.MockedFunction<typeof getCache>).mockResolvedValueOnce(JSON.stringify(products));

      await getProducts(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(products);
    });

    it('should fetch products, cache them, and return them if not cached', async () => {
      const products = [{ id: '1', name: 'Laptop' }];
      (getCache as jest.MockedFunction<typeof getCache>).mockResolvedValueOnce(null);
      (fetchProducts as jest.MockedFunction<typeof fetchProducts>).mockResolvedValueOnce(products);

      await getProducts(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(fetchProducts).toHaveBeenCalled();
      expect(setCache).toHaveBeenCalledWith('products:all', products);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(products);
    });

    it('should call next with error on failure', async () => {
      const error = new Error('Failed to fetch products');
      (getCache as jest.MockedFunction<typeof getCache>).mockRejectedValueOnce(error);

      await getProducts(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(error);
    });
  });

  describe('getSingleProductById', () => {
    it('should return cached product if available', async () => {
      const product = { id: '1', name: 'Laptop' };
      mockRequest.params = { productId: '1' };
      (getCache as jest.MockedFunction<typeof getCache>).mockResolvedValueOnce(JSON.stringify(product));

      await getSingleProductById(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(product);
    });

    it('should fetch product, cache it, and return it if not cached', async () => {
      const product = { id: '1', name: 'Laptop' };
      mockRequest.params = { productId: '1' };
      (getCache as jest.MockedFunction<typeof getCache>).mockResolvedValueOnce(null);
      (fetchProductsById as jest.MockedFunction<typeof fetchProductsById>).mockResolvedValueOnce(product);

      await getSingleProductById(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(fetchProductsById).toHaveBeenCalledWith('1');
      expect(setCache).toHaveBeenCalledWith('product:1', product);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(product);
    });

    it('should call next with error on failure', async () => {
      const error = new Error('Failed to fetch product');
      mockRequest.params = { productId: '1' };
      (getCache as jest.MockedFunction<typeof getCache>).mockRejectedValueOnce(error);

      await getSingleProductById(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(error);
    });
  });

  describe('updateProduct', () => {
    it('should update product, invalidate caches, and return updated product', async () => {
      const updatedProduct = { id: '1', name: 'Updated Laptop', category: 'Electronics' };
      mockRequest.params = { productId: '1' };
      mockRequest.body = { name: 'Updated Laptop', category: 'Electronics' };
      (updateProductById as jest.MockedFunction<typeof updateProductById>).mockResolvedValueOnce(updatedProduct);

      await updateProduct(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(updateProductById).toHaveBeenCalledWith('1', mockRequest.body);
      expect(deleteCache).toHaveBeenCalledWith('product:1');
      expect(deleteCache).toHaveBeenCalledWith('products:all');
      expect(deleteCache).toHaveBeenCalledWith('category:Electronics');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedProduct);
    });

    it('should call next with error on failure', async () => {
      const error = new Error('Failed to update product');
      mockRequest.params = { productId: '1' };
      mockRequest.body = { name: 'Updated Laptop', category: 'Electronics' };
      (updateProductById as jest.MockedFunction<typeof updateProductById>).mockRejectedValueOnce(error);

      await updateProduct(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteProduct', () => {
    it('should delete product, invalidate caches, and return success message', async () => {
      const product = { id: '1', category: 'Electronics' };
      mockRequest.params = { productId: '1' };
      (deleteProductById as jest.MockedFunction<typeof deleteProductById>).mockResolvedValueOnce(product);

      await deleteProduct(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(deleteProductById).toHaveBeenCalledWith('1');
      expect(deleteCache).toHaveBeenCalledWith('product:1');
      expect(deleteCache).toHaveBeenCalledWith('products:all');
      expect(deleteCache).toHaveBeenCalledWith('category:Electronics');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Product deleted successfully' });
    });

    it('should call next with error on failure', async () => {
      const error = new Error('Failed to delete product');
      mockRequest.params = { productId: '1' };
      (deleteProductById as jest.MockedFunction<typeof deleteProductById>).mockRejectedValueOnce(error);

      await deleteProduct(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(error);
    });
  });

  describe('addProduct', () => {
    it('should add product, invalidate caches, and return new product', async () => {
      const newProduct = { id: '2', name: 'New Laptop', category: 'Electronics' };
      mockRequest.body = { name: 'New Laptop', category: 'Electronics' };
      (addNewProduct as jest.MockedFunction<typeof addNewProduct>).mockResolvedValueOnce(newProduct);

      await addProduct(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(addNewProduct).toHaveBeenCalledWith(mockRequest.body);
      expect(deleteCache).toHaveBeenCalledWith('products:all');
      expect(deleteCache).toHaveBeenCalledWith('category:Electronics');
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(newProduct);
    });

    it('should call next with error on failure', async () => {
      const error = new Error('Failed to add product');
      mockRequest.body = { name: 'New Laptop', category: 'Electronics' };
      (addNewProduct as jest.MockedFunction<typeof addNewProduct>).mockRejectedValueOnce(error);

      await addProduct(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(error);
    });
  });
});

