import { validate } from 'class-validator';
import { ListCompaniesValidator } from './list-companies.validator';

describe('GET: users/:id', () => {
  let model: ListCompaniesValidator;

  beforeEach(() => {
    model = new ListCompaniesValidator();
  });

  it('Testing all the correct fields', async () => {
    model.cnpj = '04646343000189';
    return validate(model).then((errors) => {
      expect(errors.length).toBe(0);
    });
  });

  it('Testing all without fields', async () => {
    model.cnpj = undefined;
    return validate(model).then((errors) => {
      expect(errors.length).toBe(0);
    });
  });
});
