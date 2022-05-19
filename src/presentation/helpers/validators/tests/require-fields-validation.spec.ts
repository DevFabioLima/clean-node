import { MissingParamError } from '../../../errors';
import { RequiredFiledValidation } from '../require-fields-validation';

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFiledValidation('field');
    const error = sut.validate({ name: 'any_name' });
    expect(error).toEqual(new MissingParamError('field'));
  });
});
