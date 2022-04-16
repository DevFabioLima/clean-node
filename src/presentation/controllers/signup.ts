export default class SignUpController {
  handle(_httpRequest: any): any {
    return {
      test: _httpRequest,
      statusCode: 400,
      body: new Error('Missing param: name'),
    };
  }
}
