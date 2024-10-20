import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCreatedAt1729452942962 implements MigrationInterface {
    name = 'AddedCreatedAt1729452942962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "createdAt"`);
    }

}
