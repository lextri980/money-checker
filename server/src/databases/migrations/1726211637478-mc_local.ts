import { MigrationInterface, QueryRunner } from "typeorm";

export class McLocal1726211637478 implements MigrationInterface {
    name = 'McLocal1726211637478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loan\` ADD \`content\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loan\` DROP COLUMN \`content\``);
    }

}
