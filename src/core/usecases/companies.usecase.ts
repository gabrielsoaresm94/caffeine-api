import { PostgresCompaniesRepository } from 'src/infra/database/postgres/repositories/companies.repository';
import { PostgresUsersRepository } from 'src/infra/database/postgres/repositories/users.repository';
import { Company } from '../entities/companies/company.entity';
import { User } from '../entities/users/user.entity';

export class CompaniesUseCase {
  constructor(
    private postgresCompaniesRepository: PostgresCompaniesRepository,
    private postgresUsersRepository: PostgresUsersRepository,
  ) {}

  async createCompany(company: Company, user: User): Promise<Company> {
    const postUser = await this.postgresUsersRepository.createUser(user);
    const postCompany = await this.postgresCompaniesRepository.createCompany(
      company,
      postUser.toPlain().id,
    );
    return postCompany;
  }

  async listCompanies(cnpj?: string): Promise<Company[]> {
    let companies: Company[];
    const regexValidCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

    if (cnpj.match(regexValidCnpj)) {
      companies = await this.postgresCompaniesRepository.listCompaniesByCNPJ(
        cnpj,
      );
    } else {
      companies = await this.postgresCompaniesRepository.listCompanies();
    }

    return companies;
  }

  async findCompanyById(id: string): Promise<Company> {
    const company = await this.postgresCompaniesRepository.findCompanyById(id);
    return company;
  }
}
