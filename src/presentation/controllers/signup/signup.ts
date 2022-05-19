import {
  HttpResponse, HttpRequest, Controller, AddAccount, Validation,
} from './signup-protocols';
import { badRequest, ok, serverError } from '../../helpers/http-helper';

export default class SignUpController implements Controller {
  private readonly addAccount: AddAccount;

  private readonly validation: Validation;

  constructor(addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount;
    this.validation = validation;
  }

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(_httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const {
        name, email, password,
      } = _httpRequest.body;

      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      return ok(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
