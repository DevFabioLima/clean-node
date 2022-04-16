import { HttpResponse, HttpRequest } from '../protocols/http';
import MissingParamError from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';

export default class SignUpController {
  handle(_httpRequest: HttpRequest): HttpResponse {
    if (!_httpRequest.body.name) {
      return badRequest(new MissingParamError('name'));
    }
    if (!_httpRequest.body.email) {
      return badRequest(new MissingParamError('email'));
    }
  }
}
