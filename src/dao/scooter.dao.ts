import { Injectable } from "@nestjs/common";
import { BaseDao } from "src/dao/base.dao";
import { Scooter } from "src/database/schema";

@Injectable()
export class ScooterDao extends BaseDao<'Scooter'>{
    constructor() {
        super('Scooter')
    }
    get(id: number) {
        return this.repository
            .select('RentUserId')
            .select('LicensePlate')
            .where('Id', id)
            .first()
            .catch((err) => { throw new Error(err) });
    }

    update(data: Pick<Scooter, 'Id'> & Partial<Scooter>) {
        const { Id, ...updateDate } = data;
        return this.repository
            .update(updateDate)
            .where('Id', Id)
            .catch((err) => { throw new Error(err) });

    }

    getAvailableList() {
        return this.repository
            .select('Id')
            .select('LicensePlate')
            .whereNull('RentUserId')
            .catch((err) => { throw new Error(err) });

    }
}