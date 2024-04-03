import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserService } from 'src/service/user.service'
import { LoginReqDto } from './dto/loginReq.dto'
import { IsPublic } from 'src/passport/jwt-auth.guard'
import { type GetRentRecordResDto } from './dto/getRectRecordRes.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) { }

  @Post('login')
  @IsPublic()
  @ApiOperation({
    summary: '登入'
  })
  async login (@Body() data: LoginReqDto) {
    return await this.userService.login(data.Account, data.Password)
  }

  @Get('rentRecord')
  @ApiOperation({
    summary: '取得過往租借紀錄'
  })
  async getRecord (): Promise<GetRentRecordResDto[]> {
    return await this.userService.getRentRecord()
  }
}
