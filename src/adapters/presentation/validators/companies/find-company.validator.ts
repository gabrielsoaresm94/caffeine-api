import { IsNotEmpty, IsString } from 'class-validator';

export class FindCompanyValidator {
  @IsString()
  @IsNotEmpty()
  public id: string;
}
