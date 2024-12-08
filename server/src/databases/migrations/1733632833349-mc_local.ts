import { MigrationInterface, QueryRunner } from 'typeorm';

export class McLocal1733632833349 implements MigrationInterface {
  name = 'McLocal1733632833349';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`isActivate\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` int NOT NULL DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isActivate\``);
  }
}
