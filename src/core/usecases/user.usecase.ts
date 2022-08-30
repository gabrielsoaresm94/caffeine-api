import { Injectable } from '@nestjs/common';
import { IUserData } from '../entities/users/user.data';
import { User } from '../entities/users/user.entity';
import { PostgresUsersRepository } from '../../infra/database/postgres/repositories/users.repository';

@Injectable()
export class UsersUseCase {
  constructor(private postgresUsersRepository: PostgresUsersRepository) {}

  public async createUser(user: User): Promise<IUserData> {
    const postUser = await this.postgresUsersRepository.createUser(user);
    return postUser;
  }

  public async listUsers(): Promise<IUserData[]> {
    const users = await this.postgresUsersRepository.listUsers();
    return users;
  }

  public async findUserByEmail(email: string): Promise<IUserData> {
    const user = await this.postgresUsersRepository.findUserByEmail(email);
    return user;
  }

  public async findUserById(id: string): Promise<IUserData> {
    const company = await this.postgresUsersRepository.findUserById(id);
    return company;
  }
}
