import { Request, Response, NextFunction } from "express";

import { fetchUserData } from "../helpers/user.service";
import { getCache, setCache } from "../helpers/cache.service";

export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;
  const cacheKey = `userDetails:${userId}`;

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
