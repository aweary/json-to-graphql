'use strict';

var schemaTemplate = function schemaTemplate(fields, types) {
  return '\nconst {\n  GraphQLBoolean,\n  GraphQLString,\n  GraphQLInt,\n  GraphQLFloat,\n  GraphQLObjectType,\n  GraphQLSchema,\n  GraphQLID,\n  GraphQLNonNull\n} = require(\'graphql\')\n\n' + types.join('\n') + '\n\nmodule.exports = new GraphQLSchema({\n  query: new GraphQLObjectType({\n    name: \'RootQueryType\',\n    fields: () => ({' + fields + '})\n  })\n})\n';
};

var queryTemplateWithArgs = function queryTemplateWithArgs(name, // field name
type, // GraphQL Type
args, // mapped args
resolve // resolve method
) {
  return '\n  ' + name + ': {\n    type: ' + type + ',\n    args: {' + args + '},\n    resolve: ' + resolve + '\n  }\n';
};

var typeTemplate = function typeTemplate(type, name, fields) {
  return '\nconst ' + type + ' = new GraphQLObjectType({\n  name: \'' + name + '\',\n  fields: {' + fields + '},\n});\n';
};

var scalarTypeTemplate = function scalarTypeTemplate(name, type) {
  return '\n    ' + name + ': {\n      description: \'enter your description\',\n      type: ' + type + ',\n      // TODO: Implement resolver for ' + name + '\n      resolve: () => null,\n    }\n  ';
};

var scalarTypeTemplateWithoutResolve = function scalarTypeTemplateWithoutResolve(name, type) {
  return '\n  ' + name + ': {\n    description: \'enter your description\',\n    type: ' + type + '\n  }\n';
};

var objectTypeTemplate = function objectTypeTemplate(name, resolve) {
  return '\n' + name + ': {\n  description: \'enter your description\',\n  type: ' + name + 'Type,\n  // TODO: Implement resolver for ' + name + 'Type\n  resolve: () => (' + resolve + '),\n}\n';
};

module.exports = {
  schemaTemplate: schemaTemplate,
  typeTemplate: typeTemplate,
  scalarTypeTemplate: scalarTypeTemplate,
  scalarTypeTemplateWithoutResolve: scalarTypeTemplateWithoutResolve,
  objectTypeTemplate: objectTypeTemplate,
  queryTemplateWithArgs: queryTemplateWithArgs
};