import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { DbClientInstance } from "./libs/mongodb";
import { Constants } from "./utils/constants";
import { GraphQLSchema } from "graphql";
import { rootQuery } from "./root-components/root.query";
import { rootMutation } from "./root-components/root.mutation";

// init db
DbClientInstance.init(Constants.DB_HOST, Constants.DB_NAME);

const app = express();
const port = 8080;

// enabling cors for all requests by using cors middleware
app.use(cors());

app.use("/api", graphqlHTTP({
    schema: new GraphQLSchema({
        query: rootQuery,
        mutation: rootMutation
    }),
    // rootValue: { hello: () => 'Hello world!' },
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
