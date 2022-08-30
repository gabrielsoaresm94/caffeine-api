import { Injectable } from '@nestjs/common';
import { ICompanyData } from '../../../../core/entities/companies/company.data';
import { Company } from '../../../../core/entities/companies/company.entity';
import client from '../client';

@Injectable()
export class PostgresCompaniesRepository {
  async createCompany(
    company: Company,
    shopmanId: string,
  ): Promise<ICompanyData> {
    const data = company.toPlain();
    const postCompany = await client.query(
      `INSERT INTO Companies (Id, Cnpj, Name, SocialReason, Email, Phone, Information, ShopmanId) VALUES ('${data.id}','${data.cnpj}', '${data.name}','${data.socialReason}', '${data.email}','${data.phone}','${data.information}','${shopmanId}') RETURNING *`,
    );
    const companySaved = postCompany.rows[0] as ICompanyData;
    return companySaved;
  }

  async listCompanies(): Promise<ICompanyData[]> {
    const queryCompanies = await client.query('SELECT * from Companies');
    const companies = queryCompanies.rows as ICompanyData[];
    return companies;
  }

  async listCompaniesByCNPJ(cnpj: string): Promise<ICompanyData[]> {
    const queryCompanies = await client.query(
      `SELECT * from Companies WHERE Cnpj = '${cnpj}'`,
    );
    const companies = queryCompanies.rows as ICompanyData[];
    return companies;
  }

  async findCompanyById(id: string): Promise<ICompanyData> {
    const queryCompany = await client.query(
      `SELECT * FROM Companies WHERE Id = '${id}'`,
    );
    const company = queryCompany.rows[0] as ICompanyData;
    return company;
  }
}
