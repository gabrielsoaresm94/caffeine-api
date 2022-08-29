import { IsOptional, IsString, Matches } from 'class-validator';
import { ValidatorMessages } from '../helpers/messages-validator.helper';

export class ListCompaniesValidator {
  @IsString({ message: ValidatorMessages.isString })
  @IsOptional()
  @Matches(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})/g, {
    message: ValidatorMessages.isCNPJ,
  })
  public cnpj?: string;
}
