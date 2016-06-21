const createSchemaFromJSON = require('../src');
const json = require('./api.js');

console.log(
  createSchemaFromJSON(json)
)
