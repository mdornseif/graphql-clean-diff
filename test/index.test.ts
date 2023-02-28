/*
 * index.test.ts
 *
 * Created by Dr. Maximillian Dornseif 2022-02-15 in graphql-clean-diff 0.1.0
 * Copyright (c) 2022 HUDORA GmbH
 */

import { cleanDiff } from '../src/index'

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
      Object {
        "list": Object {
          "0": 444,
        },
        "list2": Array [
          1233,
          "",
        ],
        "o": Object {
          "i": 666,
        },
        "s2": "",
      }
    `)
  })

  const dbdata = {
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

  expect(cleanDiff(dbdata, formData)).toMatchInlineSnapshot(`
    Object {
      "list": Array [
        1233,
        "",
      ],
      "s": "",
    }
  `)
})
