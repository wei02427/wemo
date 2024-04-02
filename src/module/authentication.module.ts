import { Global, Module } from "@nestjs/common";
import { JWTAuthGuard } from "src/passport/jwt-auth.guard";
import { JwtStrategy } from "src/passport/jwt.strategy";
import { JWTUserModule } from "./jwt.user.module";

/** 驗證使用者 */
@Global()
@Module({
  imports: [
    JWTUserModule
  ],
  providers: [JwtStrategy, JWTAuthGuard],
})
export class AuthenticationModule { }
