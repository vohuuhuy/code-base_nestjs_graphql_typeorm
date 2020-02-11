import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true,
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.schema.ts'),
      //   outputAs: 'class'
      // }
    }),
    TypeOrmModule.forRoot({
      name: 'mainDb',
      type: 'mongodb',
      host: 'localhost',
      port: 15339,
      database: 'tqcSocial',
      // url: '',
      useNewUrlParser: true,
      entities: ['@src/entities/**.entity{.ts,.js}'],
      // logging: true,
      username: '',
      password: '',
      keepConnectionAlive: true,
      synchronize: true
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
