import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { secretKey } from './modules/user/user.resolve'
import { User } from './entities/user.entity'
import * as jsonWebToken from 'jsonwebtoken'
import { UserModule } from './modules/user/user.module'
import { getMongoRepository } from 'typeorm'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: () => ({
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
        context: async ({ req }) => {
          const token = req.headers.authorization || ''
          if (!token) { return { userId: '' } }
          const { userId } = jsonWebToken.verify(token, secretKey)
          if (!userId) { return { userId: '' } }
          const userExisted = await getMongoRepository(User).findOne({
            _id: userId,
            isEnabled: true
          })
          if (!userExisted) { return { userId: '' } }
          const { username, _id } = userExisted
          return { userId: _id, username }
        },
        resolverValidationOptions: {
          requireResolversForResolveType: false
        }
      })
    }),
    TypeOrmModule.forRoot({
      // name: 'mainDb', // use name database must use createConnect('<name>') of typeorm
      type: 'mongodb',
      host: 'localhost',
      port: 15339,
      database: 'tqcSocial',
      // url: '',
      useNewUrlParser: true,
      entities: ["dist/**/*.entity{.ts,.js}"], //@src/entities/*.entity{.ts,.js}
      // logging: true,
      username: '',
      password: '',
      keepConnectionAlive: true,
      synchronize: true,
      useUnifiedTopology: true
    }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
