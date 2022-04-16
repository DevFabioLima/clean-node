import { HttpResponse, HttpRequest } from '../protocols/http';
import MissingParamError from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';

export default class SignUpController {
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
