import { Module } from '@nestjs/common'
import { RentDao } from './rent.dao'
import { ScooterDao } from './scooter.dao'
import { UserDao } from './user.dao'

@Module({
  providers: [
    RentDao,
    ScooterDao,
    UserDao
  ],
  exports: [
    RentDao,
    ScooterDao,
    UserDao
  ]
})
export class DaoModule { }
