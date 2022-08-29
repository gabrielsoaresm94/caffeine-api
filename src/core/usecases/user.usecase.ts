import { PostgresUsersRepository } from 'src/infra/database/postgres/repositories/users.repository';
import { User } from '../entities/users/user.entity';

export class UsersUseCase {
  constructor(private postgresUsersRepository: PostgresUsersRepository) {}

  async createUser(user: User): Promise<User> {
    const postUser = await this.postgresUsersRepository.createUser(user);
    return postUser;
  }
}
