/* eslint-disable no-promise-executor-return */
import {
  badRequest, ok, serverError, unauthorized,
} from '../../helpers/http/http-helper';
import {
  Controller, HttpRequest, HttpResponse, Authentication, Validation,
} from './login-protocols';

export class LoginController implements Controller {
  private readonly validation: Validation;

  private readonly authentication: Authentication;

  constructor(authentication: Authentication, validation: Validation) {
    this.authentication = authentication;
    this.validation = validation;
  }

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(_httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { email, password } = _httpRequest.body;
      const accessToken = await this.authentication.auth({ email, password });
      if (!accessToken) {
        return unauthorized();
      }
      return ok({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}
