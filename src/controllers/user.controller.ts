import { Request, Response, NextFunction } from "express";

import { fetchUserData, deleteUserById, addNewUser, updateUserById } from "../helpers/user.service";
import { getCache, setCache, deleteCache } from "../helpers/cache.service";

// get user by Id
export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;
  const cacheKey = `user:${userId}`;

  try {
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      const userData = await fetchUserData(userId);

      // Exclude sensitive data like password and location before caching
      const userDataToCache = {
        ...userData,
        password: undefined,
        address: {
          ...userData.address,
          geolocation: undefined,
          zipcode: undefined,
          number: undefined
        },
      };

      await setCache(cacheKey, userDataToCache);
      return res.status(200).json(userDataToCache);
    }
  } catch (error) {
    next(error);
  }
};

// delete user by Id
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params

  const cacheKey = `user:${userId}`;
  const allUsersCacheKey = "carts:all";

  try {
    await deleteUserById(userId);

    // Invalidate specific user cache
    await deleteCache(cacheKey);

    // Invalidate all users cache
    await deleteCache(allUsersCacheKey);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
}

// Update user by ID
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const cacheKey = `user:${userId}`;
  const allUsersCacheKey = 'users:all';

  try {
    const updatedUser = await updateUserById(userId, req.body);

    // Invalidate specific user cache
    await deleteCache(cacheKey);

    // Invalidate all users cache
    await deleteCache(allUsersCacheKey);

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// add new user
export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allUsersCacheKey = "carts:all";

  try {
    await addNewUser(req.body);

    // Invalidate all users cache
    await deleteCache(allUsersCacheKey);

    return res.status(201).json({ message: "user created successfully" });

  } catch (error) {
    next(error);
  }
}
