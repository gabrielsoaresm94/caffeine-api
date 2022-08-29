import { validate } from 'class-validator';
import { v4 as uuid } from 'uuid';
import { FindCompanyValidator } from './find-company.validator';

describe('GET: companies/:id', () => {
  const model = new FindCompanyValidator();

  it('Testing all the correct fields', async () => {
    model.id = uuid();
    return validate(model).then((errors) => {
      expect(errors.length).toBe(0);
    });
  });

  it('Testing all the wrong fields', async () => {
    model.id = '';
    return validate(model).then((errors) => {
      expect(errors.length).toBeGreaterThanOrEqual(1);
    });
  });
});
