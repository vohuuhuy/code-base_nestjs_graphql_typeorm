import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { ApolloError, AuthenticationError } from 'apollo-server-express'
import { getMongoRepository } from 'typeorm'
import { User as UserType } from 'src/graphql.schema'
import { User } from 'src/entities/entity.index'
import * as CryptoJS from 'crypto-js'
import * as Bcrypt from 'bcrypt'
import { v1 as uuidv1 } from 'uuid'
import * as jsonWebToken from 'jsonwebtoken'
const moment = require('moment')

export const saltRound = 10
export const secretKey = 'THPTTranQuyCap'

@Resolver('User')
export class UserResolve {
  @Mutation('createUser')
  async createUser (
    @Args() args
  ): Promise<UserType | any> {
    try {
      const { username, password, firstname, lastname } = args
      const userExisted = await getMongoRepository(User).findOne({
        where: {
          username,
          isEnabled: true
        }
      })
      if (userExisted) {
        throw new ApolloError('user existed', '404')
      }
      const passHashByCryptoJS = await CryptoJS.SHA256(password).toString()
      const passHashByBrypt = await Bcrypt.hashSync(passHashByCryptoJS, saltRound)
      await getMongoRepository(User).insertOne({
        _id: uuidv1(),
        username,
        password: passHashByBrypt,
        firstname,
        lastname,
        isEnabled: true,
        createdAt: moment().valueOf()
      })
      return { username }
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Query('login')
  async login(@Args() args) {
    try {
      const { username, password } = args
      const userExisted = await getMongoRepository(User).findOne({
        username,
        isEnabled: true
      })
      if (!userExisted) { return { hasUsername: false } }
      const passHashByCryptoJS = await CryptoJS.SHA256(password).toString()
      const checkPassword = await Bcrypt.compare(passHashByCryptoJS, userExisted.password)
      if (!checkPassword) { return { hasUsername: true } }
      return {
        token: await jsonWebToken.sign(
          {
            userId: userExisted._id
          },
          secretKey
        )
      }
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}