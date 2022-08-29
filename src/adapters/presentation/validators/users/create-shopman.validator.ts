import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ValidatorMessages } from '../helpers/messages-validator.helper';

export class CreateShopmanValidator {
  @IsNotEmpty({ message: ValidatorMessages.isNotEmpty })
  @IsString({ message: ValidatorMessages.isString })
  public name: string;

  @IsNotEmpty({ message: ValidatorMessages.isNotEmpty })
  @IsString({ message: ValidatorMessages.isString })
  @IsEmail({}, { message: ValidatorMessages.isEmail })
  public email: string;

  @IsNotEmpty()
  @IsString({ message: ValidatorMessages.isString })
  @Matches(/^(\(?\d{2}\)?) ?9?\d{4,5}-?\d{4}$/g, {
    message: ValidatorMessages.isPhone,
  })
  public phone_1: string;

  @IsOptional()
  @IsString({ message: ValidatorMessages.isString })
  @Matches(/^(\(?\d{2}\)?) ?9?\d{4,5}-?\d{4}$/g, {
    message: ValidatorMessages.isPhone,
  })
  public phone_2?: string;
}
