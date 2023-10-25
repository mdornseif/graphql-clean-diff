/*
 * ts-omit-deep.ts
 *
 * based on https://github.com/jonschlinkert/omit-deep/blob/master/index.js
 *
 * Created by Dr. Maximillian Dornseif 2023-10-06 in huWaWi3 33.1.0
 * Copyright (c) 2023 Dr. Maximillian Dornseif
 */

import isPlainObject from 'is-plain-obj'

export function omitDeep(value: any, keys: string[]): any {
  keys = [keys].flat()

  if (typeof value === 'undefined') {
    return {}
  }

  if (Array.isArray(value)) {
    return value.map((x) => omitDeep(x, [keys].flat()))
  }

  if (!isPlainObject(value)) {
    return value
  }

  for (let j = 0; j < keys.length; j++) {
    try {
      delete value[keys[j]]
    } catch (e) {
      console.warn(`Löschen von ${keys[j]} hat nicht geklappt`, value, keys, e)
    }
  }

  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      try {
        value[key] = omitDeep(value[key], keys)
      } catch (e) {
        console.warn(
          `Zugriff auf value[${key}] hat nicht geklappt`,
          value,
          key,
          value[key],
          typeof value,
          typeof value[key],
          e
        )
      }
    }
  }

  return value
}
