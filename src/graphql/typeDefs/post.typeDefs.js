const {gql} = require('apollo-server-express');

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
  }
  type Query {
    posts: [Post]
  }
  type Mutation{
    createPost(
      title: String!
      content: String!
      userId: ID!
    ): Post
  }
`