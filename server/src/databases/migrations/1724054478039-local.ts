import { MigrationInterface, QueryRunner } from 'typeorm';

export class Local1724054478039 implements MigrationInterface {
  name = 'Local1724054478039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`model\` CHANGE \`modelInStock\` \`modelInStock\` int NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`model\` CHANGE \`modelInStock\` \`modelInStock\` int NOT NULL`,
    );
  }
}
