/*
 * ts-omit-deep.ts
 *
 * based on https://github.com/jonschlinkert/omit-deep/blob/master/index.js
 *
 * Created by Dr. Maximillian Dornseif 2023-10-06 in huWaWi3 33.1.0
 * Copyright (c) 2023 Dr. Maximillian Dornseif
 */

import isPlainObject from 'is-plain-obj'

export function omitDeep(value: any, keys: string[]) {
  keys = [keys].flat()

  if (typeof value === 'undefined') {
    return {}
  }

  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      try {
        value[i] = omitDeep(value[i], [keys].flat())
      } catch (e) {
        console.error(e)
      }
    }
    return value
  }

  if (!isPlainObject(value)) {
    return value
  }

  for (let j = 0; j < keys.length; j++) {
    try {
      delete value[keys[j]]
    } catch (e) {
      console.error(e)
    }
  }

  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      try {
        value[key] = omitDeep(value[key], keys)
      } catch (e) {
        console.error(e)
      }
    }
  }

  return value
}
