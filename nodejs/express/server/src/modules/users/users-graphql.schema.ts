import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { contentType } from "../contents/contents-graphql-schema";
import contentsService from "../contents/contents-service";
import usersService from "./users.service";
import usersResolver from "./users.resolver";

export const userInertResponseType = new GraphQLObjectType({
    name: "UserInsertResponse",
    fields: {
        insertedId: { type: GraphQLString! }
    }
});

export const userType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLID! },
        name: { type: GraphQLString! },
        contents: {
            type: GraphQLList(contentType)!,
            resolve: (parent, args) => {
                return contentsService.readMany(500, 1, parent.id);
            }
        }
    }
});

export const userReadManyType = new GraphQLObjectType({
    name: "UserReadMany",
    fields: {
        users: {
            type: GraphQLList(userType),
            args: {
                limit: { type: GraphQLString, defaultValue: 10 },
                page: { type: GraphQLString, defaultValue: 1 },
            },
            resolve: (parent, args) => {
                // call service
                return usersService.readMany(args.limit, args.page);
            }
        }
    }
});

export const userReadOneType = new GraphQLObjectType({
    name: "UserReadOne",
    fields: {
        user: {
            type: userType,
            args: { id: { type: GraphQLString } },
            resolve: (parent, args) => {
                // call service
                return usersService.readOne(args.id);
            }
        }
    }
});

export const usersQuery = {
    type: GraphQLList(userType),
    args: {
        limit: { type: GraphQLString, defaultValue: 10 },
        page: { type: GraphQLString, defaultValue: 1 },
    },
    resolve: (parent: any, args: any) => {
        return usersResolver.readMany(parent, args);
    }
};

export const userQuery = {
    type: userType,
    args: { id: { type: GraphQLString } },
    resolve: (parent: any, args: any) => {
        return usersResolver.readOne(parent, args);
    }
};

export const addUserMutation = {
    type: userInertResponseType,
    args: {
        name: { type: GraphQLString }
    },
    resolve: async (parent: any, args: any) => {
        return await usersResolver.create(parent, args);
    }
};

export const updateUserMutation = {
    type: userType,
    args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString }
    },
    resolve: async (parent: any, args: any) => {
        return await usersResolver.update(parent, args);
    }
};