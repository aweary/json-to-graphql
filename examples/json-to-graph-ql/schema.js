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


const AddressType = new GraphQLObjectType({
    name: 'address',
    fields: {
        street: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for street
            resolve: () => null,
        },
        suite: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for suite
            resolve: () => null,
        },
        city: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for city
            resolve: () => null,
        },
        zipcode: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for zipcode
            resolve: () => null,
        },
        geo: {
            description: 'enter your description',
            type: new GraphQLNonNull(AddressGeoType),
            // TODO: Implement resolver for geo
            resolve: () => null,
        }
    },
});


const AddressGeoType = new GraphQLObjectType({
    name: 'geo',
    fields: {
        lat: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for lat
            resolve: () => null,
        },
        lng: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for lng
            resolve: () => null,
        }
    },
});


const CompanyType = new GraphQLObjectType({
    name: 'company',
    fields: {
        name: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for name
            resolve: () => null,
        },
        catchPhrase: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for catchPhrase
            resolve: () => null,
        },
        bs: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for bs
            resolve: () => null,
        }
    },
});


module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: () => ({
            id: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLID),
                // TODO: Implement resolver for id
                resolve: () => null,
            },
            name: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for name
                resolve: () => null,
            },
            username: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for username
                resolve: () => null,
            },
            email: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for email
                resolve: () => null,
            },
            street: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for street
                resolve: () => null,
            },
            suite: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for suite
                resolve: () => null,
            },
            city: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for city
                resolve: () => null,
            },
            zipcode: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for zipcode
                resolve: () => null,
            },
            lat: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for lat
                resolve: () => null,
            },
            lng: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for lng
                resolve: () => null,
            },
            geo: {
                description: 'enter your description',
                type: new GraphQLNonNull(AddressGeoType),
                // TODO: Implement resolver for geo
                resolve: () => null,
            },
            address: {
                description: 'enter your description',
                type: new GraphQLNonNull(AddressType),
                // TODO: Implement resolver for address
                resolve: () => null,
            },
            phone: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for phone
                resolve: () => null,
            },
            website: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for website
                resolve: () => null,
            },
            name: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for name
                resolve: () => null,
            },
            catchPhrase: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for catchPhrase
                resolve: () => null,
            },
            bs: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for bs
                resolve: () => null,
            },
            company: {
                description: 'enter your description',
                type: new GraphQLNonNull(CompanyType),
                // TODO: Implement resolver for company
                resolve: () => null,
            }
        })
    })
})