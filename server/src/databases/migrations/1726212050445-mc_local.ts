import { MigrationInterface, QueryRunner } from "typeorm";

export class McLocal1726212050445 implements MigrationInterface {
    name = 'McLocal1726212050445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loan\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`loan\` ADD CONSTRAINT \`FK_ef7a63b4c4f0edd90e389edb103\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loan\` DROP FOREIGN KEY \`FK_ef7a63b4c4f0edd90e389edb103\``);
        await queryRunner.query(`ALTER TABLE \`loan\` DROP COLUMN \`userId\``);
    }

}
