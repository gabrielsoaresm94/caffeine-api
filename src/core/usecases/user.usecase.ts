import { PostgresUsersRepository } from 'src/infra/database/postgres/repositories/users.repository';
import { User } from '../entities/users/user.entity';

export class UsersUseCase {
  constructor(private postgresUsersRepository: PostgresUsersRepository) {}

  async createUser(user: User): Promise<User> {
    const postUser = await this.postgresUsersRepository.createUser(user);
    return postUser;
  }

  async listUsers(): Promise<User[]> {
    const users = await this.postgresUsersRepository.listUsers();
    return users;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.postgresUsersRepository.findUserByEmail(email);
    return user;
  }

  async findUserById(id: string): Promise<User> {
    const company = await this.postgresUsersRepository.findUserById(id);
    return company;
  }
}
