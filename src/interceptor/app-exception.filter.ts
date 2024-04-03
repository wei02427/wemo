import {
  type ExceptionFilter, Catch, type ArgumentsHost, HttpException, HttpStatus
} from '@nestjs/common'

import { type Response } from 'express'
/** 攔截 API 意外事件，並回傳指定格式 */
@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch (exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    console.error(exception)

    const response = ctx.getResponse<Response>()

    const isHttpException = (exception instanceof HttpException)
    if (isHttpException) {
      const exceptionRes = exception.getResponse() as Record<string, unknown>
      response
        .status(exception.getStatus())
        .json({
          success: false,
          data: exceptionRes.message
        })
    } else {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          data: exception.toString()
        })
    }
  }
}
