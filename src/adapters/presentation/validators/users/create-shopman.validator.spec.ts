import { validate } from 'class-validator';
import { CreateShopmanValidator } from './create-shopman.validator';

describe('POST: users', () => {
  const model = new CreateShopmanValidator();

  it('Testing all the correct fields', async () => {
    model.name = 'Fulano';
    model.email = 'fulano@email.com';
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
