import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('Scooter', function (table) {
        table.increments('Id').primary();
        table.string('LicensePlate').unique();
        table.integer('RentUserId').nullable().defaultTo(null);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('Scooter');
}

