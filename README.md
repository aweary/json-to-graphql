# DEPRECATED

```diff
-- This project is no longer maintained and has fallen severely out of sync with the
-- GraphQL community. Don't use it at all.
```

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


### example

Say you have the following JSON response from an API

```js
{
  "name": "brandon",
  "id": 1,
  "favorite_color": "teal",
  "job": {
    "type": "web developer",
    "years": 1
  },
  "dogs": ["minnie", "navi"]
}
```

It includes strings, ints, nested objects, and arrays. Passing this to `generateSchema` would output the following schema:

```

const {
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLNonNull
} = require('graphql')


const JobType = new GraphQLObjectType({
    name: 'job',
    fields: {
        type: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for type
            resolve: () => null,
        },
        years: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLInt),
            // TODO: Implement resolver for years
            resolve: () => null,
        }
    },
});


module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: () => ({
            name: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for name
                resolve: () => null,
            },
            id: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLID),
                // TODO: Implement resolver for id
                resolve: () => null,
            },
            favorite_color: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for favorite_color
                resolve: () => null,
            },
            job: {
                description: 'enter your description',
                type: new GraphQLNonNull(JobType),
                // TODO: Implement resolver for job
                resolve: () => null,
            },
            dogs: {
                description: 'enter your description',
                type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
                // TODO: Implement resolver for dogs
                resolve: () => null,
            }
        })
    })
})
```

The only thing the user has to do is hook up the schema to an actual `resolve` function so that it knows how to query different values. In the future this project may include a CLI utility that can generate a resolve utility that wraps
any JSON API.


### Try it out

The `__tests__` folder currently just contains a small example that you can edit and run. You can change values in `api.js` and see how the generated schema (which is outputed to the console) changes.
