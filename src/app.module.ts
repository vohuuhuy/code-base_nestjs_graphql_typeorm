import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import Config from '@config'
import * as Resolvers from './resolvers'

@Module({
  imports: [
    GraphQLModule.forRootAsync(Config.Graphql),
    TypeOrmModule.forRoot(Config.TypeOrm)
  ],
  controllers: [],
  providers: [...Object.values(Resolvers)],
})
export class AppModule {}
