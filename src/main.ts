import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import R from '@resource'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(R.Variables.PORT)
}
bootstrap()
