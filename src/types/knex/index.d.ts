import { Knex } from 'knex'
import {
  type User,
  type Scooter,
  type Rent
} from '../../database/schema'
declare module 'knex' {
  namespace Knex {
    interface Tables {
      User: User
      Scooter: Scooter
      Rent: Rent
    }

  }
}
