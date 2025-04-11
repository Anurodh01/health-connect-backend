import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressUpdateInProfile1744354820291 implements MigrationInterface {
    name = 'AddressUpdateInProfile1744354820291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_medical_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`disease_name\` text NOT NULL, \`diagnosis_date\` date NOT NULL, \`notes\` longtext NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`doctorId\` int NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_75602365c2f338491735dc1c44\` (\`doctorId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dateofbirth\` date NOT NULL, \`gender\` enum ('0', '1', '2') NOT NULL, \`area\` longtext NULL, \`city\` text NOT NULL, \`state\` text NOT NULL, \`country\` text NOT NULL, \`pincode\` varchar(255) NOT NULL, \`location\` text NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`clinicAddress\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`area\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`city\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`state\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`country\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`pincode\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`profileId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_b1bda35cdb9a2c1b777f5541d8\` (\`profileId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b1bda35cdb9a2c1b777f5541d8\` ON \`users\` (\`profileId\`)`);
        await queryRunner.query(`ALTER TABLE \`user_medical_history\` ADD CONSTRAINT \`FK_75602365c2f338491735dc1c44f\` FOREIGN KEY (\`doctorId\`) REFERENCES \`doctors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_medical_history\` ADD CONSTRAINT \`FK_5fb355c1000802ea942ff12495c\` FOREIGN KEY (\`userId\`) REFERENCES \`user_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b1bda35cdb9a2c1b777f5541d87\` FOREIGN KEY (\`profileId\`) REFERENCES \`user_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b1bda35cdb9a2c1b777f5541d87\``);
        await queryRunner.query(`ALTER TABLE \`user_medical_history\` DROP FOREIGN KEY \`FK_5fb355c1000802ea942ff12495c\``);
        await queryRunner.query(`ALTER TABLE \`user_medical_history\` DROP FOREIGN KEY \`FK_75602365c2f338491735dc1c44f\``);
        await queryRunner.query(`DROP INDEX \`REL_b1bda35cdb9a2c1b777f5541d8\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_b1bda35cdb9a2c1b777f5541d8\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`profileId\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`pincode\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`country\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`state\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`city\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`area\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`clinicAddress\` text NOT NULL`);
        await queryRunner.query(`DROP TABLE \`user_profile\``);
        await queryRunner.query(`DROP INDEX \`REL_75602365c2f338491735dc1c44\` ON \`user_medical_history\``);
        await queryRunner.query(`DROP TABLE \`user_medical_history\``);
    }

}
