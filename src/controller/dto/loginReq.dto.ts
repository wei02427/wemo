import { IsString } from 'class-validator'

export class LoginReqDto {
  @IsString()
    Account: string

  @IsString()
    Password: string
}
