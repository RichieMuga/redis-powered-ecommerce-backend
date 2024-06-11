import { Request, Response, NextFunction } from "express";
import {
  fetchUserCart,
  updateCartById,
  deleteCartById,
  addNewCart
} from "../helpers/cart.service";
import { getCache, setCache, deleteCache } from "../helpers/cache.service";

export const getUserCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;
  const cacheKey = `userCart:${userId}`;

  try {
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      const userCart = await fetchUserCart(userId);
      await setCache(cacheKey, userCart);
      return res.status(200).json(userCart);
    }
  } catch (error) {
    next(error);
  }
};

// Update cart by ID
export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cartId } = req.params;
  const cacheKey = `cart:${cartId}`;
  const allCartsCacheKey = "carts:all";

  try {
    const updatedProduct = await updateCartById(cartId, req.body);

    // Invalidate specific cart cache
    await deleteCache(cacheKey);

    // Invalidate all cart cache
    await deleteCache(allCartsCacheKey);

    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Delete cart by ID
export const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cartId } = req.params;
  const cacheKey = `cart:${cartId}`;
  const allCartsCacheKey = "carts:all";

  try {
    await deleteCartById(cartId);

    // Invalidate specific cart cache
    await deleteCache(cacheKey);

    // Invalidate all cart cache
    await deleteCache(allCartsCacheKey);

    return res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Add new cart
export const addCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const allCartsCacheKey = "carts:all";
  const userCartCacheKey = `cart:${req.body.userId}`;

  try {
    const newCart = await addNewCart(req.body);

    // Invalidate all cart cache
    await deleteCache(allCartsCacheKey);

    // Invalidate userCarts cache
    await deleteCache(userCartCacheKey);

    return res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
};
