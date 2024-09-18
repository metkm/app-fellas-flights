import { Db, MongoClient } from "mongodb";

let _db: Db

export const db = async (): Promise<Db> => {
  if (_db) {
    return _db
  }

  if (!process.env.MONGODB_CONNECTION_STRING) {
    throw Error('MONGODB_CONNECTION_STRING env variable not found')
  }

  const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING)
  await client.connect()

  _db = client.db('app-fellas')

  return _db
}
