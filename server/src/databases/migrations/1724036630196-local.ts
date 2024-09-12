import { MigrationInterface, QueryRunner } from 'typeorm';

export class Local1724036630196 implements MigrationInterface {
  name = 'Local1724036630196';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`price\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`rating\` \`rating\` int NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`rating\` \`rating\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`price\` int NOT NULL`,
    );
  }
}
