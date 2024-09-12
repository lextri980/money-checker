import { MigrationInterface, QueryRunner } from 'typeorm';

export class Local1724318443049 implements MigrationInterface {
  name = 'Local1724318443049';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`discount\` int NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`discount\``);
  }
}
