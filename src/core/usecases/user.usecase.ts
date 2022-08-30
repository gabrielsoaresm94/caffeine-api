import { PostgresUsersRepository } from 'src/infra/database/postgres/repositories/users.repository';
import { IUserData } from '../entities/users/user.data';
import { User } from '../entities/users/user.entity';

export class UsersUseCase {
  constructor(private postgresUsersRepository: PostgresUsersRepository) {}

  async createUser(user: User): Promise<IUserData> {
    const postUser = await this.postgresUsersRepository.createUser(user);
    return postUser;
  }

  async listUsers(): Promise<IUserData[]> {
    const users = await this.postgresUsersRepository.listUsers();
    return users;
  }

  async findUserByEmail(email: string): Promise<IUserData> {
    const user = await this.postgresUsersRepository.findUserByEmail(email);
    return user;
  }

  async findUserById(id: string): Promise<IUserData> {
    const company = await this.postgresUsersRepository.findUserById(id);
    return company;
  }
}
