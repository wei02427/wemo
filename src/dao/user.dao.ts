import { Injectable } from '@nestjs/common'
import { BaseDao } from './base.dao'
import { type User } from '../database/schema'

@Injectable()
export class UserDao extends BaseDao<'User'> {
  constructor () {
    super('User')
  }

  async update (data: Pick<User, 'Id'> & Partial<User>) {
    const { Id, ...udpateData } = data
    return await this.repository
      .update(udpateData)
      .where('Id', Id)
      .catch((err) => { throw new Error(err) })
  }

  async get (userId: number) {
    return await this.repository
      .select('ScooterId')
      .where('Id', userId)
      .first()
      .catch((err) => { throw new Error(err) })
  }

  async getByAccount (account: string) {
    return await this.repository
      .select('Id')
      .select('Password')
      .select('Salt')
      .where('Account', account)
      .first()
      .catch((err) => { throw new Error(err) })
  }
}
