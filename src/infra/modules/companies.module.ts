import { Module } from '@nestjs/common';
import { CompaniesController } from 'src/adapters/presentation/controllers/companies.controller';
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
export class CompaniesModule {}
