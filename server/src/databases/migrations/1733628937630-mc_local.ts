import { MigrationInterface, QueryRunner } from 'typeorm';

export class McLocal1733628937630 implements MigrationInterface {
  name = 'McLocal1733628937630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`loan\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`loanId\` varchar(36) NOT NULL, \`amount\` int NOT NULL, \`content\` varchar(255) NOT NULL, \`isDebt\` tinyint NOT NULL DEFAULT 1, \`triggerDate\` datetime NOT NULL, \`userLoanId\` varchar(36) NULL, \`createdBy\` varchar(36) NULL, PRIMARY KEY (\`loanId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_loan\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userLoanId\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`totalMoney\` int NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`userLoanId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan\` ADD CONSTRAINT \`FK_be3f6af1ab121d3b37234746bdf\` FOREIGN KEY (\`userLoanId\`) REFERENCES \`user_loan\`(\`userLoanId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan\` ADD CONSTRAINT \`FK_f45ce61ea1d294d59ad95fecc66\` FOREIGN KEY (\`createdBy\`) REFERENCES \`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`loan\` DROP FOREIGN KEY \`FK_f45ce61ea1d294d59ad95fecc66\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loan\` DROP FOREIGN KEY \`FK_be3f6af1ab121d3b37234746bdf\``,
    );
    await queryRunner.query(`DROP TABLE \`user_loan\``);
    await queryRunner.query(`DROP TABLE \`loan\``);
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
