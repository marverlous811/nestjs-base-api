import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import NewLogger from './lib/logger'
import { API_PORT } from './config'
const logger = NewLogger('main')

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: false }
  )
  await app.listen(API_PORT, '0.0.0.0')
  logger.info('server is running in ', API_PORT)
}
bootstrap()
