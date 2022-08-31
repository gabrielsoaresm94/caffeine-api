import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersController } from 'src/adapters/presentation/controllers/users.controller';
import { LoggerMiddleware } from 'src/adapters/presentation/middlewares/ logger.middleware';
import { UsersUseCase } from 'src/core/usecases/user.usecase';
import { PostgresUsersRepository } from '../database/postgres/repositories/users.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersUseCase, PostgresUsersRepository],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(
      {
        path: 'users',
        method: RequestMethod.GET,
      },
      {
        path: 'users/:id',
        method: RequestMethod.GET,
      },
      // {
      //   path: 'users',
      //   method: RequestMethod.POST,
      // },
    );
  }
}
