import { IsNotEmpty, IsString } from 'class-validator';
import { ValidatorMessages } from '../helpers/messages-validator.helper';

export class FindCompanyValidator {
  @IsNotEmpty({ message: ValidatorMessages.isNotEmpty })
  @IsString({ message: ValidatorMessages.isString })
  public id: string;
}
