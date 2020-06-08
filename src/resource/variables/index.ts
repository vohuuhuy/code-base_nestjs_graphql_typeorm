import * as dotenv from 'dotenv'

dotenv.config()

// system
export const SYS_MODE = process.env.SYS_MODE || 'dev'
export const PORT = process.env.PORT || 'dev'

// type orm
export const ORM_DB_HOST = process.env.ORM_HOST || 'localhost'
export const ORM_DB_PORT: number = parseInt(process.env.ORM_DB_PORT) || 27017
export const ORM_DB_NAME = process.env.ORM_DB_NAME

// graphql
export const GRAPHQL_PATH = process.env.GRAPHQL_PATH || '/graphql'
export const GRAPHQL_SUB_PATH = GRAPHQL_PATH

// jswebtoken
export const JSON_SECRETKEY = process.env.JSON_SECRETKEY || 'secretKey'
export const JSON_SALTROUND: number = parseInt(process.env.JSON_SALTROUND) || 13