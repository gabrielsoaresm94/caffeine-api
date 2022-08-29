import { PostgresUsersRepository } from 'src/infra/database/postgres/repositories/users.repository';
import { User } from '../entities/users/user.entity';

export class AuthUseCase {
  constructor(private postgresUsersRepository: PostgresUsersRepository) {}

  async signUp(user: User): Promise<User> {
    const postUser = await this.postgresUsersRepository.createUser(user);
    return postUser;
  }

  async signIn() {}
}
