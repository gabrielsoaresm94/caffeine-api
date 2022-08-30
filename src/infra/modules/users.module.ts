import { Module } from '@nestjs/common';
import { UsersController } from 'src/adapters/presentation/controllers/users.controller';
import { UsersUseCase } from 'src/core/usecases/user.usecase';
import { PostgresUsersRepository } from '../database/postgres/repositories/users.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersUseCase, PostgresUsersRepository],
})
export class UsersModule {}
