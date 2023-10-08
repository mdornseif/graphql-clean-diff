/*
 * index.test.ts
 *
 * Created by Dr. Maximillian Dornseif 2022-02-15 in graphql-clean-diff 0.1.0
 * Copyright (c) 2022 HUDORA GmbH
 */

import { cleanDiff, omitDeep, omitDeepUnderscore } from '../src/index'

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
})

describe('omitDeep', () => {
  it('diffs', () => {
    const data = {
      __typename: 'foobar',
      _rev: '123',
      created_at: new Date('2022-02-22'),
      id: 1234,
      n: null,
      s: 'text',
      u: undefined,
      e2: { id: 345, s: 'text2' },
      list: [1233, '', null],
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
