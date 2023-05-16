import { GraphQLObjectType } from "graphql";
import { addUserMutation, updateUserMutation } from "../modules/users/users-graphql.schema";

export const rootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        addUser: addUserMutation,
        updateUser: updateUserMutation,
    }
});