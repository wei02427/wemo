import { Inject, Injectable, OnApplicationBootstrap } from "@nestjs/common";
import knex, { Knex } from "knex";
import { ConfigService } from "src/config/config.service";
import { ClsServiceManager } from 'nestjs-cls'
export const TenantTransaction = Symbol.for('Transaction');

@Injectable()
export class BaseDao<TableName extends Knex.TableNames> implements OnApplicationBootstrap {
    private connection: Knex;

    @Inject(ConfigService)
    private readonly configService: ConfigService;

    constructor(
        private readonly tableName: TableName,
    ) { }

    onApplicationBootstrap() {
        this.connection = knex({
            client: 'mssql',
            connection: {
                server: this.configService.getDBServer(),
                user: this.configService.getDBUser(),
                password: this.configService.getDBPassword(),
                database: 'Wemo',
            }
        })
    }

    get instance() {
        const clsService = ClsServiceManager.getClsService();

        return clsService.get<Knex>(TenantTransaction) ?? this.connection;
    }

    protected get repository() {
        return this.instance(this.tableName).clone();
    }

    async transacting<T>(callback: (trx: Knex.Transaction) => Promise<T>) {
        const clsService = ClsServiceManager.getClsService();
        return this.instance.transaction(async (trx) => {
            return clsService.run({ ifNested: 'inherit' }, () => {
                clsService.set(TenantTransaction, trx);
                return callback(trx);
            })
        })
    }

}