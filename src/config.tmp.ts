export const ENV = process.env.ENV || 'env'
export const API_PORT = parseInt(process.env.API_PORT || '3000')
export const API_TIMEOUT = parseInt(process.env.API_TIMEOUT || '5000')
export const LOG_FILTER =
  process.env.LOG_FILTER || 'error:*,info:*,debug:*,warn:*'
export const DB_TYPE = process.env.DB_TYPE || 'mysql'
export const DB_HOST = process.env.DB_HOST || '127.0.0.1'
export const DB_PORT = parseInt(process.env.DB_PORT || '3306')
export const DB_USER = process.env.DB_USER
export const DB_PASS = process.env.DB_PASS
export const DB_NAME = process.env.DB_NAME || ''
export const DB_DEBUG = process.env.DB_DEBUG === 'true'
