# json-to-graphql

> Generates a GraphQL schema file based on any JSON data


## Overview

This package can take in almost* any kind of JSON data
and generate a valid GraphQL schema file, including custom
types, lists, nullable and non-nullable fields, and deeply
nested children.

If passed an array of JSON data it will use that as "training" data to check type consistency and identify
if fields are nullable or not.

___

* This project is still in pre-release stage and corner cases are sure to arise

## Install

```
$ npm install --save json-to-graphql
```

## Usage


#### `generateSchema(data: json | Array<json>): string`

Takes in JSON data (either a singular instance or array) and returns a string containing the schema definitions. You'll likely want to just write this to a file using `fs`.

```js
import generateSchema from 'json-to-graphql'
import data from './data.json'

const schema = generateSchema(data)
fs.writeFile('schema.js', schema, callback)
```

### Try it out

The `__tests__` folder currently just contains a small example that you can edit and run. You can change values in `api.js` and see how the generated schema (which is outputed to the console) changes.
