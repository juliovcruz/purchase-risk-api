import { Controller } from '../../presentation/protocols/controller'
import { Request, Response } from 'express'
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http'

export const adaptRoutes = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse: HttpResponse = controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        body: httpResponse.body.message
      })
    }
  }
}
