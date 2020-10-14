export function toCamel(s: string): string {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  })
}

export function toUnderscore(key: string): string {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase()
}

function isObject(o: any): boolean {
  return o === Object(o) && !Array.isArray(o) && typeof o !== 'function'
}

function objectConvert(o: any, convertFunc: (s: string) => string) {
  if (isObject(o)) {
    const n = {}

    Object.keys(o).forEach(k => {
      n[convertFunc(k)] = objectConvert(o[k], convertFunc)
    })

    return n
  } else if (Array.isArray(o)) {
    return o.map(i => {
      return objectConvert(i, convertFunc)
    })
  }

  return o
}

export const objectToUnderscore = (o: any) => objectConvert(o, toUnderscore)
export const objectToCamel = (o: any) => objectConvert(o, toCamel)
