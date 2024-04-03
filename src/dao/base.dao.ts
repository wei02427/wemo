import { Inject, Injectable, type OnApplicationBootstrap } from '@nestjs/common'
import knex, { type Knex } from 'knex'
import { ConfigService } from '../config/config.service'
import { ClsServiceManager } from 'nestjs-cls'
export const TenantTransaction = Symbol.for('Transaction')

@Injectable()
export class BaseDao<TableName extends Knex.TableNames> implements OnApplicationBootstrap {
  private connection: Knex

  @Inject(ConfigService)
  private readonly configService: ConfigService

  constructor (
    private readonly tableName: TableName
  ) { }

  onApplicationBootstrap () {
    this.connection = knex({
      client: 'mssql',
      connection: {
        server: this.configService.getDBServer(),
        user: this.configService.getDBUser(),
        password: this.configService.getDBPassword(),
        database: this.configService.getDBDatabase()
      }
    })
  }

  get instance () {
    const clsService = ClsServiceManager.getClsService()

    return clsService.get<Knex>(TenantTransaction) ?? this.connection
  }

  protected get repository () {
    return this.instance(this.tableName).clone()
  }

  async transacting<T>(callback: () => Promise<T>) {
    const clsService = ClsServiceManager.getClsService()
    return await this.instance.transaction(async (trx) => {
      return await clsService.run({ ifNested: 'inherit' }, async () => {
        clsService.set(TenantTransaction, trx)
        return await callback()
      })
    })
  }
}
