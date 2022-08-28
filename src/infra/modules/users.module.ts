import { Module } from '@nestjs/common';
import { UsersController } from 'src/adapters/presentation/controllers/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}

// @Module({
//   imports: [],
//   controllers: [UsersController],
//   providers: [
//     UsersUseCases,
//     { provide: IUsersRepository, useClass: UsersRepository },
//   ],
// })
// export class UsersModule {}
