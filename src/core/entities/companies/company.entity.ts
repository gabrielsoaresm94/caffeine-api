import { ICompanyData } from './company.data';
import { ICompanyPlain } from './company.plain';

export class Company {
  public readonly id: string;
  public readonly cnpj: string;
  public readonly name: string;
  public readonly socialReason: string;
  public readonly email: string;
  public readonly phone: string;
  public readonly information: string;
  public readonly shopmanId?: string;

  private constructor(companyData: ICompanyData) {
    this.id = companyData.id;
    this.cnpj = companyData.cnpj;
    this.name = companyData.name;
    this.socialReason = companyData.socialReason;
    this.email = companyData.email;
    this.phone = companyData.phone;
    this.information = companyData.information;
    this.shopmanId = this.shopmanId;
  }

  public static create(userData: ICompanyData, shopmanId: string): Company {
    const data = userData;
    data['shopmanId'] = shopmanId;
    return new Company(data);
  }

  public toPlain(): ICompanyPlain {
    return {
      id: this.id,
      cnpj: this.cnpj,
      name: this.name,
      socialReason: this.socialReason,
      email: this.email,
      phone: this.phone,
      information: this.information,
      shopmanId: this.shopmanId,
    };
  }
}
