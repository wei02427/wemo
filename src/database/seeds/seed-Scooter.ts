import { type Knex } from 'knex'

export async function seed (knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex('Scooter').insert([
    { LicensePlate: 'ABC-123' },
    { LicensePlate: 'DEF-456' }
  ])
}
