const userType = require('./typeDefs/userType');
const userResolver= require('./resolvers/userResolver');

const {gql} = require('apollo-server-express')
const userTypeDef = require("../graphql/typeDefs/user.typeDefs")
const postTypeDef = require("../graphql/typeDefs/post.typeDefs")

const userResolver= require("../graphql/resolvers/user.resolver")

// Base/root type
const baseTypeDefs = gql`
  type Query
  type Mutation
`
const typeDefs =[baseTypeDefs,userTypeDef,postTypeDef];   // userType
const resolvers =[];              // userResolver

module.exports= {typeDefs,resolvers};
