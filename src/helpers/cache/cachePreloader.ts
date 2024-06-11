import { fetchProducts } from "../product.service";
import { getCache, setCache } from "../cache.service";
import {
  fetchAllCategories,
  fetchProductsInSpecificCategory,
} from "../category.service";

// Preload cache with all products
export const preloadProductsCache = async () => {
  const cacheKey = "products";
  const cachedProducts = await getCache(cacheKey);

  if (!cachedProducts) {
    const products = await fetchProducts();
    await setCache(cacheKey, products, 3600); // Cache for 1 hour
  }
};

// Preload cache with all categories
export const preloadCategoriesCache = async () => {
  const categoriesCacheKey = "categories";
  const cachedCategories = await getCache(categoriesCacheKey);

  if (!cachedCategories) {
    const categories = await fetchAllCategories();
    await setCache(categoriesCacheKey, categories, 3600);
    // Preload products for each category
    for (const category of categories) {
      await preloadProductsInCategoryCache(category.name);
    }
  }
};

export const preloadProductsInCategoryCache = async (categoryName: string) => {
  const cacheKey = `productsInCategory:${categoryName}`;
  const cachedProducts = await getCache(cacheKey);

  if (!cachedProducts) {
    const products = await fetchProductsInSpecificCategory(categoryName);
    await setCache(cacheKey, products, 3600); 
  }
};
