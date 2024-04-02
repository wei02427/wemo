import { BaseDao } from "src/dao/base.dao";
import { Rent } from "src/database/schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RentDao extends BaseDao<'Rent'>{
    constructor() {
        super('Rent')
    }

    add(data: Pick<Rent, 'UserId' | 'ScooterId' | 'StartTime'>) {
        return this.repository
            .insert({
                StartTime: data.StartTime,
                UserId: data.UserId,
                ScooterId: data.ScooterId,
            })
            .returning('Id')
            .catch((err) => { throw new Error(err) });

    }

    update(data: Pick<Rent, 'Id'> & Partial<Rent>) {
        const { Id, ...udpateData } = data;
        return this.repository
            .update(udpateData)
            .where('Id', Id)
            .catch((err) => { throw new Error(err) });

    }

    get(rentId: number) {
        return this.repository
            .select('ScooterId')
            .select('UserId')
            .select('EndTime')
            .where('Id', rentId)
            .first()
            .catch((err) => { throw new Error(err) });

    }

    getByScooter(scooterId: number) {
        return this.repository
            .select('StartTime')
            .select('EndTime')
            .select('UserId')
            .where('ScooterId', scooterId);
    }

    getByUSer(userId: number) {
        return this.repository
            .innerJoin('Scooter', 'Scooter.Id', 'Rent.ScooterId')
            .select('StartTime')
            .select('EndTime')
            .select('UserId')
            .select('LicensePlate')
            .where('UserId', userId);
    }
}