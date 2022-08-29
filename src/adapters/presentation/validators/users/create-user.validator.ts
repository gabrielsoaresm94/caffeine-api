import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Role } from '../../../../shared/guards/role.enum';
import { ValidatorMessages } from '../helpers/messages-validator.helper';

export class CreateUserValidator {
  @IsNotEmpty({ message: ValidatorMessages.isNotEmpty })
  @IsString({ message: ValidatorMessages.isString })
  public name: string;

  @IsNotEmpty({ message: ValidatorMessages.isNotEmpty })
  @IsEnum(Role, {
    message: ValidatorMessages.isEnum,
  })
  public role: Role;

  @IsNotEmpty({ message: ValidatorMessages.isNotEmpty })
  @IsString({ message: ValidatorMessages.isString })
  @IsEmail({}, { message: ValidatorMessages.isEmail })
  public email: string;

  @IsNotEmpty({ message: ValidatorMessages.isNotEmpty })
  @IsString({ message: ValidatorMessages.isString })
  public password: string;

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
