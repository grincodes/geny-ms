import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function MinLeadTime(
  minutes: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'minLeadTime',
      target: object.constructor,
      propertyName,
      constraints: [minutes],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const minMinutes = args.constraints[0];
          const start = new Date(value).getTime();
          const now = Date.now();
          return !isNaN(start) && start - now >= minMinutes * 60 * 1000;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be at least ${args.constraints[0]} minutes from now`;
        },
      },
    });
  };
}
