import {
  HttpResponse, HttpRequest, Controller, EmailValidator,
} from '../protocols';
import { badRequest, serverError } from '../helpers/http-helper';
import { InvalidParamError, MissingParamError } from '../errors';

export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(_httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

      for (const field of requiredFields) {
        if (!_httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      if (_httpRequest.body.password !== _httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValid = this.emailValidator.isValid(_httpRequest.body.email);

      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }
    } catch (error) {
      return serverError();
    }
  }
}
