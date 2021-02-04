import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(public reflector: Reflector) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = <any>exception.getResponse();

    errorResponse.success = false;
    errorResponse.statusCode = status;
    errorResponse.timestamp = new Date().toISOString();
    errorResponse.error = STATUS_CODES[status];

    response.status(status).json(errorResponse);
  }
}
