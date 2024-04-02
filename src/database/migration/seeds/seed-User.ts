import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("User").insert([
        {
            Account: 'wei',
            Password: 'a87a830412e85a54a6c391d55051a3b4f8aa7eb270be5e985f9497fc8b47adbb',
            Salt: 'salt'
        }
    ]);
};
