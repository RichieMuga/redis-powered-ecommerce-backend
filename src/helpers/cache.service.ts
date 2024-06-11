import * as redis from 'redis';

const url = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const redisClient=redis.createClient({
  url
})

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

export const getCache = async (key: string): Promise<string | null> => {
  await connectRedis();
  try {
    const data = await redisClient.get(key);
    return data;
  } catch (err) {
    console.error('Redis get error:', err);
    throw err;
  }
};

export const setCache = async (key: string, value: any, ttl: number = 3600): Promise<void> => {
  await connectRedis();
  try {
    await redisClient.setEx(key, ttl, JSON.stringify(value));
  } catch (err) {
    console.error('Redis setEx error:', err);
    throw err;
  }
};


export const deleteCache = async (key: string): Promise<void> => {
  await connectRedis()
  try {
    await redisClient.del(key);
  } catch (err) {
    console.error('Redis DEL error:', err);
    throw err;
  }
};
