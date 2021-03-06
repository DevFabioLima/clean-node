/* eslint-disable consistent-return */
import { MissingParamError } from '../../errors';
import { Validation } from '../../protocols/validation';

export class RequiredFiledValidation implements Validation {
  private readonly fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  validate(input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
