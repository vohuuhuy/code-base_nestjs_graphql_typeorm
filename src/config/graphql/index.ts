import { GqlModuleAsyncOptions } from '@nestjs/graphql'
import R from '@resource'
import { AuthenticationError } from 'apollo-server-express'
import * as jsonWebToken from 'jsonwebtoken'
import { getMongoRepository } from 'typeorm'
import { UserEntity } from 'entities/user.entity'
import schemaDirectives from './schemaDirectives'

const Graphql: GqlModuleAsyncOptions = {
  useFactory: () => ({
    path: R.Variables.GRAPHQL_PATH,
    typePaths: ['./**/*.graphql'],
    playground: true,
    installSubscriptionHandlers: true,
    subscriptions: {
      path: R.Variables.GRAPHQL_SUB_PATH,
    },
    context: async ({ req }) => {
      let currentUser
      const token = req.headers.authorization || ''
      if (token) {
        const { userId } = jsonWebToken.verify(token, R.Variables.JSON_SECRETKEY)
        if (!userId) throw new AuthenticationError('authentication failed')
        currentUser = await getMongoRepository(UserEntity).findOne({
          _id: userId,
          isEnabled: true
        })
        if (!currentUser) throw new AuthenticationError('authentication failed')
      }
      return { currentUser }
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    schemaDirectives
  })

  // definitions: {
  //   path: join(process.cwd(), 'src/graphql.schema.ts'),
  //   outputAs: 'class'
  // }
}

export default Graphql