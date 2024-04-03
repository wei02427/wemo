import {
  Injectable, type NestInterceptor, type ExecutionContext, type CallHandler
} from '@nestjs/common'
import { type Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  data: T
}
/** API 回傳指定格式 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept (context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map((data) => ({ success: true, error: null, data })))
  }
}
