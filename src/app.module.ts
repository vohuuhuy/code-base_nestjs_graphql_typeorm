import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      path: '/graphqlTqcSocial',
      typePaths: ['./**/*.graphql'],
      playground: true,
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.schema.ts'),
      //   outputAs: 'class'
      // }
      installSubscriptionHandlers: true,
      subscriptions: {
        path: '/graphqlTqcSocial',
      },
      context: (({ req }) => {
        const token = req.headers.authorization || ''
        if (token) {
        } else {
        }
      })
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
  controllers: [],
  providers: [],
})
export class AppModule {}
