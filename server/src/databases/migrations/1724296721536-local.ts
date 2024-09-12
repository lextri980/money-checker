import { MigrationInterface, QueryRunner } from 'typeorm';

export class Local1724296721536 implements MigrationInterface {
  name = 'Local1724296721536';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`isRemoved\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`price\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`rating\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`rating\` decimal(2,1) NOT NULL DEFAULT '0.0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`rating\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`rating\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`price\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`isRemoved\``,
    );
  }
}
