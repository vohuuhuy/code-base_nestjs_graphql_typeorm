import { SchemaDirectiveVisitor } from "graphql-tools"
import { GraphQLField, defaultFieldResolver } from "graphql"
import { AuthenticationError } from "apollo-server-express"

export default class AuthenDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (...args) => {
      const { currentUser } = args[2]
      if (!currentUser) throw new AuthenticationError('authentication failed')
      return await resolve.apply(this, args)
    }
  }
}