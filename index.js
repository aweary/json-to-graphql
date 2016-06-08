const fs = require('fs');
const fetch = require('node-fetch');
const beautify = require('js-beautify');

const GraphQLBoolean = 'GraphQLBoolean';
const GraphQLString = 'GraphQLString';
const GraphQLInt = 'GraphQLInt';
const GraphQLObjectType = 'GraphQLObjectType';
const GraphQLSchema = 'GraphQLSchema';
const GraphQLFloat = 'GraphQLFloat';
const GraphQLID = 'GraphQLID';
const GraphQLNonNull = type => `GraphQLNonNull(${type})`;

const NativeStringType = 'string'
const NativeArrayType = 'array'
const NativeObjectType = 'object'
const NativeNullType = 'null'
const NativeNumberType = 'number'
const NativeBooleanType = 'boolean'
const NativeUndefinedType = 'undefined'


const {
  schemaTemplate,
  typeTemplate,
  scalarTypeTemplate,
  scalarTypeTemplateWithoutResolve,
  objectTypeTemplate,
} = require('./src/templates');

const mockQueryAPIForTrainingData = require('./mocks/mockQueryAPIForTrainingData');

const types = [];


/* Mock options until we can let the user config */
const mockOptions = {
  nonNullByDefault: true
}

function resolveObjectWithDefaults(values) {
  let fields = Object.keys(values);
  let result = [];
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i]
    const value = values[field]
    const type = getGraphQLType(field, value)
    const resolve = typeof value === 'string' ? `"${value}"` : value
    result.push(`${field}: () => ${resolve}`)
  }
  return `{
    ${result.join(',\n')}
  }`
}

function isAbstractType(type) {
  return (
    type === GraphQLObjectType
  )
}

function getNativeType(value) {
  if (value === null) return NativeNullType;
  if (Array.isArray(value)) return NativeArrayType;
  switch (typeof value) {
    case 'string':
      return NativeStringType;
    case 'number':
      return NativeNumberType;
    case 'boolean':
      return NativeBooleanType;
    case 'undefined':
      return NativeUndefinedType
  }
}

function getGraphQLType(key, value) {
  if (key.toUpperCase() === 'ID') {
    return GraphQLID
  }
  switch(typeof value) {
    case 'boolean':
      return GraphQLBoolean
    case 'string':
      return GraphQLString
    case 'object':
      return GraphQLObjectType
    case 'number':
      return value % 0 == 0
        ? GraphQLInt
        : GraphQLFloat
  }
}

/* Recursively parses all scalar values */
function returnGraphQLScalarTypes(obj, resolve) {
  let fields = [];
  const keys = Object.keys(obj)
  /* Parse top level types */
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = obj[key]
    const type = getGraphQLType(key, value)
    if (!isAbstractType(type)) {
      resolve
        ? fields.push(scalarTypeTemplate(key, value, type))
        : fields.push(scalarTypeTemplateWithoutResolve(key, type))
    } else {
      const scalars = returnGraphQLScalarTypes(value, false)
      const resolve = resolveObjectWithDefaults(value)
      console.log(resolve)
      fields.push(
        objectTypeTemplate(
          key,
          resolve
        )
      )
      types.push(
        typeTemplate(key, scalars)
      )
    }
  }
  return fields.join();
}


function normalizeArrayInstances(arr) {
  return arr[0];
}

function createQueryFromInstance(instance) {
  return ``
}

function buildQueryableSchema(query, scalars) {
  return ``
}


function buildRootQueryFromAPI(api) {
  const {url, params} = api;
}

function createAPIQuery(url, param) {
  return (value) => {
    const URL = url.replace(param, value)
    return new Promise((resolve, reject) => {
      fetch(URL)
        .then(response => response.json())
        .then(json => resolve(json))
    });
  }
}

function queryAPIForTrainingData(request, data) {
  let requests = [];
  if (!Array.isArray(data)) {
    throw new Error(
      'createQueryFromTrainingQueries(...): data must be' +
      'an array.'
    )
  }
  for (let i = 0; i < data.length; i++) {
    requests.push(request(data[i]))
  }
  return Promise.all(requests)
}

const typeMap = {
  username: {
    key: 'username',
    value: 'Aweary',
    nativeType: NativeStringType,
    graphQLType: GraphQLString,
    nullable: false
  },
  date: {
    key: 'date',
    value: null,
    nativeType: NativeNullType,
    graphQLType: null,
    nullable: true
  }
}


function createTypeToken(key, value) {
  let nullable = false;
  let graphQLType = getGraphQLType(key, value);
  const nativeType = getNativeType(value);
  if (nativeType === NativeNullType) {
    nullable = true,
    graphQLType = null;
  }
  return {
    key,
    value,
    nativeType,
    graphQLType,
    nullable
  }
}


function mapDataToTypeTokens(arr) {

  const typeTokensMap = {}
  const mismatches = {}

  arr.forEach(instance => {
    const keys = Object.keys(instance)
    for (i = 0; i < keys.length; i++) {
      const key = keys[i]
      const value = instance[key]
      const isNull = value === null
      let newToken = createTypeToken(key, value)
      const previousToken = typeTokensMap[key];
      const log = key === 'bio';

      /* Check previous type tokens for consistency */
      if (previousToken) {
        /* A null instance for a previously typed instance */
        if (newToken.nullable && !previousToken.nullable) {
          newToken = previousToken
          newToken.nullable = true
        }
        /* A type for a previously null instance */
        if (previousToken.nullable && !newToken.nullable) {
          newToken.nullable = true
        }

        if (newToken.nullable && previousToken.nullable) {
          if (!newToken.graphQLType) {
            newToken = previousToken
          }
        }

      }
      typeTokensMap[key] = newToken;
    }
  })

  return new Promise((resolve, reject) => {
    resolve(typeTokensMap)
  })

}

function mapTokensToConcreteTypes(tokens) {
  if (!mockOptions.nonNullByDefault) {
    return tokens;
  }
  for (key in tokens) {
    const token = tokens[key]
    let type = token.graphQLType
    if (!token.nullable) {
      token.type = GraphQLNonNull(type)
    }
  }
  return tokens;
}


function createGraphQLSchema(json) {
  /* Hard coded API values until URL parsing is implemented */
  const APIMetadata = {
    url: 'https://api.github.com/users/:username',
    params: {
      ':username': GraphQLString
    },
    training: ['aweary', 'wycats', 'leebyron']
  }

  const query = createAPIQuery(APIMetadata.url, ':username')
  queryAPIForTrainingData(query, APIMetadata.training)
  // mockQueryAPIForTrainingData()
  .then(data => mapDataToTypeTokens(data))
  .then(tokens => mapTokensToConcreteTypes(tokens))
  .then(types => console.log(types))
  .catch(err => console.log(err))

}


module.exports = createGraphQLSchema
