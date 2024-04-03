import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema
        .alterTable('User', (table) => {
            table
                .foreign('ScooterId')
                .references('Scooter.Id');
        })

    knex.schema
        .alterTable('Scooter', (table) => {
            table
                .foreign('UserId')
                .references('User.Id');
        })
    knex.schema
        .alterTable('Rent', (table) => {
            table
                .foreign('UserId')
                .references('User.Id');
            table
                .foreign('ScooterId')
                .references('Scooter.Id');
        })
}


export async function down(knex: Knex): Promise<void> {
}

