import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

export const contentType = new GraphQLObjectType({
    name: "Content",
    fields: {
        id: { type: GraphQLString! },
        name: { type: GraphQLString! },
        userId: { type: GraphQLString! }
    }
});