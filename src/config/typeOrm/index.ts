import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import R from '@resource'

const TypeOrm: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: R.Variables.ORM_DB_HOST,
  port: R.Variables.ORM_DB_PORT,
  database: R.Variables.ORM_DB_NAME,
  useNewUrlParser: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  keepConnectionAlive: true,
  synchronize: true,
  useUnifiedTopology: true,

  username: R.Variables.ORM_DB_USERNAME,
  password: R.Variables.ORM_DB_PASSWORD,
  // name: 'mainDb', // use name database must use createConnect('<name>') of typeorm
  logging: R.Variables.ORM_DB_LOGIN,
  authSource: R.Variables.ORM_DB_AUTHSOURCE,
  // url: '',
}

export default TypeOrm
