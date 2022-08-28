import { IsOptional, IsString } from 'class-validator';

export class ListCompaniesValidator {
  @IsString()
  @IsOptional()
  public cnpj?: string;
}
