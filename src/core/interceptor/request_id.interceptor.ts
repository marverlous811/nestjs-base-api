import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { v4 as uuid } from 'uuid'

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const reqId = uuid()
    request.headers['x-request-id'] = reqId
    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse()
        res.header('x-request-id', reqId)
      })
    )
  }
}
