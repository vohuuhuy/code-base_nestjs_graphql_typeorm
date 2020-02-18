import { Resolver, Mutation, Args } from "@nestjs/graphql"
import { ApolloError } from 'apollo-server-express'
import { User } from "src/graphql.schema";

@Resolver('User')
export class UserResolve {
  @Mutation('createUser')
  async createUser (
    @Args() args
  ): Promise<User | any> {
    try {
      const { username } = args
      console.log(args)
      return { username }
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}