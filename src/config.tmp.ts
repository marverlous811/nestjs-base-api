export const ENV = process.env.ENV || 'env'
export const API_PORT = parseInt(process.env.API_PORT || '3000')
export const API_TIMEOUT = parseInt(process.env.API_TIMEOUT || '5000')
export const LOG_FILTER =
  process.env.LOG_FILTER || 'error:*,info:*,debug:*,warn:*'
