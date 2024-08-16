import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsMongoUriConstraint implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments) {
    const mongoUriRegex = /^mongodb(?:\+srv)?:\/\/(?:[a-zA-Z0-9_]+:[^@]+@)?[a-zA-Z0-9._%-]+(?::[0-9]+)?\/[a-zA-Z0-9_\-]+(?:\?.*)?$/;
    return typeof value === 'string' && mongoUriRegex.test(value);
  }

  defaultMessage(_args: ValidationArguments) {
    return 'DB_MONGO_URI must be a valid MongoDB URI';
  }
}

export function IsMongoUri(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMongoUriConstraint,
    });
  };
}