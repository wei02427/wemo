import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('User', function (table) {
        table.increments('Id').primary();
        table.string('Name');
        table.integer('ScooterId').nullable().defaultTo(null);
        table.string('Account').unique();
        table.string('Password');
        table.string('Salt');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('User');
}

