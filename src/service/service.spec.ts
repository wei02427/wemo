import { Test } from '@nestjs/testing'
import { RentDao } from '../dao/rent.dao'
import { ScooterDao } from '../dao/scooter.dao'
import { UserDao } from '../dao/user.dao'
import { type Rent, type Scooter, type User as IUser } from '../database/schema'
import { ScooterService } from './scooter.service'
import { UserService } from './user.service'
import { User } from '../interceptor/user'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { JwtModule } from '@nestjs/jwt'
import { BadRequestException } from '@nestjs/common'
import { ClsModule } from 'nestjs-cls'
import * as dayjs from 'dayjs'

class MockUser implements User {
  Id = 1
}

class MockRentDao implements Pick<RentDao, 'add' | 'get' | 'getByScooter' | 'getByUser' | 'update' | 'transacting'> {
  private readonly rent: Rent[] = []
  async add (data: Pick<Rent, 'UserId' | 'ScooterId' | 'StartTime'>) {
    this.rent.push({ ...data, Id: this.rent.length + 1, EndTime: null })
    return [{ Id: this.rent.length }]
  }

  async update (data: Pick<Rent, 'Id'> & Partial<Rent>) {
    const record = this.rent.find(({ Id }) => Id === data.Id)

    Object.assign(record, data)
    return 1
  }

  async get (rentId: number) {
    return this.rent.find(({ Id }) => Id === rentId)
  }

  async getByScooter (scooterId: number) {
    return this.rent.filter(({ ScooterId }) => ScooterId === scooterId)
  }

  async getByUser (userId: number) {
    const mockScooterDao = new MockScooterDao()
    return this.rent.filter(({ UserId }) => UserId === userId)
      .map((record) => ({
        ...record,
        LicensePlate: mockScooterDao.getList().find(({ Id }) => Id === record.Id).LicensePlate
      }))
  }

  async transacting<T>(callback: () => Promise<T>) {
    return await callback()
  }
}

class MockScooterDao implements Pick<ScooterDao, 'get' | 'getAvailableList' | 'update' | 'transacting'> {
  private readonly scooters = [
    { Id: 1, LicensePlate: 'ABC-123', UserId: null },
    { Id: 2, LicensePlate: 'DEF-456', UserId: null }
  ]

  async get (id: number) {
    return this.scooters.find(({ Id }) => Id === id)
  }

  async update (data: Pick<Scooter, 'Id'> & Partial<Scooter>) {
    const scooter = this.scooters.find(({ Id }) => Id === data.Id)

    Object.assign(scooter, data)

    return 1
  }

  async getAvailableList () {
    return this.scooters.filter(({ UserId }) => !UserId)
  }

  getList () {
    return this.scooters
  }

  async transacting<T>(callback: () => Promise<T>) {
    return await callback()
  }
}

class MockUserDao implements Pick<UserDao, 'get' | 'getByAccount' | 'update' | 'transacting'> {
  private readonly users = [
    {
      Id: 1,
      Account: 'wei',
      Password: 'a87a830412e85a54a6c391d55051a3b4f8aa7eb270be5e985f9497fc8b47adbb',
      ScooterId: null,
      Salt: 'salt'
    },
    {
      Id: 2,
      Account: 'test',
      Password: 'a87a830412e85a54a6c391d55051a3b4f8aa7eb270be5e985f9497fc8b47adbb',
      ScooterId: null,
      Salt: 'salt'
    }
  ]

  async update (data: Pick<IUser, 'Id'> & Partial<User>) {
    const user = this.users.find(({ Id }) => Id == data.Id)

    Object.assign(user, data)

    return 1
  }

  async get (userId: number) {
    return this.users.find(({ Id }) => Id == userId)
  }

  async getByAccount (account: string) {
    return this.users.find(({ Account }) => Account == account)
  }

  async transacting<T>(callback: () => Promise<T>) {
    return await callback()
  }
}

describe('UserService', () => {
  let userService: UserService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
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
        }),
        ClsModule
      ],
      providers: [
        UserService,
        ScooterService,
        {
          provide: RentDao,
          useClass: MockRentDao
        },
        {
          provide: ScooterDao,
          useClass: MockScooterDao
        },
        {
          provide: UserDao,
          useClass: MockUserDao
        },
        {
          provide: User,
          useClass: MockUser
        }
      ]
    }).compile()

    userService = moduleRef.get<UserService>(UserService)
  })

  describe('rent', () => {
    it('Should rent only 1 scooter at a time.', async () => {
      await userService.rent(1)
      await expect(userService.rent(2)).rejects.toEqual(new BadRequestException('User has rent a scooter.'))
    })

    it('Get rent record.', async () => {
      await userService.rent(1)
      await expect(userService.getRentRecord()).resolves.toStrictEqual([{
        UserId: 1,
        EndTime: null,
        LicensePlate: 'ABC-123',
        ScooterId: 1,
        StartTime: dayjs().toISOString(),
        Id: 1
      }])
    })
  })

  describe('return', () => {
    it('Should return the scooter after rent.', async () => {
      const rentId = await userService.rent(1)
      await expect(userService.return(rentId.RentId)).resolves.toEqual(rentId.RentId)
    })

    it('Can not return the rent record which does not exist.', async () => {
      await expect(userService.return(1)).rejects.toEqual(new Error('Rent record not found.'))
    })

    it('Can not return the scooter twice.', async () => {
      const { RentId } = await userService.rent(1)
      await userService.return(RentId)

      await expect(userService.return(RentId)).rejects.toEqual(new Error('Scooter has been returned.'))
    })
  })
})

describe('ScooterService', () => {
  let scooterService: ScooterService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ScooterService,
        {
          provide: RentDao,
          useClass: MockRentDao
        },
        {
          provide: ScooterDao,
          useClass: MockScooterDao
        },
        {
          provide: UserDao,
          useClass: MockUserDao
        },
        {
          provide: User,
          useClass: MockUser
        }
      ]
    }).compile()

    scooterService = moduleRef.get<ScooterService>(ScooterService)
  })

  describe('rent', () => {
    it('A scooter can only be rented by one user at a time.', async () => {
      await scooterService.rent(1, 1)
      await expect(scooterService.rent(2, 1)).rejects.toEqual(new BadRequestException('Scooter is unavailable.'))
    })
  })
})
