import { RedisModules, RedisFunctions, RedisScripts } from 'redis';
import { RedisClientType } from '@redis/client';
import { createRedisConnection, dataLiveTime } from '../config/redis';
import { returnException } from '../utils/exception';
import { db } from '../models';
import {
  GetBranchesResponse,
  RedisMethodsInterface,
} from '../utils/interfaces';
import { ResponseError } from 'middlewares/errorHandler';

export class BranchService {
  async createBranch(branchName: string): Promise<number> {
    const { branch_id: insertId } = await db.branches.create({
      branch_name: branchName,
    });

    if (!insertId) {
      await returnException('Ошибка создания филиала', 500);
    }

    const redis = await createRedisConnection();
    await this.deleteCachedData(redis);

    await redis.set(
      `branch:${insertId}`,
      JSON.stringify({ branch_name: branchName, branch_id: insertId }),
      {
        EX: dataLiveTime,
        NX: true,
      }
    );

    await redis.quit();
    return insertId;
  }

  async getAllBranches(): Promise<GetBranchesResponse[]> {
    const redis = await createRedisConnection();
    const branchesCached = await redis.get('branches');

    if (!branchesCached || branchesCached === null) {
      const branches = await db.branches.findAll({
        order: [['branch_id', 'DESC']],
      });

      if (!branches) {
        await returnException('Филиалы не найдены', 404, redis);
      }

      await redis.set('branches', JSON.stringify(branches), {
        EX: dataLiveTime,
        NX: true,
      });

      await redis.quit();
      return branches;
    }

    await redis.quit();
    return JSON.parse(branchesCached);
  }

  async getBranchById(branchId: number): Promise<GetBranchesResponse | null> {
    const redis = await createRedisConnection();
    const branchCached = await redis.get(`branch:${branchId}`);

    if (!branchCached || branchCached === null) {
      const branchDetails = await db.branches.findByPk(branchId, {});

      if (!branchDetails) {
        await returnException(
          `Филиал с таким ID ${branchId} не найден`,
          404,
          redis
        );
      }

      await redis.set(`branch:${branchId}`, JSON.stringify(branchDetails), {
        EX: dataLiveTime,
        NX: true,
      });

      await redis.quit();
      return branchDetails;
    }

    await redis.quit();
    return JSON.parse(branchCached);
  }

  async updateBranchById(
    branchId: number,
    updatedBranchName: string
  ): Promise<void> {
    const transaction = await db.sequelize.transaction();
    const branch = await db.branches.findByPk(branchId, { transaction });

    if (!branch) {
      await transaction.rollback();
      await returnException(`Филиал с таким ID ${branchId} не найден`, 404);
      return;
    }

    const updatedBranch = await branch.update(
      {
        branch_name: updatedBranchName,
      },
      { transaction }
    );

    if (!updatedBranch) {
      await transaction.rollback();
      await returnException('Ошибка обновления филиала', 500);
    }

    await transaction.commit();

    const redis = await createRedisConnection();

    await this.deleteCachedData(redis, branchId);

    await redis.set(`branch:${branchId}`, JSON.stringify(updatedBranch), {
      EX: dataLiveTime,
      NX: true,
    });

    await redis.quit();
    return;
  }

  async deleteBranchById(branchId: number): Promise<void> {
    const transaction = await db.sequelize.transaction();

    const branch = await db.branches.findByPk(branchId, { transaction });

    if (!branch) {
      await transaction.rollback();
      const error: ResponseError = new Error(
        `Филиал с таким ID ${branchId} не найден`
      );

      error.statusCode = 404;
      throw error;
    }

    await branch.destroy({ transaction });

    const deleteEmployeesOnBranch = await db.employees.destroy({
      where: { branch_id: branchId },
      transaction,
    });

    if (!deleteEmployeesOnBranch) {
      await transaction.rollback();
      await returnException(`Ошибка удаления филиала`, 500);
    }

    await transaction.commit();

    const redis = await createRedisConnection();
    await this.deleteCachedData(redis, branchId);
    await redis.quit();
    return;
  }

  async deleteCachedData(
    redis: RedisClientType<
      RedisMethodsInterface & RedisModules,
      RedisFunctions,
      RedisScripts
    >,
    branchId?: number
  ): Promise<void> {
    const cachedBranchesDataExcists = await redis.get('branches');

    if (cachedBranchesDataExcists || cachedBranchesDataExcists !== null) {
      const deleteCachedData = await redis.del('branches');

      if (!deleteCachedData) {
        await returnException(`Ошибка Redis`, 500);
        return;
      }
    }

    if (branchId) {
      const cachedBranchDataExcists = await redis.get(`branch:${branchId}`);

      if (cachedBranchDataExcists || cachedBranchDataExcists !== null) {
        const deleteCachedData = await redis.del(`branch:${branchId}`);

        if (!deleteCachedData) {
          await returnException(`Ошибка Redis`, 500);
          return;
        }
      }
    }

    return;
  }
}
