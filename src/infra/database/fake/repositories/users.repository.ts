import { IUserPlain } from 'src/core/entities/users/user.plain';
import { v4 as uuid } from 'uuid';
import { IUserData } from '../../../../core/entities/users/user.data';
import { Role } from '../../../../shared/guards/role.enum';
import { createHash } from '../../../../shared/helpers';
import { User } from '../../../../core/entities/users/user.entity';

export class FakeUsersRepository {
  async createUser(user: User): Promise<IUserData> {
    const data = user.toPlain();

    const users: IUserPlain[] = [];
    users.push(data);

    const userSaved = users[0] as IUserData;
    return userSaved;
  }

  async listUsers(): Promise<IUserData[]> {
    const users: IUserData[] = [];
    users.push({
      id: uuid(),
      name: 'Sicrano',
      role: Role.MANAGER,
      email: 'sicrano@email.com',
      password: await createHash('1234'),
      phone_1: '(71)999999997',
      phone_2: null,
    });
    return users;
  }

  async findUserByEmail(email: string): Promise<IUserData> {
    const users: IUserData[] = [];
    users.push({
      id: uuid(),
      name: 'Sicrano',
      role: Role.MANAGER,
      email: 'sicrano@email.com',
      password: await createHash('1234'),
      phone_1: '(71)999999997',
      phone_2: null,
    });

    const user: IUserData = users.filter(
      (elem: IUserData) => elem.email === email,
    )[0];

    return user;
  }

  async findUserById(id: string): Promise<IUserData> {
    const users: IUserData[] = [];
    users.push({
      id: uuid(),
      name: 'Sicrano',
      role: Role.MANAGER,
      email: 'sicrano@email.com',
      password: await createHash('1234'),
      phone_1: '(71)999999997',
      phone_2: null,
    });

    const user: IUserData = users.filter(
      (elem: IUserData) => elem.id === id,
    )[0];

    return user;
  }
}
