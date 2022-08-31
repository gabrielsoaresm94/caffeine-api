import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CompaniesController } from 'src/adapters/presentation/controllers/companies.controller';
import { LoggerMiddleware } from 'src/adapters/presentation/middlewares/ logger.middleware';
import { CompaniesUseCase } from 'src/core/usecases/companies.usecase';
import { PostgresCompaniesRepository } from '../database/postgres/repositories/companies.repository';
import { PostgresUsersRepository } from '../database/postgres/repositories/users.repository';

@Module({
  imports: [],
  controllers: [CompaniesController],
  providers: [
    CompaniesUseCase,
    PostgresCompaniesRepository,
    PostgresUsersRepository,
  ],
})
export class CompaniesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(
      {
        path: 'companies',
        method: RequestMethod.GET,
      },
      {
        path: 'companies/:id',
        method: RequestMethod.GET,
      },
      {
        path: 'companies',
        method: RequestMethod.POST,
      },
    );
  }
}
