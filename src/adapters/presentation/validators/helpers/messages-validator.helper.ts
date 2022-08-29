import { ValidationArguments } from 'class-validator';

export class ValidatorMessages {
  public static isNotEmpty({ property }: ValidationArguments) {
    return `Campo "${property}" não deve ser vazio.`;
  }

  public static isString({ property }: ValidationArguments) {
    return `Campo "${property}" deve ser uma string.`;
  }

  public static isCNPJ({ property }: ValidationArguments) {
    return `Campo "${property}" deve ser um CNPJ.`;
  }

  public static isEmail({ property }: ValidationArguments) {
    return `Campo "${property}" deve ser um e-mail válido.`;
  }

  public static isPhone({ property }: ValidationArguments) {
    return `Campo "${property}" deve ser um telefone válido.`;
  }
}
