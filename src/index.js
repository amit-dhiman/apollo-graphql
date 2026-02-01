require("dotenv").config();

const {createServer} =require("http");
const {execute, subscribe} = require("graphql");
const {SubscriptionServer} = require("subscriptions-transport-ws");

const {createApp, createApolloServer} = require('./app');
const connectDB = require("./config/db");
const {typeDefs,resolvers } = require("./graphql/schema");
const {makeExecutableSchema} = require('@graphql-tools/schema')

const port = process.env.PORT || 5000;

(async ()=>{
  await connectDB();
  const app= await createApp();
  const http=  createServer(app);

  const apolloServer =  await createApolloServer(app);

  const schema=  makeExecutableSchema({
    typeDefs, resolvers
  });
  
  SubscriptionServer.create({
    schema, 
    execute,
    subscribe,
    onConnect:()=>{
      console.log('--client connected for subscription---');
    },
    onDisconnect:()=>{
      console.log('--client disconnected for subscription--');
    },
  },{
    server: http,
    path: "/graphql"
  })


  http.listen(port,()=>{
    console.log(`-server listening at http://localhost:${port}/graphql`);
  })
})();
