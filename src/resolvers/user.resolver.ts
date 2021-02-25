import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import R from '@resource'
import { ApolloError } from 'apollo-server-express'
import { getMongoRepository } from 'typeorm'
import * as CryptoJS from 'crypto-js'
import * as Bcrypt from 'bcrypt'
import { v1 as uuidv1 } from 'uuid'
import * as jsonWebToken from 'jsonwebtoken'
import { UserEntity } from 'entities/user.entity'
import { User, InputUser, ResultLogin } from 'graphql.schema'
const moment = require('moment')

@Resolver('User')
export class UserResolve {
  @Query('users')
  async users(): Promise<User[] | ApolloError> {
    try {
      return await getMongoRepository(UserEntity).find({})
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Mutation('login')
  async login(@Args() args): Promise<ResultLogin> {
    try {
      const { userName, password } = args
      const userExisted = await getMongoRepository(UserEntity).findOne({
        userName,
        isBlock: false
      })
      if (!userExisted) throw new ApolloError('userName not found')
      const checkPassword = await Bcrypt.compare(password, userExisted.password)
      if (!checkPassword) throw new ApolloError('password not success')
      return {
        authorization: await jsonWebToken.sign(
          {
            userId: userExisted._id
          },
          R.Variables.JSON_SECRETKEY
        ),
        user: userExisted
      }
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Mutation('register')
  async register(@Args('inputUser') inputUser: InputUser): Promise<boolean | ApolloError> {
    try {
      const { firstName, lastName, userName, email, password } = inputUser

      const userExisted = await getMongoRepository(UserEntity).findOne({
        userName,
        isBlock: false
      })
      const emailExisted = await getMongoRepository(UserEntity).findOne({
        email,
        isBlock: false
      })

      if (userExisted) throw new ApolloError('userName existed')
      if (emailExisted) throw new ApolloError('email existed')

      const passHashByCryptoJS = await CryptoJS.SHA256(password).toString()
      const passHashByBrypt = await Bcrypt.hashSync(passHashByCryptoJS, R.Variables.JSON_SALTROUND)

      await getMongoRepository(UserEntity).insertOne(
        new UserEntity({
          _id: uuidv1(),
          password: passHashByBrypt,
          firstName,
          lastName,
          userName,
          email,
          isBlock: false,
          createdAt: moment().valueOf()
        })
      )

      return true
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}
