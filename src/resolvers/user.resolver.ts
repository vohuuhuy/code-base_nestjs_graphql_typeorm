import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import R from '@resource'
import { ApolloError } from 'apollo-server-express'
import { getMongoRepository } from 'typeorm'
import * as CryptoJS from 'crypto-js'
import * as Bcrypt from 'bcrypt'
import { v1 as uuidv1 } from 'uuid'
import * as jsonWebToken from 'jsonwebtoken'
import { UserEntity } from 'entities/user.entity'
import { User } from 'graphql.schema'
const moment = require('moment')

@Resolver('User')
export class UserResolve {
  @Mutation('createUser')
  async createUser (
    @Args() args
  ): Promise<User | any> {
    try {
      const { username, password, firstname, lastname } = args
      const userExisted = await getMongoRepository(UserEntity).findOne({
        where: {
          username,
          isEnabled: true
        }
      })
      if (userExisted) {
        throw new ApolloError('user existed', '404')
      }
      const passHashByCryptoJS = await CryptoJS.SHA256(password).toString()
      const passHashByBrypt = await Bcrypt.hashSync(passHashByCryptoJS, R.Variables.JSON_SALTROUND)
      await getMongoRepository(UserEntity).insertOne({
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
      const userExisted = await getMongoRepository(UserEntity).findOne({
        username,
        isEnabled: true
      })
      if (!userExisted) return
      const passHashByCryptoJS = await CryptoJS.SHA256(password).toString()
      const checkPassword = await Bcrypt.compare(passHashByCryptoJS, userExisted.password)
      if (!checkPassword) return
      return {
        token: await jsonWebToken.sign(
          {
            userId: userExisted._id
          },
          R.Variables.JSON_SECRETKEY
        )
      }
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}