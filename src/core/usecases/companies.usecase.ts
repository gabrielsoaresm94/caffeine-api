import { Injectable } from '@nestjs/common';
import { PostgresCompaniesRepository } from '../../infra/database/postgres/repositories/companies.repository';
import { PostgresUsersRepository } from '../../infra/database/postgres/repositories/users.repository';
import { ICompanyData } from '../entities/companies/company.data';
import { Company } from '../entities/companies/company.entity';
import { IUserData } from '../entities/users/user.data';
import { User } from '../entities/users/user.entity';

@Injectable()
export class CompaniesUseCase {
  constructor(
    private postgresCompaniesRepository: PostgresCompaniesRepository,
    private postgresUsersRepository: PostgresUsersRepository,
  ) {}

  async createCompany(company: Company, user: User): Promise<ICompanyData> {
    const postUser = await this.postgresUsersRepository.createUser(user);
    const postCompany = await this.postgresCompaniesRepository.createCompany(
      company,
      postUser.id,
    );
    return postCompany;
  }

  async listCompanies(cnpj?: string): Promise<ICompanyData[]> {
    let companies: ICompanyData[];
    if (cnpj) {
      companies = await this.postgresCompaniesRepository.listCompaniesByCNPJ(
        cnpj,
      );
    } else {
      companies = await this.postgresCompaniesRepository.listCompanies();
    }

    return companies;
  }

  async findCompanyById(id: string): Promise<ICompanyData> {
    const company = await this.postgresCompaniesRepository.findCompanyById(id);
    return company;
  }

  async findUserByIdByCompany(id: string): Promise<IUserData> {
    const user = await this.postgresUsersRepository.findUserById(id);
    return user;
  }
}
