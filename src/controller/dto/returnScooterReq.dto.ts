import { IsInt } from 'class-validator'

export class ReturnScooterReqDto {
  @IsInt()
    RentId: number
}
