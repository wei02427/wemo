import { BadRequestException, Injectable } from "@nestjs/common";
import { ScooterService } from "./scooter.service";
import { UserDao } from "../dao/user.dao";
import { RentDao } from "../dao/rent.dao";
import { User } from "src/interceptor/user";
import { createHash } from "crypto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        private readonly scooterService: ScooterService,
        private readonly userDao: UserDao,
        private readonly rentDao: RentDao,
        private readonly user: User,
        private readonly jwtService: JwtService,
    ) { }

    async login(account: string, password: string) {
        const user = await this.userDao.getByAccount(account);
        if (!user) throw new Error('User not found.');
        const hash = createHash("sha256")
            .update(password)
            .update(createHash("sha256").update(user.Salt, "utf8").digest("hex"))
            .digest("hex");

        if (user.Password !== hash) throw new BadRequestException('Password incorrect.');


        return { Token: this.jwtService.sign({ Id: user.Id }) };

    }

    async rent(scooterId: number) {
        const { Id: userId } = this.user;
        const user = await this.userDao.get(userId);

        if (!user) throw new Error('User not found.');

        const { ScooterId } = user;

        if (!ScooterId) {
            const rentId = await this.scooterService.rent(userId, scooterId);
            return { RentId: rentId.Id };
        } else {
            throw new BadRequestException('User has rent a scooter.');
        }
    }

    async return(rentId: number) {
        await this.scooterService.return(rentId);
    }

    async getRentRecord() {
        return this.rentDao.getByUSer(this.user.Id);
    }
}