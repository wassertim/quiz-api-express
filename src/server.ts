import { app } from "./app";
import { mongoConnect } from "./db";
import { ApolloServer, gql } from "apollo-server-express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import fs from "fs";
import { Mutation } from "./api/graphql/mutation";
import { Query } from "./api/graphql/query";

const PORT = process.env.PORT || 5050;

const typeDefs = [
    gql(fs.readFileSync("./src/api/quiz/graphql/schema.graphql", { encoding: "utf8" })),
    gql(fs.readFileSync("./src/api/quiz-submission/graphql/schema.graphql", { encoding: "utf8" })),
    gql(fs.readFileSync("./src/api/graphql/schema.graphql", { encoding: "utf8" })),
    gql(fs.readFileSync("./src/api/quiz-statistics/graphql/schema.graphql", { encoding: "utf8" })),
];

mongoConnect()
    .then(async () => {
        const httpServer = http.createServer(app);
        const server = new ApolloServer({
            typeDefs,
            resolvers: {
                Mutation,
                Query,
            },
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        });
        await server.start();
        server.applyMiddleware({ app });
        await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    })
    .catch((err) => {
        console.error(err);
    });
