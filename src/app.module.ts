import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from './config/config.module'
import { DaoModule } from './dao/dao.module'
import { ClsModule } from 'nestjs-cls'
import { ScooterService } from './service/scooter.service'
import { UserService } from './service/user.service'
import { User } from './interceptor/user'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { UserInterceptor } from './interceptor/user.interceptor'
import { JWTAuthGuard } from './passport/jwt-auth.guard'
import { AuthenticationModule } from './module/authentication.module'
import { UserController } from './controller/user.controller'
import { ScooterController } from './controller/scooter.controller'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { AppExceptionFilter } from './interceptor/app-exception.filter'

@Module({
  imports: [
    ConfigModule,
    DaoModule,
    AuthenticationModule,
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
      proxyProviders: [User]
    })
  ],

  providers: [
    ScooterService,
    UserService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter
    }
  ],

  controllers: [
    UserController,
    ScooterController
  ]

})
export class AppModule { }
