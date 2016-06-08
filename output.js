const {
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
} = require('graphql')



module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: () => ({
            login: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for login
                resolve: () => 'Aweary',
            },
            id: {
                description: 'enter your description',
                type: GraphQLID,
                // TODO: Implement resolver for id
                resolve: () => '6886061',
            },
            avatar_url: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for avatar_url
                resolve: () => 'https://avatars.githubusercontent.com/u/6886061?v=3',
            },
            gravatar_id: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for gravatar_id
                resolve: () => '',
            },
            url: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for url
                resolve: () => 'https://api.github.com/users/Aweary',
            },
            html_url: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for html_url
                resolve: () => 'https://github.com/Aweary',
            },
            followers_url: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for followers_url
                resolve: () => 'https://api.github.com/users/Aweary/followers',
            },
            following_url: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for following_url
                resolve: () => 'https://api.github.com/users/Aweary/following{/other_user}',
            },
            gists_url: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for gists_url
                resolve: () => 'https://api.github.com/users/Aweary/gists{/gist_id}',
            },
            starred_url: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for starred_url
                resolve: () => 'https://api.github.com/users/Aweary/starred{/owner}{/repo}',
            },
            subscriptions_url: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for subscriptions_url
                resolve: () => 'https://api.github.com/users/Aweary/subscriptions',
            },
            organizations_url: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for organizations_url
                resolve: () => 'https://api.github.com/users/Aweary/orgs',
            },
            repos_url: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for repos_url
                resolve: () => 'https://api.github.com/users/Aweary/repos',
            },
            events_url: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for events_url
                resolve: () => 'https://api.github.com/users/Aweary/events{/privacy}',
            },
            received_events_url: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for received_events_url
                resolve: () => 'https://api.github.com/users/Aweary/received_events',
            },
            type: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for type
                resolve: () => 'User',
            },
            site_admin: {
                description: 'enter your description',
                type: GraphQLBoolean,
                // TODO: Implement resolver for site_admin
                resolve: () => 'false',
            },
            name: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for name
                resolve: () => 'Brandon Dail',
            },
            company: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for company
                resolve: () => 'Concierge Auctions',
            },
            blog: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for blog
                resolve: () => 'brandondail.me',
            },
            location: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for location
                resolve: () => 'United States',
            },
            email: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for email
                resolve: () => 'cottoncrypt@gmail.com',
            },
            hireable: {
                description: 'enter your description',
                type: GraphQLBoolean,
                // TODO: Implement resolver for hireable
                resolve: () => 'true',
            },
            bio: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for bio
                resolve: () => 'Developer at @ConciergeAuctions, enzyme mainter, stateless and pure.',
            },
            public_repos: {
                description: 'enter your description',
                type: GraphQLFloat,
                // TODO: Implement resolver for public_repos
                resolve: () => '90',
            },
            public_gists: {
                description: 'enter your description',
                type: GraphQLFloat,
                // TODO: Implement resolver for public_gists
                resolve: () => '21',
            },
            followers: {
                description: 'enter your description',
                type: GraphQLFloat,
                // TODO: Implement resolver for followers
                resolve: () => '44',
            },
            following: {
                description: 'enter your description',
                type: GraphQLFloat,
                // TODO: Implement resolver for following
                resolve: () => '141',
            },
            created_at: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for created_at
                resolve: () => '2014-03-07T18:19:20Z',
            },
            updated_at: {
                description: 'enter your description',
                type: GraphQLString,
                // TODO: Implement resolver for updated_at
                resolve: () => '2016-06-07T20:22:00Z',
            }
        })
    })
})