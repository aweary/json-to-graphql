// @flow
'use strict';
const fs = require('fs');
const fetch = require('node-fetch');
const beautify = require('js-beautify');
import invariant from 'invariant';

export type NativeType = string;
export type GraphQLType = string | null;
export type CustomGraphQLTypeName = string;

export type TypeTokenMap = {
  [field: string]: TypeToken
}

export type TypeToken = {
  key: string;
  nativeType: string;
  nullable: boolean;
  list: boolean;
  rootGraphQLType: GraphQLType;
  type?: GraphQLType;
  customType?: boolean;
  schema?: string;
  fieldsType?: GraphQLType;
  nestedSchema?: TypeTokenMap;
  fields?: TypeTokenMap | null;
}

const GraphQLSchema: GraphQLType = 'GraphQLSchema';
const GraphQLObjectType: GraphQLType = 'GraphQLObjectType';

/* GraphQL Scalars */
const GraphQLInt: GraphQLType = 'GraphQLInt';
const GraphQLFloat: GraphQLType = 'GraphQLFloat';
const GraphQLString: GraphQLType = 'GraphQLString';
const GraphQLBoolean: GraphQLType = 'GraphQLBoolean';
const GraphQLID: GraphQLType = 'GraphQLID';

/* Wrapping types */

function GraphQLNonNull(type: GraphQLType): GraphQLType {
  return `new GraphQLNonNull(${type})`
}

function GraphQLList(type: GraphQLType): GraphQLType {
  return `new GraphQLList(${type})`
}

const NativeStringType: NativeType = 'string';
const NativeArrayType: NativeType = 'array';
const NativeObjectType: NativeType = 'object';
const NativeNullType: NativeType = 'null';
const NativeNumberType: NativeType = 'number';
const NativeBooleanType: NativeType = 'boolean';
const NativeUndefinedType: NativeType = 'undefined';

const {
  schemaTemplate,
  typeTemplate,
  scalarTypeTemplate,
  scalarTypeTemplateWithoutResolve,
  objectTypeTemplate,
  queryTemplateWithArgs,
} = require('./templates');


const types = [];
const customTypeMap = {};
const rootTypes = []
const fields = []

function isCustomGraphQLType(type: GraphQLType): boolean {
  return !(
    type === GraphQLInt ||
    type === GraphQLFloat ||
    type === GraphQLString ||
    type === GraphQLBoolean ||
    type === GraphQLID ||
    type === null
  )
}


/**
 * Creates a custom type name. Splits words
 * in the name based on whitespace, underscores, and
 * dashes and then creates a capitalizied map
 * of those words and returns a joined string with
 * "Type" appended.
 *
 * @example
 * > createCustomType('user_information')
 * > UserInformationType
 */

function createCustomTypeName(
  type: string,
  parent?: TypeToken | null
): CustomGraphQLTypeName {
  const parentType = parent ? parent.key : null;
  let words: string[] = type.split(/\W|_|\-/);
  if (parentType) words.unshift(parentType);
  words = words.map(word => word[0].toUpperCase() + word.slice(1));
  return `${words.join('')}Type`;
}


function getNativeType(value: any) : NativeType {
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
      return NativeUndefinedType;
    case 'object':
      return NativeObjectType;
  }
  throw new Error(
    `getNativeType(...): unable to parse type of ${value}`
  )
}

function getGraphQLType(key: string, value: any): GraphQLType {
  if (key.toUpperCase() === 'ID') {
    return GraphQLID
  }
  if (Array.isArray(value)) {
    const headType = getGraphQLType('', value[0]);
    return GraphQLList(headType)
  }

  if (value === null) {
    return null
  }

  switch(typeof value) {
    case 'boolean':
      return GraphQLBoolean
    case 'string':
      return GraphQLString
    case 'object':
      return GraphQLObjectType
    case 'number':
      return value % 1 == 0
        ? GraphQLInt
        : GraphQLFloat
  }
  return null
}


function getGraphQlTypeFromArray(
  key: string,
  arr: any[]
): GraphQLType {
  let headGraphQLType = getGraphQLType('', arr[0])
  for (let i = 0; i < arr.length; i++) {
    const itemGraphQLType = getGraphQLType('', arr[i])
    invariant(
      headGraphQLType === itemGraphQLType,
      'getGraphQlTypeFromArray(...): expected every item in ' +
      'the array to have the same type, found types %s, %s',
      headGraphQLType,
      itemGraphQLType
    );
  }

  if (headGraphQLType === GraphQLObjectType) {
    headGraphQLType = createCustomTypeName(key)
  }

  return headGraphQLType
}

/**
 * Creates a token representing the potential
 * GraphQL and native type for a JSON field.
 * If the native type is `NativeNullType` we
 * mark the field as nullable.
 *
 * Nullable fields will not be wrapped in
 * `GraphQLNonNull` if `nonNullByDefault` is
 * set to true.
 *
 */
