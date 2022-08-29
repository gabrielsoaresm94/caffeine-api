import { Role } from '../../../shared/guards/role.enum';

export interface IUserData {
  id: string;
  name: string;
  role: Role;
  email: string;
  password: string | null;
  phone_1: string;
  phone_2: string | null;
}
