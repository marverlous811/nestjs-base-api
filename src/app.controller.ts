import Joi from 'joi'
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UsePipes
} from '@nestjs/common'
import { AppService } from './app.service'
import { JoiValidationPipe } from './core/pipe/validation.pipe'
import { delay } from './util/util'

const testSchema = Joi.object({
  name: Joi.string()
})

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/timeout')
  async getTimeoutRequest(
    @Query('time', ParseIntPipe) time: number
  ): Promise<string> {
    await delay(time + 1000)
    return 'timeout'
  }

  @Get('/error')
  getError(): string {
    throw new ForbiddenException('error test exception')
  }

  @Post('/hello')
  @UsePipes(new JoiValidationPipe(testSchema))
  postHello(@Body() data: any): string {
    return 'hello ' + data.name
  }
}
