import { IUserData } from '../../../../core/entities/users/user.data';
import { User } from '../../../../core/entities/users/user.entity';
import client from '../client';

export class PostgresUsersRepository {
  async createUser(user: User): Promise<IUserData> {
    const data = user.toPlain();
    const postUser = await client.query(
      `INSERT INTO Users (Id, Name, Role, Email, Password, Phone1, Phone2) VALUES (${data.id},'${data.name}','${data.role}', '${data.email}','${data.password}', '${data.phone_1}', '${data.phone_2}') RETURNING *`,
    );
    const userSaved = postUser.rows[0] as IUserData;
    return userSaved;
  }

  async listUsers(): Promise<IUserData[]> {
    const queryUsers = await client.query('SELECT * from Users');
    const users = queryUsers.rows as IUserData[];
    return users;
  }

  async findUserByEmail(email: string): Promise<IUserData> {
    const queryUser = await client.query(
      `SELECT * FROM Users WHERE email = ${email}`,
    );
    const user = queryUser.rows[0] as IUserData;
    return user;
  }

  async findUserById(id: string): Promise<IUserData> {
    const queryUser = await client.query(
      `SELECT * FROM Users WHERE id = ${id}`,
    );
    const user = queryUser.rows[0] as IUserData;
    return user;
  }
}
