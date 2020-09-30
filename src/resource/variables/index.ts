import * as dotenv from 'dotenv'

dotenv.config()

// system
export const SYS_MODE = process.env.SYS_MODE || 'dev'
export const PORT = process.env.PORT || 3001

// type orm
export const ORM_DB_HOST = process.env.ORM_HOST || 'localhost'
export const ORM_DB_PORT: number = parseInt(process.env.ORM_DB_PORT) || 27017
export const ORM_DB_NAME = process.env.ORM_DB_NAME
export const ORM_DB_LOGIN: boolean = process.env.ORM_DB_LOGIN && process.env.ORM_DB_LOGIN.toLowerCase() === 'y' ? true : false
export const ORM_DB_USERNAME = process.env.ORM_DB_USERNAME
export const ORM_DB_PASSWORD = process.env.ORM_DB_PASSWORD
export const ORM_DB_AUTHSOURCE: string = process.env.ORM_DB_AUTHSOURCE

// graphql
export const GRAPHQL_PATH = process.env.GRAPHQL_PATH || '/graphql'
export const GRAPHQL_SUB_PATH = GRAPHQL_PATH

// jswebtoken
export const JSON_SECRETKEY = process.env.JSON_SECRETKEY || 'secretKey'
export const JSON_SALTROUND: number = parseInt(process.env.JSON_SALTROUND) || 13