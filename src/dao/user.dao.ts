import { Injectable } from "@nestjs/common";
import { BaseDao } from "src/dao/base.dao";
import { User } from "src/database/schema";

@Injectable()
export class UserDao extends BaseDao<'User'>{
    constructor() {
        super('User')
    }

    update(data: Pick<User, 'Id'> & Partial<User>) {
        const { Id, ...udpateData } = data;
        return this.repository
            .update(udpateData)
            .where('Id', Id)
            .catch((err) => { throw new Error(err) });

    }

    get(userId: number) {
        return this.repository
            .select('Name')
            .select('ScooterId')
            .where('Id', userId)
            .first()
            .catch((err) => { throw new Error(err) });

    }

    getByAccount(account: string) {
        return this.repository
            .select('Id')
            .select('Password')
            .select('Salt')
            .where('Account', account)
            .first()
            .catch((err) => { throw new Error(err) });

    }
}