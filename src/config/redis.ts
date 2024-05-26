import * as dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

export async function createRedisConnection() {
  const redisClient = createClient({
    database: parseInt(process.env.REDIS_DB!) || 0,
  });

  redisClient.on('error', (err) => {
    console.log('Ошибка подключения к Redis', err);
  });

  return await redisClient.connect();
}

export const dataLiveTime: number = parseInt(process.env.REDIS_EXPIRE_TIME!);
