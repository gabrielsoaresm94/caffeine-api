import { Role } from '../../../shared/guards/role.enum';
import { IUserData } from './user.data';
import { IUserPlain } from './user.plain';

export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly role: Role;
  public readonly email: string;
  public readonly password: string | null;
  public readonly phone_1: string;
  public readonly phone_2: string | null;

  private constructor(userData: IUserData) {
    this.id = userData.id;
    this.name = userData.name;
    this.role = userData.role;
    this.email = userData.email;
    this.password = userData.password;
    this.phone_1 = userData.phone_1;
    this.phone_2 = userData.phone_2;
  }

  public static create(userData: IUserData): User {
    return new User(userData);
  }

  public toPlain(): IUserPlain {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      email: this.email,
      password: this.password,
      phone_1: this.phone_1,
      phone_2: this.phone_2,
    };
  }
}
