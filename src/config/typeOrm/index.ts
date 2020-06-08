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
  useUnifiedTopology: true

  // username: '',
  // password: '',
  // name: 'mainDb', // use name database must use createConnect('<name>') of typeorm
  // logging: true,
  // url: '',
}

export default TypeOrm
