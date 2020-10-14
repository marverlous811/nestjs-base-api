import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { objectToUnderscore } from '../../lib/object_covert'

@Injectable()
export class TransfromIntercept implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        status: true,
        data: objectToUnderscore(data)
      }))
    )
  }
}
