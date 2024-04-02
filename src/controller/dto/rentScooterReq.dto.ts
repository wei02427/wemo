import { IsInt } from 'class-validator'
export class RentScooterReqDto {
    @IsInt()
    ScooterId: number;
}