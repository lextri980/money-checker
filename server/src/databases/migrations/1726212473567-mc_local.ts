import { MigrationInterface, QueryRunner } from "typeorm";

export class McLocal1726212473567 implements MigrationInterface {
    name = 'McLocal1726212473567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loan\` DROP FOREIGN KEY \`FK_ef7a63b4c4f0edd90e389edb103\``);
        await queryRunner.query(`ALTER TABLE \`loan\` CHANGE \`userId\` \`createdBy\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`loan\` ADD CONSTRAINT \`FK_f45ce61ea1d294d59ad95fecc66\` FOREIGN KEY (\`createdBy\`) REFERENCES \`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loan\` DROP FOREIGN KEY \`FK_f45ce61ea1d294d59ad95fecc66\``);
        await queryRunner.query(`ALTER TABLE \`loan\` CHANGE \`createdBy\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`loan\` ADD CONSTRAINT \`FK_ef7a63b4c4f0edd90e389edb103\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
