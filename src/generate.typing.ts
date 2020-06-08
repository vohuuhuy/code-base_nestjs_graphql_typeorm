import { GraphQLDefinitionsFactory } from '@nestjs/graphql'
import { join } from 'path'

const definitionFactory = new GraphQLDefinitionsFactory()
definitionFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.schema.ts'),
  outputAs: 'class'
})