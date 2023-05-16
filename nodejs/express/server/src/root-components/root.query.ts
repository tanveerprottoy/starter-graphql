import { GraphQLObjectType } from "graphql";
import { userQuery, usersQuery } from "../modules/users/users-graphql.schema";

export const rootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        users: usersQuery,
        user: userQuery,
    }
});