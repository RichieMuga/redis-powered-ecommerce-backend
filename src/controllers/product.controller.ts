import { Request, Response, NextFunction } from 'express';
import { fetchProducts, fetchProductsById, updateProductById, deleteProductById, addNewProduct } from '../helpers/product.service';
import { getCache, setCache, deleteCache } from '../helpers/cache.service';

// get all products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const cacheKey = 'products:all';

  try {
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      const products = await fetchProducts();
      await setCache(cacheKey, products);
      return res.status(200).json(products);
    }
  } catch (err) {
    next(err);
  }
};

// get single product
export const getSingleProductById = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params
  const cacheKey = `product:${productId}`

  try {
    const cachedData = await getCache(cacheKey)
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      const product = await fetchProductsById(productId);
      await setCache(cacheKey, product);
      return res.status(200).json(product);
    }
  } catch (err) {
    next(err)
  }
}

// Update product by ID
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  const cacheKey = `product:${productId}`;
  const allProductsCacheKey = 'products:all';
  const categoryCacheKey = `category:${req.body.category}`;

  try {
    const updatedProduct = await updateProductById(productId, req.body);

    // Invalidate specific product cache
    await deleteCache(cacheKey);

    // Invalidate all products cache
    await deleteCache(allProductsCacheKey);

    // Invalidate category cache
    await deleteCache(categoryCacheKey);

    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Delete product by ID
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  const cacheKey = `product:${productId}`;
  const allProductsCacheKey = 'products:all';

  try {
    const product = await deleteProductById(productId);

    // Invalidate specific product cache
    await deleteCache(cacheKey);

    // Invalidate all products cache
    await deleteCache(allProductsCacheKey);

    // Invalidate related category caches if necessary
    // If category information is needed ,fetch before deletion
    const categoryCacheKey = `category:${product.category}`;
    await deleteCache(categoryCacheKey);

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Add new product
export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  const allProductsCacheKey = 'products:all';
  const categoryCacheKey = `category:${req.body.category}`;

  try {
    const newProduct = await addNewProduct(req.body);

    // Invalidate all products cache
    await deleteCache(allProductsCacheKey);

    // Invalidate category cache
    await deleteCache(categoryCacheKey);

    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// Fetch all products 
export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  const cacheKey = 'products:all';

  try {
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      const products = await fetchProducts();
      await setCache(cacheKey, products);
      return res.status(200).json(products);
    }
  } catch (error) {
    next(error);
  }
};

