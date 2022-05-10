/* eslint-disable no-promise-executor-return */
import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class LoginController implements Controller {
  handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise((resolve) => resolve(badRequest(new MissingParamError('email'))));
  }
}
