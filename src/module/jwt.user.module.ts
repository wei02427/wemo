import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from 'src/config/config.module'
import { ConfigService } from 'src/config/config.service'

/** User JWT 簽發驗證 */
@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        privateKey: configService.getAuthPrivateKey(),
        publicKey: configService.getAuthPublicKey(),
        signOptions: {
          expiresIn: '5d',
          algorithm: 'RS256',
          allowInsecureKeySizes: true
        }
      }),
      inject: [ConfigService]
    })
  ],
  exports: [JwtModule]
})
export class JWTUserModule { }
