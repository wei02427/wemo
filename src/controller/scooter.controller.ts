import { Body, Controller, Get, Post } from '@nestjs/common'
import { ScooterService } from 'src/service/scooter.service'
import { RentScooterReqDto } from './dto/rentScooterReq.dto'
import { UserService } from 'src/service/user.service'
import { ReturnScooterReqDto } from './dto/returnScooterReq.dto'
import { type RentScooterResDto } from './dto/rentScooterRes.dto'
import { type GetAvailableListResDto } from './dto/getAvalibleListRes.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('scooter')
@ApiTags('Scooter')
export class ScooterController {
  constructor (
    private readonly scooterService: ScooterService,
    private readonly userService: UserService
  ) { }

  @Post('rent')
  @ApiOperation({
    summary: '租車'
  })
  async rent (@Body() data: RentScooterReqDto): Promise<RentScooterResDto> {
    return await this.userService.rent(data.ScooterId)
  }

  @Post('return')
  @ApiOperation({
    summary: '還車'
  })
  async return (@Body() data: ReturnScooterReqDto) {
    return await this.userService.return(data.RentId)
  }

  @Get('available')
  @ApiOperation({
    summary: '可用車輛'
  })
  async get (): Promise<GetAvailableListResDto[]> {
    return await this.scooterService.getAvailableList()
  }
}
