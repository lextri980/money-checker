import { MigrationInterface, QueryRunner } from "typeorm";

export class McLocal1733648188263 implements MigrationInterface {
    name = 'McLocal1733648188263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_loan\` DROP FOREIGN KEY \`FK_b7da3a761d8eb45287ea71cea86\``);
        await queryRunner.query(`ALTER TABLE \`user_loan\` CHANGE \`userId\` \`userCreated\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_loan\` ADD CONSTRAINT \`FK_fc4e93442a59375724d07869f1f\` FOREIGN KEY (\`userCreated\`) REFERENCES \`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_loan\` DROP FOREIGN KEY \`FK_fc4e93442a59375724d07869f1f\``);
        await queryRunner.query(`ALTER TABLE \`user_loan\` CHANGE \`userCreated\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_loan\` ADD CONSTRAINT \`FK_b7da3a761d8eb45287ea71cea86\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
