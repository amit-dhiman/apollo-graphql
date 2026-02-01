const express = require('express');
const cors = require("cors");
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

  // ✅ FIX 1: Enable CORS for Apollo Studio + local dev
  app.use(
    cors({
      origin: [
        "https://studio.apollographql.com",
        "http://localhost:3000",
        "http://localhost:5000",
      ],
      credentials: true,
    })
  );

  app.use(express.json());
  return app;
}

module.exports = { createApp, createApolloServer };

