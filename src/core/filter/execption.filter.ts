import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'

@Catch()
export class CustomizeEceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    // const request = ctx.getRequest()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    const msg =
      exception instanceof HttpException
        ? exception.message
        : 'something went wrong'

    response.statusCode = status
    response.send({
      status: false,
      timestamp: new Date().toISOString(),
      message: msg
    })
  }
}
