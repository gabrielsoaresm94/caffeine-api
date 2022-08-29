import { validate } from 'class-validator';
import { Role } from '../../../../shared/guards/role.enum';
import { CreateUserValidator } from './create-user.validator';

describe('POST: users', () => {
  const model = new CreateUserValidator();

  it('Testing all the correct fields', async () => {
    model.name = 'Fulano';
    model.email = 'fulano@email.com';
    model.password = '1234';
    model.phone_1 = '(71)999999999';
    model.role = Role.ADMIN;
    return validate(model).then((errors) => {
      expect(errors.length).toBe(0);
    });
  });

  it('Testing some wrong fields', async () => {
    model.name = '';
    model.email = '';
    model.password = '';
    model.phone_1 = '';
    model.role = Role.ADMIN;
    return validate(model).then((errors) => {
      expect(errors.length).toBeGreaterThanOrEqual(1);
    });
  });
});
