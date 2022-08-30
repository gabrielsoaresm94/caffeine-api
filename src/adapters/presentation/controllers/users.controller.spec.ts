import { v4 as uuid } from 'uuid';
import { IUserData } from '../../../core/entities/users/user.data';
import { UsersUseCase } from '../../../core/usecases/user.usecase';
import { Role } from '../../../shared/guards/role.enum';
import { UsersController } from './users.controller';
import { createHash } from '../../../shared/helpers';
import { FakeUsersRepository } from '../../../infra/database/fake/repositories/users.repository';
import { createRequest, createResponse } from 'node-mocks-http';
import { PostgresUsersRepository } from '../../../infra/database/postgres/repositories/users.repository';
import { CreateUserValidator } from '../validators/users/create-user.validator';
import { FindUserValidator } from '../validators/users/find-user.validator';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersUseCase: UsersUseCase;
  const fakeUsersRepository =
    new FakeUsersRepository() as PostgresUsersRepository;

  beforeEach(() => {
    usersUseCase = new UsersUseCase(fakeUsersRepository);
    usersController = new UsersController(usersUseCase);
  });

  describe('Users', () => {
    /**
     * PROBLEMAS - este teste está dando problema com o request, mockado,
     * que está sendo enviado para a controller. Aparentemente ela recebe uma requisição inteira
     * e não apenas o corpo tipado.
     */
    it('Best way to create user', async () => {
      const result: IUserData = {
        id: uuid(),
        name: 'Sicrano',
        role: Role.MANAGER,
        email: 'sicrano@email.com',
        password: await createHash('1234'),
        phone_1: '(71)999999997',
        phone_2: null,
      };

      const body: CreateUserValidator = {
        name: 'Sicrano',
        role: Role.MANAGER,
        email: 'sicrano@email.com',
        password: 'test',
        phone_1: '(71)999999997',
      };

      const request: any = createRequest({
        method: 'POST',
        url: '/users',
        body: body,
      });

      jest
        .spyOn(usersUseCase, 'createUser')
        .mockImplementation(async () => result);

      const response = createResponse();
      await usersController.createUser(request, response);
      const data = await response._getJSONData();

      expect(data.data).toMatchObject(result);
    });

    it('Best way to list users', async () => {
      const result: IUserData[] = [
        {
          id: uuid(),
          name: 'Sicrano',
          role: Role.MANAGER,
          email: 'sicrano@email.com',
          password: await createHash('1234'),
          phone_1: '(71)999999997',
          phone_2: null,
        },
      ];

      jest
        .spyOn(usersUseCase, 'listUsers')
        .mockImplementation(async () => result);

      const response = createResponse();
      await usersController.listUsers(response);
      const data = await response._getJSONData();

      expect(data.data[0]).toMatchObject(result[0]);
    });

    /**
     * PROBLEMAS - este teste está dando problema com o request, mockado,
     * que está sendo enviado para a controller. Aparentemente ela recebe uma requisição inteira
     * e não apenas os params.
     */
    it('Best way to find user by id', async () => {
      const result: IUserData[] = [
        {
          id: uuid(),
          name: 'Sicrano',
          role: Role.MANAGER,
          email: 'sicrano@email.com',
          password: await createHash('1234'),
          phone_1: '(71)999999997',
          phone_2: null,
        },
      ];

      const params: FindUserValidator = {
        id: uuid(),
      };

      const request: any = createRequest({
        method: 'GET',
        url: '/users/:id',
        params: params,
      });

      jest
        .spyOn(usersUseCase, 'listUsers')
        .mockImplementation(async () => result);

      const response = createResponse();
      await usersController.findUser(request, response);
      const status = response._getStatusCode();

      expect(status).toBe(200);
    });
  });
});
