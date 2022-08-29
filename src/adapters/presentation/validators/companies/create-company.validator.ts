import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ValidatorMessages } from '../helpers/messages-validator.helper';
import { CreateShopmanValidator } from '../users/create-shopman.validator';

export class CreateCompanyValidator {
  @IsNotEmpty({ message: ValidatorMessages.isNotEmpty })
  @IsString({ message: ValidatorMessages.isString })
  @Matches(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})/g, {
    message: ValidatorMessages.isCNPJ,
  })
  public cnpj: string;

  @IsNotEmpty({ message: ValidatorMessages.isNotEmpty })
  @IsString({ message: ValidatorMessages.isString })
  public name: string;

  @IsNotEmpty({ message: ValidatorMessages.isNotEmpty })
  @IsString({ message: ValidatorMessages.isString })
  public socialReason: string;

  @IsNotEmpty({ message: ValidatorMessages.isNotEmpty })
  @IsString({ message: ValidatorMessages.isString })
  @IsEmail({}, { message: ValidatorMessages.isEmail })
  public email: string;

  @IsNotEmpty({ message: ValidatorMessages.isNotEmpty })
  @IsString({ message: ValidatorMessages.isString })
  @Matches(/^(\(?\d{2}\)?) ?9?\d{4,5}-?\d{4}$/g, {
    message: ValidatorMessages.isPhone,
  })
  public phone: string;

  @IsNotEmpty({ message: ValidatorMessages.isNotEmpty })
  @IsString({ message: ValidatorMessages.isString })
  public information: string;

  @Type(() => CreateShopmanValidator)
  public shopman: CreateShopmanValidator;
}
