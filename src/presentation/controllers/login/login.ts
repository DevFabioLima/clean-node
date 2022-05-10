/* eslint-disable no-promise-executor-return */
import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { EmailValidator } from '../signup/signup-protocols';

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!_httpRequest.body.email) {
      return new Promise((resolve) => resolve(badRequest(new MissingParamError('email'))));
    }
    if (!_httpRequest.body.password) {
      return new Promise((resolve) => resolve(badRequest(new MissingParamError('password'))));
    }

    this.emailValidator.isValid(_httpRequest.body.email);
  }
}
