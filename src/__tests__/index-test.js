const createSchemaFromJSON = require('../index');

describe('main', () => {
  it('create create a schema from simple JSON', () => {
	const simpleFixture = {
	  'name': 'brandon',
	  'id': 1,
	  'favorite_color': 'teal',
	  'job': {
	    'type': 'web developer',
	    'years': 1
	  },
	  'dogs': ['minnie', 'navi']
	};
    expect(createSchemaFromJSON(simpleFixture)).toMatchSnapshot();
  });
});
