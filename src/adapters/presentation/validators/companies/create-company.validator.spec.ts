import 'reflect-metadata';
import { validate } from 'class-validator';
import { CreateCompanyValidator } from './create-company.validator';

describe('POST: companies', () => {
  const model = new CreateCompanyValidator();

  it('Testing all the correct fields', async () => {
    model.cnpj = '04646343000189';
    model.name = 'Loja do Fulano';
    model.socialReason = 'Loja do Fulano LTDA';
    model.email = 'loja@fulano.com';
    model.phone = '(71)999999998';
    model.information = 'Essas são as informações da Loja do Fulano';
    model.shopman = {
      name: 'Fulano',
      email: 'fulano@email.com',
      phone_1: '(71)999999999',
    };
    return validate(model).then((errors) => {
      expect(errors.length).toBe(0);
    });
  });

  it('Testing some wrong fields', async () => {
    model.cnpj = '';
    model.name = '';
    model.socialReason = '';
    model.email = '';
    model.phone = '';
    model.information = '';
    model.shopman = {
      name: '',
      email: '',
      phone_1: '',
    };
    return validate(model).then((errors) => {
      expect(errors.length).toBeGreaterThanOrEqual(1);
    });
  });
});
