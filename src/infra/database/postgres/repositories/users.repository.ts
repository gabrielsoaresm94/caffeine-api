import { User } from 'src/core/entities/users/user.entity';
import client from '../client';

export class PostgresUsersRepository {
  async createUser(user: User): Promise<User> {
    const data = user.toPlain();
    const postUser = await client.query(
      `INSERT INTO users (Id, Name, Role, Email, Password, Phone1, Phone2) VALUES (${data.id},'${data.name}','${data.role}', '${data.email}','${data.password}', '${data.phone_1}', '${data.phone_2}') RETURNING *`,
    );
    const userSaved = postUser.rows[0] as User;
    return userSaved;
  }

  async listUsers(): Promise<User[]> {
    const queryUsers = await client.query('SELECT * from users');
    const users = queryUsers.rows as User[];
    return users;
  }

  async findUserByEmail(email: string): Promise<User> {
    const queryUser = await client.query(
      `SELECT * FROM users WHERE email = ${email}`,
    );
    const user = queryUser.rows[0] as User;
    return user;
  }

  async findUserById(id: string): Promise<User> {
    const queryUser = await client.query(
      `SELECT * FROM users WHERE id = ${id}`,
    );
    const user = queryUser.rows[0] as User;
    return user;
  }
}
