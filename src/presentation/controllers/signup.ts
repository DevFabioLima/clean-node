import { HttpResponse, HttpRequest } from '../protocols/http';
import MissingParamError from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/email-validator';
import InvalidParamError from '../errors/invalid-param-error';

export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(_httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
    let result:HttpResponse;

    requiredFields.forEach((field) => {
      if (!_httpRequest.body[field]) {
        result = badRequest(new MissingParamError(field));
      }
    });

    const isValid = this.emailValidator.isValid(_httpRequest.body.email);

    if (!isValid) {
      return badRequest(new InvalidParamError('email'));
    }

    return result;
  }
}
