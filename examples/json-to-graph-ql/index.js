const generateSchema = require("json-to-graphql");
const data = require("./data.json");
const fs = require("fs");

const schema = generateSchema(data);
fs.writeFile('schema.js', schema, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
console.log(schema);