import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { CustomizeEceptionsFilter } from './filter/execption.filter'
import { RequestIdInterceptor } from './interceptor/request_id.interceptor'
import { RequestMonitorInterceptor } from './interceptor/request_time.interceptor'
import { TransfromIntercept } from './interceptor/transform.interceptor'

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: RequestIdInterceptor },
    { provide: APP_INTERCEPTOR, useClass: RequestMonitorInterceptor },
    {
      provide: APP_FILTER,
      useClass: CustomizeEceptionsFilter
    },
    { provide: APP_INTERCEPTOR, useClass: TransfromIntercept }
  ]
})
export class CoreModule {}
