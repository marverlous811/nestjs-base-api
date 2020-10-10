import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { API_TIMEOUT } from './config.tmp'
import { delay } from './util/util'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/timeout')
  async getTimeoutRequest(): Promise<string> {
    await delay(API_TIMEOUT + 1000)
    return 'timeout'
  }
}
