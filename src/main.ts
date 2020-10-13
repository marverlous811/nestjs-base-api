import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import NewLogger from './lib/logger'
import { API_PORT } from './config'
import { getDB } from './datastore/factory'
const logger = NewLogger('main')

interface App {
  close(): Promise<void>
}

async function bootstrap() {
  const dbConnected = await getDB().connect()
  if (!dbConnected) {
    logger.error('cannot connect to db')
    process.exit(1)
  }
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: false }
  )
  await app.listen(API_PORT, '0.0.0.0')
  logger.info('server is running in ', API_PORT)

  process.on('SIGINT', () => {
    logger.info('SIGINT shutdown app')
    close(app)
  })
  process.on('SIGTERM', () => {
    logger.info('SIGTERM shutdown app')
    close(app)
  })
}

async function close(app: App, delay = 2000) {
  await app.close()
  await getDB().shutdown()
  setTimeout(() => {
    process.exit()
  }, delay)
}

bootstrap()
