import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertAdmin1786875533459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "user" 
                ("name", "email", "phone", "password", "role")
            VALUES 
                ('admin', 'admin@example.com', '1234567890', '$2a$12$FXBj0AWwp7TmGg8yrCveFevKQxheS9aiHCEb1QnNVRg67FuU0h/Kq', 'ADMIN')
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "user" 
            WHERE "email" = 'admin@example.com'
        `)
    }

}
