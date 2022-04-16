import { HttpResponse, HttpRequest } from '../protocols/http';
import MissingParamError from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';

export default class SignUpController implements Controller {
  handle(_httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
    let result:HttpResponse;

    requiredFields.forEach((field) => {
      if (!_httpRequest.body[field]) {
        result = badRequest(new MissingParamError(field));
      }
    });

    return result;
  }
}
