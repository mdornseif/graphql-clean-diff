/*
 * index.test.ts
 *
 * Created by Dr. Maximillian Dornseif 2022-02-15 in graphql-clean-diff 0.1.0
 * Copyright (c) 2022 HUDORA GmbH
 */

import { diff } from 'deep-object-diff'
import { cleanDiff, cleanGqlInput, omitDeep, omitDeepUnderscore, sortObject } from '../src/index'

describe('sortObject', () => {
  it('objects', () => {
    expect(
      sortObject({
        list: [{ i: 1233, s: '', n: null }],
      })
    ).toMatchInlineSnapshot(`
      {
        "list": [
          {
            "i": 1233,
            "n": null,
            "s": "",
          },
        ],
      }
    `)
  })

  it('list', () => {
    expect(sortObject([{ i: 1233, s: '', n: null }])).toMatchInlineSnapshot(`
      [
        {
          "i": 1233,
          "n": null,
          "s": "",
        },
      ]
    `)
  })
  it('longer lists', () => {
    expect(
      sortObject([
        { i: 1233, s: 'foo', n: null },
        { i: 1233, s: 'bar', n: null },
      ])
    ).toMatchInlineSnapshot(`
      [
        {
          "i": 1233,
          "n": null,
          "s": "foo",
        },
        {
          "i": 1233,
          "n": null,
          "s": "bar",
        },
      ]
    `)
  })
})

describe('cleanDiff', () => {
  it('diffs only some stuff', () => {
    expect(
      cleanDiff(
        {
          __typename: 'foobar',
          created_at: new Date('2022-02-22'),
          e: {},
          id: 1234,
          list: [1233, '', null],
          n: null,
          o: { id: 1233, s: '', n: null, i: 12345 },
          s: '',
          stuff: [],
          u: undefined,
        },

        {
          __typename: 'bar',
          created_at: new Date('2022-02-23'),
          e: {},
          e2: {},
          id: 333,
          list: [444, '', null],
          list2: [1233, '', null],
          n: null,
          n2: null,
          o: { id: 555, s: '', n: null, i: 666 },
          s: '',
          s2: '',
          stuff: [],
          u: undefined,
          u2: undefined,
        }
      )
    ).toMatchInlineSnapshot(`
      {
        "list": {
          "0": 444,
        },
        "list2": [
          1233,
          "",
        ],
        "o": {
          "i": 666,
        },
        "s2": "",
      }
    `)

    const data = {
      __typename: 'foobar',
      created_at: new Date('2022-02-22'),
      id: 1234,
      n: null,
      s: 'text',
      u: undefined,
    }
    const formData = {
      e2: {},
      list: [1233, '', null],
      s: '',
      stuff: [],
    }

    expect(cleanDiff(data, formData)).toMatchInlineSnapshot(`
      {
        "list": [
          1233,
          "",
        ],
        "s": "",
      }
    `)
  })

  it('handles similar lists', () => {
    expect(
      cleanDiff(
        {
          list: [{ i: 1233, s: '', n: null }],
        },

        {
          list: [{ i: 1233, s: '', n: null }],
        }
      )
    ).toMatchInlineSnapshot(`{}`)
  })
  it('handles empty lists', () => {
    expect(
      cleanDiff(
        {
          list: [],
        },

        {
          list: [123],
        }
      )
    ).toMatchInlineSnapshot(`
      {
        "list": {
          "0": 123,
        },
      }
    `)
    expect(
      cleanDiff(
        {
          list: [],
        },

        {
          list: [{ i: 1233, s: '', n: null }],
        }
      )
    ).toMatchInlineSnapshot(`
      {
        "list": {
          "0": {
            "i": 1233,
            "s": "",
          },
        },
      }
    `)
  })
  it('handles lists with changed elements', () => {
    expect(
      cleanDiff(
        {
          list: [{ i: 1233, s: 'foo', n: null }],
        },

        {
          list: [{ i: 1233, s: 'bar', n: null }],
        }
      )
    ).toMatchInlineSnapshot(`
      {
        "list": {
          "0": {
            "s": "bar",
          },
        },
      }
    `)
  })
})

describe('omitDeep', () => {
  it('works', () => {
    const data = {
      __typename: 'foobar',
      _rev: '123',
      created_at: new Date('2022-02-22'),
      id: 1234,
      n: null,
      s: 'text',
      u: undefined,
      e2: { id: 345, s: 'text2' },
      list: [1233, '', null, undefined, 0],
      stuff: [],
    }
    expect(omitDeep(data, ['__typename', 's'])).toMatchInlineSnapshot(`
      {
        "_rev": "123",
        "created_at": 2022-02-22T00:00:00.000Z,
        "e2": {
          "id": 345,
        },
        "id": 1234,
        "list": [
          1233,
          "",
          null,
          {},
          0,
        ],
        "n": null,
        "stuff": [],
        "u": {},
      }
    `)
  })
})

describe('omitDeepUnderscore', () => {
  it('diffs', () => {
    const data = {
      __typename: 'foobar',
      _rev: '123',
      created_at: new Date('2022-02-22'),
      id: 1234,
      n: null,
      s: 'text',
      u: undefined,
      e2: {},
      list: [1233, '', null],
      stuff: [],
    }
    expect(omitDeepUnderscore(data)).toMatchInlineSnapshot(`
      {
        "created_at": 2022-02-22T00:00:00.000Z,
        "e2": {},
        "id": 1234,
        "list": [
          1233,
          "",
          null,
        ],
        "n": null,
        "s": "text",
        "stuff": [],
        "u": {},
      }
    `)
  })
})

describe('omitfullStack', () => {
  const originalObj = [{ i: 1233, s: 'foo', n: null }]
  const updatedObj = [{ i: 1233, s: 'bar', n: null }]
  test('cleanGqlInput', () => {
    expect(cleanGqlInput(originalObj)).toMatchInlineSnapshot(`
      [
        {
          "i": 1233,
          "n": null,
          "s": "foo",
        },
      ]
    `)
    expect(cleanGqlInput(updatedObj)).toMatchInlineSnapshot(`
      [
        {
          "i": 1233,
          "n": null,
          "s": "bar",
        },
      ]
    `)
  })
  test('diff', () => {
    expect(diff(cleanGqlInput(originalObj), cleanGqlInput(updatedObj))).toMatchInlineSnapshot(`
      {
        "0": {
          "s": "bar",
        },
      }
    `)
  })
  // export function cleanDiff(originalObj: object, updatedObj: object): object {
  //   return cleanDeep(diff(cleanGqlInput(originalObj), cleanGqlInput(updatedObj)), {
  //     emptyArrays: true,
  //     emptyObjects: true,
  //     emptyStrings: false,
  //   })
  // }
})
