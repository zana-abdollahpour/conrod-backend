import { MigrationInterface, QueryRunner } from "typeorm";

export class IncreaseDecimalPrecision1786634861606 implements MigrationInterface {
    name = 'IncreaseDecimalPrecision1786634861606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "price" TYPE numeric(8,2)`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "price" TYPE numeric(8,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "price" TYPE numeric(4,2)`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "price" TYPE numeric(4,2)`);
    }

}
