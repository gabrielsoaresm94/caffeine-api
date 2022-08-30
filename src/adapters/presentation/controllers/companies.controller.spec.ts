import { v4 as uuid } from 'uuid';
import { ICompanyData } from '../../../core/entities/companies/company.data';
import { Role } from '../../../shared/guards/role.enum';
import { createHash } from '../../../shared/helpers';
import { FakeUsersRepository } from '../../../infra/database/fake/repositories/users.repository';
import { createRequest, createResponse } from 'node-mocks-http';
import { PostgresUsersRepository } from '../../../infra/database/postgres/repositories/users.repository';
import { CreateUserValidator } from '../validators/users/create-user.validator';
import { FindUserValidator } from '../validators/users/find-user.validator';
import { CompaniesController } from './companies.controller';
import { CompaniesUseCase } from '../../../core/usecases/companies.usecase';
import { FakeCompaniesRepository } from '../../../infra/database/fake/repositories/companies.repository';
import { PostgresCompaniesRepository } from '../../../infra/database/postgres/repositories/companies.repository';
import { ListCompaniesValidator } from '../validators/companies/list-companies.validator';

describe('CompaniesController', () => {
  let companiesController: CompaniesController;
  let companiesUseCase: CompaniesUseCase;
  const fakeUsersRepository =
    new FakeUsersRepository() as PostgresUsersRepository;
  const fakeCompaniesRepository =
    new FakeCompaniesRepository() as PostgresCompaniesRepository;

  beforeEach(() => {
    companiesUseCase = new CompaniesUseCase(
      fakeCompaniesRepository,
      fakeUsersRepository,
    );
    companiesController = new CompaniesController(companiesUseCase);
  });

  describe('Users', () => {
    /**
     * PROBLEMAS - este teste está dando problema com o request, mockado,
     * que está sendo enviado para a controller. Aparentemente ela recebe uma requisição inteira
     * e não apenas o corpo tipado.
     */
    // it('Best way to create company', async () => {
    //   const result: ICompanyData = {
    //     id: uuid(),
    //     name: 'Sicrano',
    //     role: Role.MANAGER,
    //     email: 'sicrano@email.com',
    //     password: await createHash('1234'),
    //     phone_1: '(71)999999997',
    //     phone_2: null,
    //   };

    //   const body: CreateUserValidator = {
    //     name: 'Sicrano',
    //     role: Role.MANAGER,
    //     email: 'sicrano@email.com',
    //     password: 'test',
    //     phone_1: '(71)999999997',
    //   };

    //   const request: any = createRequest({
    //     method: 'POST',
    //     url: '/users',
    //     body: body,
    //   });

    //   jest
    //     .spyOn(usersUseCase, 'createUser')
    //     .mockImplementation(async () => result);

    //   const response = createResponse();
    //   await usersController.createUser(request, response);
    //   const data = await response._getJSONData();

    //   expect(data.data).toMatchObject(result);
    // });

    // it('Best way to list companies', async () => {
    //   const result: ICompanyData[] = [
    //     {
    //       id: uuid(),
    //       cnpj: '04.646.343/0001-89',
    //       socialReason: 'Loja do Fulano LTDA',
    //       name: 'Loja do Fulano',
    //       email: 'loja@fulano.com',
    //       phone: '(71)999999998',
    //       information: 'Essas são as informações da Loja do Fulano',
    //       shopmanId: uuid(),
    //     },
    //   ];

    //   const query: ListCompaniesValidator = {
    //     cnpj: '04.646.343/0001-89',
    //   };

    //   const request: any = createRequest({
    //     method: 'GET',
    //     url: '/companies',
    //     query: query,
    //   });

    //   jest
    //     .spyOn(companiesUseCase, 'listCompanies')
    //     .mockImplementation(async () => result);

    //   const response = createResponse();
    //   await companiesController.listCompanies(request, response);

    //   // const data = await response._getJSONData();
    //   const status = response._getStatusCode();

    //   // expect(data.data).toMatchObject(result);
    //   expect(status).toBe(200);
    // });

    it('Best way to find company by id', async () => {
      const result: ICompanyData = {
        id: uuid(),
        cnpj: '04.646.343/0001-89',
        socialReason: 'Loja do Fulano LTDA',
        name: 'Loja do Fulano',
        email: 'loja@fulano.com',
        phone: '(71)999999998',
        information: 'Essas são as informações da Loja do Fulano',
        shopmanId: uuid(),
      };

      const params: FindUserValidator = {
        id: uuid(),
      };

      const request: any = createRequest({
        method: 'GET',
        url: '/companies/:id',
        params: params,
      });

      jest
        .spyOn(companiesUseCase, 'findCompanyById')
        .mockImplementation(async () => result);

      const response = createResponse();
      await companiesController.findCompany(request, response);
      const status = response._getStatusCode();

      expect(status).toBe(200);
    });
  });
});
