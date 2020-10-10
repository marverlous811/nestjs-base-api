import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException
} from '@nestjs/common'
import { Observable, throwError, TimeoutError } from 'rxjs'
import { catchError, tap, timeout } from 'rxjs/operators'
import { API_TIMEOUT } from '../../config'
import NewLogger from '../../lib/logger'

@Injectable()
export class RequestMonitorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const reqId = request.headers['x-request-id']
    const logger = NewLogger(`${reqId}:${request.url}`)
    logger.info(`request start`)

    const now = Date.now()

    return next
      .handle()
      .pipe(
        timeout(API_TIMEOUT),
        catchError(err => {
          const res = context.switchToHttp().getResponse()
          res.header('x-request-id', reqId)
          logger.info(`request end ${Date.now() - now}ms`)
          if (err instanceof TimeoutError) {
            return throwError(new RequestTimeoutException())
          }

          return throwError(err)
        })
      )
      .pipe(
        tap(() => {
          const res = context.switchToHttp().getResponse()
          res.header('x-request-id', reqId)
          logger.info(`request end ${Date.now() - now}ms`)
        })
      )
  }
}
