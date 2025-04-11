import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateChanges1744366268372 implements MigrationInterface {
    name = 'UpdateChanges1744366268372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP FOREIGN KEY \`FK_c5ac599a35e2e3e2298282394aa\``);
        await queryRunner.query(`DROP INDEX \`REL_c5ac599a35e2e3e2298282394a\` ON \`doctors\``);
        await queryRunner.query(`ALTER TABLE \`user_profile\` CHANGE \`address\` \`pincode\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`clinicAddress\``);
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP COLUMN \`profileId\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`area\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`city\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`state\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`country\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`pincode\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`doctorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD UNIQUE INDEX \`IDX_f9ab003e95abe2396bf4ad4315\` (\`doctorId\`)`);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD \`isLoggedOut\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_profile\` DROP COLUMN \`pincode\``);
        await queryRunner.query(`ALTER TABLE \`user_profile\` ADD \`pincode\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_f9ab003e95abe2396bf4ad4315\` ON \`doctor_profiles\` (\`doctorId\`)`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD CONSTRAINT \`FK_f9ab003e95abe2396bf4ad4315a\` FOREIGN KEY (\`doctorId\`) REFERENCES \`doctors\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP FOREIGN KEY \`FK_f9ab003e95abe2396bf4ad4315a\``);
        await queryRunner.query(`DROP INDEX \`REL_f9ab003e95abe2396bf4ad4315\` ON \`doctor_profiles\``);
        await queryRunner.query(`ALTER TABLE \`user_profile\` DROP COLUMN \`pincode\``);
        await queryRunner.query(`ALTER TABLE \`user_profile\` ADD \`pincode\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP COLUMN \`isLoggedOut\``);
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP INDEX \`IDX_f9ab003e95abe2396bf4ad4315\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`doctorId\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`pincode\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`country\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`state\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`city\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`area\``);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD \`profileId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`clinicAddress\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_profile\` CHANGE \`pincode\` \`address\` longtext NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c5ac599a35e2e3e2298282394a\` ON \`doctors\` (\`profileId\`)`);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD CONSTRAINT \`FK_c5ac599a35e2e3e2298282394aa\` FOREIGN KEY (\`profileId\`) REFERENCES \`doctor_profiles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
