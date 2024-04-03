import { BaseDao } from './base.dao'
import { type Rent } from '../database/schema'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RentDao extends BaseDao<'Rent'> {
  constructor () {
    super('Rent')
  }

  async add (data: Pick<Rent, 'UserId' | 'ScooterId' | 'StartTime'>) {
    return await this.repository
      .insert({
        StartTime: data.StartTime,
        UserId: data.UserId,
        ScooterId: data.ScooterId
      })
      .returning('Id')
      .catch((err) => { throw new Error(err) })
  }

  async update (data: Pick<Rent, 'Id'> & Partial<Rent>) {
    const { Id, ...udpateData } = data
    return await this.repository
      .update(udpateData)
      .where('Id', Id)
      .catch((err) => { throw new Error(err) })
  }

  async get (rentId: number) {
    return await this.repository
      .select('ScooterId')
      .select('UserId')
      .select('EndTime')
      .where('Id', rentId)
      .first()
      .catch((err) => { throw new Error(err) })
  }

  async getByScooter (scooterId: number) {
    return await this.repository
      .select('StartTime')
      .select('EndTime')
      .select('UserId')
      .where('ScooterId', scooterId)
  }

  async getByUser (userId: number) {
    return await this.repository
      .innerJoin('Scooter', 'Scooter.Id', 'Rent.ScooterId')
      .select('StartTime')
      .select('EndTime')
      .select('Rent.UserId')
      .select('LicensePlate')
      .where('Rent.UserId', userId)
  }
}
