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
      value[i] = omitDeep(value[i], [keys].flat())
    }
    return value
  }

  if (!isPlainObject(value)) {
    return value
  }

  for (let j = 0; j < keys.length; j++) {
    delete value[keys[j]]
  }

  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      value[key] = omitDeep(value[key], keys)
    }
  }

  return value
}
