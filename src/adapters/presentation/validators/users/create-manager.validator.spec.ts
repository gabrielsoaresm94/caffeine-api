import { validate } from 'class-validator';
import { CreateManagerValidator } from './create-manager.validator';

describe('POST: auth/signup', () => {
  const model = new CreateManagerValidator();

  it('Testing all the correct fields', async () => {
    model.name = 'Fulano';
    model.email = 'fulano@email.com';
    model.password = '1234';
    model.phone_1 = '(71)999999999';
    return validate(model).then((errors) => {
      expect(errors.length).toBe(0);
    });
  });

  it('Testing all the wrong fields', async () => {
    model.name = '';
    model.email = '';
    model.phone_1 = '';
    return validate(model).then((errors) => {
      expect(errors.length).toBeGreaterThanOrEqual(1);
    });
  });
});
