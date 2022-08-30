import 'dotenv/config';
import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infra/modules/auth.module';
import { CompaniesModule } from './infra/modules/companies.module';
import { UsersModule } from './infra/modules/users.module';

@Module({
  imports: [UsersModule, CompaniesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
