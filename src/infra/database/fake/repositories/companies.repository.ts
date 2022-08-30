import { ICompanyData } from '../../../../core/entities/companies/company.data';
import { Company } from '../../../../core/entities/companies/company.entity';
import { v4 as uuid } from 'uuid';

export class FakeCompaniesRepository {
  async createCompany(
    company: Company,
    shopmanId: string,
  ): Promise<ICompanyData> {
    const data = { shopmanId: shopmanId, ...company.toPlain() };

    const companies: ICompanyData[] = [];
    companies.push(data);

    const companySaved = companies[0] as ICompanyData;
    return companySaved;
  }

  async listCompanies(): Promise<ICompanyData[]> {
    const companies: ICompanyData[] = [];
    companies.push({
      id: uuid(),
      cnpj: '04.646.343/0001-89',
      socialReason: 'Loja do Fulano LTDA',
      name: 'Loja do Fulano',
      email: 'loja@fulano.com',
      phone: '(71)999999998',
      information: 'Essas são as informações da Loja do Fulano',
      shopmanId: uuid(),
    });
    return companies;
  }

  async listCompaniesByCNPJ(cnpj: string): Promise<ICompanyData[]> {
    const companies: ICompanyData[] = [];
    companies.push({
      id: uuid(),
      cnpj: '04.646.343/0001-89',
      socialReason: 'Loja do Fulano LTDA',
      name: 'Loja do Fulano',
      email: 'loja@fulano.com',
      phone: '(71)999999998',
      information: 'Essas são as informações da Loja do Fulano',
      shopmanId: uuid(),
    });

    const companiesFiltered = companies.filter(
      (elem: ICompanyData) => elem.cnpj === cnpj,
    );

    return companiesFiltered;
  }

  async findCompanyById(id: string): Promise<ICompanyData> {
    const companies: ICompanyData[] = [];
    companies.push({
      id: uuid(),
      cnpj: '04.646.343/0001-89',
      socialReason: 'Loja do Fulano LTDA',
      name: 'Loja do Fulano',
      email: 'loja@fulano.com',
      phone: '(71)999999998',
      information: 'Essas são as informações da Loja do Fulano',
      shopmanId: uuid(),
    });

    const companiesFiltered = companies.filter(
      (elem: ICompanyData) => elem.id === id,
    )[0];

    return companiesFiltered;
  }
}
