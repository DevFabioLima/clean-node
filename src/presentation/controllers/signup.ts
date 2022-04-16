import { HttpResponse, HttpRequest } from '../protocols/http';
import MissingParamError from '../errors/missing-param-error';

export default class SignUpController {
  handle(_httpRequest: HttpRequest): HttpResponse {
    if (!_httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name'),
      };
    }
    if (!_httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email'),
      };
    }
  }
}
