import { RequiredFiledValidation } from '../../presentation/helpers/validators/require-fields-validation';
import { Validation } from '../../presentation/helpers/validators/validation';
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFiledValidation(field));
  }
  return new ValidationComposite(validations);
};
