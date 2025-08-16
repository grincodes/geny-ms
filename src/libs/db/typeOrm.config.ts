import * as typeorm from 'typeorm';

import { Config } from 'src/config';

export default new typeorm.DataSource({
  type: 'postgres',
  host: Config.DATABASE_HOST,
  port: Config.DATABASE_PORT,
  database: Config.DATABASE_NAME,
  username: Config.DATABASE_USER,
  password: Config.DATABASE_PASSWORD,
  synchronize: Config.DATABASE_SYNC,
  logging: Config.DATABASE_LOGGING,

  migrations: ['src/libs/db/migrations/*{.ts,.js}'],
  // extra: {
  //   trustServerCertificate: true,
  // },
  ssl: Config.NODE_ENV == 'production' ? { rejectUnauthorized: false } : null,
});
