import { app } from "./app";
import { mongoConnect } from "./db";
import { ApolloServer, gql } from "apollo-server-express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import fs from "fs";
import quizResolver from "./api/quiz/graphql/quiz.resolver";

const PORT = process.env.PORT || 5050;

const typeDefs = gql(fs.readFileSync("./src/api/quiz/graphql/schema.graphql", { encoding: "utf8" }));

async function startApolloServer(typeDefs: any, resolvers: any) {
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

mongoConnect()
    .then(() => {
        startApolloServer(typeDefs, quizResolver);
    })
    .catch((err) => {
        console.error(err);
    });
