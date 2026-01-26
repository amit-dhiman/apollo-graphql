const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/schema');

const authMiddleware = require("./middleware/auth");

async function createApolloServer(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: ({ req, }) => {
    //   const user = authMiddleware(req);
    //   return { user };
    // }
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  return server;
}

async function createApp() {
  const app = express();

  const shutdown = async (signal) => {
    console.log(`---Received-- ${signal}`);

    server.close(() => {
      console.log("HTTP server closed");
    });
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  return app;
}

module.exports = {createApp, createApolloServer};

