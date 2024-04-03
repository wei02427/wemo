import { Injectable } from '@nestjs/common'
import { BaseDao } from './base.dao'
import { type Scooter } from '../database/schema'

@Injectable()
export class ScooterDao extends BaseDao<'Scooter'> {
  constructor () {
    super('Scooter')
  }

  async get (id: number) {
    return await this.repository
      .select('UserId')
      .select('LicensePlate')
      .where('Id', id)
      .first()
      .catch((err) => { throw new Error(err) })
  }

  async update (data: Pick<Scooter, 'Id'> & Partial<Scooter>) {
    const { Id, ...updateDate } = data
    return await this.repository
      .update(updateDate)
      .where('Id', Id)
      .catch((err) => { throw new Error(err) })
  }

  async getAvailableList () {
    return await this.repository
      .select('Id')
      .select('LicensePlate')
      .whereNull('UserId')
      .catch((err) => { throw new Error(err) })
  }
}
