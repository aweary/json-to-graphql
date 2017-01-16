'use strict';

var createSchemaFromJSON = require('../index');

describe('main', function () {
		it('create create a schema from simple JSON', function () {
				var simpleFixture = {
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