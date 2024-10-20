import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1729448047004 implements MigrationInterface {
  name = 'InitialMigration1729448047004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "salary" numeric(7,2) NOT NULL, "companyValue" numeric(7,2) NOT NULL, "selected" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customer"`);
  }
}
