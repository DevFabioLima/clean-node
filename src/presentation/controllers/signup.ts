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
    } catch (error) {
      return serverError();
    }
  }
}
