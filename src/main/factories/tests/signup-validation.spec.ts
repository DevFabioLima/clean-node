import { RequiredFiledValidation } from '../../../presentation/helpers/validators/require-fields-validation';
import { Validation } from '../../../presentation/helpers/validators/validation';
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite';
import { makeSignUpValidation } from '../signup-validation';

jest.mock('../../../presentation/helpers/validators/validation-composite');

describe('SignupValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
    const validations: Validation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFiledValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
