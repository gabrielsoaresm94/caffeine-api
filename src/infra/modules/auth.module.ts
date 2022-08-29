import { Module } from '@nestjs/common';
import { AuthController } from 'src/adapters/presentation/controllers/auth.controller';
import { UsersUseCase } from 'src/core/usecases/user.usecase';
import { PostgresUsersRepository } from '../database/postgres/repositories/users.repository';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [UsersUseCase, PostgresUsersRepository],
})
export class AuthModule {}
