import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateValuesSize1729452663784 implements MigrationInterface {
  name = 'UpdateValuesSize1729452663784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "salary" TYPE numeric(15,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "companyValue" TYPE numeric(15,2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "companyValue" TYPE numeric(7,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "salary" TYPE numeric(7,2)`,
    );
  }
}
