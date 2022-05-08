import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller;

  constructor(controller: Controller) {
    this.controller = controller;
  }

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(_httpRequest);
    return httpResponse;
  }
}