function createTypeToken(
  key: string,
  value: any,
  parent: ?TypeToken
) : TypeToken {
  let list = false
  let nullable = false
  let rootGraphQLType = getGraphQLType(key, value)
  let fields = null
  const nativeType = getNativeType(value)

  /* Parse array item(s) type */
  if (nativeType === NativeArrayType) {
    list = true
    rootGraphQLType = getGraphQlTypeFromArray(key, value)
  }

  /* Queue a new type for creation */
  if (nativeType === NativeObjectType) {
    rootGraphQLType = createCustomTypeName(key, parent)
  }

  if (nativeType === NativeNullType) {
    nullable = true
  }

  const token = {
    key,
    nativeType,
    rootGraphQLType,
    nullable,
    list,
    fields
  }
  return token
}

function createTypeTokensMap(fields, parent): TypeTokenMap {
  const typeTokenMap = Object.create(null);
  const keys = Object.keys(fields);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const field = fields[key]
    const token = createTypeToken(key, field, parent)

    if (isCustomGraphQLType(token.rootGraphQLType)) {
      token.fields = token.list
           ? createTypeTokensMap(field[0], token)
           : createTypeTokensMap(field, token)
      token.customType = true
    }
    typeTokenMap[key] = token;
  }
  return typeTokenMap
}

function validateTypeTokenMaps(previous, next): TypeTokenMap {
  const previousKeys = Object.keys(previous);
  const nextKeys = Object.keys(next);
  const keys = previousKeys.length > nextKeys.length
        ? previousKeys
        : nextKeys
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i]
    const previousToken = previous[key]
    const nextToken = next[key]

    if (
      previousToken.rootGraphQLType
      !== nextToken.rootGraphQLType
    ) {
      const nullable = (
        previousToken.nullable ||
        nextToken.nullable
      );
      const type = (
        previousToken.rootGraphQLType ||
        nextToken.rootGraphQLType
      )
      const nativeType = previousToken.nativeType === NativeNullType
            ? nextToken.nativeType === NativeNullType
              ? NativeNullType : nextToken.nativeType
            : previousToken.nativeType
      const list = previousToken.list || nextToken.list
      const fields = previousToken.fields || nextToken.fields

      nextToken.nullable = nullable
      nextToken.rootGraphQLType = type
      nextToken.nativeType = nativeType
      nextToken.list = list
      nextToken.fields = fields
    }

  }
  return next
}


function buildTypeTokenAST(data): TypeTokenMap {
  let typeTokenAST;
  if (Array.isArray(data)) {
    typeTokenAST = data.map(datum => createTypeTokensMap(datum))
    typeTokenAST = typeTokenAST.reduce(validateTypeTokenMaps)
  } else {
    typeTokenAST = createTypeTokensMap(data)
  }

  return typeTokenAST

}

function applyListTypeWrapper(token: TypeToken): TypeToken {
  if (token.list) {
    token.type = GraphQLList(token.rootGraphQLType)
  }
  return token
}

function applyNonNullWrapper(token: TypeToken): TypeToken {
  const type = token.type || token.rootGraphQLType
  token.type = token.nullable
      ? type
      : GraphQLNonNull(type)
  return token;
}


function applyTypeWrappers(tokens: TypeTokenMap): TypeTokenMap {
  for (let key in tokens) {
    const token = tokens[key];
    applyListTypeWrapper(token);
    applyNonNullWrapper(token);
  }
  return tokens;
}

function createSchemasFromTokenMap(tokenMap: TypeTokenMap) {
  const types = []
  for (let key in tokenMap) {
    const token: TypeToken = tokenMap[key]
    if (token.customType && token.fields) {
      const typedFields = applyTypeWrappers(token.fields)
      const fieldSchema = mapFieldsToScalarTemplate(typedFields)
      token.fieldsType = typeTemplate(
        token.rootGraphQLType,
        key,
        fieldSchema
     )
     if (token.fields) {
      token.nestedSchema = createSchemasFromTokenMap(token.fields)
     }
    }

    token.schema = scalarTypeTemplate(key, token.type)

  }
  return tokenMap
}

function mapFieldsToScalarTemplate(fields) {
  const types = []
  for (let key in fields) {
    const field = fields[key]
    types.push(scalarTypeTemplate(key, field.type))
  }
  return types.join(',');
}

function createRootSchema(AST) {
  for (let key in AST) {
    const schema = AST[key]
    if (schema.customType) {
      rootTypes.push(schema.fieldsType)
      if (schema.nestedSchema) {
        createRootSchema(schema.nestedSchema)
      }
    }
    fields.push(schema.schema)
  }
  const root = schemaTemplate(fields.join(','), rootTypes)
  return beautify(root)
}


function createGraphQLSchema(json: Object | Array<Object>) {
  const typeTokenAST = buildTypeTokenAST(json)
  const tokenMap = applyTypeWrappers(typeTokenAST)
  const schema = createSchemasFromTokenMap(tokenMap)
  return createRootSchema(schema)
}


module.exports = createGraphQLSchema
