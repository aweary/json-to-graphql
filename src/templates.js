
const schemaTemplate = (fields, types) => `
const {
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
} = require('graphql')

${types.join('\n')}

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({${fields}})
  })
})
`

const typeTemplate = (name, fields) => `
const ${name}Type = new GraphQLObjectType({
  name: '${name}',
  fields: {${fields}},
});
`

const scalarTypeTemplate = (name, value, type) => {
  value = value === value ? `'${value}'` : value;
  return `
    ${name}: {
      description: 'enter your description',
      type: ${type},
      // TODO: Implement resolver for ${name}
      resolve: () => ${value},
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
}
