/*
 * ts-omit-deep-underscore.ts
 *
 * based on https://github.com/jonschlinkert/omit-deep/blob/master/index.js
 *
 * Created by Dr. Maximillian Dornseif 2023-10-06 in huWaWi3 33.1.0
 * Copyright (c) 2023 Dr. Maximillian Dornseif
 */

import isPlainObject from 'is-plain-obj'

/** Omit all properties starting with an underscore */
export function omitDeepUnderscore(value: any) {
  if (typeof value === 'undefined') {
    return {}
  }

  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      value[i] = omitDeepUnderscore(value[i])
    }
    return value
  }

  if (!isPlainObject(value)) {
    return value
  }

  const unwantedKeys = Object.keys(value).filter((s) => s.startsWith('_'))
  for (let j = 0; j < unwantedKeys.length; j++) {
    delete value[unwantedKeys[j]]
  }

  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      value[key] = omitDeepUnderscore(value[key])
    }
  }

  return value
}
