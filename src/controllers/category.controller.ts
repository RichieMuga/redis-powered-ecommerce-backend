import { Request, Response, NextFunction } from "express";
import {
  fetchAllCategories,
  fetchProductsInSpecificCategory,
} from "../helpers/category.service";
import { getCache, setCache } from "../helpers/cache.service";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cacheKey = "category:all";

  try {
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      const categories = await fetchAllCategories();
      await setCache(cacheKey, categories);
      return res.status(200).json(categories);
    }
  } catch (err) {
    next(err);
  }
};

export const getProductsInSpecificCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { categoryName } = req.params;

  const cacheKey = `category:${categoryName}`;

  try {
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      const products = await fetchProductsInSpecificCategory(categoryName);
      await setCache(cacheKey, products);
      return res.status(200).json(products);
    }
  } catch (error) {
    next(error);
  }
};
