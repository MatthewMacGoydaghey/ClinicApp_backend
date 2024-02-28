import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';


@Module({
  imports: [
    CacheModule.registerAsync({
    useFactory: async () => ({
      store: await redisStore({
        socket: {
          host: 'localhost',
          port: 6379
        },
         ttl: 5000 }),
    }),
  })
],
exports: [CacheModule.registerAsync({
  useFactory: async () => ({
    store: await redisStore({
      socket: {
        host: 'localhost',
        port: 6379
      },
       ttl: 5000 }),
  }),
})]
})
export class RedisModule {}
