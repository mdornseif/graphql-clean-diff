/*
 * omitDeep.test.ts
 *
 * Created by Dr. Maximillian Dornseif 2023-10-22 in graphql-clean-diff 1.0.4
 * Copyright (c) 2023 HUDORA GmbH
 */

import { diff } from 'deep-object-diff'
import { cleanDiff, cleanGqlInput, omitDeep, omitDeepUnderscore, sortObject } from '../src/index'

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
  it('handles lists', () => {
    const data = ['TUEV Rheinland/GS ID 1419073615', 'UKAR']
    expect(omitDeep(data, ['__typename', 's'])).toMatchInlineSnapshot(`
      [
        "TUEV Rheinland/GS ID 1419073615",
        "UKAR",
      ]
    `)
    expect(omitDeep({ foo: data }, ['__typename', 's'])).toMatchInlineSnapshot(`
      {
        "foo": [
          "TUEV Rheinland/GS ID 1419073615",
          "UKAR",
        ],
      }
    `)
  })
  it('handles problematic objects', () => {
    const data = {
      designator: '10432-info',
      dimH: 35,
      keine_nachdisposition: true,
      kataloge: ['Katalog 2022', 'Neuheiten 2020', 'Katalog 2020', 'Katalog 2021', 'Abverkauf', ''],
      artworksprachen: ['Deutsch', 'Englisch', 'Italienisch', 'Spanisch', 'Französisch', 'Niederländisch'],
      itemname_en: '',
      features: [],
      maximales_nutzergewicht: null,
    }
    expect(omitDeep(data, ['__typename', 's'])).toMatchInlineSnapshot(`
      {
        "artworksprachen": [
          "Deutsch",
          "Englisch",
          "Italienisch",
          "Spanisch",
          "Französisch",
          "Niederländisch",
        ],
        "designator": "10432-info",
        "dimH": 35,
        "features": [],
        "itemname_en": "",
        "kataloge": [
          "Katalog 2022",
          "Neuheiten 2020",
          "Katalog 2020",
          "Katalog 2021",
          "Abverkauf",
          "",
        ],
        "keine_nachdisposition": true,
        "maximales_nutzergewicht": null,
      }
    `)
  })
})
