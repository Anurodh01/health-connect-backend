import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class GlobalExceptionHandler implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const message = exception.getResponse()['message']
          ? exception.getResponse()['message']
          : exception.getResponse();

        response.status(status).json({
          statusCode: status,
          message: message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      }
}