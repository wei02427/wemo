import {
  Injectable, type NestInterceptor, type ExecutionContext, type CallHandler
} from '@nestjs/common'

import { User } from './user'
import { type Observable } from 'rxjs'

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor (private readonly user: User) { }

  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const { user } = request
    if (user?.Id) {
      Object.assign(this.user, user)
    }
    return next.handle()
  }
}
