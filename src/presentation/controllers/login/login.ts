/* eslint-disable no-promise-executor-return */
import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class LoginController implements Controller {
  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!_httpRequest.body.email) {
      return new Promise((resolve) => resolve(badRequest(new MissingParamError('email'))));
    }
    if (!_httpRequest.body.password) {
      return new Promise((resolve) => resolve(badRequest(new MissingParamError('password'))));
    }
  }
}
