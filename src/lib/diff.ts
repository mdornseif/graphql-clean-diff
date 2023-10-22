import cleanDeep from 'clean-deep'
import { diff } from 'deep-object-diff'
import { omitDeep } from './ts-omit-deep'
import { omitDeepUnderscore } from './ts-omit-deep-underscore'

// diese Properties wollen wir nicht im Editor
export const OMIT_PROPERTIES = ['__typename', 'id', 'updated_at', 'created_at']

export function cleanGqlInput(entity: Record<string, any>, omit = OMIT_PROPERTIES): Record<string, any> {
  return sortObject(
    // cleanDeep( Removes empty objects, arrays, empty strings, NaN, null and undefined values from objects.
    omitDeepUnderscore(
      omitDeep(
        // removes unwanted properties
        entity,
        omit
      )
    )
  )
}

export function cleanDiff(originalObj: object, updatedObj: object): object {
  // We have an issue here with https://github.com/mattphillips/deep-object-diff/issues/14
  // https://github.com/mattphillips/deep-object-diff/issues/79
  // https://github.com/mattphillips/deep-object-diff/issues/94

  return cleanDeep(diff(cleanGqlInput(originalObj), cleanGqlInput(updatedObj)), {
    emptyArrays: true,
    emptyObjects: true,
    emptyStrings: false,
  })
}

// from https://github.com/IndigoUnited/js-deep-sort-object/blob/master/index.js

function isPlainObject(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

function defaultSortFn(a: any, b: any) {
  return a.localeCompare(b)
}

export function sortObject<T extends {}>(
  src: T,
  comparator?: undefined | ((a: string, b: string) => number)
): T {
  if (Array.isArray(src)) {
    const ret = src.map(function (item) {
      return sortObject(item, comparator)
    }) as unknown as T
  }

  if (isPlainObject(src)) {
    const out: T = {} as T

    Object.keys(src)
      .sort(comparator || defaultSortFn)
      .forEach(function (key: string) {
        ;(out as any)[key] = sortObject((src as any)[key] as any, comparator)
      })
    return out as T
  }

  return src
}
