import Knex from 'knex'
import Bookshelf from 'bookshelf'
import {
  DB_DEBUG,
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_TYPE,
  DB_USER
} from '../../config'

export class Database {
  private static _instance: Database | undefined
  private _knex: Knex
  private _bookshelf: Bookshelf
  constructor() {
    this._knex = Knex({
      client: DB_TYPE,
      connection: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME
      },
      debug: DB_DEBUG,
      pool: { min: 0, max: 7 }
    })
    /* @ts-ignore */
    this._bookshelf = Bookshelf(this._knex)
  }
  public static getIns(): Database {
    if (!this._instance) {
      this._instance = new Database()
    }

    return this._instance
  }

  public get bookshelf(): Bookshelf {
    return this._bookshelf
  }

  public get knex(): Knex {
    return this._knex
  }

  public destroy(): Promise<void> {
    return this._knex.destroy()
  }
}

export async function connect(): Promise<boolean> {
  Database.getIns()
  return true
}

export async function shutdown(): Promise<boolean> {
  await Database.getIns().destroy()
  return true
}
