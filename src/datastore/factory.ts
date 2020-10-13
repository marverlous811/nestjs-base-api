import { DB_TYPE } from '../config'
import * as MySQL from './mysql'

enum DATASTORE_TYPE {
  MYSQL = 'mysql'
}

export function getDB(type = DB_TYPE): IDataStore {
  return MySQL
}
