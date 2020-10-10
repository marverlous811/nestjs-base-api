import Debug from 'debug'
import * as config from '../config'

const logFilter = config.LOG_FILTER
Debug.enable(logFilter)

const debug = Debug('debug:')
const info = Debug('info:')
const warm = Debug('warm:')
const error = Debug('error:')

export interface ILogger {
  error: any
  info: any
  warn: any
  debug: any
}

/* eslint-disable */
export const NullLogger = {
  error: () => {},
  info: () => {},
  warn: () => {},
  debug: () => {},
}
/* eslint-enable */

export default function NewLogger(namespace = ''): ILogger {
  const _debug = debug.extend(namespace)
  const _info = info.extend(namespace)
  const _warn = warm.extend(namespace)
  const _error = error.extend(namespace)

  _error.log = console.error.bind(console)
  _info.log = console.info.bind(console)
  _warn.log = console.warn.bind(console)
  _debug.log = console.debug.bind(console)

  return {
    debug: _debug,
    info: _info,
    warn: _warn,
    error: _error
  }
}
