import { BadRequestException, Injectable } from "@nestjs/common";
import { RentDao } from "../dao/rent.dao";
import { ScooterDao } from "../dao/scooter.dao";
import { Mutex } from "async-mutex";
import * as dayjs from 'dayjs'
import { UserDao } from "../dao/user.dao";

@Injectable()
export class ScooterService {
    private readonly locks = new Map<number, Mutex>();
    constructor(
        private readonly rentDao: RentDao,
        private readonly scooterDao: ScooterDao,
        private readonly userDao: UserDao,
    ) { }

    async rent(userId: number, scooterId: number) {
        if (!this.locks.has(scooterId)) this.locks.set(scooterId, new Mutex())
        const mutex = this.locks.get(scooterId);
        const release = await mutex.acquire();
        console.log('ss', userId, scooterId)

        try {
            const scooter = await this.scooterDao.get(scooterId);
            if (!scooter || scooter.RentUserId) throw new BadRequestException('Scooter is unavailable.');
            console.log('rentId')

            const rentId = await this.scooterDao.transacting(async () => {
                console.log('saaa')

                const d = await this.scooterDao.update({ Id: scooterId, RentUserId: userId });

                console.log('sbbb')
                await this.userDao.update({ Id: userId, ScooterId: scooterId });
                console.log('sccc')

                const x = await this.rentDao.add({ UserId: userId, ScooterId: scooterId, StartTime: dayjs().toISOString() });
                console.log('xxxx')

                return x
            })
            return rentId[0];

        } finally {
            release();
        }

    }

    async return(rentId: number) {
        const rentRecord = await this.rentDao.get(rentId);
        if (!rentRecord) throw new Error('Rent record not found.');
        if (rentRecord.EndTime) throw new Error('Scooter has been returned.');

        const { ScooterId: scooterId, UserId } = rentRecord;
        if (!this.locks.has(scooterId)) this.locks.set(scooterId, new Mutex())
        const mutex = this.locks.get(scooterId);
        const release = await mutex.acquire();

        try {
            const scooter = await this.scooterDao.get(scooterId);
            if (!scooter) throw new Error('scooter not found.');
            if (!scooter.RentUserId) throw new BadRequestException('Scooter is available.');

            await this.scooterDao.transacting(async () => {
                await this.scooterDao.update({ Id: scooterId, RentUserId: null });
                await this.userDao.update({ Id: UserId, ScooterId: null });

                await this.rentDao.update({ Id: rentId, EndTime: dayjs().toISOString() });
            })
            return rentId;

        } finally  {
            release();
        }
    }

    getAvailableList() {
        return this.scooterDao.getAvailableList();
    }

    getRentRecord(scooterId: number) {
        return this.rentDao.getByScooter(scooterId);
    }

}