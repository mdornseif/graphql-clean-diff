# graphql-clean-diff

Diff two Javascript Objects suitable for frontend code. Geared towards GraphQL but not limited to that.

With things like [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form/) and [json-schema-preset](https://www.npmjs.com/package/json-schema-preset) displaying changes between data on disk and in the form needs some clean up.

graphql-clean-diff:

1. Removes properties typically of no interest to the user `['id', 'updated_at', 'created_at']` and everything starting with an underscore, like `__typename'` - implemented by `cleanGqlInput(data)`.
2. Sorts object properties
3. Removes `[]`,  `{}`, `undefined` and `null`. Notably it keeps `""`.
4. Diffs the result. 

This usually is, what the user is interested in.

```js
const dbdata = {
        __typename: 'foobar',
        created_at: new Date('2022-02-22'),
        list: [1233, 'text', null],
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
cleanDiff(dbdata, formData)
```

results in this diff: `{"list": [1233,"",], "s": ""}`


`omitDeep()` and `omitDeepUnderscore()` are exported utility functions which may come handy in your own code.

## See also:

* [json-schema-preset](https://www.npmjs.com/package/json-schema-preset)
* [react-jsonschema-form](https://www.npmjs.com/package/@rjsf/core)
* [omit-deep-lodash](https://www.npmjs.com/package/omit-deep-lodash)