import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBookingsTable1755155764547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExist = await queryRunner.hasTable('bookings');
    if (!tableExist) {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
      await queryRunner.createTable(
        new Table({
          name: 'bookings',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'clientName',
              type: 'varchar',
              isNullable: false,
            },

            {
              name: 'clientPhone',
              type: 'varchar',
              isNullable: false,
            },

            {
              name: 'service',
              type: 'enum',
              enum: ['manicure', 'pedicure', 'haircut'],
            },

            {
              name: 'startsAt',
              type: 'timestamptz',
              isNullable: false,
            },

            {
              name: 'notes',
              type: 'varchar',
              isNullable: true,
            },

            {
              name: 'userId',
              type: 'uuid',
              isNullable: false,
            },

            {
              name: 'createdAt',
              type: 'timestamptz',
              default: 'now()',
            },
            {
              name: 'updatedAt',
              type: 'timestamptz',
              default: 'now()',
            },
          ],
        }),
      );

      await queryRunner.createForeignKey(
        'bookings',
        new TableForeignKey({
          columnNames: ['userId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
        }),
      );
    } else {
      console.log('Table bookings already exists. Skipping creation.');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bookings');
  }
}
