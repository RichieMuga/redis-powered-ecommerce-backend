import { Request, Response, NextFunction } from 'express';
import { incrementCache } from '../helpers/cache.service';

// Products
// track how much a product has been viewed
export const trackProductView = async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.productId;
  const viewKey = `product:${productId}:views`;

  try {
    await incrementCache(viewKey);
    next();
  } catch (error) {
    console.error('Error tracking product view:', error);
    next(error);
  }
};

// Cart
// track how items are being added in a cart for a user
export const trackCartView = async (req: Request, res: Response, next: NextFunction) => {
  const cartId = req.params.cartId;
  const viewKey = `cart:${cartId}:views`;

  try {
    await incrementCache(viewKey);
    next();
  } catch (error) {
    console.error('Error tracking cart view:', error);
    next(error);
  }
};


// track how many times a cart has been modified
export const trackCartModification = async (req: Request, res: Response, next: NextFunction) => {
  const cartId = req.params.cartId;
  const modificationKey = `cart:${cartId}:modifications`;

  try {
    await incrementCache(modificationKey);
    next();
  } catch (error) {
    console.error('Error tracking cart modification:', error);
    next(error);
  }
};

// Category
// track category
export const trackCategoryView = async (req: Request, res: Response, next: NextFunction) => {
  const category = req.params.category;
  const viewKey = `category:${category}:views`;

  try {
    await incrementCache(viewKey);
    next();
  } catch (error) {
    console.error('Error tracking category view:', error);
    next(error);
  }
};
