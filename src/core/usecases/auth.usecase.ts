import { PostgresUsersRepository } from 'src/infra/database/postgres/repositories/users.repository';
import { IUserData } from '../entities/users/user.data';
import { User } from '../entities/users/user.entity';

export class AuthUseCase {
  constructor(private postgresUsersRepository: PostgresUsersRepository) {}

  async signUp(user: User): Promise<IUserData> {
    const postUser = await this.postgresUsersRepository.createUser(user);
    return postUser;
  }

  async signIn() {}
}
