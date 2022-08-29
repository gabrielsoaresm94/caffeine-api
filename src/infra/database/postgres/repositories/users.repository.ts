import { User } from 'src/core/entities/users/user.entity';
import client from '../client';

export class PostgresUsersRepository {
  async createUser(user: User): Promise<User> {
    const data = user.toPlain();
    const postUser = await client.query(
      `INSERT INTO companies (Id, Name, Role, Email, Password, Phone1, Phone2) VALUES (${data.id},'${data.name}','${data.role}', '${data.email}','${data.password}', '${data.phone_1}', '${data.phone_2}') RETURNING *`,
    );
    const userSaved = postUser.rows[0] as User;
    return userSaved;
  }
}
