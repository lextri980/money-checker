import { MigrationInterface, QueryRunner } from 'typeorm';

export class McLocal1726134945306 implements MigrationInterface {
  name = 'McLocal1726134945306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`loan\` ADD \`userLoanId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_loan\` ADD \`userId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan\` CHANGE \`isDebt\` \`isDebt\` tinyint NOT NULL DEFAULT 1`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan\` ADD CONSTRAINT \`FK_be3f6af1ab121d3b37234746bdf\` FOREIGN KEY (\`userLoanId\`) REFERENCES \`user_loan\`(\`userLoanId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_loan\` ADD CONSTRAINT \`FK_b7da3a761d8eb45287ea71cea86\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_loan\` DROP FOREIGN KEY \`FK_b7da3a761d8eb45287ea71cea86\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan\` DROP FOREIGN KEY \`FK_be3f6af1ab121d3b37234746bdf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan\` CHANGE \`isDebt\` \`isDebt\` tinyint NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user_loan\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`loan\` DROP COLUMN \`userLoanId\``);
  }
}
