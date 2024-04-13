import { BadRequestException, Injectable } from '@nestjs/common'
import { RentDao } from '../dao/rent.dao'
import { ScooterDao } from '../dao/scooter.dao'
import { Mutex } from 'async-mutex'
import * as dayjs from 'dayjs'
import { UserDao } from '../dao/user.dao'
import { User } from '../interceptor/user'


@Injectable()
export class ScooterService {
  private readonly locks = new Map<number, Mutex>()
  constructor(
    private readonly rentDao: RentDao,
    private readonly scooterDao: ScooterDao,
    private readonly userDao: UserDao,
    private readonly user: User,
  ) { }

  async rent(userId: number, scooterId: number) {
    if (!this.locks.has(scooterId)) this.locks.set(scooterId, new Mutex())
    const mutex = this.locks.get(scooterId)
    const release = await mutex.acquire()

    try {
      const scooter = await this.scooterDao.get(scooterId)
      if (!scooter || scooter.UserId) throw new BadRequestException('Scooter is unavailable.')

      const rentId = await this.scooterDao.transacting(async () => {
        await this.scooterDao.update({ Id: scooterId, UserId: userId })

        await this.userDao.update({ Id: userId, ScooterId: scooterId })

        return await this.rentDao.add({ UserId: userId, ScooterId: scooterId, StartTime: dayjs().toISOString() })
      })
      return rentId[0]
    } finally {
      release()
    }
  }

  async return(rentId: number) {
    const rentRecord = await this.rentDao.get(rentId)

    if (!rentRecord) throw new Error('Rent record not found.')
    if (rentRecord.EndTime) throw new Error('Scooter has been returned.')
    if (rentRecord.UserId !== this.user.Id) throw new Error('Not return by same user.')
      const { ScooterId: scooterId, UserId } = rentRecord
    if (!this.locks.has(scooterId)) this.locks.set(scooterId, new Mutex())
    const mutex = this.locks.get(scooterId)
    const release = await mutex.acquire()

    try {
      const scooter = await this.scooterDao.get(scooterId)
      if (!scooter) throw new Error('scooter not found.')
      if (!scooter.UserId) throw new BadRequestException('Scooter is available.')

      await this.scooterDao.transacting(async () => {
        await this.scooterDao.update({ Id: scooterId, UserId: null })
        await this.userDao.update({ Id: UserId, ScooterId: null })

        await this.rentDao.update({ Id: rentId, EndTime: dayjs().toISOString() })
      })
      return rentId
    } finally {
      release()
    }
  }

  async getAvailableList() {
    return await this.scooterDao.getAvailableList()
  }

  async getRentRecord(scooterId: number) {
    return await this.rentDao.getByScooter(scooterId)
  }
}
