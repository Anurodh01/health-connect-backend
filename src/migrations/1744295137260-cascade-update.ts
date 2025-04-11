import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeUpdate1744295137260 implements MigrationInterface {
    name = 'CascadeUpdate1744295137260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP FOREIGN KEY \`FK_c5ac599a35e2e3e2298282394aa\``);
        await queryRunner.query(`DROP INDEX \`REL_c5ac599a35e2e3e2298282394a\` ON \`doctors\``);
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP COLUMN \`profileId\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`doctorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD UNIQUE INDEX \`IDX_f9ab003e95abe2396bf4ad4315\` (\`doctorId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_f9ab003e95abe2396bf4ad4315\` ON \`doctor_profiles\` (\`doctorId\`)`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD CONSTRAINT \`FK_f9ab003e95abe2396bf4ad4315a\` FOREIGN KEY (\`doctorId\`) REFERENCES \`doctors\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP FOREIGN KEY \`FK_f9ab003e95abe2396bf4ad4315a\``);
        await queryRunner.query(`DROP INDEX \`REL_f9ab003e95abe2396bf4ad4315\` ON \`doctor_profiles\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP INDEX \`IDX_f9ab003e95abe2396bf4ad4315\``);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`doctorId\``);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD \`profileId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c5ac599a35e2e3e2298282394a\` ON \`doctors\` (\`profileId\`)`);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD CONSTRAINT \`FK_c5ac599a35e2e3e2298282394aa\` FOREIGN KEY (\`profileId\`) REFERENCES \`doctor_profiles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
