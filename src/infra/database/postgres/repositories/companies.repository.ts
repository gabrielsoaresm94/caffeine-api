import { Company } from 'src/core/entities/companies/company.entity';
import client from '../client';

export class PostgresCompaniesRepository {
  async createCompany(company: Company, ShopmanId: string): Promise<any> {
    const data = company.toPlain();
    const postCompany = await client.query(
      `INSERT INTO companies (Id, Cnpj, Name, SocialReason, Email, Phone, Information, ShopmanId) VALUES (${data.id},'${data.cnpj}', '${data.name}','${data.socialReason}', '${data.email}','${data.phone},'${data.information},'${ShopmanId}') RETURNING *`,
    );
    const companySaved = postCompany.rows[0] as Company;
    return companySaved;
  }

  async listCompanies(): Promise<Company[]> {
    const queryCompanies = await client.query('SELECT * from companies');
    const companies = queryCompanies.rows as Company[];
    return companies;
  }

  async findCompanyByCNPJ(cnpj: string): Promise<Company> {
    const queryCompany = await client.query(
      `SELECT * from companies WHERE cnpj = ${cnpj}`,
    );
    const company = queryCompany.rows[0] as Company;
    return company;
  }

  async findCompanyById(id: string): Promise<Company> {
    const queryCompany = await client.query(
      `SELECT * FROM companies WHERE id = ${id}`,
    );
    const company = queryCompany.rows[0] as Company;
    return company;
  }
}
