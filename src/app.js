const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/schema');


async function createApp() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

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

module.exports = createApp;

