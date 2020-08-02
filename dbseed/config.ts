import { MongoClient } from 'mongodb'
import R from '../src/resource'

export const URL = `mongodb://${R.Variables.ORM_DB_HOST}:${R.Variables.ORM_DB_PORT}`
export const Client = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true })
export const MongoConnect = async (collection) => {
  if (!Client && !Client.isConnected) await Client.connect()
  const ClientBD = Client.db(R.Variables.ORM_DB_NAME)
  return ClientBD.collection(collection)
}

export const MongoDisconnect = async () => {
  if (!Client && Client.isConnected) await Client.close()
}