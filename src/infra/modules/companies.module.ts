import { Module } from '@nestjs/common';
import { CompaniesController } from 'src/adapters/presentation/controllers/companies.controller';

@Module({
  imports: [],
  controllers: [CompaniesController],
  providers: [],
})
export class CompaniesModule {}
