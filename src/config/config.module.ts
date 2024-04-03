import { Global, Module } from '@nestjs/common'
import { ConfigService } from './config.service'
import { ConfigModule as NestjsConfigModule } from '@nestjs/config'

@Global()
@Module({
  imports: [
    NestjsConfigModule.forRoot()
  ],
  providers: [
    ConfigService
  ],
  exports: [
    ConfigService
  ]
})
export class ConfigModule { }
