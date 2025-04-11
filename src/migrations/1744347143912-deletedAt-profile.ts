import { MigrationInterface, QueryRunner } from "typeorm";

export class DeletedAtProfile1744347143912 implements MigrationInterface {
    name = 'DeletedAtProfile1744347143912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_f9ab003e95abe2396bf4ad4315\` ON \`doctor_profiles\``);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD \`isLoggedOut\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` ADD \`deletedAt\` timestamp(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`doctor_profiles\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP COLUMN \`isLoggedOut\``);
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_f9ab003e95abe2396bf4ad4315\` ON \`doctor_profiles\` (\`doctorId\`)`);
    }

}
