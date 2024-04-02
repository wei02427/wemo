import { Body, Controller, Get, Post } from "@nestjs/common";
import { ScooterService } from "src/service/scooter.service";
import { RentScooterReqDto } from "./dto/rentScooterReq.dto";
import { UserService } from "src/service/user.service";
import { ReturnScooterReqDto } from "./dto/returnScooterReq.dto";
import { RentScooterResDto } from "./dto/rentScooterRes.dto";
import { GetAvailableListResDto } from "./dto/getAvalibleListRes.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('scooter')
@ApiTags('Scooter')
export class ScooterController {
    constructor(
        private readonly scooterService: ScooterService,
        private readonly userService: UserService,
    ) { }

    @Post('rent')
    @ApiOperation({
        summary: '租車'
    })
    rent(@Body() data: RentScooterReqDto): Promise<RentScooterResDto> {
        return this.userService.rent(data.ScooterId)
    }

    @Post('return')
    @ApiOperation({
        summary: '還車'
    })
    return(@Body() data: ReturnScooterReqDto) {
        return this.userService.return(data.RentId)
    }

    @Get('available')
    @ApiOperation({
        summary: '可用車輛'
    })
    get():Promise<GetAvailableListResDto[]> {
        return this.scooterService.getAvailableList();
    }


}