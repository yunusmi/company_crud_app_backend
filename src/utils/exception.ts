import { RedisModules, RedisFunctions, RedisScripts } from 'redis';
import { RedisClientType } from '@redis/client';
import { RedisMethodsInterface } from './interfaces';
import { ResponseError } from '../middlewares/errorHandler';

export async function returnException(
  message: string,
  statusCode: number,
  redis?: RedisClientType<
    RedisMethodsInterface & RedisModules,
    RedisFunctions,
    RedisScripts
  >
) {
  const error: ResponseError = new Error(message);
  error.statusCode = statusCode;
  if (redis) {
    await redis.quit();
  }

  throw error;
}
