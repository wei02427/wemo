import { Knex } from 'knex';
import {
    User,
    Scooter,
    Rent
} from '../schema'
declare module 'knex' {
    namespace Knex {
        interface Tables {
            User: User,
            Scooter: Scooter,
            Rent: Rent
        }

    }
}
