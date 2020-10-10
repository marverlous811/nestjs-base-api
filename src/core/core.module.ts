import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { RequestIdInterceptor } from './interceptor/request_id.interceptor'
import { RequestMonitorInterceptor } from './interceptor/request_time.interceptor'

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: RequestIdInterceptor },
    { provide: APP_INTERCEPTOR, useClass: RequestMonitorInterceptor }
  ]
})
export class CoreModule {}
