const graphql = require('graphql');
const UserOptions = require(__dirname + '/../models/userOptions');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull} = graphql;

const UserOptionsType = new GraphQLObjectType({
    name: 'UserOptions',
    fields: () => ({
        name: {type: GraphQLString},
        value: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        userOptionByName: {
            type: UserOptionsType,
            args: {name: {type: GraphQLString}},
            resolve: async (parent, args) => {
                return await UserOptions.findOne(args);
            }
        },
        userOptions: {
            type: new GraphQLList(UserOptionsType),
            resolve: async (parent, args) => {
                return await UserOptions.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUserOptions: {
            type: UserOptionsType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                value: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve: async (parent, args) => {
                return await UserOptions.findOneAndUpdate(
                    {name: args.name},
                    args,
                    {new: true, upsert: true, setDefaultsOnInsert: true}
                );
            }
        },
        removeUserOptions: {
            type: UserOptionsType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: async (parent, args) => {
                return await UserOptions.findOneAndRemove(args);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
