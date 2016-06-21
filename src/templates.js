
const schemaTemplate = (fields, types) => `
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

${types.join('\n')}

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({${fields}})
  })
})
`

const queryTemplateWithArgs = (
  name,     // field name
  type,     // GraphQL Type
  args,     // mapped args
  resolve   // resolve method
) => `
  ${name}: {
    type: ${type},
    args: {${args}},
    resolve: ${resolve}
  }
`

const typeTemplate = (type, name, fields) => `
const ${type} = new GraphQLObjectType({
  name: '${name}',
  fields: {${fields}},
});
`

const scalarTypeTemplate = (name, type) => {
  return `
    ${name}: {
      description: 'enter your description',
      type: ${type},
      // TODO: Implement resolver for ${name}
      resolve: () => null,
    }
  `
}

const scalarTypeTemplateWithoutResolve = (name, type) => `
  ${name}: {
    description: 'enter your description',
    type: ${type}
  }
`

const objectTypeTemplate = (name, resolve) => `
${name}: {
  description: 'enter your description',
  type: ${name}Type,
  // TODO: Implement resolver for ${name}Type
  resolve: () => (${resolve}),
}
`

module.exports = {
  schemaTemplate,
  typeTemplate,
  scalarTypeTemplate,
  scalarTypeTemplateWithoutResolve,
  objectTypeTemplate,
  queryTemplateWithArgs,
}
