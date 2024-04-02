import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('Rent', function (table) {
        table.increments('Id').primary();
        table.integer('UserId');
        table.integer('ScooterId');
        table.dateTime('StartTime').nullable().defaultTo(null);
        table.dateTime('EndTime').nullable().defaultTo(null);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('Rent');
}

